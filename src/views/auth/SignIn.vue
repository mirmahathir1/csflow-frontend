<template>
    <v-col
        cols="12"
        sm="8"
    >
        <v-sheet
            min-height="70vh"
            rounded="lg"
            class="pa-6"
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

<!--                <v-btn-->
<!--                    color="success"-->
<!--                    class="mr-4"-->
<!--                >-->
<!--                    Sign Up-->
<!--                </v-btn>-->

                <v-btn
                    color="primary"
                    class="mr-4"
                    @click="signIn"
                    :disabled="getSignInLoaderFlag || $v.$anyError"
                    :loading="getSignInLoaderFlag"
                    rounded
                >
                    Sign In
                </v-btn>

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
    </v-col>
</template>

<script>
import {mapGetters,mapActions} from 'vuex';
import { required,email } from 'vuelidate/lib/validators'

export default {
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
        reset() {
            this.$refs.form.reset()
        },
        async signIn() {

            if (await this.login({email: this.email, password: this.password})) {
                await this.$router.push('/search/relevant');
            }
        }
    },
}
</script>

<style scoped>

</style>