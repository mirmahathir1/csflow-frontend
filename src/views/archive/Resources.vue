<template>
  <v-col
    cols="12"
    md="8"
  >
    Resource Explorer
    <v-container class="my-5">
      <v-row>
        <v-col
            :cols="$isMobile() ? '12' : '6'"
            :md="$isMobile() ? '12' : '4'"
            class="justify-center-center"
            v-for="batch in 7"
            :key="batch"
        >
          <resource-card type="folder">Batch {{ batch + 12 }} Resources</resource-card>
        </v-col>
      </v-row>
    </v-container>
  </v-col>
</template>

<script>
import ResourceCard from "@/components/ResourceCard";
import mixins from '@/mixins/index'

export default {
  name: "Resources",
  components: {ResourceCard},
  mixins: [mixins]
}
</script>

<style scoped>

</style>