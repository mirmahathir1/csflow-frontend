<template>
  <v-card class="px-auto" rounded elevation="0" outlined>
    <v-card-text class="text-h6 text-center black--text">
      Search Question Bank
    </v-card-text>

    <v-container>
      <v-form ref="form">
        <v-row>
          <v-spacer></v-spacer>
          <v-col cols="12" md="3" v-if="!$isMobile()">
            <v-card-text class="text-left text--black text-body-1 pt-3 pl-7 text-center">Enter Relevant Text:</v-card-text>
          </v-col>
          <v-col cols="12" md="5">
            <v-card-text v-if="$isMobile()" class="text-left text--black text-body-1 pb-3 pl-4">Enter Relevant Text:</v-card-text>
            <v-text-field
                outlined
                :class="'rounded-lg ' + marginTextField"
                dense
                v-model="searchText"
                @blur="$v.searchText.$touch()"
                :error-messages="searchTextErrors"
            ></v-text-field>
          </v-col>
          <v-spacer></v-spacer>
        </v-row>

        <v-row>
          <v-spacer></v-spacer>
          <v-col cols="12" md="3" v-if="!$isMobile()">
            <v-card-text class="text-left text--black text-body-1 pt-3 pl-10">Topic:</v-card-text>
          </v-col>
          <v-col cols="12" md="5">
            <v-card-text v-if="$isMobile()" class="text-left text--black text-body-1 pb-3 pl-4">Topic:</v-card-text>
            <v-select
                outlined
                dense
                clearable
                color="primary lighten-2"
                :class="'rounded-lg ' + marginTextField"
                v-model="topic"
                :items="topics"
            ></v-select>
          </v-col>
          <v-spacer></v-spacer>
        </v-row>

        <v-card-actions class="mr-10 pr-15">
          <v-spacer></v-spacer>
          <v-btn
              color="primary"
              :disabled="$v.$invalid || getLoaderFlag('questions')"
              :loading="getLoaderFlag('questions')"
              @click="submit"
          >Search</v-btn>
        </v-card-actions>

<!--        <v-row class="justify-center" v-if="submitted && false">-->
<!--          <v-alert-->
<!--              type="error"-->
<!--              outlined-->
<!--              dense-->
<!--          >-->
<!--            Error hoise-->
<!--          </v-alert>-->
<!--        </v-row>-->
      </v-form>
    </v-container>
  </v-card>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import {mapActions, mapGetters} from "vuex";
export default {
  name: "QBForm",
  props: {
    topics: {
      type: Array,
      default: () => [],
    },
    topicToCourse: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      searchText: '',
      topic: null,
      submitted: false,
    };
  },
  validations: {
    searchText: {
      required
    }
  },
  computed: {
    ...mapGetters('question_bank', ['getLoaderFlag']),
    marginTextField() {
      return this.$isMobile() ? 'mr-2' : 'mr-10';
    },
    searchTextErrors() {
      const errors = [];
      if (!this.$v.searchText.$dirty) {
        return errors;
      }

      !this.$v.searchText.required && errors.push('Search text is required');
      return errors;
    }
  },
  methods: {
    ...mapActions('question_bank', ['setSearchParams']),
    submit() {
      const payload = {
        "text": this.$replaceFirstQuote(this.searchText),
        "courseId": this.topicToCourse.topic,
        "topic": null,
        "book": null,
        "level": null,
        "term": null
      };
      this.setSearchParams(payload);
      this.$emit('submitted');
    }
  }
}
</script>

<style scoped>

</style>