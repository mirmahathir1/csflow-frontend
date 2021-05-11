<template>
  <PaddedContainer>
    <v-card :height="$isMobile() ?'100px':'100px'" class></v-card>
    <v-card height="100px" class="mb-4 mt-4 mx-auto"
      :max-width="$isMobile()?'30vw':'30vw'"
      :min-width="$isMobile()?'30vw':'30vw'">
      <v-row :class="$isMobile() ?'pa-2':'pa-5 mt-2'">
        <v-card-text class>
          <p class="text-center">
            {{message}}
          </p>
        </v-card-text>
      </v-row>
      <v-row class="justify-content-center">
            <v-btn
                color="primary"
                class="ma-2"
                @click="$router.push('/auth/signIn')"
                rounded
                v-show="isSuccess"
            >
            Sign In
            </v-btn>
        </v-row>
    </v-card>
    <v-card :height="$isMobile() ?'100px':'100px'" class="mb-4"></v-card>
  </PaddedContainer>
</template>

<script>
import {mapGetters,mapActions} from 'vuex';
import PaddedContainer from "../../components/PaddedContainer1"
export default {
    name:"SignupComplete",
    title(){
        return "Confirm Signup"
    },
    data:()=>({
        message:"Confirming sign up ...",
        isSuccess:false,
    }),
    components:{
        PaddedContainer
    },
    methods:{
        ...mapActions('auth',['completeSignup']),
    },
    mounted(){
        this.completeSignup({token: this.$route.query.token})
            .then(response=>{
                // this.$router.push('/auth/signIn')
                this.message="Success!!Log in to continue"
                this.isSuccess=true
            }).catch(e=>{
                this.message=e.response.data.message;
            })
    }
}
</script>

<style>

</style>