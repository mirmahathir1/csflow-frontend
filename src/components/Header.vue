<template>
    <div>
        <v-app-bar
            color="#4169e1"
            dense
            dark
            app
            clipped-left
        >
            <v-app-bar-nav-icon v-if="getIsSignedIn && $isMobile()" @click.stop="toggleDrawer"></v-app-bar-nav-icon>
            <!-- <v-app-bar-nav-icon v-if="getIsSignedIn && !$isMobile()" ></v-app-bar-nav-icon> -->
            <v-toolbar-title @click="$router.push('/home')">
              CSFLOW
            </v-toolbar-title>

            <v-spacer></v-spacer>
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

                <v-menu left bottom>
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
        <v-navigation-drawer app clipped v-model="drawer" v-if="getIsSignedIn && $isMobile()">
            <v-list
                dense
                nav
            >
<!--              Main Dash-->
              <template v-if="getMainDash">
                <template v-for="(item, index) in items">
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
                <v-list-item
                    v-if="getIsCR"
                    @click="setPrivilegedDash"
                    style="text-decoration:none"
                >
                  <v-list-item-icon>
                    <v-icon>mdi-account-star</v-icon>
                  </v-list-item-icon>

                  <v-list-item-content>
                    <v-list-item-title>Privileged Dash</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </template>

<!--              Privileged Dash-->
              <template v-if="getPrivilegedDash">
                <v-list-item class="text-center">
                  <v-card-text class="text-body-1 grey--text text--darken-2">
                    Privileged Dash
                  </v-card-text>
                </v-list-item>

                <v-list-item
                    @click="unsetPrivilegedDash"
                    style="text-decoration:none"
                    class="grey lighten-4 my-3"
                >
                  <v-list-item-icon>
                    <v-icon>mdi-arrow-left</v-icon>
                  </v-list-item-icon>

                  <v-list-item-content>
                    <v-list-item-title>Back</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>

                <template v-for="(item,index) in privilegedItems">
                  <v-list-item
                      v-if="!item.hasChildren"
                      :to="item.link"
                      :key="index"
                      style="text-decoration:none"
                      class="grey lighten-4 my-3"
                  >
                    <v-list-item-icon>
                      <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                      <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>

                  <v-list-group
                      v-if="item.hasChildren"
                      :value="false"
                      :prepend-icon="item.icon"
                      style="text-decoration:none"
                      class="grey lighten-4 my-3"
                  >
                    <template v-slot:activator>
                      <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </template>

                    <v-list-item
                        v-for="child in item.children"
                        :key="child.title"
                        :to="child.link"
                        style="text-decoration:none"
                        class="grey lighten-4 my-3 ml-5"
                    >
                      <v-list-item-icon>
                        <v-icon>{{ child.icon }}</v-icon>
                      </v-list-item-icon>

                      <v-list-item-content>
                        <v-list-item-title>{{ child.title }}</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>

                  </v-list-group>
                </template>
              </template>
            </v-list>
        </v-navigation-drawer>



        <v-navigation-drawer app clipped v-if="getIsSignedIn && !$isMobile()">
            <v-list
                dense
                nav
            >
<!--              Main Dash-->
              <template v-if="getMainDash">
                  <template v-for="(item, index) in items">
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
                  <v-list-item
                      v-if="getIsCR"
                      @click="setPrivilegedDash"
                      style="text-decoration:none"
                  >
                    <v-list-item-icon>
                      <v-icon>mdi-account-star</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                      <v-list-item-title>Privileged Dash</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
              </template>

<!--              Privileged Dash-->
              <template v-if="getPrivilegedDash">
                <v-list-item class="text-center">
                  <v-card-text class="text-body-1 grey--text text--darken-2">
                    Privileged Dash
                  </v-card-text>
                </v-list-item>

                <v-list-item
                    @click="unsetPrivilegedDash"
                    style="text-decoration:none"
                    class="grey lighten-4 my-3"
                >
                  <v-list-item-icon>
                    <v-icon>mdi-arrow-left</v-icon>
                  </v-list-item-icon>

                  <v-list-item-content>
                    <v-list-item-title>Back</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>

                <template v-for="(item,index) in privilegedItems">
                  <v-list-item
                      v-if="!item.hasChildren"
                      :to="item.link"
                      :key="index"
                      style="text-decoration:none"
                      class="grey lighten-4 my-3"
                  >
                    <v-list-item-icon>
                      <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                      <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>

                  <v-list-group
                      v-if="item.hasChildren"
                      :value="false"
                      :prepend-icon="item.icon"
                      style="text-decoration:none"
                      class="grey lighten-4 my-3"
                  >
                    <template v-slot:activator>
                      <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </template>

                    <v-list-item
                        v-for="child in item.children"
                        :key="child.title"
                        :to="child.link"
                        style="text-decoration:none"
                        class="my-3 ml-5 grey lighten-3"
                    >
                      <v-list-item-icon>
                        <v-icon>{{ child.icon }}</v-icon>
                      </v-list-item-icon>

                      <v-list-item-content>
                        <v-list-item-title>{{ child.title }}</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>

                  </v-list-group>
                </template>
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
        ...mapGetters("auth", ["getLogoutLoaderFlag", "getIsSignedIn", "getIsCR"]),
        ...mapGetters('others',['getDrawer', 'getPrivilegedDash', 'getMainDash']),
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
        ...mapActions('others',['setDrawer','unsetDrawer','defineDrawerFlag','toggleDrawer', 'setPrivilegedDash', 'unsetPrivilegedDash']),
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
            inPrivilegedDash: false,
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
            ],
            privilegedItems: [
              {
                title: 'User Manager',
                icon: 'mdi-account',
                link: '/privileged/user'
              },
              {
                title: 'Tag Manager',
                icon: 'mdi-link-variant',
                hasChildren: true,
                children: [
                  {
                    title: 'Existing Tags',
                    icon: 'mdi-tag',
                    link: '/privileged/tag/existing',
                  },
                  {
                    title: 'Requested Tags',
                    icon: 'mdi-tag-multiple',
                    link: '/privileged/tag/requested',
                  },
                  {
                    title: 'Create Tag',
                    icon: 'mdi-tag-plus-outline',
                    link: '/privileged/tag/new',
                  },
                ]
              },
              {
                title: 'Report Manager',
                icon: 'mdi-alert',
                link: '/privileged/report'
              },
              {
                title: 'Shared Items',
                icon: 'mdi-share-variant',
                hasChildren: true,
                children: [
                  {
                    title: 'Resources',
                    icon: 'mdi-folder',
                    link: '/privileged/archive/resource',
                  },
                  {
                    title: 'Projects',
                    icon: 'mdi-file-code',
                    link: '/privileged/archive/project',
                  },
                ]
              },
            ],
        }
    },
    mounted() {

    }
};
</script>

<style>
</style>
