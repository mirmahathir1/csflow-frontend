<template>
  <v-hover v-slot:default="{ hover }">
    <v-card
        class="text-center my-3 mx-auto pa-1 pa-md-2 rounded-lg"
        width="auto"
        max-width="220"
        max-height="200"
        :elevation="hover ? 6 : 2"
        :class="{ 'my-hover': hover }"
    >
      <v-icon color="grey darken-3" :size="$vuetify.breakpoint.lgAndUp ? '100' : '75'">
        mdi-{{ type }}
      </v-icon>
      <v-card-text large class="my-3 black--text font-weight-medium">
        <slot>Card Title</slot>
      </v-card-text>
    </v-card>
  </v-hover>
</template>

<script>
export default {
  name: "ResourceCard",
  props: {
    type: {
      type: String,
      default: 'folder'
    }
  }
}
</script>

<style scoped>
.my-hover {
  cursor: pointer;
}
</style>