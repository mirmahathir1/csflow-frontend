<template>
  <v-card rounded color="blue lighten-5" width="50" min-width="40" :max-height="small ? '65' : '80'">
    <v-row class="mx-auto text-center">
      <v-icon class="mx-auto text-center mt-1" :small="small" color="green darken-2">
        mdi-triangle
      </v-icon>
    </v-row>
    <v-row class="mx-auto text-center">
      <span class="mx-auto text-center">{{ votes }}</span>
    </v-row>
    <v-row class="mx-auto text-center">
      <v-icon class="mx-auto text-center mb-1" :small="small" color="red darken-2">
        mdi-triangle mdi-rotate-180
      </v-icon>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: "VoteCardInactive",
  props: {
    votes: {
      type: Number,
      default: 0,
    },
    small: {
      type: Boolean,
      default: false,
    },
  }
}
</script>

<style scoped>

</style>