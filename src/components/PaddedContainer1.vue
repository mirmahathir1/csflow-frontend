<template>
  <div :class="margin">
    <v-row>
        <v-col cols="12" md=2>
            <slot name="left"></slot>
        </v-col>
      <v-col cols="12" md="8">
        <slot></slot>
      </v-col>
      <v-col cols="12" md="2">
        <slot name="right"></slot>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: "PaddedContainer1",
  computed: {
    ...mapGetters('others', ['getDrawer']),
    margin() {
      if (!this.$vuetify.breakpoint.mdAndUp) {
        return 'mx-3 my-3';
      } else {
        return 'mr-5 my-5';
      }
    },
    // padding() {
    //   if (this.$vuetify.breakpoint.mdAndUp) {
    //     return 'padding-left: 80px';
    //   }
    // }
  }
}
</script>

<style scoped>

</style>