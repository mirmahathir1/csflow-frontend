<template>
  <padded-container>
    <page-header>Report Manager / Answers</page-header>

    <v-card
        class="rounded-lg px-5 pt-4 pb-4 mt-6"
    >
      <v-card-text class="text-center text-h6 black--text">Top Reported Answers</v-card-text>

      <template v-if="!getLoaderFlag('reportedAnswers')">
        <v-row
            v-for="answer in answersCurrentPage"
            class="mb-6"
            :key="answer['answerId']"
        >
          <v-col cols="12">
            <v-hover v-slot:default="{ hover }">
              <v-card
                  :class="{'my-hover': hover, 'py-6 pl-3 rounded-lg': true,
                  'mx-5': $vuetify.breakpoint.mdAndUp, 'mx-1': !$vuetify.breakpoint.mdAndUp}"
                  :elevation="hover ? 3 : 2"
                  min-height="120"
                  @click="$navigateToPost(answer['postId'])"
              >
                <v-row>
                  <v-col cols="12" md="8" class="py-0">
                    <v-row>
                      <v-col cols="2" class="py-0 pr-0">
                        <vote-card-inactive
                            :small="$isMobile()"
                            :votes="answer['vote']"
                            class="mt-6"
                        ></vote-card-inactive>
                      </v-col>
                      <v-col cols="10" class="py-0 pl-0">
                        <v-card-text class="black--text">
                          {{ truncate(answer['description'], answer['answerId']) }}
                          <span
                              v-if="answer['description'].length > maxLength && !showFull[answer['answerId']]"
                              class="primary--text my-hover font-weight-bold text-caption"
                              @click.stop="setFull(answer['answerId'])"
                          >See More</span>
                          <span
                              v-if="answer['description'].length > maxLength && showFull[answer['answerId']]"
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
                      >{{ formatDate(answer['createdAt']) }}</v-chip>
                      <v-chip
                          color="blue lighten-5 primary--text text-darken-1"
                          :class="'ml-2 ' + chipMargin"
                      >{{ answer['commentCount'] }} Comment{{ answer['commentCount'] === 1 ? '' : 's' }}</v-chip>
                    </v-row>
                  </v-col>
                  <v-col cols="12" md="4" class="py-0">
                    <user-card
                        class="mx-auto mb-3"
                        :name="answer['owner']['name']"
                        :ID="answer['owner']['studentId']"
                        :karma="parseInt(answer['owner']['karma'])"
                        :image="answer['owner']['profilePic']"
                        :width="250"
                        @click.native="$router.push('/user/' + answer['owner']['studentId'])"
                    ></user-card>
                  </v-col>
                </v-row>
              </v-card>
            </v-hover>
          </v-col>
          <v-col cols="12" class="text-center">
            <v-row class="justify-center">
              <v-btn class="mx-3 my-2 primary" @click="onResolveClicked(answer['answerId'])">Resolve</v-btn>
              <v-btn class="mx-3 my-2 red lighten-1 white--text" @click="onDeleteClicked(answer['answerId'])">Delete</v-btn>
              <v-btn class="mx-3 my-2 no-click" tile color="blue lighten-5">
                {{ answer['reportCount']}} Report{{ answer['reportCount'] > 1 ? 's' : '' }}
              </v-btn>
            </v-row>
          </v-col>
        </v-row>

<!--        Pagination-->
        <v-row>
          <v-col cols="12" class="px-0">
            <div class="mx-auto mb-3 mt-5">
              <v-pagination
                  v-model="page"
                  :length="answerPages"
                  circle
                  :total-visible="$isMobile() ? 6 : 7"
              ></v-pagination>
            </div>
          </v-col>
        </v-row>

<!--        Resolve Dialog-->
        <v-dialog
            v-model="resolveDialog"
            max-width="320"
        >
          <v-card>
            <v-card-title class="headline">
              Resolve this answer?
            </v-card-title>
            <v-card-text>Confirming this will keep the answer, but delete all the reports on this answer.</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                  color="green darken-1"
                  text
                  @click="resolveDialog = false"
              >
                No
              </v-btn>
              <v-btn
                  color="red darken-1"
                  text
                  @click="onResolveConfirmed"
                  :loading="getLoaderFlag('reportResolution')"
                  :disabled="getLoaderFlag('reportResolution')"
              >
                Yes
              </v-btn>
            </v-card-actions>
            <v-row class="justify-center" v-if="getReportResolveError && submitted">
              <v-alert
                  type="error"
                  outlined
                  dense
              >
                {{ getReportResolveMessage }}
              </v-alert>
            </v-row>
          </v-card>
        </v-dialog>

<!--        Delete Dialog-->
        <v-dialog
            v-model="deleteDialog"
            max-width="320"
        >
          <v-card>
            <v-card-title class="headline">
              Delete this answer?
            </v-card-title>
            <v-card-text>Confirming this will remove the answer and all the reports on this answer.</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                  color="green darken-1"
                  text
                  @click="deleteDialog = false"
              >
                No
              </v-btn>
              <v-btn
                  color="red darken-1"
                  text
                  @click="onDeleteConfirmed"
                  :loading="getLoaderFlag('reportDeletion')"
                  :disabled="getLoaderFlag('reportDeletion')"
              >
                Yes
              </v-btn>
            </v-card-actions>
            <v-row class="justify-center" v-if="getReportDeleteError && submitted">
              <v-alert
                  type="error"
                  outlined
                  dense
              >
                {{ getReportDeleteMessage }}
              </v-alert>
            </v-row>
          </v-card>
        </v-dialog>
      </template>
      <details-loader v-else></details-loader>
    </v-card>
  </padded-container>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import PaddedContainer from "@/components/PaddedContainer";
import PageHeader from "@/components/PageHeader";
import DetailsLoader from "@/components/DetailsLoader";
import UserCard from "@/components/Card/UserCard";
import VoteCardInactive from "@/components/Card/VoteCardInactive";

export default {
  name: "ReportManagerAnswer",
  components: {VoteCardInactive, UserCard, DetailsLoader, PageHeader, PaddedContainer},
  title() {
    return 'Report Manager (Answers)';
  },
  data() {
    return {
      pageSize: 3,
      page: 1,
      resolveDialog: false,
      resolveItem: -1,
      deleteDialog: false,
      deleteItem: -1,
      submitted: false,
      maxLength: 240,
      showFull: {},
    };
  },
  computed: {
    ...mapGetters('privileged', ['getLoaderFlag', 'getReportedAnswers', 'getReportResolveError', 'getReportResolveMessage',
      'getReportDeleteError', 'getReportDeleteMessage']),
    margin() {
      return this.$vuetify.breakpoint.mdAndUp ? 'mx-5' : 'mx-1';
    },
    chipMargin() {
      return this.$vuetify.breakpoint.mdAndUp ? 'my-1' : 'mt-1 mb-5';
    },
    answers() {
      if (this.getReportedAnswers) {
        return this.getReportedAnswers.sort((a, b) => b['reportCount'] - a['reportCount']);
      }

      return [];
    },
    answersCurrentPage() {
      this.page = Math.min(this.page, this.answerPages);

      return this.answers.slice((this.page-1)*this.pageSize, this.page*this.pageSize);
    },
    answerPages() {
      if (this.answers) {
        return Math.ceil(this.answers.length/this.pageSize);
      }
      return 0;
    },
  },
  methods: {
    ...mapActions('privileged', ['loadReportedAnswers', 'resolveReport', 'deleteReport']),
    formatDate(date) {
      return new Date(date).toLocaleString('en-US', {
        day: 'numeric',
        year: 'numeric',
        month: 'long',
        hour: 'numeric',
        minute: 'numeric',
      });
    },
    truncate(text, answerID) {
      if (text.length > this.maxLength && !this.showFull[answerID]) {
        return text.substring(0, this.maxLength) + '...';
      }

      return text;
    },
    setFull(answerID) {
      this.showFull = {};
      this.showFull[answerID] = true;
    },
    onResolveClicked(answerID) {
      this.resolveItem = answerID;
      this.submitted = false;
      this.resolveDialog = true;
    },
    onResolveConfirmed() {
      this.resolveReport({type: 'answer', id: this.resolveItem})
          .then(response => {
            this.resolveDialog = false;
            this.loadReportedAnswers();
          })
          .catch(e => {
            console.log(e.response);
          })
          .finally(() => {
            this.submitted = true;
          });
    },
    onDeleteClicked(answerID) {
      this.deleteItem = answerID;
      this.submitted = false;
      this.deleteDialog = true;
    },
    onDeleteConfirmed() {
      this.deleteReport({type: 'answer', id: this.deleteItem})
          .then(response => {
            this.deleteDialog = false;
            this.loadReportedAnswers();
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
    this.loadReportedAnswers();
  }
}
</script>

<style scoped>

</style>