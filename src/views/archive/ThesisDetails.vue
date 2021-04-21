<template>
  <padded-container>
    <page-header :back-button="!getLoaderFlag('thesisDetails')" :back-route="'/archive/thesis/batch/' + details['batch']">Thesis Details</page-header>

    <v-card
        color="white"
        elevation="2"
        class="rounded-lg px-5 pt-8 pb-4 mt-6"
        v-if="!getUserLoaderFlag && !getLoaderFlag('thesisDetails')"
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
        <icon-button @click.native="onEditClicked">
          mdi-square-edit-outline
        </icon-button>
        <icon-button>
          mdi-delete-outline
        </icon-button>
      </v-row>
    </v-card>
    <details-loader v-else></details-loader>
  </padded-container>
</template>

<script>
import {mapGetters,mapActions} from 'vuex';
import PageHeader from "@/components/PageHeader";
import DetailsLoader from "@/components/DetailsLoader";
import PaddedContainer from "@/components/PaddedContainer";
import IconButton from "@/components/IconButton";

export default {
  name: "ThesisDetails",
  components: {IconButton, PaddedContainer, DetailsLoader, PageHeader},
  data() {
    return {
      id: this.$route.params.id
    }
  },
  computed: {
    ...mapGetters('archive', ['getThesisDetails', 'getLoaderFlag']),
    ...mapGetters('user', ['getUserLoaderFlag', 'getLoadedUser']),
    details() {
      if (this.getThesisDetails) {
        return this.getThesisDetails.payload;
      }

      return {};
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
    }
  },
  methods: {
    ...mapActions('archive', ['loadThesisDetails']),
    ...mapActions('user', ['getProfile']),
    onEditClicked() {
      this.$router.push('/archive/thesis/' + this.getThesisDetails.id + '/edit');
    }
  },
  watch: {
    '$route'(to, from) {
      this.id = to.params.id;
      this.loadThesisDetails({id: this.id, force: false});
    }
  },
  mounted() {
    this.getProfile('me');
    this.loadThesisDetails({id: this.id, force: true});
  }
}
</script>

<style scoped>

</style>