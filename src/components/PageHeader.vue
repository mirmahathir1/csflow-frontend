<template>
  <v-card flat class="rounded-lg pa-2 my-2" min-height="60">
    <v-card-text class="font-weight-normal text-h6 black--text my-1 ml-3">
      <slot>Page Title</slot>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "PageHeader"
}
</script>

<style scoped>

</style>