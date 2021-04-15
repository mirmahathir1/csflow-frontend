<template>
  <v-card flat class="rounded-lg pa-2 my-2" min-height="60">
    <v-card-text class="font-weight-normal text-h6 black--text my-1 ml-3">
      <v-hover v-slot:default="{ hover }" v-if="backButton">
        <v-icon
            class="black--text mr-3"
            :class="{ 'my-hover': hover, 'grey--text': hover}"
            size="30"
            @click="$router.push(backRoute)"
        >
          mdi-arrow-left-thick
        </v-icon>
      </v-hover>
      <slot>Page Title</slot>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "PageHeader",
  props: {
    backButton: {
      type: Boolean,
      default: false
    },
    backRoute: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>
.my-hover {
  cursor: pointer;
}
</style>