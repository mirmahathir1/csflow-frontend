<template>
    <div>
        <v-app-bar
            app
            color="white"
            flat
            clipped-left
        >
            <v-app-bar-nav-icon disabled @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title @click="$router.push('/search/relevant')">CSFlow</v-toolbar-title>

            <v-spacer></v-spacer>


            <v-menu
                left
                bottom
                v-if="getIsSignedIn"
            >
                <template v-slot:activator="{ on, attrs }">
                    <v-btn
                        icon
                        v-bind="attrs"
                        v-on="on"
                        :loading="getLogoutLoaderFlag"
                    >
                        <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                </template>

                <v-list>
                    <v-list-item
                        @click="$router.push('/user/me')"
                    >
                        <v-list-item-title>My Profile</v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="signOut">
                        <v-list-item-title >Log out</v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="signOutAll">
                        <v-list-item-title>Log out from all devices</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>

        </v-app-bar>

    </div>
</template>

<script>
import {mapGetters,mapActions} from 'vuex';
export default {
    name: "AppBar",
    watch: {
        group() {
            this.drawer = false
        },
    },
    computed:{
        ...mapGetters('auth',['getLogoutLoaderFlag','getIsSignedIn']),

    },

    data: () => ({
        drawer: false,
        group: null,
        items: [
            {
                title: 'Unanswered',
                icon: 'mdi-magnify',
                link: '/about'
            },
            {
                title: 'Resources',
                icon: 'mdi-folder-multiple',
                link: '/archive/resource'
            },
            {
                title: 'Theses',
                icon: 'mdi-school',
                link: '/archive/thesis'
            }
        ]
    }),
    methods:{
        ...mapActions('auth',['logoutAll','logout']),

        async signOut(){
            await this.logout();
            await this.$router.push('/auth/signIn');
        },
        async signOutAll(){
            await this.logoutAll();
            await this.$router.push('/auth/signIn');
        },
        changeRoute(link) {
            this.$router.push(link)
        },
    },

}
</script>

<style scoped>

</style>