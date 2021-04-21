<template>
  <PaddedContainer>
  <!-- <v-row class="pa-6 my-auto">
      <v-col class="my-auto"> -->
        <v-card
            height="100px"
            class=""
        >
            <v-row :class="$isMobile() ?'pa-2':'pa-5 mt-2'">
                <v-card-text class="">
                    <p class="text-center">Welcome.You have been redirected to
                      this page for resetting your password
                    </p>
                </v-card-text>
            </v-row>
        </v-card>
        <v-sheet
            :min-width="$isMobile() ?'30vh':'60vh'"
            rounded="lg"
            class="pa-6 mt-3 mx-auto"
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
                        @click="signin"
                        :disabled="loading || $v.$anyError"
                        :loading="loading"
                        rounded
                    >
                        Sign In
                    </v-btn>
                </v-row>

            </v-form>
        </v-sheet>
      <!-- </v-col>
  </v-row> -->
  </PaddedContainer>
</template>

<script>
import { required,sameAs } from 'vuelidate/lib/validators'
import PaddedContainer from "../../components/PaddedContainer"
export default {
    name:"",
    title(){
        return "Recover Password"
    },
  data: ()=>({
    username:'Mahathir Mohammad',
    newPassword:'',
    confirmPassword:'',
    loading:false
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
    signin(){
      this.loading=true;
      this.$v.$touch();
        if(this.$v.$error){
          return;
        }
        this.$router.push('/auth/password/reset')
    }
  },
  components:{
      PaddedContainer
  }
}
</script>

<style>

</style>