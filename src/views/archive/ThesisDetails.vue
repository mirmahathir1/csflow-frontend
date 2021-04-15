<template>
  <v-col
      cols="12"
      md="8"
  >
    <page-header>Thesis Details</page-header>

    <v-card
        color="white"
        elevation="2"
        class="rounded-lg px-5 pt-8 pb-4 mt-6"
        v-if="!getLoaderFlag('thesisDetails')"
    >
      <v-card-title class="justify-center text-h5">
        {{ details['title'] }}
      </v-card-title>
      <v-card-subtitle class="text-center mt-3 text-subtitle-1">
        {{ writers }}
      </v-card-subtitle>
      <v-divider light></v-divider>
      <v-card-text class="mt-4 black--text text-body-1">
        {{ details['description'] }}
      </v-card-text>
      <v-card-text v-if="details['link']" class="mt-2 text-body-1 black--text">
        Link: <a :href="details['link']" target="_blank">{{ details['link'] }}</a>
      </v-card-text>
      <v-container class="px-0">
        <v-card-text class="black--text text-body-1">Owners:</v-card-text>
        <v-row class="px-2">
          <v-col
              :cols="$isMobile() ? '8' : '4'"
              class="mx-1"
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
    <folders-loader v-else></folders-loader>
  </v-col>
</template>

<script>
import mixins from '@/mixins/index'
import {mapGetters,mapActions} from 'vuex';
import PageHeader from "@/components/PageHeader";
import FoldersLoader from "@/components/FoldersLoader";

export default {
  name: "ThesisDetails",
  components: {FoldersLoader, PageHeader},
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
      for (let i in this.details['writers']) {
        ret += this.details['writers'][i] + ', ';
      }

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