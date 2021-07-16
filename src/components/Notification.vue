<template>
  <v-menu min-width="300px" max-width="300px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
          class="mx-2"
          fab
          dark
          small
          color="primary"
          v-bind="attrs"
          v-on="on"
          @click="fetchNotificaitons"
      >
        <v-icon>
          mdi-bell
        </v-icon>
      </v-btn>
    </template>

    <v-list v-if="notificationLoader" style="height: 300px; overflow-y: scroll">
      <v-list-item>
        <v-list-item-title>
          <v-progress-circular color="primary" indeterminate>
          </v-progress-circular>
        </v-list-item-title>
      </v-list-item>
      <v-list-item>
      </v-list-item>
    </v-list>

    <v-list v-else  style="height: 300px; overflow-y: scroll">
      <v-list-item v-for="(item,idx) in notifications" :key="idx" @click="$router.push(item.link)" style="text-decoration:none">
        <p>{{ item.text }}</p>
      </v-list-item>
    </v-list>
  </v-menu>

</template>

<script>
import {csflowAPI} from "../api";

export default {
  name: "Notification",
  data() {
    return {
      notificationLoader: false,
      notifications: [
      ],
    }
  },
  methods: {
    async fetchNotificaitons(){


      this.notificationLoader = true;
      try{
        let response = await csflowAPI.get('/notification');
        this.notifications = response.data.payload
      }catch (e) {

      }finally {
        this.notificationLoader = false;
      }

    }
  }

}
</script>

<style scoped>

</style>
