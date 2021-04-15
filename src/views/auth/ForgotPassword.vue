<template>
  <v-row class="pa-6 my-auto">
      <v-col class="my-auto">
        <v-card
            height="100px"
            class=""
        >
        </v-card>
        <v-sheet
            min-width="60vh"
            max-width="80vh"
            rounded="lg"
            class="pa-6 mt-3 mx-auto"
        >
            <!-- <h4 class="mx-auto">k</h4> -->
            <v-toolbar-title>
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

                <v-row>
                    <v-btn
                        color="primary"
                        class="mx-auto mt-4"
                        @click="recover"
                        :disabled="loading || $v.$anyError"
                        :loading="loading"
                        rounded
                    >
                        Recover
                    </v-btn>
                </v-row>

            </v-form>
        </v-sheet>
      </v-col>
  </v-row>
</template>

<script>
import {mapGetters,mapActions} from 'vuex';
import { required,email } from 'vuelidate/lib/validators'
export default {
    data:()=>({
        email:'',
        loading:false
    }),
    validations:{
        email:{
            required,
            email
        }
    },
    methods:{
        recover(){
            this.loading=true;
            this.$v.$touch();
            if(this.$v.$error){
              return;
            }
            this.$router.push('/auth/password/recover')
            
        }
    }
}
</script>

<style>

</style>