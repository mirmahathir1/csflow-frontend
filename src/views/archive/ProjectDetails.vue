<template>
  <padded-container>
    <page-header
        :back-button="!getLoaderFlag('projectDetails')"
        :back-route="backRoute"
    >Project Details</page-header>

    <template :slot="$vuetify.breakpoint.mdAndUp ? 'right' : 'default'" v-if="getIsAdmin">
      <v-card class="mt-8 pb-4 rounded-lg mx-auto" max-width="250">
        <v-card-text class="text-center text-body-2">Delete Thesis</v-card-text>
        <div class="mx-6">
          <hr class="my-divider">
        </div>
        <v-card-actions class="mx-2">
          <v-btn block color="red darken-1 white--text" small @click="adminDeleteDialog = true">
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </template>

    <!--    Delete Dialog-->
    <v-dialog
        v-model="adminDeleteDialog"
        max-width="290"
    >
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
              @click="adminDeleteDialog = false"
          >
            No
          </v-btn>
          <v-btn
              color="red darken-1"
              text
              @click="onDeleteConfirmedAdmin"
              :loading="adminProjectDeleteLoader"
              :disabled="adminProjectDeleteLoader"
          >
            Yes
          </v-btn>
        </v-card-actions>
        <v-row class="justify-center" v-if="getProjectDeleteError">
          <v-alert
              type="error"
              outlined
              dense
          >
            {{ getProjectDeleteMessage }}
          </v-alert>
        </v-row>
      </v-card>
    </v-dialog>

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
              :cols="$isMobile() ? 12 : 6"
              :md="$isMobile() ? 12 : 4"
              v-for="owner in details['owners']"
              :key="owner['ID']"
          >
            <user-card
                :name="owner['Name']"
                :ID="owner['ID']"
                :karma="parseInt(owner['Karma'])"
                :image="owner['ProfilePic']"
                @click.native="$router.push('/user/' + owner['ID'])"
            ></user-card>
          </v-col>
        </v-row>
      </v-container>

      <v-card-text class="mt-2 text-body-1 black--text">
        Tags:
      </v-card-text>
      <div class="pl-3">
        <v-chip v-for="topic in details['tags']" :key="topic" class="mx-1 my-1">
          {{ topic }}
        </v-chip>
      </div>

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
import UserCard from "@/components/Card/UserCard";

export default {
  name: "ProjectDetails",
  title() {
    return 'Project Details';
  },
  components: {UserCard, ErrorCard, IconButton, PaddedContainer, DetailsLoader, PageHeader},
  data() {
    return {
      id: this.$route.params.id,
      dialog: false,
      adminDeleteDialog: false,
    }
  },
  computed: {
    ...mapGetters('archive', ['getProjectDetails', 'getLoaderFlag']),
    ...mapGetters('user', ['getUserLoaderFlag', 'getLoadedUser']),
    ...mapGetters('auth', ['getIsAdmin']),
    ...mapGetters('admin', ['getProjectDeleteError', 'getProjectDeleteMessage']),
    adminProjectDeleteLoader() {
      return this.$store.getters["admin/getLoaderFlag"]("projectDeletion");
    },
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
      if (this.$route.params.type !== 'search') {
        if (this.getProjectDetails) {
          return '/archive/project/batch/' + this.details['batch'] + '/' + this.details['course_no'].replace(' ', '-');
        }

        return '/archive/project';
      }

      return '/archive/project/search/' + this.$route.params.searchText;
    }
  },
  methods: {
    ...mapActions('archive', ['loadProjectDetails', 'deleteProject']),
    ...mapActions('user', ['getProfile']),
    ...mapActions('admin', ['deleteProjectAdmin']),
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
    },
    onDeleteConfirmedAdmin() {
      this.deleteProjectAdmin(this.id)
          .then(response => {
            this.adminDeleteDialog = false;
            this.$router.push('/archive/project/batch/' + this.details['batch'] + '/' + this.details['course_no'].replace(' ', '-'));
          })
          .catch(e => {
            console.log(e.response);
          })
          .finally(() => {

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