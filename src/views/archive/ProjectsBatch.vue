<template>
  <padded-container>
    <page-header :back-button="true" back-route="/archive/project/">Projects Explorer</page-header>
    <page-subheader v-if="courses">Batch {{ batch }} Projects</page-subheader>

    <template :slot="$vuetify.breakpoint.mdAndUp ? 'right' : 'default'" v-if="isMyBatch">
      <v-card class="mt-8 pb-4 rounded-lg mx-auto" max-width="250">
        <v-card-text class="text-center text-body-2">Create New Project</v-card-text>
        <div class="mx-6">
          <hr class="my-divider">
        </div>
        <v-card-actions class="mx-2">
          <v-btn block color="primary" small @click="createProject">
            Create
          </v-btn>
        </v-card-actions>
      </v-card>
    </template>

    <v-container class="my-5" v-if="!getLoaderFlag('projectCourses')">
      <v-row>
        <v-col
            v-if="courses"
            :cols="$isMobile() ? '12' : '6'"
            :md="$isMobile() ? '12' : '4'"
            class="justify-content-center"
            v-for="(course, index) in courses"
            :key="index"
        >
          <resource-card
              type="folder"
              @click.native="$router.push('/archive/project/batch/' + getProjectCourses.batch + '/' + course['CourseNo'].replace(' ', '-'))"
          >
            {{ course['CourseNo'] }}
          </resource-card>
        </v-col>
        <v-col
            cols="12"
            class="justify-content-center"
            v-if="!courses || Object.keys(courses).length === 0"
        >
          <error-card v-if="!courses">No such batch exists</error-card>
          <error-card v-else>No courses found</error-card>
        </v-col>
      </v-row>
    </v-container>
    <folders-loader v-else></folders-loader>
  </padded-container>
</template>

<script>
import PaddedContainer from "@/components/PaddedContainer";
import PageHeader from "@/components/PageHeader";
import PageSubheader from "@/components/PageSubheader";
import {mapGetters, mapActions} from "vuex";
import ResourceCard from "@/components/ResourceCard";
import ErrorCard from "@/components/ErrorCard";
import FoldersLoader from "@/components/FoldersLoader";

export default {
  name: "ProjectsBatch",
  components: {FoldersLoader, ErrorCard, ResourceCard, PageSubheader, PageHeader, PaddedContainer},
  title() {
    return 'Projects';
  },
  data() {
    return {
      batch: this.$route.params.batch,
    };
  },
  computed: {
    ...mapGetters('archive', ['getLoaderFlag', 'getProjectCourses']),
    ...mapGetters('user', ['getLoadedUser']),
    courses() {
      if (this.getProjectCourses) {
        let courses = this.getProjectCourses.payload;
        return courses.sort((a, b) => {
          return (a['CourseNo'] <= b['CourseNo']) ? -1 : 1;
        });
      }

      return null;
    },
    isMyBatch() {
      if (this.getLoadedUser) {
        if (this.getLoadedUser['batchID'] === Number(this.batch)) {
          return true;
        }
      }

      return false;
    },
  },
  methods: {
    ...mapActions('archive', ['loadProjectCourses']),
    createProject() {
      this.$router.push('/archive/project/new');
    }
  },
  watch: {
    '$route'(to, from) {
      this.batch = to.params.batch;
      this.loadProjectCourses(this.batch);
    }
  },
  mounted() {
    this.loadProjectCourses(this.batch);
  }
}
</script>

<style scoped>

</style>