<template>
  <padded-container>
    <page-header>Report Manager / Posts</page-header>

    <v-card
        class="rounded-lg px-5 pt-4 pb-4 mt-6"
    >
      <v-card-text class="text-center text-h6 black--text">Top Reported Posts</v-card-text>

      <template v-if="!getLoaderFlag('reportedPosts')">
        <v-row
            v-for="post in postsCurrentPage"
            class="mb-6"
            :key="post['postId']"
        >
          <v-col cols="12">
            <v-hover v-slot:default="{ hover }">
              <v-card
                  :class="{'my-hover': hover, 'py-6 pl-3 rounded-lg': true,
                  'mx-5': $vuetify.breakpoint.mdAndUp, 'mx-1': !$vuetify.breakpoint.mdAndUp}"
                  min-height="120"
                  :elevation="hover ? 3 : 2"
                  @click="$navigateToPost(post['postId'])"
              >
                <v-row>
                  <v-col cols="12" md="8" class="py-0">
                    <v-row>
                      <v-col cols="2" class="py-0 pr-0">
                        <vote-card-inactive
                            :small="$isMobile()"
                            :votes="post['vote']"
                            class="mt-6"
                        ></vote-card-inactive>
                      </v-col>
                      <v-col cols="10" class="py-0 pl-0">
                        <v-card-text class="black--text">
                          {{ truncate(post['title'], post['postId']) }}
                          <span
                              v-if="post['title'].length > maxLength && !showFull[post['postId']]"
                              class="primary--text my-hover font-weight-bold text-caption"
                              @click.stop="setFull(post['postId'])"
                          >See More</span>
                          <span
                              v-if="post['title'].length > maxLength && showFull[post['postId']]"
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
                      >{{ formatDate(post['createdAt']) }}</v-chip>
                      <v-chip
                          v-if="post['type'].toLowerCase() === 'question'"
                          color="blue lighten-5 primary--text text-darken-1"
                          :class="'ml-2 my-1'"
                      >{{ post['answerCount'] }} Answer{{ post['answerCount'] === 1 ? '' : 's' }}</v-chip>
                      <v-chip
                          color="blue lighten-5 primary--text text-darken-1"
                          :class="'ml-2 my-1'"
                      >{{ $capitalizeFirstLetter(post['type'].toLowerCase()) }} Thread</v-chip>
                    </v-row>
                    <v-row :class="chipMargin">
                      <v-chip
                          v-if="post['book'] !== ''"
                          class="ml-2 my-1"
                          color="blue lighten-5 primary--text text-darken-1"
                      >{{ post['book'] }}</v-chip>
                      <v-chip
                          v-if="post['topic'] !== ''"
                          class="ml-2 my-1"
                          color="blue lighten-5 primary--text text-darken-1"
                      >{{ post['topic'] }}</v-chip>
                      <v-chip
                          v-for="(tag, idx) in post['customTag']" :key="idx"
                          class="ml-2 my-1"
                          color="blue lighten-5 primary--text text-darken-1"
                      >{{ tag }}</v-chip>
                    </v-row>
                  </v-col>
                  <v-col cols="12" md="4" class="py-0">
                    <user-card
                        class="mx-auto mb-3"
                        :name="post['owner']['name']"
                        :ID="post['owner']['studentId']"
                        :karma="parseInt(post['owner']['karma'])"
                        :image="post['owner']['profilePic']"
                        :width="250"
                        @click.native="$router.push('/user/' + post['owner']['studentId'])"
                    ></user-card>
                  </v-col>
                </v-row>
              </v-card>
            </v-hover>
          </v-col>
          <v-col cols="12" class="text-center">
            <v-row class="justify-center">
              <v-btn class="mx-3 my-2 primary" @click="onResolveClicked(post['postId'])">Resolve</v-btn>
              <v-btn class="mx-3 my-2 red lighten-1 white--text" @click="onDeleteClicked(post['postId'])">Delete</v-btn>
              <v-btn class="mx-3 my-2 no-click" tile color="blue lighten-5">
                {{ post['reportCount']}} Report{{ post['reportCount'] > 1 ? 's' : '' }}
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
                  :length="postPages"
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
              Resolve this post?
            </v-card-title>
            <v-card-text>Confirming this will keep the post, but delete all the reports on this post.</v-card-text>
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
              Delete this post?
            </v-card-title>
            <v-card-text>Confirming this will remove the post and all the reports on this post.</v-card-text>
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
import {mapActions, mapGetters} from "vuex";
import DetailsLoader from "@/components/DetailsLoader";
import VoteCardInactive from "@/components/Card/VoteCardInactive";
import UserCard from "@/components/Card/UserCard";
export default {
  name: "ReportManagerPost",
  components: {UserCard, VoteCardInactive, DetailsLoader, PageHeader, PaddedContainer},
  title() {
    return 'Report Manager (Posts)';
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
    ...mapGetters('privileged', ['getLoaderFlag', 'getReportedPosts', 'getReportResolveError', 'getReportResolveMessage',
      'getReportDeleteError', 'getReportDeleteMessage']),
    margin() {
      return this.$vuetify.breakpoint.mdAndUp ? 'mx-5' : 'mx-1';
    },
    chipMargin() {
      return this.$vuetify.breakpoint.mdAndUp ? 'mb-1' : 'mb-3';
    },
    posts() {
      if (this.getReportedPosts) {
        return this.getReportedPosts.sort((a, b) => b['reportCount'] - a['reportCount']);
      }

      return [];
    },
    postsCurrentPage() {
      this.page = Math.min(this.page, this.postPages);

      return this.posts.slice((this.page-1)*this.pageSize, this.page*this.pageSize);
    },
    postPages() {
      if (this.posts) {
        return Math.ceil(this.posts.length/this.pageSize);
      }
      return 0;
    },
  },
  methods: {
    ...mapActions('privileged', ['loadReportedPosts', 'resolveReport', 'deleteReport']),
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
    onResolveClicked(postID) {
      this.resolveItem = postID;
      this.submitted = false;
      this.resolveDialog = true;
    },
    onResolveConfirmed() {
      this.resolveReport({type: 'post', id: this.resolveItem})
          .then(response => {
            this.resolveDialog = false;
            this.loadReportedPosts();
          })
          .catch(e => {
            console.log(e.response);
          })
          .finally(() => {
            this.submitted = true;
          });
    },
    onDeleteClicked(postID) {
      this.deleteItem = postID;
      this.submitted = false;
      this.deleteDialog = true;
    },
    onDeleteConfirmed() {
      this.deleteReport({type: 'post', id: this.deleteItem})
          .then(response => {
            this.deleteDialog = false;
            this.loadReportedPosts();
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
    this.loadReportedPosts();
  }
}
</script>

<style scoped>

</style>