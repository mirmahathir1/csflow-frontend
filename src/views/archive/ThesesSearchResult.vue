<template>
  <padded-container>
    <page-header :back-button="true" back-route="/archive/thesis/">Theses Explorer</page-header>
    <page-subheader>Search Results for {{ topic }}</page-subheader>

    <v-container class="my-5" v-if="!getLoaderFlag('thesesSearch')">
      <v-row>
        <v-col
            :v-if="theses"
            :cols="$isMobile() ? '12' : '6'"
            :md="$isMobile() ? '12' : '4'"
            class="justify-content-center"
            v-for="(thesis, index) in theses"
            :key="index"
        >
          <v-tooltip top :disabled="thesis['Title'].length <= 40">
            <template v-slot:activator="{ on, attrs }">
              <div v-bind="attrs" v-on="on">
                <resource-card
                    type="school"
                    @click.native="$router.push({name: 'ThesisDetails', params: {id: thesis['ID'], type: 'search'}})"
                >
                  {{ thesis['Title'] | shorten }}
                </resource-card>
              </div>
            </template>

            <v-container>
              <span class="caption">{{ thesis['Title'] }}</span>
            </v-container>
          </v-tooltip>
        </v-col>
        <v-col
            cols="12"
            class="justify-content-center"
            v-if="!theses || Object.keys(theses).length === 0"
        >
          <error-card>No theses found</error-card>
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
import {mapActions, mapGetters} from "vuex";
import ResourceCard from "@/components/ResourceCard";
import ErrorCard from "@/components/ErrorCard";
import FoldersLoader from "@/components/FoldersLoader";
export default {
  name: "ThesesSearchResult",
  components: {FoldersLoader, ErrorCard, ResourceCard, PageSubheader, PageHeader, PaddedContainer},
  data() {
    return {
      topic: this.$route.params.topic,
    };
  },
  watch: {
    '$route'(to, from) {
      this.topic = to.params.topic;
      this.searchTheses(this.topic);
    }
  },
  computed: {
    ...mapGetters('archive', ['getLoaderFlag', 'getThesesSearchResult']),
    theses() {
      if (this.getThesesSearchResult) {
        return this.getThesesSearchResult.payload;
      }

      return null;
    },
  },
  methods: {
    ...mapActions('archive', ['searchTheses']),
  },
  mounted() {
    this.searchTheses(this.topic);
  },
}
</script>

<style scoped>

</style>