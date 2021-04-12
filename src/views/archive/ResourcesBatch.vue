<template>
  <v-col
      cols="12"
      sm="8"
  >
    The Batch Resources Page
    The batch is {{ batch }}
  </v-col>
</template>

<script>
export default {
  name: "ResourcesBatch",
  data() {
    return {
      batch: this.$route.params.batch
    }
  },
  watch: {
    '$route'(to, from) {
      this.batch = to.params.batch;
    }
  }
}
</script>

<style scoped>

</style>