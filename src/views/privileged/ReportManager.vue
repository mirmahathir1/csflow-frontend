<template>
  <padded-container>
    <page-header>Report Manager</page-header>

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
            <v-card :class="margin + ' py-6 pl-3 rounded-lg'" min-height="120">
              <v-row>
                <v-col cols="12" md="6" class="py-0">
                  <v-chip color="blue lighten-5 primary--text text-darken-1">
                    {{ formatDate(report['createdAt']) }}
                  </v-chip>
                  <v-card-text>{{ report['description'] }}</v-card-text>
                </v-col>
                <v-col cols="12" md="6" class="py-0">
                  <user-card
                      class="mx-auto mb-3"
                      :name="report['owner']['name']"
                      :ID="report['owner']['studentId']"
                      :karma="parseInt(report['owner']['karma'])"
                      :image="report['owner']['profilePic']"
                      @click.native="$router.push('/user/' + report['owner']['studentId'])"
                  >

                  </user-card>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
          <v-col cols="12" class="text-center">
            <v-row class="justify-center">
              <v-btn class="mx-3 my-2 primary">Resolve</v-btn>
              <v-btn class="mx-3 my-2 red lighten-1 white--text">Delete</v-btn>
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
                  v-model="page.comment"
                  :length="commentPages"
                  circle
                  :total-visible="$isMobile() ? 6 : 7"
              ></v-pagination>
            </div>
          </v-col>
        </v-row>
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
  name: "ReportManager",
  components: {DetailsLoader, UserCard, PageHeader, PaddedContainer},
  title() {
    return 'Report Manager';
  },
  data() {
    return {
      pageSize: 3,
      page: {
        post: 1,
        answer: 1,
        comment: 1,
      },
    };
  },
  computed: {
    ...mapGetters('privileged', ['getLoaderFlag', 'getReportedComments']),
    margin() {
      return this.$vuetify.breakpoint.mdAndUp ? 'mx-5' : 'mx-1';
    },
    comments() {
      if (this.getReportedComments) {
        return this.getReportedComments.sort((a, b) => b['reportCount'] - a['reportCount']);
      }

      return [];
    },
    commentsCurrentPage(type) {
      return this.comments.slice((this.page.comment-1)*this.pageSize, this.page.comment*this.pageSize);
    },
    commentPages() {
      if (this.comments) {
        return Math.ceil(this.comments.length/this.pageSize);
      }
      return 0;
    },
  },
  methods: {
    ...mapActions('privileged', ['loadReportedComments']),
    formatDate(date) {
      return new Date(date).toLocaleString('en-US', {
        day: 'numeric',
        year: 'numeric',
        month: 'long',
        hour: 'numeric',
        minute: 'numeric',
      });
    }
  },
  mounted() {
    this.loadReportedComments();
  },
}
</script>

<style scoped>

</style>