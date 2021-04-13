<template>
  <v-card flat class="rounded-lg pa-1 mt-6 mb-2 mx-2" color="#b2dfdb" min-height="30">
    <v-card-text class="font-weight-normal subtitle-2 black--text">
      <slot>Page Subtitle</slot>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "PageSubheader"
}
</script>

<style scoped>

</style>