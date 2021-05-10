<template>
  <!-- <v-col cols="12" sm="8"> -->
    
    <PaddedContainer>
    <v-row class="pa-6">
        <v-sheet
            :max-width="$isMobile()?'70vw':'70vw'"
            :min-width="$isMobile()?'30vw':'30vw'"
            rounded="lg"
            class="pa-6 mx-auto"
        >
            <v-toolbar-title class="mx-auto text-center">
                Sign Up
            </v-toolbar-title>
            <v-form
                ref="form"
            >
                <v-text-field
                    v-model="name"
                    label="Name"
                    required
                    @blur="$v.name.$touch()"
                    :error="$v.name.$error"
                    :error-messages="$v.name.$error?'Please input your name':null"
                ></v-text-field>
                <v-text-field
                    v-model="email"
                    label="E-mail"
                    required
                    @blur="$v.email.$touch()"
                    :error="$v.email.$error"
                    :error-messages="$v.email.$error?'Please input a valid email':null"
                ></v-text-field>
                <v-text-field
                    v-model="password"
                    label="Password"
                    type="password"
                    required
                    @blur="$v.password.$touch()"
                    :error="$v.password.$error"
                    :error-messages="$v.password.$error?'Please input a password':null"
                ></v-text-field>
                <v-text-field
                    v-model="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    required
                    @blur="$v.confirmPassword.$touch()"
                    :error="$v.confirmPassword.$error"
                    :error-messages="$v.confirmPassword.$error?'Password does not match':null"
                ></v-text-field>
                

<!--                <v-btn-->
<!--                    color="success"-->
<!--                    class="mr-4"-->
<!--                >-->
<!--                    Sign Up-->
<!--                </v-btn>-->
                <v-row>
                    <v-btn
                        color="primary"
                        class="mx-auto mt-4"
                        @click="signup"
                        :disabled="getSignUpLoaderFlag || $v.$anyError"
                        :loading="getSignUpLoaderFlag"
                        rounded
                    >
                        Sign Up
                    </v-btn>
                </v-row>

                <v-alert
                    class="mt-5"
                    dense
                    outlined
                    type="error"
                    v-if="getIsSignUpError"
                >
                    {{ getSignUpMessage }}
                </v-alert>
            </v-form>
        </v-sheet>
    </v-row>
  <!-- </v-col> -->
    </PaddedContainer>
    
</template>

<script>
import {mapGetters,mapActions} from 'vuex';
import { required,email,sameAs } from 'vuelidate/lib/validators'
import PaddedContainer from "../../components/PaddedContainer1"
export default {
    name:"SignUp",
    title(){
        return "Sign Up"
    },
    data: () => ({
        valid: true,
        email: '',
        password: '',
        name: '',
        confirmPassword: ''
    }),
    validations:{
        email: {
            required,
            email
        },
        password: {
            required,
        },
        confirmPassword:{
            sameAsPassword:sameAs('password')
        },
        name:{
            required
        }

    },
    computed: {
        ...mapGetters('auth',['getSignUpLoaderFlag','getIsSignUpError','getSignUpMessage'])
    },


    methods: {
        ...mapActions('auth',['signUp']),
        async signup() {
            this.$v.$touch();
            if(this.$v.$error){
              return;
            }

            if (await this.signUp({name:this.name, email: this.email, password: this.password})) {
                await this.$router.push('/auth/signUpConfirmation');
            }
        }
    },
    components:{
        PaddedContainer
    }
}
</script>

<style>

</style>