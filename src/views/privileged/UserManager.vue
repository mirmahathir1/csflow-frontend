<template>
  <padded-container>
    <page-header>User Manager</page-header>

    <v-card
        class="rounded-lg px-5 pt-8 pb-4 mt-6"
    >
      <v-row>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-col cols="6" md="4" class="text-center">
          <v-card-text class="text-h6">Student ID</v-card-text>
        </v-col>
        <v-col cols="6" md="5" class="text-center">
          <v-card-text class="text-h6">Profile</v-card-text>
        </v-col>
        <v-spacer></v-spacer>
      </v-row>
      <div class="mx-6">
        <hr class="my-divider">
      </div>

      <v-row
          v-for="user in users" :key="user.id"
          class="my-2"
      >
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-col cols="5" md="4" class="text-center">
          <v-card-text class="text-body-2 text-md-body-1">
            {{ user.ID }}
          </v-card-text>
        </v-col>
        <v-col cols="7" md="5">
          <user-card
              :name="user.name"
              :ID="user.ID"
              :karma="user.karma"
              :image="user.image"
              class="mx-auto"
          ></user-card>
        </v-col>
        <v-spacer></v-spacer>
      </v-row>
    </v-card>
  </padded-container>
</template>

<script>
import UserCard from "@/components/Card/UserCard";
import PaddedContainer from "@/components/PaddedContainer";
import PageHeader from "@/components/PageHeader";
export default {
  name: "UserManager",
  components: {PageHeader, PaddedContainer, UserCard},
  computed: {
    users() {
      return [
        {
          name: 'Navid Bin Hasan',
          ID: 1605005,
          karma: 69,
          image: 'https://storage.googleapis.com/csflow-buet.appspot.com/profile-pic/162063784423617792183.png',
        },
        {
          name: 'Mir Mahathir Mohammad',
          ID: 1605011,
          karma: 100,
          image: "https://storage.googleapis.com/csflow-buet.appspot.com/profile-pic/162013689652715227032.jpg",
        },
        {
         name: 'Md Ashraful Islam',
         ID: 1605001,
         karma: -45,
         image: 'https://storage.googleapis.com/csflow-buet.appspot.com/profile-pic/161884860368716282694.jpg',
        },
        {
          name: 'Navid Bin Hasan',
          ID: 1605005,
          karma: 69,
          image: 'https://storage.googleapis.com/csflow-buet.appspot.com/profile-pic/162063784423617792183.png',
        },
        {
          name: 'Mir Mahathir Mohammad',
          ID: 1605011,
          karma: 100,
          image: "https://storage.googleapis.com/csflow-buet.appspot.com/profile-pic/162013689652715227032.jpg",
        },
        {
          name: 'Md Ashraful Islam',
          ID: 1605001,
          karma: -45,
          image: 'https://storage.googleapis.com/csflow-buet.appspot.com/profile-pic/161884860368716282694.jpg',
        },
        {
          name: 'Navid Bin Hasan',
          ID: 1605005,
          karma: 69,
          image: 'https://storage.googleapis.com/csflow-buet.appspot.com/profile-pic/162063784423617792183.png',
        },
        {
          name: 'Mir Mahathir Mohammad',
          ID: 1605011,
          karma: 100,
          image: "https://storage.googleapis.com/csflow-buet.appspot.com/profile-pic/162013689652715227032.jpg",
        },
        {
          name: 'Md Ashraful Islam',
          ID: 1605001,
          karma: -45,
          image: 'https://storage.googleapis.com/csflow-buet.appspot.com/profile-pic/161884860368716282694.jpg',
        },
      ]
    }
  }
}
</script>

<style scoped>

</style>