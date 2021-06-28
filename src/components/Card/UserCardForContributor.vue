<template>
  <v-hover v-slot:default="{ hover }">
    <v-card
        class="rounded-lg"
        color="blue lighten-5"
        :width="width"
        :max-width="width"
        :elevation="hover ? 3 : 2"
        :class="{ 'my-hover': hover }"
    >
      <v-list-item>
        <v-list-item-avatar
            tile
            :size="avatarSize"
            color="grey"
            v-if="image!=''&& image!=null"
        ><img :src="image" alt=""></v-list-item-avatar>
        <v-list-item-avatar v-else>
          <v-icon
            color="green"
            dark
            size="35"
          >mdi-account-circle</v-icon>
        </v-list-item-avatar>

        <v-list-item-content class="pb-0">
          <v-card-text
              class="py-0 pl-1 mb-2 grey--text text--darken-3"
              :class="{'text-caption pr-0': small}"
          >
            {{ name }}
          </v-card-text>
        </v-list-item-content>
      </v-list-item>

      <v-row
          :class="{'mx-3': !small, 'mx-1': small}"
      >
        <v-col
            :cols="small ? '12' : '7'"
        
        >
          <v-list-item-action-text>
            Student ID: {{ ID }}
          </v-list-item-action-text>
        </v-col>
        <v-col
            :cols="small ? '12' : '5'"
            class="mt-n6"
        >
          <v-list-item-action-text>
            Karma: {{ signedKarma }}
          </v-list-item-action-text>
        </v-col>
      </v-row>
    </v-card>
  </v-hover>
</template>

<script>
export default {
  name: "UserCard",
  props: {
    name: {
      type: String,
      default: 'User'
    },
    ID: {
      type: Number,
      default: 1000000
    },
    karma: {
      type: Number,
      default: 0
    },
    image: {
      type: String,
      default: ''
    },
    width: {
      type: Number,
      default: 250,
    },
    small: {
      type: Boolean,
      default: false,
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
      if (this.small)
        return 35;

      return this.$vuetify.breakpoint.mdAndUp ? 50 : 40;
    }
  }
}
</script>

<style scoped>

</style>