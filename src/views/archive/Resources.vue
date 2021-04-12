<template>
  <v-col
    cols="12"
    sm="8"
  >
    The Resources Page

    <router-link v-for="batch in 5" :key="batch" route :to="`/archive/resource/${batch}`">{{batch}}</router-link>
  </v-col>
</template>

<script>
export default {
  name: "Resources"
}
</script>

<style scoped>

</style>