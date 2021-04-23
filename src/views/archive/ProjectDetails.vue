<template>
  <padded-container>
    <page-header :back-button="!getLoaderFlag('projectDetails')" :back-route="backRoute">Project Details</page-header>

    <v-card
        color="white"
        elevation="2"
        class="rounded-lg px-5 pt-8 pb-4 mt-6"
        v-if="!getUserLoaderFlag && !getLoaderFlag('projectDetails') && details"
    >
      <v-card-text class="text-center text-h6 black--text">
        {{ details['course_no'] }}
        <br>
        {{ details['course_title'] }}
      </v-card-text>
      <v-card-text class="text-center text-h5 black--text">
        Project Title: {{ details['title'] }}
      </v-card-text>
      <v-divider light></v-divider>
      <v-card-text class="mt-4 black--text text-body-1">
        {{ details['description'] }}
      </v-card-text>
      <v-card-text v-if="details['youtube']" class="mt-2 text-body-1 black--text">
        Youtube Link: <a :href="details['youtube']" target="_blank">{{ details['youtube'] }}</a>
      </v-card-text>
      <v-card-text v-if="details['github']" class="mt-2 text-body-1 black--text">
        Git Repository Link: <a :href="details['github']" target="_blank">{{ details['github'] }}</a>
      </v-card-text>
      <v-container class="px-0">
        <v-card-text class="black--text text-body-1">Owners:</v-card-text>
        <v-row class="px-3">
          <v-col
              :cols="$isMobile() ? 8 : 6"
              :md="$isMobile() ? 8 : 4"
              v-for="owner in details['owners']"
              :key="owner['ID']"
          >
            <v-card elevation="1" color="blue lighten-4">
              <v-card-text class="black--text">
                {{ owner['ID'] }}
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
      <v-row v-if="isOwner" class="justify-end my-2">
        <icon-button
            @click.native="onEditClicked"
            class="mx-1"
        >
          mdi-square-edit-outline
        </icon-button>

        <v-dialog
            v-model="dialog"
            max-width="290"
        >
          <template v-slot:activator="{ on, attrs }">
            <icon-button
                v-bind="attrs"
                v-on="on"
                @click.native="dialog = !dialog"
                class="mx-1"
            >
              mdi-delete-outline
            </icon-button>
          </template>
          <v-card>
            <v-card-title class="headline">
              Delete this project?
            </v-card-title>
            <v-card-text>Are you sure you want to delete this project? Deleted projects cannot be recovered.</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                  color="green darken-1"
                  text
                  @click="dialog = false"
              >
                No
              </v-btn>
              <v-btn
                  color="red darken-1"
                  text
                  @click="onDeleteClicked"
                  :loading="getLoaderFlag('projectDeletion')"
                  :disabled="getLoaderFlag('projectDeletion')"
              >
                Yes
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </v-card>
    <details-loader v-else-if="getUserLoaderFlag || getLoaderFlag('projectDetails')"></details-loader>

    <error-card
        v-if="!getUserLoaderFlag && !getLoaderFlag('projectDetails') && !details"
        class="my-5"
    >Project not found</error-card>
  </padded-container>
</template>

<script>
import {mapGetters,mapActions} from 'vuex';
import PageHeader from "@/components/PageHeader";
import DetailsLoader from "@/components/DetailsLoader";
import PaddedContainer from "@/components/PaddedContainer";
import IconButton from "@/components/IconButton";
import ErrorCard from "@/components/ErrorCard";

export default {
  name: "ProjectDetails",
  components: {ErrorCard, IconButton, PaddedContainer, DetailsLoader, PageHeader},
  data() {
    return {
      id: this.$route.params.id,
      dialog: false,
    }
  },
  computed: {
    ...mapGetters('archive', ['getProjectDetails', 'getLoaderFlag']),
    ...mapGetters('user', ['getUserLoaderFlag', 'getLoadedUser']),
    details() {
      if (this.getProjectDetails) {
        return this.getProjectDetails.payload;
      }

      return null;
    },
    isOwner() {
      if (this.getLoadedUser && this.getProjectDetails) {
        return this.details['owners'].filter(owner => owner['ID'] === this.getLoadedUser['id']).length > 0;
      }

      return false;
    },
    backRoute() {
      if (this.getProjectDetails) {
        return '/archive/project/batch/' + this.details['batch'] + '/' + this.details['course_no'].replace(' ', '-');
      }

      return '/archive/project';
    }
  },
  methods: {
    ...mapActions('archive', ['loadProjectDetails', 'deleteProject']),
    ...mapActions('user', ['getProfile']),
    onEditClicked() {
      this.$router.push('/archive/project/' + this.getProjectDetails.id + '/edit');
    },
    onDeleteClicked() {
      this.deleteProject(this.id)
          .then(response => {
            this.$router.push('/archive/project/batch/' + this.details['batch'] + '/' + this.details['course_no'].replace(' ', '-'));
          })
          .catch(e => {
            console.log(e.response);
          })
          .finally(() => {
            this.dialog = false;
          });
    }
  },
  watch: {
    '$route'(to, from) {
      this.id = to.params.id;
      this.loadProjectDetails({id: this.id, force: false})
          .catch(e => console.log(e.response));
    }
  },
  mounted() {
    this.getProfile('me');
    this.loadProjectDetails({id: this.id, force: true})
        .catch(e => console.log(e.response));
  }
}
</script>

<style scoped>

</style>