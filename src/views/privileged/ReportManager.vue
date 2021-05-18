<template>
  <padded-container>
    <page-header>Report Manager</page-header>

    <v-card
        class="rounded-lg px-5 pt-4 pb-4 mt-6"
    >
      <v-card-text class="text-center text-h6 black--text">Top Reported Comments</v-card-text>

      <v-row
          v-for="report in reports"
          class="mb-6"
          :key="report.commentId"
      >
        <v-col cols="12">
          <v-card :class="margin + ' py-6 pl-3 rounded-lg'" min-height="120">
            <v-row>
              <v-col cols="12" md="6" class="py-0">
                <v-chip color="blue lighten-5 primary--text text-darken-1">
                  {{ formatDate(report.createdAt) }}
                </v-chip>
                <v-card-text>{{ report.description }}</v-card-text>
              </v-col>
              <v-col cols="12" md="6" class="py-0">
                <user-card
                    class="mx-auto mb-3"
                    :name="report.owner.name"
                    :ID="report.owner.studentId"
                    :karma="parseInt(report.owner.karma)"
                    :image="report.owner.profilePic"
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
            <v-btn class="mx-3 my-2 no-click" tile color="blue lighten-5">{{report.count}} Reports</v-btn>
          </v-row>
        </v-col>
      </v-row>
    </v-card>
  </padded-container>
</template>

<script>
import PaddedContainer from "@/components/PaddedContainer";
import PageHeader from "@/components/PageHeader";
import UserCard from "@/components/Card/UserCard";
export default {
  name: "ReportManager",
  components: {UserCard, PageHeader, PaddedContainer},
  title() {
    return 'Report Manager';
  },
  data() {
    return {
      reports: [
        {
          "count": 3,
          "postId": 6,
          "commentId": 2,
          "owner": {
            "name": "Kowshik",
            "studentId": 1505001,
            "profilePic": "https://www.google.com/url?sa=i&url=https%3A%2F",
            "karma": "100"
          },
          "type": "Question",
          "createdAt": "2021-04-15T04:31:36.000Z",
          "termFinal": {
            "level": 3,
            "term": 2
          },
          "description": "Kempe chain of colors a a and b b is a maximal connected set of faces"
        },
        {
          "count": 5,
          "postId": 3,
          "commentId": 3,
          "owner": {
            "name": "Mir Mahathir Mohammad",
            "studentId": 1605011,
            "profilePic": "https://storage.googleapis.com/csflow-buet.appspot.com/profile-pic/162013689652715227032.jpg",
            "karma": "-100"
          },
          "type": "Question",
          "createdAt": "2021-04-15T04:36:22.000Z",
          "termFinal": {
            "level": 3,
            "term": 2
          },
          "description": "it may refer to a portion of physical RAM"
        }
      ],
    };
  },
  computed: {
    margin() {
      return this.$vuetify.breakpoint.mdAndUp ? 'mx-5' : 'mx-1';
    },
  },
  methods: {
    formatDate(date) {
      let ret = new Date(date).toLocaleString('en-US', {
        day: 'numeric',
        year: 'numeric',
        month: 'long',
        hour: 'numeric',
        minute: 'numeric',
      });

      return ret;
    }
  },
}
</script>

<style scoped>

</style>