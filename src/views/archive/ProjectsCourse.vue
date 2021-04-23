<template>
  <padded-container>
    <page-header :back-button="true" :back-route="'/archive/project/batch/' + this.batch">Project Explorer</page-header>
    <page-subheader v-if="true">Batch {{ batch }} Projects / {{ this.course.replace('-', ' ') }}</page-subheader>

    <template :slot="$vuetify.breakpoint.mdAndUp ? 'right' : 'default'" v-if="isMyBatch">
      <v-card class="mt-8 pb-4 rounded-lg mx-auto" max-width="300">
        <v-card-text class="text-center text-body-2">Create New Project</v-card-text>
        <div class="mx-6">
          <hr class="my-divider">
        </div>
        <v-card-actions class="mx-2">
          <v-btn block color="primary" small @click="createProject">
            Create
          </v-btn>
        </v-card-actions>
      </v-card>
    </template>

    <v-container class="my-5" v-if="!getLoaderFlag('projects')">
      <v-row>
        <v-col
            v-if="projects"
            :cols="$isMobile() ? '12' : '6'"
            :md="$isMobile() ? '12' : '4'"
            class="justify-content-center"
            v-for="(project, index) in projects"
            :key="index"
        >
          <v-tooltip top :disabled="project['Title'].length <= 40">
            <template v-slot:activator="{ on, attrs }">
              <div v-bind="attrs" v-on="on">
                <resource-card
                    type="file-code"
                    @click.native="$router.push('/archive/project/' + project['ID'])"
                >
                  {{ project['Title'] | shorten }}
                </resource-card>
              </div>
            </template>

            <v-container>
              <span class="caption">{{ project['Title'] }}</span>
            </v-container>
          </v-tooltip>
        </v-col>
        <v-col
            cols="12"
            class="justify-content-center"
            v-if="!projects || Object.keys(projects).length === 0"
        >
          <error-card v-if="!projects">Not found</error-card>
          <error-card v-else>No projects found</error-card>
        </v-col>
      </v-row>
    </v-container>
    <folders-loader v-else></folders-loader>
  </padded-container>
</template>

<script>
import ResourceCard from "@/components/ResourceCard";
import PageSubheader from "@/components/PageSubheader";
import PageHeader from "@/components/PageHeader";
import FoldersLoader from "@/components/FoldersLoader";
import mixins from '@/mixins/index'
import {mapGetters,mapActions} from 'vuex';
import PaddedContainer from "@/components/PaddedContainer";
import ErrorCard from "@/components/ErrorCard";

export default {
  name: "ProjectsCourse",
  data() {
    return {
      batch: this.$route.params.batch,
      course: this.$route.params.course,
    };
  },
  computed: {
    ...mapGetters('archive', ['getProjects', 'getLoaderFlag']),
    ...mapGetters('user', ['getLoadedUser']),
    projects() {
      if (this.getProjects) {
        return this.getProjects.payload;
      }

      return null;
    },
    isMyBatch() {
      if (this.getLoadedUser) {
        if (this.getLoadedUser['batchID'] === Number(this.batch)) {
          return true;
        }
      }

      return false;
    },
  },
  methods: {
    ...mapActions('archive', ['loadProjects']),
    ...mapActions('user', ['getProfile']),
    createProject() {
      this.$router.push('/archive/project/new');
    }
  },
  watch: {
    '$route'(to, from) {
      this.batch = to.params.batch;
      this.course = to.params.course;
      this.loadProjects({batch: this.batch, course: this.course});
    }
  },
  components: {
    ErrorCard,
    PaddedContainer,
    FoldersLoader,
    ResourceCard,
    PageHeader,
    PageSubheader
  },
  mounted() {
    this.loadProjects({batch: this.batch, course: this.course});
    this.getProfile('me');
  }
}
</script>

<style scoped>

</style>