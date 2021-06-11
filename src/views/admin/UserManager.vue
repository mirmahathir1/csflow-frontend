<template>
  <padded-container>
    <page-header>User Manager</page-header>

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
              @click.native="$router.push('/admin/user/batch/' + batch['ID'])"
          >
            Batch {{ batch['ID'] }}
          </resource-card>
        </v-col>
      </v-row>
    </v-container>
    <folders-loader v-else></folders-loader>
  </padded-container>
</template>

<script>
import PaddedContainer from "@/components/PaddedContainer";
import PageHeader from "@/components/PageHeader";
import {mapActions, mapGetters} from "vuex";
import ResourceCard from "@/components/ResourceCard";
import FoldersLoader from "@/components/FoldersLoader";
export default {
  name: "UserManager",
  title() {
    return 'User Manager';
  },
  components: {FoldersLoader, ResourceCard, PageHeader, PaddedContainer},
  computed: {
    ...mapGetters('archive', ['getBatches', 'getLoaderFlag']),
  },
  methods: {
    ...mapActions('archive', ['loadBatches']),
  },
  mounted() {
    this.loadBatches();
  }
}
</script>

<style scoped>

</style>