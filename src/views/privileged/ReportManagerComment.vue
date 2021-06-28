<template>
  <padded-container>
    <page-header>Report Manager / Comments</page-header>

<!--    Comments-->
    <v-card
        class="rounded-lg px-5 pt-4 pb-4 mt-6"
    >
      <v-card-text class="text-center text-h6 black--text">Top Reported Comments</v-card-text>

      <template v-if="!getLoaderFlag('reportedComments')">
        <v-row
            v-for="report in commentsCurrentPage"
            class="mb-6"
            :key="report['commentId']"
        >
          <v-col cols="12">
            <v-hover v-slot:default="{ hover }">
              <v-card
                  :class="{'my-hover': hover, 'py-6 pl-3 rounded-lg': true,
                  'mx-5': $vuetify.breakpoint.mdAndUp, 'mx-1': !$vuetify.breakpoint.mdAndUp}"
                  :elevation="hover ? 3 : 2"
                  min-height="120"
                  @click="$navigateToPost(report['postId'])"
              >
                <v-row>
                  <v-col cols="12" md="8" class="py-0">
                    <v-chip color="blue lighten-5 primary--text text-darken-1">
                      {{ formatDate(report['createdAt']) }}
                    </v-chip>
                    <v-card-text>
                      {{ truncate(report['description'], report['commentId']) }}
                      <span
                          v-if="report['description'].length > maxLength && !showFull[report['commentId']]"
                          class="primary--text my-hover font-weight-bold text-caption"
                          @click.stop="setFull(report['commentId'])"
                      >See More</span>
                      <span
                          v-if="report['description'].length > maxLength && showFull[report['commentId']]"
                          class="primary--text my-hover font-weight-bold text-caption"
                          @click.stop="showFull = {}"
                      >See Less</span>
                    </v-card-text>
                  </v-col>
                  <v-col cols="12" md="4" class="py-0">
                    <user-card
                        class="mx-auto mb-3"
                        :name="report['owner']['name']"
                        :ID="report['owner']['studentId']"
                        :karma="parseInt(report['owner']['karma'])"
                        :image="report['owner']['profilePic']"
                        :width="250"
                        @click.stop.native="$router.push('/user/' + report['owner']['studentId'])"
                    ></user-card>
                  </v-col>
                </v-row>
              </v-card>
            </v-hover>
          </v-col>
          <v-col cols="12" class="text-center">
            <v-row class="justify-center">
              <v-btn class="mx-3 my-2 primary" @click="onResolveClicked(report['commentId'])">Resolve</v-btn>
              <v-btn class="mx-3 my-2 red lighten-1 white--text" @click="onDeleteClicked(report['commentId'])">Delete</v-btn>
              <v-btn class="mx-3 my-2 no-click" tile color="blue lighten-5">
                {{report['reportCount']}} Report{{ report['reportCount'] > 1 ? 's' : '' }}
              </v-btn>
            </v-row>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" class="px-0">
            <div class="mx-auto mb-3 mt-5">
              <v-pagination
                  v-model="page"
                  :length="commentPages"
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
              Resolve this comment?
            </v-card-title>
            <v-card-text>Confirming this will keep the comment, but delete all the reports on this comment.</v-card-text>
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
              Delete this comment?
            </v-card-title>
            <v-card-text>Confirming this will remove the comment and all the reports on this comment.</v-card-text>
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
import PaddedContainer from "@/components/PaddedContainer";
import PageHeader from "@/components/PageHeader";
import UserCard from "@/components/Card/UserCard";
import {mapActions, mapGetters} from "vuex";
import DetailsLoader from "@/components/DetailsLoader";
export default {
  name: "ReportManagerComment",
  components: {DetailsLoader, UserCard, PageHeader, PaddedContainer},
  title() {
    return 'Report Manager (Comments)';
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
      maxLength: 230,
      showFull: {},
    };
  },
  computed: {
    ...mapGetters('privileged', ['getLoaderFlag', 'getReportedComments', 'getReportResolveError', 'getReportResolveMessage',
                  'getReportDeleteError', 'getReportDeleteMessage']),
    margin() {
      return this.$vuetify.breakpoint.mdAndUp ? 'mx-5' : 'mx-1';
    },
    comments() {
      if (this.getReportedComments) {
        return this.getReportedComments.sort((a, b) => b['reportCount'] - a['reportCount']);
      }

      return [];
    },
    commentsCurrentPage() {
      this.page = Math.min(this.page, this.commentPages);

      return this.comments.slice((this.page-1)*this.pageSize, this.page*this.pageSize);
    },
    commentPages() {
      if (this.comments) {
        return Math.ceil(this.comments.length/this.pageSize);
      }
      return 0;
    },
  },
  methods: {
    ...mapActions('privileged', ['loadReportedComments', 'resolveReport', 'deleteReport']),
    formatDate(date) {
      return new Date(date).toLocaleString('en-US', {
        day: 'numeric',
        year: 'numeric',
        month: 'long',
        hour: 'numeric',
        minute: 'numeric',
      });
    },
    onResolveClicked(commentID) {
      this.resolveItem = commentID;
      this.submitted = false;
      this.resolveDialog = true;
    },
    onResolveConfirmed() {
      this.resolveReport({type: 'comment', id: this.resolveItem})
        .then(response => {
          this.resolveDialog = false;
          this.loadReportedComments();
        })
        .catch(e => {
          console.log(e.response);
        })
        .finally(() => {
          this.submitted = true;
        });
    },
    onDeleteClicked(commentID) {
      this.deleteItem = commentID;
      this.submitted = false;
      this.deleteDialog = true;
    },
    onDeleteConfirmed() {
      this.deleteReport({type: 'comment', id: this.deleteItem})
        .then(response => {
          this.deleteDialog = false;
          this.loadReportedComments();
        })
        .catch(e => {
          console.log(e.response);
        })
        .finally(() => {
          this.submitted = true;
        });
    },
    truncate(text, commentID) {
      if (text.length > this.maxLength && !this.showFull[commentID]) {
        return text.substring(0, this.maxLength) + '...';
      }

      return text;
    },
    setFull(commentID) {
      this.showFull = {};
      this.showFull[commentID] = true;
    }
  },
  mounted() {
    this.loadReportedComments();
  },
}
</script>

<style scoped>

</style>