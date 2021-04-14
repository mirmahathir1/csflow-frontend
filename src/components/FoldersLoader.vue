<template>
  <v-container class="my-5">
    <v-row>
      <v-col
          :cols="$isMobile() ? '12' : '6'"
          :md="$isMobile() ? '12' : '4'"
          class="justify-content-center"
          v-for="loader in count"
          :key="loader"
      >
        <v-skeleton-loader
            class="mx-auto text-center"
            type="image"
            max-width="250"
            max-height="200"
        ></v-skeleton-loader>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "FoldersLoader",
  props: {
    count: {
      type: Number,
      default: 3
    }
  },
}
</script>

<style scoped>

</style>