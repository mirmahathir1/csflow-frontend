<template>
  <v-col
    cols="12"
    md="8"
  >
    <page-header>Resource Explorer</page-header>

    <v-container class="my-5">
      <v-row>
        <v-col
            :cols="$isMobile() ? '12' : '6'"
            :md="$isMobile() ? '12' : '4'"
            class="justify-content-center"
            v-for="batch in getBatches"
            :key="batch"
            @click="$router.push('/archive/resource/' + batch)"
        >
          <resource-card type="folder">Batch {{ batch }} Resources</resource-card>
        </v-col>
      </v-row>
    </v-container>
  </v-col>
</template>

<script>
import ResourceCard from "@/components/ResourceCard";
import PageHeader from "@/components/PageHeader";
import mixins from '@/mixins/index'
import {mapGetters,mapActions} from 'vuex';

export default {
  name: "Resources",
  computed: {
    ...mapGetters('archive', ['getBatches'])
  },
  methods: {
    ...mapActions('archive', ['loadResource']),
  },
  components: {
    ResourceCard,
    PageHeader
  },
  mixins: [mixins],
  mounted() {
    this.loadResource();
  }
}
</script>

<style scoped>

</style>