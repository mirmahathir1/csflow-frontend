<template>
  <v-container>
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
  </v-container>
</template>

<script>
export default {
  name: "PaddedContainer"
}
</script>

<style scoped>

</style>