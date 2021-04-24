<template>
    <!-- <v-col
        cols="12"
        sm="8"
    > -->
    <PaddedContainer>
        <v-card
            :height="$isMobile()?'60px':'100px'"
            class=""
        >
            <v-row class="pa-5 mt-2">
                <v-card-text class="">
                    <p class="text-center">Just one step to open the doorway</p>
                </v-card-text>
            </v-row>
        </v-card>
        <v-row class="pa-6">
        <v-sheet
            :max-width="$isMobile() ?'30vh':'60vh'"
            rounded="lg"
            class="pa-6 mx-auto"
        >
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
                <v-text-field
                    v-model="password"
                    label="Password"
                    type="password"
                    required
                    @blur="$v.password.$touch()"
                    :error="$v.password.$error"
                    :error-messages="$v.password.$error?'Please input a password':null"
                ></v-text-field>
                <v-checkbox
                    v-model="checkbox"
                    label="Remember me"
                    required
                    disabled
                ></v-checkbox>

                <v-row class="justify-content-center">
                    <v-btn
                        color="primary"
                        class="ma-2"
                        @click="$router.push('/auth/signUp')"
                        rounded
                    >
                        Sign Up
                    </v-btn>
                    
                    <v-btn
                        color="primary"
                        class="ma-2"
                        @click="signIn"
                        :disabled="getSignInLoaderFlag || $v.$anyError"
                        :loading="getSignInLoaderFlag"
                        rounded
                    >
                        Sign In
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
        <v-card
            :height="$isMobile()?'60px':'100px'"
            class="mb-4"
        >
            <v-row class="mt-2 pa-5">
                <v-spacer></v-spacer>
                <v-card-subtitle class="black--text text-center">                   
                    Forget password?click <router-link to="/auth/password/forgot">here</router-link>                  
                </v-card-subtitle>
                <v-spacer></v-spacer>
            </v-row>
        </v-card>
    <!-- </v-col> -->
    </PaddedContainer>
</template>

<script>
import {mapGetters,mapActions} from 'vuex';
import { required,email } from 'vuelidate/lib/validators'
import PaddedContainer from "../../components/PaddedContainer"
export default {
    name:"SignIn",
    title(){
        return "Sign In"
    },
    data: () => ({
        valid: true,
        email: '',
        password: '',


        checkbox: false,
    }),
    validations:{
        email: {
            required,
            email
        },
        password: {
            required,
        },
    },
    computed: {
        ...mapGetters('auth',['getSignInLoaderFlag','getIsSignInError','getSignInMessage'])
    },


    methods: {
        ...mapActions('auth',['login']),
        async signIn() {
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

<style scoped>

</style>