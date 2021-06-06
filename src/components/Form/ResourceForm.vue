<template>
  <v-card class="px-auto" rounded>
    <v-card-text class="text-h6 text-center black--text">
      Create New Resource Archive
    </v-card-text>

    <v-container>
      <v-form ref="form">
<!--        Link-->
        <v-row>
          <v-spacer></v-spacer>
          <v-col cols="12" md="3" v-if="!$isMobile()">
            <v-card-text class="text-left text--black text-body-1 pt-3 pl-7">Drive Link:</v-card-text>
          </v-col>
          <v-col cols="12" md="5">
            <v-card-text v-if="$isMobile()" class="text-left text--black text-body-1 pb-3 pl-4">Drive Link:</v-card-text>
            <v-text-field
                outlined
                class="rounded-lg mr-10"
                dense
                v-model="link"
                :error-messages="linkErrors"
                @blur="$v.link.$touch()"
            ></v-text-field>
          </v-col>
          <v-spacer></v-spacer>
        </v-row>

<!--        Level Term-->
        <v-row>
          <v-spacer></v-spacer>
          <v-col cols="12" md="3" v-if="!$isMobile()">
            <v-card-text class="text-left text--black text-body-1 pt-3 pl-7">Level-Term:</v-card-text>
          </v-col>
          <v-col cols="12" md="5">
            <v-card-text v-if="$isMobile()" class="text-left text--black text-body-1 pb-3 pl-4">Level-Term:</v-card-text>
            <v-select
                outlined
                dense
                color="primary lighten-2"
                class="mr-10"
                v-model="lt"
                :items="levelTerms"
                required
                @change="$v.lt.$touch()"
                @blur="$v.lt.$touch()"
                :error-messages="ltErrors"
            ></v-select>
          </v-col>
          <v-spacer></v-spacer>
        </v-row>

        <v-card-actions class="mr-5">
          <v-spacer></v-spacer>
          <v-btn
              color="primary"
              :disabled="$v.$invalid || getLoaderFlag('resourceSubmission')"
              :loading="getLoaderFlag('resourceSubmission')"
              @click="submit"
          >Submit</v-btn>
        </v-card-actions>

        <v-row class="justify-center" v-if="submitted && getResourceSubmitError">
          <v-alert
              type="error"
              outlined
              dense
          >
            {{ getResourceSubmitMessage }}
          </v-alert>
        </v-row>
      </v-form>
    </v-container>
  </v-card>
</template>

<script>
import { required, url } from 'vuelidate/lib/validators'
import {mapActions, mapGetters} from "vuex";
export default {
  name: "ResourceForm",
  props: {
    levelTerms: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      link: '',
      lt: '',
      submitted: false,
    };
  },
  validations: {
    link: {
      required,
      url,
    },
    lt: {
      required,
    }
  },
  computed: {
    ...mapGetters('privileged', ['getLoaderFlag', 'getResourceSubmitError', 'getResourceSubmitMessage']),
    linkErrors() {
      const errors = [];
      if (!this.$v.link.$dirty) {
        return errors;
      }

      !this.$v.link.required && errors.push('Link is required');
      !this.$v.link.url && errors.push('Must be a valid url.');
      return errors
    },
    ltErrors() {
      const errors = [];
      if (!this.$v.lt.$dirty) {
        return errors;
      }

      !this.$v.lt.required && errors.push('Level/Term is required');
      return errors;
    },
  },
  methods: {
    ...mapActions('privileged', ['createResource']),
    submit() {
      if (this.$v.$invalid) {
        return;
      }

      const payload = {}
      payload.link = this.link;
      payload.level = Number(this.lt.substring(0, 1));
      payload.term = Number(this.lt.substring(2, 3));

      this.createResource(payload)
        .then(response => {
          this.$emit('created');
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