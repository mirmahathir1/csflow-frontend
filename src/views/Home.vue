<template>
  <div>
    <PaddedContainer>
      <PageHeader>
            Relevant Posts
      </PageHeader>
      <v-row
        v-for="user in usersPage" :key="user.id"
        class="my-2"
      >
        <post-box>
        </post-box>
      </v-row>
      <template v-slot:right v-if="!getLoaderFlag('users')">
        <v-sheet
          rounded="lg"
          class="pa-8 mx-auto"
        >
          <v-row align="center">Top Contributors</v-row>
          <hr>
          <v-row
            v-for="user in usersPage" :key="user.id"
            class="my-2"
          >
            <user-card
              :small="true"
              :name="user['name']"
              :ID="user['studentId']"
              :karma="parseInt(user['karma'])"
              :image="user['image']"
              class="mx-auto"
              @click.native="$router.push('/user/' + user['studentId'])"
            ></user-card>
          </v-row>
          <v-row>
            <v-col cols="12" class="px-0">
              <div class="mx-auto mb-3 mt-5">
                <v-pagination
                    v-model="page"
                    :length="pages"
                    circle
                    :total-visible="$isMobile() ? 6 : 7"
                ></v-pagination>
              </div>
            </v-col>
          </v-row>
        </v-sheet>

        <v-sheet
          rounded="lg"
          class="mt-3 pa-8 mx-auto"
        >
          <v-row align="center">Popular Posts</v-row>
          <hr>
          <v-row
            v-for="user in usersPage" :key="user.id"
            class="my-3"
          >
            <post-card
              :text="'What is your name?What is your name?What is your name?'"
              :votes="50"
              class="mx-auto"
              @click.native="$router.push('/user/' + 1605026)"
            ></post-card>
          </v-row>
          <v-row>
            <v-col cols="12" class="px-0">
              <div class="mx-auto mb-3 mt-5">
                <v-pagination
                    v-model="page"
                    :length="pages"
                    circle
                    :total-visible="$isMobile() ? 6 : 7"
                ></v-pagination>
              </div>
            </v-col>
          </v-row>
        </v-sheet>
      </template>
      <details-loader v-else></details-loader>
    </PaddedContainer>
  </div>
</template>

<script>
import PaddedContainer from "../components/PaddedContainerWithoutLeft"
import PageHeader from "@/components/PageHeader"
import UserCard from "@/components/Card/UserCardForContributor"
import PostCard from "@/components/Card/PostCard.vue"
import PostBox from "@/components/Post/postBox.vue"
import DetailsLoader from "@/components/DetailsLoader"
import { mapGetters, mapActions } from 'vuex'
export default {
    name: 'Home',
    title(){
        return 'Home';
    },
    data(){
      return{
        page: 1,
        pageSize: 5,
      };
    },
    components:{
      PaddedContainer,
      UserCard,
      DetailsLoader,
      PageHeader,
      PostCard,
      PostBox
    },
    computed:{
      ...mapGetters('privileged', ['getLoaderFlag', 'getUsers']),
      users() {
        let ret = [];
        if (this.getUsers) {
          ret = this.getUsers.sort((a, b) => Number(a['karma']) < Number(b['karma']) ? 1 : -1);
          ret = [...ret];
        }
        return ret;
      },
      usersPage() {
        return this.users.slice((this.page-1)*this.pageSize, this.page*this.pageSize);
      },
      pages() {
        if (this.getUsers) {
          return Math.ceil(this.users.length/this.pageSize);
        }
      },
      postaPage(){
        
      }
    },
    methods: {
      ...mapActions('privileged', ['loadUsers']),
    },
    mounted() {
      this.loadUsers();
    },
}
</script>

<style>

</style>