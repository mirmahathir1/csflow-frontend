<template>
    <div>
        <v-app-bar
            color="#4169e1"
            dense
            dark
            app
            clipped-left
        >
            <v-app-bar-nav-icon v-if="getIsSignedIn" @click.stop="toggleDrawer"></v-app-bar-nav-icon>

            <v-toolbar-title>CSFLOW</v-toolbar-title>

            <v-spacer></v-spacer>
            <!-- <button :click="()=>{$router.push('/about')}">
              Sign In
            </button> -->
            <div v-if="!getIsSignedIn">
                <v-btn
                    to="/auth/signIn"
                    text
                    style="text-decoration:none"
                >
                    <v-icon left>mdi-login</v-icon>
                    Login
                </v-btn>
                <v-btn
                    to="/auth/signUp"
                    text
                    style="text-decoration:none"
                >SignUp
                </v-btn>
            </div>

            <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->
            <!-- <v-toolbar dark color="blue-grey darken-1" class="hidden-xs-and-down">
              <v-toolbar-title>CSFLOW</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-toolbar-items v-if="!getIsSignedIn">
                <v-btn
                  to="/auth/signIn"
                  text
                >Login</v-btn>
                <v-btn
                  to="/auth/signUp"
                  text
                >SignUp</v-btn>
              </v-toolbar-items> -->
            <!-- </v-toolbar> -->
            <!-- <v-toolbar-title link @click="$router.push('/auth/signIn')" v-if="!getIsSignedIn">Login</v-toolbar-title>
            <v-toolbar-title link @click="$router.push('/auth/signUp')" v-if="!getIsSignedIn" class="ml-4">SignUp</v-toolbar-title> -->
            
            <v-autocomplete
                clearable
                rounded
                background-color="white"
                light
                solo
                label="Search here...."
                append-icon="mdi-magnify"
                v-if="getIsSignedIn"
                class="ma-auto mt-2"
                dense

            >

            </v-autocomplete>
            <div v-if="getIsSignedIn">
                <div>
                    <!-- <v-text-field
                      hide-details
                      single-line
                      prefend-icon="mdi-magnify"
                    >
                    </v-text-field> -->
                </div>

                <v-menu left bottom v-if="getIsSignedIn">
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn icon v-bind="attrs" v-on="on" :loading="getLogoutLoaderFlag">
                            <v-icon>mdi-dots-vertical</v-icon>
                        </v-btn>
                    </template>

                    <v-list>
                        <v-list-item @click="$router.push('/user/me')">
                            <v-list-item-title>My Profile</v-list-item-title>
                        </v-list-item>
                        <v-list-item @click="signOut">
                            <v-list-item-title>Log out</v-list-item-title>
                        </v-list-item>
                        <v-list-item @click="signOutAll">
                            <v-list-item-title>Log out from all devices</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </div>
            <!-- </v-toolbar> -->
        </v-app-bar>
        <!-- <div>
        <v-app-bar id="inspire">
          <v-layout row justify-center>
            <v-toolbar dark color="blue-grey darken-1" class="hidden-xs-and-down">
              <v-toolbar-title>CSFLOW</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-toolbar-items>
               <v-btn
                 v-for="item in nav"
                 :key="item.icon"
                 to="#"
                 :title="item.title"
                 text
               >{{ item.text }}</v-btn>
              </v-toolbar-items>
            </v-toolbar>

            <v-toolbar text dark color="blue-grey darken-3" class="hidden-sm-and-up">
              <v-toolbar-title>Mobile Menu</v-toolbar-title>
              <v-spacer></v-spacer>

              <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
                <v-toolbar-side-icon dark slot="activator"></v-toolbar-side-icon>
                <v-card>
                  <v-toolbar flat color="blue-grey darken-2">
                    <v-toolbar-title>Mobile Menu</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn icon @click.native="dialog = false">
                      <v-icon>close</v-icon>
                    </v-btn>
                  </v-toolbar>

                  <v-list>
                    <v-list-tile
                      v-for="(item, index) in nav"
                      :key="index"
                      to="#"
                    >
                      <v-list-tile-action>
                        <v-icon v-if="item.icon">{{item.icon}}</v-icon>
                      </v-list-tile-action>
                      <v-list-tile-content>
                        <v-list-tile-title :title="item.title">{{ item.text }}</v-list-tile-title>
                      </v-list-tile-content>
                    </v-list-tile>
                  </v-list>
                </v-card>
              </v-dialog>

            </v-toolbar>
          </v-layout>
        </v-app-bar>
      </div> -->
        <v-navigation-drawer app clipped v-model="drawer" v-if="getIsSignedIn">
            <v-list
                dense
                nav
            >
                <template v-for="(item,index) in items">
                    <v-list-item
                        :to="item.link"
                        :key="index"
                        style="text-decoration:none"
                    >
                        <v-list-item-icon>
                            <v-icon>{{ item.icon }}</v-icon>
                        </v-list-item-icon>

                        <v-list-item-content>
                            <v-list-item-title>{{ item.title }}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </template>
            </v-list>
        </v-navigation-drawer>
    </div>
</template>

<script>
import {mapGetters, mapActions} from "vuex";
import Button from '../components/Button'

export default {
    name: "Header",
    computed: {
        ...mapGetters("auth", ["getLogoutLoaderFlag", "getIsSignedIn"]),
        ...mapGetters('others',['getDrawer']),
        drawer:{
            get: function () {
                return this.getDrawer
            },
            set: function (newValue) {
                this.defineDrawerFlag(newValue)
            }
        }
    },
    methods: {
        ...mapActions("auth", ["logoutAll", "logout", "setDrawerSideBar"]),
        ...mapActions('others',['setDrawer','unsetDrawer','defineDrawerFlag','toggleDrawer']),
        async signOut() {
            await this.logout();
            await this.unsetDrawer();
            await this.$router.push("/auth/signIn");
        },
        async signOutAll() {
            await this.logoutAll();
            await this.unsetDrawer();
            await this.$router.push("/auth/signIn");
        },

    },
    components: {
        Button
    },
    watch: {

    },
    data() {
        return {

            dialog: false,
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
                },
              {
                title: 'Projects',
                icon: 'mdi-file-code',
                link: '/archive/project'
              },
            ]
        }
    },
    mounted() {

    }
};
</script>

<style>
</style>
