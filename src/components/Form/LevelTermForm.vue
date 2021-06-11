<template>
  <v-card class="px-auto" rounded elevation="0" outlined>
    <v-card-text class="text-h6 text-center black--text">
      Change Level/Term of Batch {{ batch }}:
    </v-card-text>

    <v-container>
      <v-form ref="form">
        <v-row>
          <v-spacer></v-spacer>
          <v-col cols="12" md="3">
            <v-card-text class="text-left text--black text-body-1 pt-3 pl-9">Current Level/Term: <span v-if="$isMobile()">1-1</span></v-card-text>
          </v-col>
          <v-col cols="5" v-if="!$isMobile()">
            <v-card-text class="text-left text--black text-body-1 pt-3 pl-2">1-1</v-card-text>
          </v-col>
          <v-spacer></v-spacer>
        </v-row>
        <v-row>
          <v-spacer></v-spacer>
          <v-col cols="12" md="3" v-if="!$isMobile()">
            <v-card-text class="text-left text--black text-body-1 pt-3 pl-3 text-center">New Level/Term:</v-card-text>
          </v-col>
          <v-col cols="12" md="5">
            <v-card-text v-if="$isMobile()" class="text-left text--black text-body-1 pb-3 pl-4">New Level/Term:</v-card-text>
            <v-select
                outlined
                dense
                color="primary lighten-2"
                :class="'rounded-lg ' + marginTextField"
                v-model="newLT"
                :items="levelTerms"
                @change="$v.newLT.$touch()"
                @blur="$v.newLT.$touch()"
                :error-messages="newLTErrors"
            ></v-select>
          </v-col>
          <v-spacer></v-spacer>
        </v-row>

        <v-card-actions class="mr-5">
          <v-spacer></v-spacer>
          <v-btn
              color="primary"
              :disabled="$v.$invalid"
              :loading="false"
              @click=""
              class="mr-5"
          >Change Level Term</v-btn>
        </v-card-actions>
      </v-form>
    </v-container>
  </v-card>
</template>

<script>
import {required} from "vuelidate/lib/validators";

export default {
  name: "LevelTermForm",
  props: {
    batch: {
      type: Number,
      default: 16,
    }
  },
  data() {
    return {
      newLT: '',
    };
  },
  validations: {
    newLT: {
      required,
    }
  },
  computed: {
    marginTextField() {
      return this.$isMobile() ? 'mr-2' : 'mr-10';
    },
    levelTerms() {
      return ['2-1', '2-2', '3-1', '3-2', '4-1', '4-2'];
    },
    newLTErrors() {
      const errors = [];
      if (!this.$v.newLT.$dirty) {
        return errors;
      }

      !this.$v.newLT.required && errors.push('New Level Term is required');

      return errors;
    }
  }
}
</script>

<style scoped>

</style>