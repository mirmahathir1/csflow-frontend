<template>
  <v-col
    cols="12"
    md="8"
  >
    <page-header>Resource Explorer</page-header>

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
              @click.native="$router.push('/archive/resource/' + batch['ID'])"
          >
            Batch {{ batch['ID'] }} Resources
          </resource-card>
        </v-col>
      </v-row>
    </v-container>
    <folders-loader v-else></folders-loader>
  </v-col>
</template>

<script>
import ResourceCard from "@/components/ResourceCard";
import PageHeader from "@/components/PageHeader";
import FoldersLoader from "@/components/FoldersLoader";
import mixins from '@/mixins/index'
import {mapGetters,mapActions} from 'vuex';

export default {
  name: "Resources",
  computed: {
    ...mapGetters('archive', ['getBatches', 'getLoaderFlag']),
  },
  methods: {
    ...mapActions('archive', ['loadBatches']),
  },
  components: {
    FoldersLoader,
    ResourceCard,
    PageHeader
  },
  mixins: [mixins],
  mounted() {
    this.loadBatches();
  }
}
</script>

<style scoped>

</style>