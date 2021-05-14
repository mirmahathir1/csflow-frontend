<template>
  <v-container>
    <v-dialog
        max-width="400"
        :value="true"
        persistent
    >
      <v-sheet max-width="400" class="rounded-lg pt-5 pb-10 px-10 text-center">
        <v-card-text class="blue--text">Loading... Please Wait...</v-card-text>
        <v-progress-linear
            indeterminate
            color="blue"
        ></v-progress-linear>
      </v-sheet>
    </v-dialog>
  </v-container>
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