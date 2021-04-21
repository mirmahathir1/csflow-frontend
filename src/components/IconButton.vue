<template>
  <v-hover v-slot="{ hover }" class="mx-1">
    <v-card outlined :elevation="hover ? '2' : '1'" :class="{'my-hover': hover}">
      <v-icon large :class="{'grey--text text--darken-2': hover, 'black--text': !hover}">
        <slot></slot>
      </v-icon>
    </v-card>
  </v-hover>
</template>

<script>
export default {
  name: "IconButton"
}
</script>

<style scoped>

</style>