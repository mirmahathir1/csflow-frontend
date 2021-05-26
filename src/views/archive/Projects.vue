<template>
  <padded-container>
    <page-header>Project Explorer</page-header>

    <template :slot="$vuetify.breakpoint.mdAndUp ? 'right' : 'default'">
      <v-card class="mt-4 pb-4 rounded-lg mx-auto" max-width="250">
        <v-card-text class="text-center text-body-2">Search by topic</v-card-text>
        <v-card-text class="text-body-2 black--text">Enter Search Text:</v-card-text>
        <v-text-field
            class="mx-3" outlined rounded dense
            v-model="topic"
            @keyup.enter="$router.push('/archive/project/search/' + topic)"
        ></v-text-field>
        <v-card-actions class="mx-2 pt-0">
          <v-btn
              block color="primary" small
              @click="$router.push('/archive/project/search/' + topic)"
              :disabled="topic === ''"
          >
            Search
          </v-btn>
        </v-card-actions>
      </v-card>
    </template>

    <template :slot="$vuetify.breakpoint.mdAndUp ? 'right' : 'default'">
      <v-card
          v-if="!getLoaderFlag('projectTags')"
          class="mt-5 pb-4 rounded-lg mx-auto text-center" max-width="600"
      >
        <v-card-text class="text-body-2 black--text">Common Topics:</v-card-text>
        <v-row>
          <v-col cols="6" md="12" class="py-0" v-for="topic in topics" :key="topic">
            <v-chip
                color="blue lighten-4"
                class="mx-1 my-2 text-wrap text-body-2"
                :large="topic.length > 25"
                @click="$router.push('/archive/project/search/' + topic)"
            >
              {{ topic }}
            </v-chip>
          </v-col>
        </v-row>
        <!--        <v-pagination-->
        <!--            v-model="page"-->
        <!--            :length="pages"-->
        <!--            circle-->
        <!--            :total-visible="1"-->
        <!--        ></v-pagination>-->
      </v-card>
      <regular-loader v-else class="mt-5"></regular-loader>
    </template>

    <v-container class="my-5" v-if="!getLoaderFlag('batches')">
      <v-row>
        <v-col
            :cols="$isMobile() ? '12' : '6'"
            :md="$isMobile() ? '12' : '4'"
            class="justify-content-center"
            v-for="batch in getBatches"
            :key="batch['ID']"
        >
          <resource-card
              type="folder"
              @click.native="$router.push('/archive/project/batch/' + batch['ID'])"
          >
            Batch {{ batch['ID'] }} Projects
          </resource-card>
        </v-col>
      </v-row>
    </v-container>
    <folders-loader v-else></folders-loader>
  </padded-container>
</template>

<script>
import ResourceCard from "@/components/ResourceCard";
import PageHeader from "@/components/PageHeader";
import FoldersLoader from "@/components/FoldersLoader";
import mixins from '@/mixins/index'
import {mapGetters,mapActions} from 'vuex';
import PaddedContainer from "@/components/PaddedContainer";
import RegularLoader from "@/components/Loader/RegularLoader";

export default {
  name: "Projects",
  title() {
    return 'Projects';
  },
  data() {
    return {
      topic: '',
    };
  },
  computed: {
    ...mapGetters('archive', ['getBatches', 'getLoaderFlag', 'getProjectTags']),
    topics() {
      if (this.getProjectTags) {
        let ret = [];
        this.getProjectTags.forEach(course => {
          ret.push(course['courseTitle']);
        });

        return ret.sort((a, b) => a < b ? -1 : 1);
      }

      return [];
    },
  },
  methods: {
    ...mapActions('archive', ['loadBatches', 'loadProjectTags']),
  },
  components: {
    RegularLoader,
    PaddedContainer,
    FoldersLoader,
    ResourceCard,
    PageHeader
  },
  mounted() {
    this.loadBatches();
    this.loadProjectTags(false);
  }
}
</script>

<style scoped>

</style>