<template>
  <v-card class="text-center pt-7 mx-auto" height="120" max-width="600" elevation="1">
    <v-card-text large class="rounded-lg black--text font-weight-normal text-h6">
      <slot></slot>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "ErrorCard"
}
</script>

<style scoped>

</style>