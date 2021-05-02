<template>
  <PaddedContainer>
  <!-- <v-row class="pa-6 my-auto">
      <v-col class="my-auto"> -->
        <v-card
            height="100px"
            class=""
        >
            <v-row :class="$isMobile() ?'pa-2':'pa-5 mt-2'">
                <v-card-text class="" v-if="!isSuccessful">
                    <p class="text-center">Welcome.You have been redirected to
                      this page for resetting your password
                    </p>
                </v-card-text>
            </v-row>
        </v-card>
        <v-sheet
            :max-width="$isMobile()?'80vw':'30vw'"
            :min-width="$isMobile()?'30vw':'30vw'"
            rounded="lg"
            class="pa-6 mt-3 mx-auto"
            v-if="!isSuccessful"
        >
           
            <v-toolbar-title class="mx-auto text-center">
                Password Reset
            </v-toolbar-title>
            <v-form
                ref="form"
            >
                <v-text-field
                    v-model="newPassword"
                    label="New Password"
                    required
                    type="password"
                    @blur="$v.newPassword.$touch()"
                    :error="$v.newPassword.$error"
                    :error-messages="$v.newPassword.$error?'Please input a strong password':null"
                ></v-text-field>

                <v-text-field
                    v-model="confirmPassword"
                    label="Confirm Password"
                    required
                    type="password"
                    @blur="$v.confirmPassword.$touch()"
                    :error="$v.confirmPassword.$error"
                    :error-messages="$v.confirmPassword.$error?'password doesn\'t match':null"
                ></v-text-field>

                <v-row>
                    <v-btn
                        color="primary"
                        class="mx-auto mt-6"
                        @click="recover"
                        :disabled="loading || $v.$anyError"
                        :loading="loading"
                        rounded
                    >
                        Recover
                    </v-btn>
                </v-row>

                <v-alert
                    class="mt-5"
                    dense
                    outlined
                    type="error"
                    v-if="error"
                >
                    {{ message }}
                </v-alert>
            </v-form>
        </v-sheet>
    <v-card
        :height="$isMobile()?'60px':'100px'"
        class="mb-4 mx-auto"
        :max-width="$isMobile()?'80vw':'70vw'"
        :min-width="$isMobile()?'30vw':'30vw'"
        v-if="isSuccessful"
    >
        <v-row class="pa-5 mt-2">
            <v-spacer></v-spacer>
            <v-card-subtitle class="black--text text-center">
                Success!!Log in to continue
            </v-card-subtitle>
            <v-spacer></v-spacer>
        </v-row>
        <v-row class="justify-content-center">
            <v-btn
                color="primary"
                class="ma-2"
                @click="$router.push('/auth/signIn')"
                rounded
            >
            Sign In
            </v-btn>
        </v-row>
    </v-card>
  </PaddedContainer>
</template>

<script>
import {mapGetters,mapActions} from 'vuex';
import { required,sameAs } from 'vuelidate/lib/validators'
import PaddedContainer from "../../components/PaddedContainer1"
export default {
    name:"",
    title(){
        return "Recover Password"
    },
  data: ()=>({
    username:'Mahathir Mohammad',
    newPassword:'',
    confirmPassword:'',
    loading:false,
    token:null,
    error:false,
    message:null,
    isSuccessful:false
  }),
  validations:{
        newPassword: {
            required,
        },
        confirmPassword:{
            sameAsPassword:sameAs('newPassword')
        }
  },
  methods:{
      ...mapActions('auth',['recoverPassword']),
    recover(){
        this.loading=true;
        this.$v.$touch();
        if(this.$v.$error){
          return;
        }
        this.recoverPassword({token: this.token,password: this.newPassword})
            .then(response=>{
                this.isSuccessful=true
                // this.$router.push('/search/relevant')
            }).catch(e=>{
                this.error=true;
                this.message=e.response.data.message;
            }).finally(()=>{
                this.loading=false;
            })
    }
  },
  components:{
      PaddedContainer
  },
  mounted(){
      this.isSuccessful=false
    this.token=this.$route.query.token
  }

}
</script>

<style>

</style>