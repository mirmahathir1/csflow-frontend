<template>
  <padded-container>
    <page-header>Theses Explorer</page-header>

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
              @click.native="$router.push('/archive/thesis/batch/' + batch['ID'])"
          >
            Batch {{ batch['ID'] }} Theses
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

export default {
  name: "Theses",
  title() {
    return 'Theses';
  },
  computed: {
    ...mapGetters('archive', ['getBatches', 'getLoaderFlag']),
  },
  methods: {
    ...mapActions('archive', ['loadBatches']),
  },
  components: {
    PaddedContainer,
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