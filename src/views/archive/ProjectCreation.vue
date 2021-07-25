<template>
  <padded-container>
    <page-header :back-button="batchID > 0" :back-route="'/archive/project/batch/' + batchID">Create New Project</page-header>

    <project-form
        v-if="loadForm"
        type="create"
        :prevTitle="title"
        :prevDescription="description"
        :prevCourse="course"
        :prevYoutubeLink="youtubeLink"
        :prevGitLink="gitLink"
        :prevOwners="owners"
        :prevUserIndex="userIndex"
        :batchID="batchID"
        :tagAutocompleteItems="topics"
        :propCourses="getTopics"
    ></project-form>
    <details-loader v-else></details-loader>
  </padded-container>
</template>

<script>
import PaddedContainer from "@/components/PaddedContainer";
import PageHeader from "@/components/PageHeader";
import ProjectForm from "@/components/ProjectForm";
import { mapGetters, mapActions } from 'vuex';
import DetailsLoader from "@/components/DetailsLoader";

export default {
  name: "ProjectCreation",
  title() {
    return 'Create Project';
  },
  data() {
    return {
      title: '',
      description: '',
      course: '',
      youtubeLink: '',
      gitLink: '',
      owners: [],
      userIndex: 0,
      loadForm: false,
    };
  },
  computed: {
    ...mapGetters('archive', ['getProjectTags']),
    ...mapGetters('user', ['getLoadedUser', 'getUserLoaderFlag']),
    ...mapGetters('question_bank', ['getTopics']),
    batchID() {
      if (this.getLoadedUser) {
        return this.getLoadedUser['batchID'];
      }

      return 0;
    },
    topics() {
      if (this.getProjectTags) {
        let ret = [];
        this.getProjectTags.forEach(course => {
          ret.push(course['courseTitle']);
        });

        return ret;
      }

      return [];
    },
  },
  methods: {
    ...mapActions('archive', ['loadProjectTags']),
    ...mapActions('user', ['getProfile']),
    ...mapActions('question_bank', ['loadTopics']),
  },
  components: {DetailsLoader, PageHeader, PaddedContainer, ProjectForm},
  async mounted() {
    await this.getProfile('me');
    await this.loadProjectTags(false);
    await this.loadTopics();

    this.owners.push({id: this.getLoadedUser['id'].toString()});

    this.loadForm = true;
  }
}
</script>

<style scoped>

</style>