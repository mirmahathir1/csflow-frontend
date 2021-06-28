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
                v-model="searchText"
                @click="search"
            >
              <template v-slot:append-outer>
                <v-slide-x-reverse-transition
                  mode="out-in"
                >
                  <v-icon key="`icon-5" @click="search" v-text="'mdi-magnify'"></v-icon>
                </v-slide-x-reverse-transition>
              </template>
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
                <v-menu offset-y>
                  <template v-slot:activator="{ on, attrs }">
                    <v-badge
                      :content="messages"
                      :value="messages"
                      color=""
                      overlap
                      class="ml-2"
                      
                    >
                      <v-btn
                        class="mx-2"
                        fab
                        dark
                        small
                        color="primary"
                        v-bind="attrs"
                        v-on="on"
                      >
                        <v-icon>
                          mdi-bell
                        </v-icon>
                      </v-btn>
                    </v-badge>
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
                <v-list-item
                    v-if="getIsAdmin"
                    @click="setAdminDash"
                    style="text-decoration:none"
                >
                  <v-list-item-icon>
                    <v-icon>mdi-account-cowboy-hat</v-icon>
                  </v-list-item-icon>

                  <v-list-item-content>
                    <v-list-item-title>Admin Dash</v-list-item-title>
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

<!--              Admin Dash-->
              <template v-if="getAdminDash">
                <v-list-item class="text-center">
                  <v-card-text class="text-body-1 grey--text text--darken-2">
                    Admin Dash
                  </v-card-text>
                </v-list-item>

                <v-list-item
                    @click="unsetAdminDash"
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

                <template v-for="(item,index) in adminItems">
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
                      class="grey lighten-4 my-3 pb-1"
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
                  <v-list-item
                      v-if="getIsAdmin"
                      @click="setAdminDash"
                      style="text-decoration:none"
                  >
                    <v-list-item-icon>
                      <v-icon>mdi-account-cowboy-hat</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                      <v-list-item-title>Admin Dash</v-list-item-title>
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
                      class="grey lighten-4 my-3 pb-1"
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

<!--              Admin Dash-->
              <template v-if="getAdminDash">
                <v-list-item class="text-center">
                  <v-card-text class="text-body-1 grey--text text--darken-2">
                    Admin Dash
                  </v-card-text>
                </v-list-item>

                <v-list-item
                    @click="unsetAdminDash"
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

                <template v-for="(item,index) in adminItems">
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
                      class="grey lighten-4 my-3 pb-1"
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
        ...mapGetters("auth", ["getLogoutLoaderFlag", "getIsSignedIn", "getIsCR", "getIsAdmin"]),
        ...mapGetters('others',['getDrawer', 'getPrivilegedDash', 'getMainDash', 'getAdminDash']),
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
        ...mapActions('others',['setDrawer','unsetDrawer','defineDrawerFlag','toggleDrawer', 'setPrivilegedDash',
                                'unsetPrivilegedDash', 'setAdminDash', 'unsetAdminDash']),
        ...mapActions('post',['searchPost']),
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
        search(){
          if(this.searchText!=null){
            let data={
              'payload':{
                'text':this.searchText,
                'courseId':null,
                'book':null,
                'topic':null,
                'level':null,
                'term':null
              },
              'params':{
                'skip':0,
                'limit':10
              }
            }
            this.searchPost(data)
            .then(response=>{
              this.$router.push('/search')
            })
            .catch(e=>{

            })
          }else{
            console.log('okkkkk')
          }
        }

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
            searchText:null,
            messages:99,
            items: [
                {
                    title: 'Relevant',
                    icon: 'mdi-newspaper-variant-multiple',
                    link: '/search/relevant'
                },
                {
                    title: 'Search',
                    icon: 'mdi-magnify',
                    link: '/search/advanced'
                },
                {
                    title: 'Create Post',
                    icon: 'mdi-plus-thick',
                    link: '/post/create'
                },
                {
                    title: 'Unanswered',
                    icon: 'mdi-help',
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
                    icon: 'mdi-tag-plus-outline',
                    link: '/privileged/tag/requested',
                  },
                ]
              },
              {
                title: 'Report Manager',
                icon: 'mdi-alert',
                hasChildren: true,
                children: [
                  {
                    title: 'Posts',
                    icon: 'mdi-post',
                    link: '/privileged/report/post'
                  },
                  {
                    title: 'Answers',
                    icon: 'mdi-message-reply-text',
                    link: '/privileged/report/answer'
                  },
                  {
                    title: 'Comments',
                    icon: 'mdi-comment-outline',
                    link: '/privileged/report/comment'
                  },
                ],
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
                ]
              },
            ],
            adminItems: [
              {
                title: 'User Manager',
                icon: 'mdi-account',
                link: '/admin/user'
              },
              // {
              //   title: 'Guest Manager',
              //   icon: 'mdi-account-outline',
              //   link: '/privileged/guest'
              // },
              // {
              //   title: 'SQL Interface',
              //   icon: 'mdi-database-search',
              //   link: '/privileged/sqlInterface'
              // },
              // {
              //   title: 'Archive Manager',
              //   icon: 'mdi-share-variant',
              //   hasChildren: true,
              //   children: [
              //     {
              //       title: 'Theses',
              //       icon: 'mdi-school',
              //       link: '/admin/archive/thesis',
              //     },
              //     {
              //       title: 'Projects',
              //       icon: 'mdi-file-code',
              //       link: '/admin/archive/project',
              //     },
              //   ],
              // },
              {
                title: 'Course Manager',
                icon: 'mdi-teach',
                link: '/admin/course',
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
