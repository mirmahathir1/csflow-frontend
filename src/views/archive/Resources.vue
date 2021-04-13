<template>
  <v-col
    cols="12"
    md="8"
  >
    <v-card flat class="rounded-lg pa-2 my-2" min-height="60">
      <v-card-text class="font-weight-normal text-h6 black--text my-1">
        Resource Explorer
      </v-card-text>
    </v-card>

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
  components: {ResourceCard},
  mixins: [mixins],
  mounted() {
    this.loadResource();
  }
}
</script>

<style scoped>

</style>