<template>
  <div :class="{ 'mx-15 my-5': !$isMobile(), 'mx-3 my-3': $isMobile() }">
    <v-row>
      <v-col cols="12" md="2">
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
export default {
  name: "PaddedContainer"
}
</script>

<style scoped>

</style>