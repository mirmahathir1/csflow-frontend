<template>
    <div>
        <v-app-bar
            app
            color="white"
            flat
            clipped-left
        >
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <v-avatar
                :color="$vuetify.breakpoint.smAndDown ? 'grey darken-1' : 'transparent'"
                size="32"
            ></v-avatar>

            <v-tabs
                centered
                class="ml-n9"
                color="grey darken-1"
            >
                <v-tab
                    v-for="link in links"
                    :key="link"
                >
                    {{ link }}
                </v-tab>
            </v-tabs>

            <v-avatar
                class="hidden-sm-and-down"
                color="grey darken-1 shrink"
                size="32"
            ></v-avatar>
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