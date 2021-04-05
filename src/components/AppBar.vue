<template>
    <div>
        <v-app-bar
            app
            color="white"
            flat
            clipped-left
        >
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title @click="$router.push('/search/relevant')">CSFlow</v-toolbar-title>

            <v-spacer></v-spacer>
            <v-menu
                left
                bottom
            >
                <template v-slot:activator="{ on, attrs }">
                    <v-btn
                        icon
                        v-bind="attrs"
                        v-on="on"
                        :loading="$store.getters['auth/getLogoutLoaderFlag']"
                    >
                        <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                </template>

                <v-list>
                    <v-list-item
                        @click="$router.push('/user')"
                    >
                        <v-list-item-title>My Profile</v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="logout">
                        <v-list-item-title >Log out</v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="logoutAll">
                        <v-list-item-title>Log out from all devices</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>

        </v-app-bar>

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
        drawer: false,
        group: null,
    }),
    methods:{
        async logout(){
            await this.$store.dispatch('auth/logout');
            await this.$router.push('/auth/signIn');
        },
        async logoutAll(){
            await this.$store.dispatch('auth/logoutAll');
            await this.$router.push('/auth/signIn');
        }
    }
}
</script>

<style scoped>

</style>