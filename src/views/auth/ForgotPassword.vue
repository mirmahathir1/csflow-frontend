<template>
  <PaddedContainer>
  <!-- <v-row class="pa-6 my-auto"> -->
      <!-- <v-col class="justify-content-center"> -->
        <v-card
            :height="$isMobile() ?'100px':'100px'"
            class=""
        >
        </v-card>
        <v-sheet
            :max-width="$isMobile()?'80vw':'30vw'"
            :min-width="$isMobile()?'30vw':'30vw'"
            rounded="lg"
            class="pa-6 mt-3 mx-auto"
            v-if="!isEmailSent"
        >
           
            <v-toolbar-title class="mx-auto text-center">
                Password Reset
            </v-toolbar-title>
            <v-form
                ref="form"
            >
                <v-text-field
                    v-model="email"
                    label="E-mail"
                    required
                    @blur="$v.email.$touch()"
                    :error="$v.email.$error"
                    :error-messages="$v.email.$error?'Please input a valid email':null"
                ></v-text-field>
                <v-subheader class="text-primary text-justify mt-2">
                    We will send a recovery link with this mail.The link will be valid for only 1 hour.
                </v-subheader>
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
        :height="$isMobile()?'100px':'100px'"
        :max-width="$isMobile()?'30vw':'30vw'"
        :min-width="$isMobile()?'30vw':'30vw'"
        class="mb-4 mx-auto"
        v-if="isEmailSent"
    >
        <v-row class="pa-5 mt-2">
            <v-card-subtitle class="black--text text-center mx-auto">
                A mail has been sent to your email
            </v-card-subtitle>
        </v-row>
    </v-card>
  </PaddedContainer>
</template>

<script>
import {mapGetters,mapActions} from 'vuex';
import { required,email } from 'vuelidate/lib/validators'
import PaddedContainer from "../../components/PaddedContainer1"
export default {
    name:"Forgot",
    title(){
        return "Forget Password"
    },
    data:()=>({
        email:'',
        loading:false,
        error:false,
        message:null,
        isEmailSent:false
    }),
    validations:{
        email:{
            required,
            email
        }
    },
    methods:{
        ...mapActions('auth',['forgetPassword']),
        recover(){
            this.loading=true;
            this.$v.$touch();
            if(this.$v.$error){
              return;
            }

            this.forgetPassword({email: this.email})
            .then(response=>{
                this.isEmailSent=true
                // this.$router.push('/auth/password/recover')
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
        this.isEmailSent=false
    }
}
</script>

<style>

</style>