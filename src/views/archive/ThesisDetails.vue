<template>
  <padded-container>
    <page-header :back-button="!getLoaderFlag('thesisDetails')" :back-route="backRoute">Thesis Details</page-header>

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

export default {
  name: "ThesisDetails",
  components: {ErrorCard, IconButton, PaddedContainer, DetailsLoader, PageHeader},
  data() {
    return {
      id: this.$route.params.id,
      dialog: false,
    }
  },
  computed: {
    ...mapGetters('archive', ['getThesisDetails', 'getLoaderFlag']),
    ...mapGetters('user', ['getUserLoaderFlag', 'getLoadedUser']),
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
      if (this.getThesisDetails) {
        return '/archive/thesis/batch/' + this.details['batch'];
      }

      return '/archive/thesis';
    }
  },
  methods: {
    ...mapActions('archive', ['loadThesisDetails', 'deleteThesis']),
    ...mapActions('user', ['getProfile']),
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