<template>
  <v-hover v-slot:default="{ hover }">
    <v-card
        class="rounded-lg"
        color="blue lighten-5"
        :width="width > -1 ? width : ''"
        :max-width="maxWidth"
        :elevation="hover ? 3 : 2"
        :class="{ 'my-hover': hover }"
    >
      <v-row
          :class="{'mx-3': !small, 'mx-1': small}"
      >
        <v-col
            :cols="small ? '12' : '10'"
            class="pb-1 pt-4"
            :class="{'pt-1': small}"
        >
          <v-list-item-action-text class="text-body-2">
            Pending: {{ ID }}
          </v-list-item-action-text>
        </v-col>
        <v-col
            :cols="small ? '12' : '2'"
            class="pb-1 pt-2 pl-0"
            :class="{'pt-1': small}"
        >
          <v-card-actions>
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <div v-bind="attrs" v-on="on">
                  <v-btn
                      small
                      text
                      icon
                      @click.stop="$emit('removed')"
                      :disabled="getLoaderFlag('thesisOwnerRemoval')"
                      :loading="getLoaderFlag('thesisOwnerRemoval') && getRemoving === ID"
                  >
                    <v-icon
                        color="red lighten-1"
                    >
                      mdi-close
                    </v-icon>
                  </v-btn>
                </div>
              </template>

              <v-container>
                <span class="caption">Remove Request</span>
              </v-container>
            </v-tooltip>
          </v-card-actions>
        </v-col>
      </v-row>
    </v-card>
  </v-hover>
</template>

<script>
import IconButton from "@/components/IconButton";
import {mapGetters} from "vuex";
export default {
  name: "UserCard",
  components: {IconButton},
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
      default: -1,
    },
    maxWidth: {
      type: Number,
      default: 220,
    },
    small: {
      type: Boolean,
      default: false,
    }
  },
  computed: {
    ...mapGetters('archive', ['getLoaderFlag', 'getRemoving']),
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