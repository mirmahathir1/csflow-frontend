<template>
  <v-card
      class="rounded-lg"
      color="blue lighten-5"
      :width="width"
  >
    <v-list-item>
      <v-list-item-avatar
          tile
          :size="avatarSize"
          color="grey"
      ><img :src="image" alt=""></v-list-item-avatar>

      <v-list-item-content class="pb-0">
        <v-card-text
            class="py-0 pl-1 mb-2 grey--text text--darken-3"
            :class="{'text-caption pr-0': $isMobile()}"
        >
          {{ name }}
        </v-card-text>
      </v-list-item-content>
    </v-list-item>

    <v-row
        :class="{'mx-3': !$isMobile(), 'mx-1': $isMobile()}"
    >
      <v-col
          :cols="$isMobile() ? '12' : '7'"
          class="pb-1"
          :class="{'pt-1': $isMobile()}"
      >
        <v-list-item-action-text>
          Student ID: {{ ID }}
        </v-list-item-action-text>
      </v-col>
      <v-col
          :cols="$isMobile() ? '12' : '5'"
          class="pb-1"
          :class="{'pt-0': $isMobile()}"
      >
        <v-list-item-action-text>
          Karma: {{ signedKarma }}
        </v-list-item-action-text>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: "UserCard",
  props: {
    name: {
      type: String,
      default: 'Navid Bin Hasan'
    },
    ID: {
      type: Number,
      default: 1605005
    },
    karma: {
      type: Number,
      default: 69
    },
    image: {
      type: String,
      default: 'https://storage.googleapis.com/csflow-buet.appspot.com/profile-pic/162063784423617792183.png'
    },
    width: {
      type: Number,
      default: 250,
    }
  },
  computed: {
    signedKarma() {
      if (this.karma  > 0) {
        return '+' + this.karma;
      }

      return this.karma;
    },
    avatarSize() {
      if (this.$isMobile())
        return 35;

      return this.$vuetify.breakpoint.mdAndUp ? 50 : 40;
    }
  }
}
</script>

<style scoped>

</style>