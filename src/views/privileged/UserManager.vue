<template>
  <padded-container>
    <page-header>User Manager</page-header>
    <v-card
        class="rounded-lg"
    >

    </v-card>
    <user-card class="ml-12 mt-12"></user-card>

    <user-card class="ml-12 mt-12"
               name="Mir Mahathir Mohammad" :ID="1605011" :karma="100"
               image="https://storage.googleapis.com/csflow-buet.appspot.com/profile-pic/162013689652715227032.jpg"
    ></user-card>
  </padded-container>
</template>

<script>
import UserCard from "@/components/Card/UserCard";
import PaddedContainer from "@/components/PaddedContainer";
import PageHeader from "@/components/PageHeader";
export default {
  name: "UserManager",
  components: {PageHeader, PaddedContainer, UserCard},
}
</script>

<style scoped>

</style>