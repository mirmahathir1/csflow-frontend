<template>
  <v-hover v-slot="{ hover }">
    <v-card outlined :elevation="hover ? '2' : '1'" :class="{'my-hover': hover}">
      <v-icon :class="{'grey--text text--darken-2': hover, 'black--text': !hover}" :size="size">
        <slot></slot>
      </v-icon>
    </v-card>
  </v-hover>
</template>

<script>
export default {
  name: "IconButton",
  props: {
    size: {
      type: [String, Number],
      default: 35,
    }
  }
}
</script>

<style scoped>

</style>