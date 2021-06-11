<template>
  <v-card class="px-auto" rounded elevation="0" outlined>
    <v-card-text class="text-h6 text-center black--text">
      Appoint New CR
    </v-card-text>

    <v-container>
      <v-form ref="form">
        <v-row>
          <v-spacer></v-spacer>
          <v-col cols="12" md="3" v-if="!$isMobile()">
            <v-card-text class="text-left text--black text-body-1 pt-3 pl-7 text-center">Student ID:</v-card-text>
          </v-col>
          <v-col cols="12" md="5">
            <v-card-text v-if="$isMobile()" class="text-left text--black text-body-1 pb-3 pl-4">Student ID:</v-card-text>
            <v-text-field
                outlined
                :class="'rounded-lg ' + marginTextField"
                dense
                v-model="id"
                :error-messages="idErrors"
                @blur="$v.id.$touch()"
                @input="$v.id.$touch()"
            ></v-text-field>
          </v-col>
          <v-spacer></v-spacer>
        </v-row>

        <v-card-actions class="mr-10 pr-15">
          <v-spacer></v-spacer>
          <v-btn
              color="primary"
              :disabled="$v.$invalid || getLoaderFlag('crSubmission')"
              :loading="getLoaderFlag('crSubmission')"
              @click="submit"

          >Appoint</v-btn>
        </v-card-actions>

        <v-row class="justify-center" v-if="submitted && getCRSubmitError">
          <v-alert
              type="error"
              outlined
              dense
          >
            {{ getCRSubmitMessage }}
          </v-alert>
        </v-row>
      </v-form>
    </v-container>
  </v-card>
</template>

<script>
import { required, minLength, integer } from 'vuelidate/lib/validators'
import {mapActions, mapGetters} from "vuex";
export default {
  name: "CRForm",
  props: {
    batch: {
      type: Number,
      default: 16,
    }
  },
  data() {
    return {
      id: '',
      submitted: false,
    }
  },
  validations: {
    id: {
      required,
      len(val) {
        return val.length === 7;
      },
      integer,
      positive(val) {
        return val[0] !== '-';
      },
      sameBatch(val) {
        return Number(val.substring(0, 2)) === this.batch;
      }
    }
  },
  computed: {
    ...mapGetters('admin', ['getLoaderFlag', 'getCRSubmitError', 'getCRSubmitMessage']),
    marginTextField() {
      return this.$isMobile() ? 'mr-2' : 'mr-10';
    },
    idErrors() {
      const errors = [];
      if (!this.$v.id.$dirty) {
        return errors;
      }

      !this.$v.id.required && errors.push('Student id is required');
      !this.$v.id.integer && errors.push('Student id must be a number');
      !this.$v.id.positive && errors.push('Student id cannot be negative');
      !this.$v.id.len && errors.push('Student id must be of 7 digits');
      !this.$v.id.sameBatch && errors.push('Student id must be from batch ' + this.batch);

      return errors;
    }
  },
  methods: {
    ...mapActions('admin', ['submitCR']),
    submit() {
      if (this.$v.$invalid) {
        return;
      }

      const payload = {'promote': true};

      this.submitCR({id: this.id, payload: payload})
        .then(response => {
          this.$v.$reset();
          this.id = '';
          this.$emit('appointed');
        })
        .catch(e => {
          console.log(e.response);
        })
        .finally(() => {
          this.submitted = true;
        });
    },
  },
  mounted() {
    this.submitted = false;
  }
}
</script>

<style scoped>

</style>