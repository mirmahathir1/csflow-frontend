<template>
  <div>
    <PaddedContainerWithoutLeft>
      <v-card color="white" elevation="2" class="rounded-lg px-5 pt-8 pb-4 mt-6">
        <v-row align="center">
          <v-avatar size="150px" class="mx-auto mt-2">
            <img alt="Avatar" :src="getProfilePic" />
          </v-avatar>
        </v-row>
        <v-container>
          <v-form ref="form" class="mt-6">
            <v-row>
              <v-spacer></v-spacer>
              <v-col cols="12" md="4" v-if="!$isMobile()">
                <v-card-text class="text-left text--black text-body-1 pt-3 pl-7">Name</v-card-text>
              </v-col>
              <v-col cols="12" md="5">
                <v-card-text
                  v-if="$isMobile()"
                  class="text-left text--black text-body-1 pb-3 pl-4"
                >Name</v-card-text>
                <v-text-field
                  outlined
                  class="rounded-lg"
                  dense
                  v-model="name"
                  :value="name"
                  @blur="$v.name.$touch()"
                ></v-text-field>
              </v-col>
              <v-spacer></v-spacer>
            </v-row>
            <v-row>
              <v-spacer></v-spacer>
              <v-col cols="12" md="5" class="py-0">
                <v-card-text class="text-left text--black text-body-1 pt-3 pl-0">Change password</v-card-text>
              </v-col>
              <v-col cols="12" md="5" v-if="!$isMobile()"></v-col>
              <v-col md="3"></v-col>
              <v-spacer></v-spacer>
            </v-row>
            <v-row>
              <v-spacer></v-spacer>
              <v-col cols="12" md="4" v-if="!$isMobile()">
                <v-card-text class="text-left text--black text-body-1 pt-3 pl-7">Old password</v-card-text>
              </v-col>
              <v-col cols="12" md="5">
                <v-card-text
                  v-if="$isMobile()"
                  class="text-left text--black text-body-1 pb-3 pl-4"
                >Old password</v-card-text>
                <v-text-field
                  outlined
                  class="rounded-lg"
                  dense
                  type="password"
                  v-model="oldPassword"
                  @blur="$v.oldPassword.$touch()"
                ></v-text-field>
              </v-col>
              <v-spacer></v-spacer>
            </v-row>
            <v-row>
              <v-spacer></v-spacer>
              <v-col cols="12" md="4" v-if="!$isMobile()">
                <v-card-text class="text-left text--black text-body-1 pt-3 pl-7">New password</v-card-text>
              </v-col>
              <v-col cols="12" md="5">
                <v-card-text
                  v-if="$isMobile()"
                  class="text-left text--black text-body-1 pb-3 pl-4"
                >New password</v-card-text>
                <v-text-field
                  outlined
                  class="rounded-lg"
                  dense
                  v-model="newPassword"
                  type="password"
                  value
                  @blur="$v.newPassword.$touch()"
                ></v-text-field>
              </v-col>
              <v-spacer></v-spacer>
            </v-row>
            <v-row>
              <v-btn
                color="primary"
                class="mx-auto mt-4"
                @click="save"
                :loading="loading"
                rounded
              >Save</v-btn>
            </v-row>

            <v-alert class="mt-5" dense outlined type="error" v-if="anyError">{{ message }}</v-alert>
          </v-form>
        </v-container>
      </v-card>
      <template v-slot:right>
        <v-sheet rounded="lg" class="pa-8 mx-auto rounded-lg mt-6">
          <v-row justify="center">Delete My Profile</v-row>
          <v-row>
            <v-btn
              color="error"
              class="mx-auto mt-4"
              block
              @click="deleteProfile"
              :loading="deleteClicked"
            >Delete</v-btn>
          </v-row>
        </v-sheet>
      </template>
    </PaddedContainerWithoutLeft>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { required,email,sameAs } from 'vuelidate/lib/validators'
import PaddedContainerWithoutLeft from "../../components/PaddedContainerWithoutLeft";
export default {
  name: "EditProfile",
  title() {
    return "Edit Profile";
  },
  components: {
    PaddedContainerWithoutLeft
  },
  computed: {
    ...mapGetters("user", ["getLoadedUser"]),
    getProfilePic(){
      return this.getLoadedUser==null?'':this.getLoadedUser.profilePic
    }
  },
  data: () => ({
    name: null,
    oldPassword: null,
    newPassword: null,
    loading: false,
    message: null,
    anyError: false,
    deleteClicked: false
  }),
  validations:{
      oldPassword:{

      },
      newPassword:{

      },
      name:{

      }
  },
  methods: {
    ...mapActions("user", ["deleteUser", "changePassword", "changeName","getProfile"]),
    save() {
      this.loading = true;
      if (this.newPassword != null) {
        this.changePassword({
          oldPassword: this.oldPassword,
          newPassword: this.newPassword
        })
          .then(response => {
            this.anyError = false;
          })
          .catch(e => {
            this.anyError = true;
            this.message = e.response.data.message;
          });
      }
      if (this.name != this.getLoadedUser.name) {
        this.changeName({ name: this.name })
          .then(response => {})
          .catch(e => {});
      }
      this.loading = false;
    },
    deleteProfile() {
      this.deleteClicked = true;
      this.deleteUser()
        .then(response => {})
        .catch(e => {})
        .finally(() => {
          this.deleteClicked = false;
        });
    }
  },
  // watch:{
  //   '$route'(to,from){
  //     this.getProfile('me')
  //   }
  // },
  created(){
    this.getProfile('me')
  },
  mounted(){
    
  }
};
</script>

<style>
</style>