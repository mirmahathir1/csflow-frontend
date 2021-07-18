<template>
  <padded-container>
    <page-header :back-button="true" back-route="/question-bank">Question Bank: Create New Question</page-header>

    <v-card
        color="white"
        elevation="2"
        class="rounded-lg px-5 pt-8 pb-4 mt-6"
        v-if="!getLoaderFlag('topics')"
    >
      <v-container>
        <v-form ref="form">
<!--          Title-->
          <v-row>
            <v-spacer></v-spacer>
            <v-col cols="12" md="3" v-if="!$isMobile()">
              <v-card-text class="text-left text--black text-body-1 pt-3 pl-7">Title:</v-card-text>
            </v-col>
            <v-col cols="12" md="5">
              <v-card-text v-if="$isMobile()" class="text-left text--black text-body-1 pb-3 pl-4">Title:</v-card-text>
              <v-textarea
                  rows="1"
                  auto-grow
                  outlined
                  v-model="title"
                  @blur="$v.title.$touch()"
                  :error-messages="titleErrors"
              ></v-textarea>
            </v-col>
            <v-spacer></v-spacer>
          </v-row>

<!--          Description-->
          <v-row>
            <v-spacer></v-spacer>
            <v-col cols="12" md="3" v-if="!$isMobile()">
              <v-card-text class="text-left text--black text-body-1 pt-3 pl-7">Description:</v-card-text>
            </v-col>
            <v-col cols="12" md="5">
              <v-card-text v-if="$isMobile()" class="text-left text--black text-body-1 pb-3 pl-4">Description:</v-card-text>
              <v-textarea
                  rows="5"
                  auto-grow
                  outlined
                  v-model="description"
              ></v-textarea>
            </v-col>
            <v-spacer></v-spacer>
          </v-row>

<!--          Topics-->
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
                  v-model="topic"
                  :items="topics"
                  @blur="$v.topic.$touch()"
                  :error-messages="topicErrors"
              ></v-select>
            </v-col>
            <v-spacer></v-spacer>
          </v-row>

<!--          Custom Tags-->
          <v-row class="mt-0">
            <v-spacer></v-spacer>
            <v-col cols="12" md="3" v-if="!$isMobile()">
              <v-card-text class="text-left text--black text-body-1 pt-3 pl-10">Tags:</v-card-text>
            </v-col>
            <v-col cols="12" md="5">
              <v-card-text v-if="$isMobile()" class="text-left text--black text-body-1 pb-3 pl-4">Tags:</v-card-text>
              <v-text-field
                  v-for="(tag, index) in tags" :key="index"
                  outlined
                  dense
                  v-model="tags[index].name"
                  @blur="$v.tags.$each[index].name.$touch()"
                  :error-messages="tagErrors[index]"
              >
                <template v-slot:append-outer>
                  <v-btn
                      icon
                      color="red lighten-1"
                      @click="removeTag(index)"
                      small
                  >
                    <v-icon>
                      mdi-minus-circle
                    </v-icon>
                  </v-btn>
                </template>
              </v-text-field>
              <v-text-field
                  outlined
                  dense
                  v-model="newTag"
              >
                <template v-slot:append-outer>
                  <v-btn
                      icon
                      color="primary"
                      @click="addTag()"
                      small
                  >
                    <v-icon>
                      mdi-plus-circle
                    </v-icon>
                  </v-btn>
                </template>
              </v-text-field>
            </v-col>
            <v-spacer></v-spacer>
          </v-row>

          <v-row>
            <v-col cols="7"></v-col>
            <v-col cols="5" align="center">
              <v-btn
                  color="primary"
                  :block="$isMobile()"
                  :disabled="$v.$invalid || getLoaderFlag('questionSubmission')"
                  :loading="getLoaderFlag('questionSubmission')"
                  @click="submit"
              >Submit</v-btn>
            </v-col>
          </v-row>

          <v-row class="justify-center">
            <v-alert
                type="error"
                outlined
                dense
                v-if="submitted && getQuestionSubmitError"
            >
              {{ getQuestionSubmitMessage }}
            </v-alert>
          </v-row>
        </v-form>
      </v-container>
    </v-card>
    <details-loader v-else></details-loader>
  </padded-container>
</template>

<script>
import PaddedContainer from "@/components/PaddedContainer";
import PageHeader from "@/components/PageHeader";
import { required, minLength } from 'vuelidate/lib/validators'
import {mapActions, mapGetters} from "vuex";
import DetailsLoader from "@/components/DetailsLoader";
export default {
  name: "QuestionCreation",
  title() {
    return "Create Question";
  },
  components: {DetailsLoader, PageHeader, PaddedContainer},
  data() {
    return {
      title: '',
      description: '',
      topic: '',
      topicToCourse: {},
      tags: [],
      newTag: '',
      submitted: false,
    };
  },
  validations: {
    title: {
      required,
    },
    tags: {
      $each: {
        name: {
          required,
          unique(val) {
            return this.tags.filter(element => element.name.toLowerCase() === val.toLowerCase()).length < 2;
          },
        },
      }
    },
    topic: {
      required,
    }
  },
  computed: {
    ...mapGetters('question_bank', ['getLoaderFlag', 'getTopics', 'getQuestionSubmitError', 'getQuestionSubmitMessage']),
    marginTextField() {
      return this.$isMobile() ? 'mr-2' : 'mr-0';
    },
    titleErrors() {
      const errors = [];
      if (!this.$v.title.$dirty) {
        return errors;
      }

      !this.$v.title.required && errors.push('Title is required');
      return errors;
    },
    topicErrors() {
      const errors = [];
      if (!this.$v.topic.$dirty) {
        return errors;
      }

      !this.$v.topic.required && errors.push('Topic is required');
      return errors;
    },
    tagErrors() {
      const errors = [];

      for (let index=0; index < this.tags.length; index++) {
        const element = this.$v.tags.$each[index.toString()];
        const temp = [];

        !element.name.required && temp.push('Please enter a tag');
        !element.name.unique && temp.push('Same tag cannot be used more than once');

        errors.push(temp);
      }

      return errors;
    },
    topics() {
      let ret = [];
      this.topicToCourse = {};

      if (this.getTopics) {
        this.getTopics.forEach(topic => {
          ret.push(topic['name']);
          this.topicToCourse[topic['name']] = topic['courseId'];
        });
      }

      return ret;
    }
  },
  methods: {
    ...mapActions('question_bank', ['loadTopics', 'createQuestion']),
    addTag() {
      this.tags.push({name: this.newTag});
      this.newTag = '';
    },
    removeTag(index) {
      this.tags.splice(index, 1);
    },
    submit() {
      let ct = [];
      this.tags.forEach(tag => ct.push(tag.name));

      let question = {
        type: 'question',
        title: this.$replaceFirstQuote(this.title),
        description: this.$replaceFirstQuote(this.description),
        course: this.topicToCourse[this.topic],
        topic: '',
        book: '',
        termFinal: null,
        customTag: ct,
        resources: [],
      };

      this.createQuestion(question)
        .then(response => {
          this.$router.push('/question-bank');
        })
        .catch(e => {
          console.log(e.response);
        })
        .finally(() => {
          this.submitted = true;
        });
    }
  },
  mounted() {
    this.loadTopics();
  }
}
</script>

<style scoped>

</style>