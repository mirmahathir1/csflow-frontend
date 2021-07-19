<template>
  <padded-container>
    <page-header>Question Bank</page-header>

    <template :slot="$vuetify.breakpoint.mdAndUp ? 'right' : 'default'">
      <v-card class="mt-8 mb-4 pb-4 rounded-lg mx-auto" max-width="250">
        <v-card-text class="text-center text-body-2">Create New Question</v-card-text>
        <div class="mx-6">
          <hr class="my-divider">
        </div>
        <v-card-actions class="mx-2">
          <v-btn block color="primary" small @click.stop="$router.push('/question-bank/create')">
            Create Question
          </v-btn>
        </v-card-actions>
      </v-card>
    </template>

    <QBForm
        v-if="!getLoaderFlag('topics')"
        :topics="topics"
        :topicToCourse="topicToCourse"
        @submitted="fetchQuestions"
    ></QBForm>
    <regular-loader v-else></regular-loader>

    <template v-if="!getLoaderFlag('questions') && questions.length > 0">
      <page-header class="mt-10 mb-4">Relevant Questions</page-header>
      <v-row
          v-for="question in questionsCurrentPage"
          :key="question['ID']"
      >
        <v-col cols="12">
          <v-hover v-slot:default="{ hover }">
            <v-card
                :class="{'my-hover': hover, 'py-6 pl-3 rounded-lg': true,
                  'mx-5': $vuetify.breakpoint.mdAndUp, 'mx-1': !$vuetify.breakpoint.mdAndUp}"
                min-height="120"
                :elevation="hover ? 3 : 2"
                @click="$navigateToPost(question['ID'])"
            >
              <v-row>
                <v-col cols="12" md="8" class="py-0">
                  <v-row>
                    <v-col cols="2" class="py-0 pr-0">
                      <vote-card-inactive
                          :small="$isMobile()"
                          :votes="question['UpvoteCount']-question['DownvoteCount']"
                          class="mt-6"
                      ></vote-card-inactive>
                    </v-col>
                    <v-col cols="10" class="py-0 pl-0">
                      <v-card-text class="black--text">
                        {{ truncate(question['title'], question['ID']) }}
                        <span
                            v-if="question['title'].length > maxLength && !showFull[question['ID']]"
                            class="primary--text my-hover font-weight-bold text-caption"
                            @click.stop="setFull(question['ID'])"
                        >See More</span>
                        <span
                            v-if="question['title'].length > maxLength && showFull[question['ID']]"
                            class="primary--text my-hover font-weight-bold text-caption"
                            @click.stop="showFull = {}"
                        >See Less</span>
                      </v-card-text>
                    </v-col>
                  </v-row>
                  <v-row class="pt-6 pb-1">
                    <v-chip
                        color="blue lighten-5 primary--text text-darken-1"
                        :class="'ml-2 my-1'"
                    >{{ formatDate(question['createdAt']) }}</v-chip>
                    <v-chip
                        v-if="question['type'].toLowerCase() === 'question'"
                        color="blue lighten-5 primary--text text-darken-1"
                        :class="'ml-2 my-1'"
                    >{{ question['answerCount'] }} Answer{{ question['answerCount'] === 1 ? '' : 's' }}</v-chip>
                    <v-chip
                        color="blue lighten-5 primary--text text-darken-1"
                        :class="'ml-2 my-1'"
                    >{{ $capitalizeFirstLetter(question['type'].toLowerCase()) }} Thread</v-chip>
                  </v-row>
                  <v-row :class="chipMargin">
                    <v-chip
                        v-if="question['book'] && question['book'] !== ''"
                        class="ml-2 my-1"
                        color="blue lighten-5 primary--text text-darken-1"
                    >{{ question['book'] }}</v-chip>
                    <v-chip
                        v-if="question['topic'] && question['topic'] !== ''"
                        class="ml-2 my-1"
                        color="blue lighten-5 primary--text text-darken-1"
                    >{{ question['topic'] }}</v-chip>
                    <v-chip
                        v-for="(tag, idx) in question['customTag']" :key="idx"
                        class="ml-2 my-1"
                        color="blue lighten-5 primary--text text-darken-1"
                    >{{ tag }}</v-chip>
                  </v-row>
                </v-col>
                <v-col cols="12" md="4" class="py-0">
                  <user-card
                      class="mx-auto mb-3"
                      :name="question['owner']['Name']"
                      :ID="question['owner']['ID']"
                      :karma="parseInt(question['owner']['Karma'])"
                      :image="question['owner']['ProfilePic']"
                      :width="250"
                      @click.stop.native="$router.push('/user/' + question['owner']['ID'])"
                  ></user-card>
                </v-col>
              </v-row>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>

      <!--        Pagination-->
      <v-row>
        <v-col cols="12" class="px-0">
          <div class="mx-auto mb-3 mt-5">
            <v-pagination
                v-model="page"
                :length="questionPages"
                circle
                :total-visible="$isMobile() ? 6 : 7"
            ></v-pagination>
          </div>
        </v-col>
      </v-row>
    </template>
    <error-card class="mt-10" v-if="!questions || questions.length === 0">No Results Found</error-card>
  </padded-container>
</template>

<script>
import PaddedContainer from "@/components/PaddedContainer";
import PageHeader from "@/components/PageHeader";
import QBForm from "@/components/Form/QBForm";
import {mapActions, mapGetters} from "vuex";
import RegularLoader from "@/components/Loader/RegularLoader";
import UserCard from "@/components/Card/UserCard";
import VoteCardInactive from "@/components/Card/VoteCardInactive";
import ErrorCard from "@/components/ErrorCard";
export default {
  name: "QuestionBank",
  title() {
    return 'Question Bank';
  },
  components: {ErrorCard, VoteCardInactive, UserCard, RegularLoader, QBForm, PageHeader, PaddedContainer},
  data() {
    return {
      pageSize: 4,
      page: 1,
      maxLength: 240,
      showFull: {},
      topicToCourse: {},
      submitted: false,
    };
  },
  computed: {
    ...mapGetters('question_bank', ['getLoaderFlag', 'getTopics', 'getQuestions']),
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
    },
    margin() {
      return this.$vuetify.breakpoint.mdAndUp ? 'mx-5' : 'mx-1';
    },
    chipMargin() {
      return this.$vuetify.breakpoint.mdAndUp ? 'mb-1' : 'mb-3';
    },
    questions() {
      if (this.getQuestions) {
        return this.getQuestions.filter(e => e['type'].toLowerCase() === 'question').sort((a, b) => {
          return (b['UpvoteCount'] - b['DownvoteCount']) - (a['UpvoteCount'] - a['DownvoteCount']);
        });
      }

      return [];
    },
    questionsCurrentPage() {
      this.page = Math.min(this.page, this.questionPages);

      return this.questions.slice((this.page-1)*this.pageSize, this.page*this.pageSize);
    },
    questionPages() {
      if (this.questions) {
        return Math.ceil(this.questions.length/this.pageSize);
      }
      return 0;
    },
  },
  methods: {
    ...mapActions('question_bank', ['loadTopics', 'loadQuestions', 'clearSearch']),
    formatDate(date) {
      return new Date(date).toLocaleString('en-US', {
        day: 'numeric',
        year: 'numeric',
        month: 'long',
        hour: 'numeric',
        minute: 'numeric',
      });
    },
    truncate(text, postID) {
      if (text.length > this.maxLength && !this.showFull[postID]) {
        return text.substring(0, this.maxLength) + '...';
      }

      return text;
    },
    setFull(postID) {
      this.showFull = {};
      this.showFull[postID] = true;
    },
    fetchQuestions() {
      this.submitted = true;
      this.page = 1;
      this.loadQuestions();
    },
    onCreateClicked() {
      console.log('clicked');
    }
  },
  mounted() {
    this.loadTopics();
    // this.clearSearch();
  }
}
</script>

<style scoped>

</style>