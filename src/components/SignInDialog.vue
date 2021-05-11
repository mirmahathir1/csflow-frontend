<template>
  <padded-container>
    <v-sheet max-width="400" class="mx-auto pb-10 px-10 mt-12">
      <v-card-text class="blue--text">Loading... Please Wait...</v-card-text>
      <v-progress-linear
          indeterminate
          color="blue"
      ></v-progress-linear>
    </v-sheet>
  </padded-container>
</template>

<script>
import PaddedContainer from "@/components/PaddedContainer";
export default {
  name: "SignInDialog",
  components: {PaddedContainer}
}
</script>

<style scoped>

</style>