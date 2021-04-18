<template>
    <v-app id="app">

        <!-- <AppBar></AppBar> -->
        <Header></Header>
<!--        <SideBar></SideBar>-->
        <v-main class="grey lighten-3">
          <router-view></router-view>
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
