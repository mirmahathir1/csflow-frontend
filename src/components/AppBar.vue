<template>
  <div>
    <v-app-bar
        app
        color="white"
        flat
        clipped-left
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title @click="$router.push('/search/relevant')">CSFlow </v-toolbar-title>
      <v-spacer></v-spacer>
        <v-btn link text to="/user">
          My Profile
        </v-btn>
        <v-btn text>
          Log Out
        </v-btn>
      <v-btn text>
        Log Out All
      </v-btn>

    </v-app-bar>
    <v-navigation-drawer
        v-model="drawer"
        app
        clipped

    >
      <v-list
          nav
          dense
      >
        <v-list-item-group
            v-model="group"
            active-class="deep-purple--text text--accent-4"
        >
          <v-list-item>
            <v-list-item-title>Foo</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Bar</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Fizz</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Buzz</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  name: "AppBar",
  watch: {
    group() {
      this.drawer = false
    },
  },

  data: () => ({
    links: [
      'Dashboard',
      'Messages',
      'Profile',
      'Updates',
    ],
    drawer: false,
    group: null,
  }),
}
</script>

<style scoped>

</style>