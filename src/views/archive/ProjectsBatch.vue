<template>
  <padded-container>
    <page-header :back-button="true" back-route="/archive/project/">Projects Explorer</page-header>
    <page-subheader v-if="courses">Batch {{ batch }} Projects</page-subheader>

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
    courses() {
      if (this.getProjectCourses) {
        let courses = this.getProjectCourses.payload;
        return courses.sort((a, b) => {
          return (a['CourseNo'] <= b['CourseNo']) ? -1 : 1;
        });
      }

      return null;
    },
  },
  methods: {
    ...mapActions('archive', ['loadProjectCourses']),
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