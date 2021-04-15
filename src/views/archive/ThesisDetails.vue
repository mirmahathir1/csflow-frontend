<template>
  <v-col
      cols="12"
      md="8"
  >
    <page-header :back-button="true" back-route="/archive/thesis/">Thesis Details</page-header>

    <v-card
        color="white"
        elevation="2"
        class="rounded-lg px-5 pt-8 pb-4 mt-6"
        v-if="!getLoaderFlag('thesisDetails')"
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
              :cols="$isMobile() ? 8 : 4"
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
    </v-card>
    <details-loader v-else></details-loader>
  </v-col>
</template>

<script>
import {mapGetters,mapActions} from 'vuex';
import PageHeader from "@/components/PageHeader";
import DetailsLoader from "@/components/DetailsLoader";

export default {
  name: "ThesisDetails",
  components: {DetailsLoader, PageHeader},
  data() {
    return {
      id: this.$route.params.id
    }
  },
  computed: {
    ...mapGetters('archive', ['getThesisDetails', 'getLoaderFlag']),
    details() {
      return this.getThesisDetails.payload;
    },
    writers() {
      let ret = "";
      this.details['writers'].forEach(writer => {
        ret += writer + ", ";
      })

      return ret.substring(0, ret.length-2);
    }
  },
  methods: {
    ...mapActions('archive', ['loadThesisDetails'])
  },
  watch: {
    '$route'(to, from) {
      this.id = to.params.id;
      this.loadThesisDetails(this.id);
    }
  },
  mounted() {
    this.loadThesisDetails(this.id);
  }
}
</script>

<style scoped>

</style>