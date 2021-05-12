<template>
    <v-app id="app">

        <!-- <AppBar></AppBar> -->
        <Header></Header>
<!--        <SideBar></SideBar>-->
        <v-main class="grey lighten-3">
          <router-view v-if="!showSignInDialog"></router-view>
          <sign-in-dialog v-else></sign-in-dialog>
        </v-main>
    </v-app>
</template>

<script>

import AppBar from "./components/AppBar";
import Header from "./components/Header"
import SideBar from "./components/SideBar"
import SignInDialog from "@/components/SignInDialog";
export default {
    name: 'App',
    computed:{
      showSignInDialog() {
        return this.$store.getters['auth/getSignInDialogFlag'];
      }
    },
    components: {
      SignInDialog,
        AppBar,
        Header,
        SideBar
    },


};
</script>
