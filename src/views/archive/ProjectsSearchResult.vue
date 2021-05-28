<template>
  <padded-container>
    <page-header :back-button="true" back-route="/archive/project/">Project Explorer</page-header>
    <page-subheader>Search Results for {{ topic }}</page-subheader>

    <v-container class="my-5" v-if="!getLoaderFlag('projectsSearch')">
      <v-row>
        <v-col
            v-if="projects"
            :cols="$isMobile() ? '12' : '6'"
            :md="$isMobile() ? '12' : '4'"
            class="justify-content-center"
            v-for="(project, index) in projects"
            :key="index"
        >
          <v-tooltip top :disabled="project['name'].length <= 40">
            <template v-slot:activator="{ on, attrs }">
              <div v-bind="attrs" v-on="on">
                <resource-card
                    type="file-code"
                    @click.native="$router.push({name: 'ProjectDetails', params: {id: project['id'], type: 'search',
                    searchText: topic.toString()}})"
                >
                  {{ project['name'] | shorten }}
                </resource-card>
              </div>
            </template>

            <v-container>
              <span class="caption">{{ project['name'] }}</span>
            </v-container>
          </v-tooltip>
        </v-col>
        <v-col
            cols="12"
            class="justify-content-center"
            v-if="!projects || Object.keys(projects).length === 0"
        >
          <error-card>No projects found</error-card>
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
  name: "ProjectsSearchResult",
  components: {FoldersLoader, ErrorCard, ResourceCard, PageSubheader, PageHeader, PaddedContainer},
  title() {
    return 'Projects Search Results';
  },
  data() {
    return {
      topic: this.$route.params.topic,
    };
  },
  computed: {
    ...mapGetters('archive', ['getLoaderFlag', 'getProjectsSearchResult']),
    projects() {
      if (this.getProjectsSearchResult) {
        return this.getProjectsSearchResult.payload;
      }

      return null;
    },
  },
  methods: {
    ...mapActions('archive', ['searchProjects']),
  },
  watch: {
    '$route'(to, from) {
      this.topic = to.params.topic;
      this.searchProjects(this.$replaceFirstQuote(this.topic));
    }
  },
  mounted() {
    this.searchProjects(this.$replaceFirstQuote(this.topic));
  }
}
</script>

<style scoped>

</style>