<template>
  <PaddedContainer>
    <v-card :height="$isMobile() ?'60px':'100px'" class></v-card>
    <v-card height="100px" class>
      <v-row :class="$isMobile() ?'pa-2':'pa-5 mt-2'">
        <v-card-text class>
          <p class="text-center">
            {{message}}
          </p>
        </v-card-text>
      </v-row>
    </v-card>
    <v-card :height="$isMobile() ?'60px':'100px'" class></v-card>
  </PaddedContainer>
</template>

<script>
import {mapGetters,mapActions} from 'vuex';
import PaddedContainer from "../../components/PaddedContainer"
export default {
    name:"SignupComplete",
    title(){
        return "Confirm Signup"
    },
    data:()=>({
        message:"Confirming sign up ..."
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
                this.$router.push('/auth/signIn')
            }).catch(e=>{
                this.message=e.response.data.message;
            })
    }
}
</script>

<style>

</style>