<template>
  <!-- <v-col cols="12" sm="8"> -->
    <PaddedContainer>
    <v-row class="pa-6">
        <v-sheet
            :min-width="$isMobile() ?'30vh':'60vh'"
            rounded="lg"
            class="pa-6 mx-auto"
        >
            <v-toolbar-title class="mx-auto text-center">
                SignUp
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
                        @click="signUp"
                        :disabled="getSignInLoaderFlag || $v.$anyError"
                        :loading="getSignInLoaderFlag"
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
                    v-if="getIsSignInError"
                >
                    {{ getSignInMessage }}
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
import PaddedContainer from "../../components/PaddedContainer"
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
        ...mapGetters('auth',['getSignInLoaderFlag','getIsSignInError','getSignInMessage'])
    },


    methods: {
        ...mapActions('auth',['login']),
        async signUp() {
            this.$v.$touch();
            if(this.$v.$error){
              return;
            }

            if (await this.login({email: this.email, password: this.password})) {
                await this.$router.push('/search/relevant');
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