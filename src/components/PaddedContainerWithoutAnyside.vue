<template>
  <div :class="margin">
    <v-row>
      <v-col cols="12">
        <slot></slot>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: "PaddedContainer",
  computed: {
    ...mapGetters('others', ['getDrawer']),
    margin() {
      if (!this.$vuetify.breakpoint.mdAndUp) {
        return 'mx-3 my-3';
      } else {
          return 'mx-10 my-5';
        // if (this.getDrawer) {
        //   return 'mr-10 my-5';
        // } else {
        //   return 'mx-10 my-5';
        // }
      }
    }
  }
}
</script>

<style scoped>

</style>