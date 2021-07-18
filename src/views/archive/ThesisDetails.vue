<template>
  <padded-container>
    <page-header
        :back-button="!getLoaderFlag('thesisDetails')"
        :back-route="backRoute"
    >Thesis Details</page-header>

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

    <template :slot="$vuetify.breakpoint.mdAndUp ? 'right' : 'default'" v-if="isRequested">
      <v-card class="mt-8 pb-4 rounded-lg mx-auto" max-width="250">
        <v-card-text class="text-center text-body-2">Accept request to be an owner of this thesis?</v-card-text>
        <v-card-actions class="mx-2">
          <v-card-actions class="mx-auto">
            <v-btn
                color="green darken-1 white--text"
                small
                @click=""
            >
              <v-icon small>mdi-check</v-icon>
            </v-btn>
            <v-btn
                color="red darken-1 white--text"
                small
                @click=""
            >
              <v-icon small>mdi-close</v-icon>
            </v-btn>
          </v-card-actions>
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
          Delete this thesis?
        </v-card-title>
        <v-card-text>Are you sure you want to delete this thesis? Deleted theses cannot be recovered.</v-card-text>
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
              :loading="adminThesisDeleteLoader"
              :disabled="adminThesisDeleteLoader"
          >
            Yes
          </v-btn>
        </v-card-actions>
        <v-row class="justify-center" v-if="getThesisDeleteError">
          <v-alert
              type="error"
              outlined
              dense
          >
            {{ getThesisDeleteMessage }}
          </v-alert>
        </v-row>
      </v-card>
    </v-dialog>

    <v-card
        color="white"
        elevation="2"
        class="rounded-lg px-5 pt-8 pb-4 mt-6"
        v-if="!getUserLoaderFlag && !getLoaderFlag('thesisDetails') && details"
    >
      <v-card-text class="text-center text-h5 black--text">
        {{ details['title'] }}
      </v-card-text>
      <v-card-text class="text-center mt-3 text-subtitle-1">
        {{ writers }}
      </v-card-text>
      <v-divider light></v-divider>
      <v-card-text class="mt-4 black--text text-body-1">
        {{ details['description'] }}
      </v-card-text>
      <v-card-text v-if="details['link']" class="mt-2 text-body-1 black--text">
        Link: <a :href="details['link']" target="_blank">{{ details['link'] }}</a>
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
          <template v-if="isOwner">
            <v-col
                :cols="$isMobile() ? 12 : 6"
                :md="$isMobile() ? 12 : 4"
                v-for="(requested, idx) in details['requested_owners']"
                :key="requested['UserID']"
            >
              <user-card-requested
                  :ID="requested['UserID']"
                  class="mt-5"
                  @click.native="$router.push('/user/' + requested['UserID'])"
                  @removed="removeRequest(requested['UserID'], idx)"
              ></user-card-requested>
            </v-col>
          </template>
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
              Delete this thesis?
            </v-card-title>
            <v-card-text>Are you sure you want to delete this thesis? Deleted theses cannot be recovered.</v-card-text>
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
                  :loading="getLoaderFlag('thesisDeletion')"
                  :disabled="getLoaderFlag('thesisDeletion')"
              >
                Yes
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </v-card>
    <details-loader v-else-if="getUserLoaderFlag || getLoaderFlag('thesisDetails')"></details-loader>

    <error-card
        v-if="!getUserLoaderFlag && !getLoaderFlag('thesisDetails') && !details"
        class="my-5"
    >Thesis not found</error-card>
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
import UserCardRequested from "@/components/Card/UserCardRequested";

export default {
  name: "ThesisDetails",
  title() {
    return 'Thesis Details';
  },
  components: {UserCard, ErrorCard, IconButton, PaddedContainer, DetailsLoader, PageHeader, UserCardRequested},
  data() {
    return {
      id: this.$route.params.id,
      dialog: false,
      adminDeleteDialog: false,
    }
  },
  computed: {
    ...mapGetters('archive', ['getThesisDetails', 'getLoaderFlag']),
    ...mapGetters('user', ['getUserLoaderFlag', 'getLoadedUser']),
    ...mapGetters('auth', ['getIsAdmin']),
    ...mapGetters('admin', ['getThesisDeleteError', 'getThesisDeleteMessage']),
    adminThesisDeleteLoader() {
      return this.$store.getters["admin/getLoaderFlag"]("thesisDeletion");
    },
    details() {
      if (this.getThesisDetails) {
        return this.getThesisDetails.payload;
      }

      return null;
    },
    writers() {
      if (!this.getThesisDetails)
        return '';

      let ret = "";
      this.details['writers'].forEach(writer => {
        ret += writer + ", ";
      })

      return ret.substring(0, ret.length-2);
    },
    isOwner() {
      if (this.getLoadedUser && this.getThesisDetails) {
        return this.details['owners'].filter(owner => owner['ID'] === this.getLoadedUser['id']).length > 0;
      }

      return false;
    },
    backRoute() {
      if (this.$route.params.type !== 'search') {
        if (this.getThesisDetails) {
          return '/archive/thesis/batch/' + this.details['batch'];
        }

        return '/archive/thesis';
      }

      return '/archive/thesis/search/' + this.$route.params.searchText;
    },
    isRequested() {
      if (this.getLoadedUser && this.getThesisDetails) {
        return this.details['requested_owners'].filter(req => req['UserID'] === this.getLoadedUser['id']).length > 0;
      }

      return false;
    }
  },
  methods: {
    ...mapActions('archive', ['loadThesisDetails', 'deleteThesis', 'removeThesisRequest']),
    ...mapActions('user', ['getProfile']),
    ...mapActions('admin', ['deleteThesisAdmin']),
    onEditClicked() {
      this.$router.push('/archive/thesis/' + this.getThesisDetails.id + '/edit');
    },
    onDeleteClicked() {
      this.deleteThesis(this.id)
        .then(response => {
          this.$router.push('/archive/thesis/batch/' + this.details['batch']);
        })
        .catch(e => {
          console.log(e.response);
        })
        .finally(() => {
          this.dialog = false;
        });

    },
    onDeleteConfirmedAdmin() {
      this.deleteThesisAdmin(this.id)
        .then(response => {
          this.adminDeleteDialog = false;
          this.$router.push('/archive/thesis/batch/' + this.details['batch']);
        })
        .catch(e => {
          console.log(e.response);
        })
        .finally(() => {

        });
    },
    removeRequest(userID, idx) {
      this.removeThesisRequest({thesisID: this.id, userID: userID, idx: idx})
        .then(response => {
          // this.loadThesisDetails({id: this.id, force: true})
          //     .catch(e => console.log(e.response));
        })
        .catch(e => console.log(e.response));
    }
  },
  watch: {
    '$route'(to, from) {
      this.id = to.params.id;
      this.loadThesisDetails({id: this.id, force: false})
        .catch(e => console.log(e.response));
    }
  },
  mounted() {
    this.getProfile('me');
    this.loadThesisDetails({id: this.id, force: true})
      .catch(e => console.log(e.response));
  }
}
</script>

<style scoped>

</style>