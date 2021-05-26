<template>
  <div :class="margin">
    <v-row>
      <v-col cols="12" md="10" :class="padding">
        <slot></slot>
      </v-col>
      <v-col cols="12" md="2" class="pl-0 pr-1">
        <slot name="right"></slot>
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
        return 'mr-5 my-5';
      }
    },
    padding() {
      if (this.$vuetify.breakpoint.mdAndUp) {
        // return 'padding-left: 80px';
        return 'px-10';
      }
    }
  }
}
</script>

<style scoped>

</style>