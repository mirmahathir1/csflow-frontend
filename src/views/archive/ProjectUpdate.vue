<template>
  <padded-container>
    <page-header :back-button="true" :back-route="'/archive/project/' + projectID">Update Project</page-header>

    <project-form
        v-if="loadForm && authorized && !error"
        type="update"
        :prevTitle="title"
        :prevDescription="description"
        :prevCourse="course"
        :prevYoutubeLink="youtubeLink"
        :prevGitLink="gitLink"
        :prevOwners="owners"
        :prevTags="tags"
        :tagAutocompleteItems="topics"
        :prevUserIndex="userIndex"
        :batchID="batchID"
        :projectID="projectID"
        :propCourses="getTopics"
    ></project-form>
    <error-card v-else-if="loadForm && error" class="mt-5">
      No project found
    </error-card>
    <error-card v-else-if="loadForm && !authorized" class="mt-5">
      You are not authorized to edit this project
    </error-card>
    <details-loader v-else></details-loader>
  </padded-container>
</template>

<script>
import PaddedContainer from "@/components/PaddedContainer";
import PageHeader from "@/components/PageHeader";
import { mapGetters, mapActions } from 'vuex';
import DetailsLoader from "@/components/DetailsLoader";
import ProjectForm from "@/components/ProjectForm";
import ErrorCard from "@/components/ErrorCard";

export default {
  name: "ProjectUpdate",
  title() {
    return 'Update Project';
  },
  data() {
    return {
      title: '',
      description: '',
      course: '',
      youtubeLink: '',
      gitLink: '',
      owners: [],
      tags: [],
      userIndex: 0,
      authorized: true,
      error: false,
      loadForm: false,
      projectID: this.$route.params.id,
    };
  },
  computed: {
    ...mapGetters('archive', ['getLoaderFlag', 'getProjectDetails', 'getProjectTags']),
    ...mapGetters('user', ['getLoadedUser', 'getUserLoaderFlag']),
    ...mapGetters('question_bank', ['getTopics']),
    batchID() {
      if (this.getLoadedUser) {
        return this.getLoadedUser['batchID'];
      }

      return 0;
    },
    userID() {
      if (this.getLoadedUser) {
        return this.getLoadedUser['id'];
      }

      return -1;
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
    ...mapActions('archive', ['loadProjectDetails', 'loadProjectTags']),
    ...mapActions('user', ['getProfile']),
    ...mapActions('question_bank', ['loadTopics']),
    getCourse(courseId) {
      console.log('looking for ' + courseId);
      for (let i=0; i<this.getTopics.length; i++) {
        let course = this.getTopics[i];
        if (course['courseId'] === courseId) {
          return course['courseId'] + ' (' + course['name'] + ')';
        }
      }

      return '';
    },
    async updateProps() {
      this.loadForm = false;
      this.error = false;
      this.authorized = true;
      this.userIndex = -1;

      await this.getProfile('me');
      await this.loadProjectTags(false);
      await this.loadTopics();
      this.loadProjectDetails({id: this.projectID, force: false})
          .then(response => {
            const details = this.getProjectDetails.payload;

            this.title = details['title'];
            this.description = details['description'];
            // this.course = details['course_no'];
            this.course = this.getCourse(details['course_no']);
            console.log(this.course);
            this.youtubeLink = details['youtube'];
            this.gitLink = details['github'];

            this.owners = [];
            details['owners'].forEach(owner => {
              this.owners.push({id: owner['ID'].toString()});

              if (owner['ID'] === this.userID) {
                this.userIndex = details['owners'].indexOf(owner);
              }
            });
            details['requested_owners'].forEach(req => {
              this.owners.push({id: req['UserID'].toString()});
            });

            this.tags = [];
            details['tags'].forEach(tag => {
              this.tags.push({name: tag});
            });


            if (this.userIndex === -1) {
              this.authorized = false;
            }
          })
          .catch(e => {
            console.log(e.response);
            this.error = true;
          })
          .finally(() => {
            this.loadForm = true;
          });
    }
  },
  watch: {
    '$route'(to, from) {
      this.projectID = to.params.id;
      this.updateProps();
    }
  },
  components: {ErrorCard, DetailsLoader, PageHeader, PaddedContainer, ProjectForm},
  mounted() {
    this.updateProps();
  }
}
</script>

<style scoped>

</style>