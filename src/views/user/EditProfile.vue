<template>
  <div>
    <PaddedContainerWithoutLeft>
      <v-card color="white" elevation="2" class="rounded-lg px-5 pt-8 pb-4 mt-6">
        <v-row align="center">
          <!-- <v-avatar size="150px" class="mx-auto mt-2">
            <img alt="Avatar" :src="getLoadedUser.profilePic" />
          </v-avatar> -->
          <v-spacer></v-spacer>
          <v-col cols="12" md="4" v-if="!$isMobile()">
            <v-card-text class="text-left text--black text-body-1 pt-3 pl-7">Profile Picture</v-card-text>
          </v-col>
          <v-col cols="12" md="5">
            <v-card-text
              v-if="$isMobile()"
              class="text-left text--black text-body-1 pb-3 pl-4"
            >Profile Picture</v-card-text>
            <v-file-input
              v-model.trim="image"
              outlined
              rounded-lg
              dense
              prepend-icon="mdi-camera"
              @blur="$v.image.$touch()"
              accept="image/png, image/jpeg, image/jpg"
              label=".jpg .jpeg .png"
            ></v-file-input>
          </v-col>
          <v-spacer></v-spacer>
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
                  :error="$v.name.$error"
                  :error-messages="nameErrors"
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
                  :error="$v.oldPassword.$error"
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
                  :error="$v.newPassword.$error"
                  :error-messages="newPasswordErrors"
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
                :disabled="$v.$anyError"
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
          <!-- <v-row>
            <v-btn
              color="error"
              class="mx-auto mt-4"
              block
              @click="deleteProfile"
              :loading="deleteClicked"
            >Delete</v-btn>
          </v-row> -->

          <div class="text-center mt-6">
            <v-dialog
              v-model="dialog"
              width="500"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="red lighten-2"
                  dark
                  v-bind="attrs"
                  v-on="on"
                >
                  Delete
                </v-btn>
              </template>

              <v-card>
                <v-card-title class="headline grey lighten-2">
                  Delete Account
                </v-card-title>

                <v-card-text>
                  Your account will be removed. You will have to create an account again if you want to use this platform again.
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="primary"
                    :loading="deleteClicked"
                    @click="deleteProfile"
                  >
                    I accept
                  </v-btn>
                  <v-btn
                    @click="dialog = false"
                    color="red lighten-2"
                  >
                    Close
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </div>

        </v-sheet>
      </template>
    </PaddedContainerWithoutLeft>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { required,email,sameAs,minLength } from 'vuelidate/lib/validators'
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
    },
    nameErrors(){
      const errors=[]

      if(this.name!=null){
        !this.$v.name.minLength && errors.push('Must be at least 4 characters')
      }
      return errors
    },
    newPasswordErrors(){
      const errors=[]

      if(this.newPassword!=null){
        !this.newPassword.minLength && errors.push('Password must contain at least 6 characters')
      }

      return errors
    }
  },
  data: () => ({
    image:null,
    name: null,
    oldPassword: null,
    newPassword: null,
    loading: false,
    message: null,
    anyError: false,
    deleteClicked: false,
    dialog:false,
  }),
  validations:{
      oldPassword:{

      },
      newPassword:{
        minLength:minLength(6),
      },
      name:{
        minLength: minLength(4),
      },
      image:{

      }
  },
  methods: {
    ...mapActions("user", ["deleteUser", "changePassword", "changeName","getProfile","uploadImage"]),
    ...mapActions("auth",["logoutAll"]),
    async save() {
      this.loading = true;
      if(this.image!=null){
        console.log(this.image)
        let formData=new FormData();
        formData.append('image',this.image);
        await this.uploadImage(formData);
      }

      if (this.newPassword != null) {
        let error = await this.changePassword({
          oldPassword: this.oldPassword,
          newPassword: this.newPassword
        })
          if(error===null){
            this.anyError = false;
          }else{
            this.anyError = true;
            this.message = error.response.data.message;
          }
      }

      if (this.name != null) {
       await this.changeName({ name: this.name })
      }

      if(!this.anyError){
        this.$router.push('/user/me')
      }
      this.loading = false;
    },
    async deleteProfile() {
      this.deleteClicked = true;
      try{
        let response=await this.deleteUser()   
        await this.logoutAll()
        this.$router.push('/')
        
      }catch(e){

      }finally{
        this.deleteClicked = false;
      }
    }
  },
  // watch:{
  //   '$route'(to,from){
  //     this.getProfile('me')
  //   }
  // },
  created(){
    // this.getProfile('me')
    // this.name=this.getLoadedUser.name
  },
  mounted(){
    
  }
};
</script>

<style>
</style>