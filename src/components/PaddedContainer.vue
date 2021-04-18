<template>
  <div :class="margin">
<!--    :class="{ 'mx-15 my-5': !$isMobile(), 'mx-3 my-3': $isMobile() }"-->
    <v-row>
      <v-col cols="12" :md="getDrawerSideBar? '1' : '2'">
        <slot name="left"></slot>
      </v-col>
      <v-col cols="12" :md="getDrawerSideBar ? '9' : '8'">
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
  name: "PaddedContainer",
  computed: {
    ...mapGetters('auth', ['getDrawerSideBar']),
    margin() {
      if (!this.$vuetify.breakpoint.mdAndUp) {
        return 'mx-3 my-3';
      } else {
        if (this.getDrawerSideBar) {
          return 'mr-10 my-5';
        } else {
          return 'mx-10 my-5';
        }
      }
    }
  }
}
</script>

<style scoped>

</style>