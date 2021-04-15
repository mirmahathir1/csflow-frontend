<template>
  <v-col
      cols="12"
      md="8"
  >
    <page-header>Resource Explorer</page-header>
    <page-subheader>Batch {{ batch }} Resources</page-subheader>

    <v-container class="my-5" v-if="!getLoaderFlag('resources')">
      <v-row>
        <v-col
            :cols="$isMobile() ? '12' : '6'"
            :md="$isMobile() ? '12' : '4'"
            class="justify-content-center"
            v-for="(resource, index) in resources"
            :key="index"
        >
          <resource-card
              type="folder"
              @click.native="navigateTo(resource['Link'])"
          >
            Level {{ resource["Level"]}} Term {{ resource["Term"]}}
          </resource-card>
        </v-col>
      </v-row>
    </v-container>
    <folders-loader v-else></folders-loader>

  </v-col>
</template>

<script>
import ResourceCard from "@/components/ResourceCard";
import PageSubheader from "@/components/PageSubheader";
import PageHeader from "@/components/PageHeader";
import FoldersLoader from "@/components/FoldersLoader";
import mixins from '@/mixins/index'
import {mapGetters,mapActions} from 'vuex';

export default {
  name: "ResourcesBatch",
  data() {
    return {
      batch: this.$route.params.batch
    }
  },
  computed: {
    ...mapGetters('archive', ['getResources', 'getLoaderFlag']),
    resources() {
      let ret = this.getResources(this.batch);
      if (ret) {
        return ret.sort((a, b) => {
          if (a["Level"] === b["Level"]) {
            return a["Term"] <= b["Term"] ? -1 : 1;
          } else {
            return a["Level"] < b["Level"] ? -1 : 1;
          }
        })
      } else {
        return null;
      }
    }
  },
  methods: {
    ...mapActions('archive', ['loadResources']),
    navigateTo(link) {
      window.open(link);
    }
  },
  watch: {
    '$route'(to, from) {
      this.batch = to.params.batch;
    }
  },
  components: {
    FoldersLoader,
    ResourceCard,
    PageHeader,
    PageSubheader
  },
  mixins: [mixins],
  mounted() {
    this.loadResources();
  },
}
</script>

<style scoped>

</style>