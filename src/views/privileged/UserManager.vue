<template>
  <padded-container>
    <page-header>User Manager</page-header>

    <v-card
        v-if="!getLoaderFlag('users')"
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
          v-for="user in usersPage" :key="user.id"
          class="my-2"
      >
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-col cols="5" md="4" class="text-center">
          <v-card-text class="text-body-2 text-md-body-1">
            {{ user['studentId'] }}
          </v-card-text>
        </v-col>
        <v-col cols="7" md="5">
          <user-card
              :small="$isMobile()"
              :name="user['name']"
              :ID="user['studentId']"
              :karma="parseInt(user['karma'])"
              :image="user['image']"
              class="mx-auto"
              @click.native="$router.push('/user/' + user['studentId'])"
          ></user-card>
        </v-col>
        <v-spacer></v-spacer>
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
    </v-card>
    <details-loader v-else></details-loader>

  </padded-container>
</template>

<script>
import UserCard from "@/components/Card/UserCard";
import PaddedContainer from "@/components/PaddedContainer";
import PageHeader from "@/components/PageHeader";
import { mapGetters, mapActions } from 'vuex';
import DetailsLoader from "@/components/DetailsLoader";

export default {
  name: "UserManager",
  components: {DetailsLoader, PageHeader, PaddedContainer, UserCard},
  title() {
    return 'User Manager';
  },
  data() {
    return {
      page: 1,
      pageSize: 10,
    };
  },
  computed: {
    ...mapGetters('privileged', ['getLoaderFlag', 'getUsers']),
    users() {
      let ret = [];
      if (this.getUsers) {
        ret = this.getUsers;
        ret.sort((a, b) => a['studentId'] < b['studentId'] ? -1 : 1);
        ret = [...ret, ...ret, ...ret, ...ret,];
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
    buttons() {
      if (this.getUsers) {
        if (this.pages > 1) {
          let ret = [];
          ret.push(1);

          if (this.pages === 3) {
            ret.push(2);
          } else if (this.pages > 3) {
            if (this.page === 1) {
              ret.push(2);
              ret.push(0);
            } else if (this.page === this.pages) {
              ret.push(0);
              ret.push(this.pages-1);
            } else {
              if (this.page > 2) {
                ret.push(0);
              }
              ret.push(this.page);
              if (this.page < (this.pages-1)) {
                ret.push(0);
              }
            }
          }

          ret.push(this.pages);

          return ret;
        }
      }

      return [];
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

<style scoped>

</style>