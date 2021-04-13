<template>
    <v-app id="app">

        <!-- <AppBar></AppBar> -->
        <Header></Header>
        <SideBar></SideBar>
        <v-main class="grey lighten-3">
          <v-container>
            <v-row>
              <v-col
                  cols="12"
                  sm="2"
              >

                <!-- <SideBar></SideBar> -->
              </v-col>
              <router-view></router-view>
              <v-col
                  cols="12"
                  sm="2"
              >
<!--                <v-sheet-->
<!--                    rounded="lg"-->
<!--                    min-height="268"-->
<!--                >-->
<!--                </v-sheet>-->
              </v-col>
            </v-row>
          </v-container>
        </v-main>
    </v-app>
</template>

<script>

import AppBar from "./components/AppBar";
import Header from "./components/Header"
import SideBar from "./components/SideBar"
export default {
    name: 'App',
    computed:{

    },
    components: {
        AppBar,
        Header,
        SideBar
    },


};
</script>
