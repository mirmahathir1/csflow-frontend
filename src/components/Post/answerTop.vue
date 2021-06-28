<template>
  <v-card rounded="lg">
      <v-row class="px-3">
          <v-col class="py-2 my-auto" cols="2" md="1" style="background-color:#f0f0f0">
              <v-row align="center" class="mt-1">
                <v-icon class="mx-auto text-center" large color="green darken-2" @click="upvote">
                    mdi-triangle
                </v-icon>
              </v-row>
              <v-row align="center">
                  <span class="mx-auto text-center">
                      {{count}}
                  </span>
              </v-row>
              <v-row align="center" class="mb-1">
                <v-icon class="mx-auto text-center" large color="red darken-2" @click="downvote">
                    mdi-triangle mdi-rotate-180
                </v-icon>
              </v-row>
          </v-col>
          <v-col cols="6">
              <v-row>
                  <v-col cols="9">
                      <v-row>
                          <v-chip
                            class="ma-2"
                            color="primary"
                          >
                            {{date}}
                          </v-chip>
                      </v-row>
                      <v-row>
                          <v-chip
                            class="ma-2"
                            color="primary"
                          >
                            {{totalComments}} Comments
                          </v-chip>
                      </v-row>
                  </v-col>
                  <v-col class="my-auto">
                      <v-rating
                        length="1"
                        background-color="red lighten-2"
                        color="primary"
                        :value=value
                        :readonly=!isOwner
                      ></v-rating>
                  </v-col>
              </v-row>
          </v-col>
          <v-col cols="1"></v-col>
          <v-col cols="2">
             <!-- <v-row> 
                 <v-spacer></v-spacer> -->
              <UserCard
                :name=name
                :ID=id
                :karma=karma
                :image=imgSrc
                :small=true
              ></UserCard>
             <!-- </v-row>   -->
          </v-col>
      </v-row>
  </v-card>
</template>

<script>
import UserCard from '../Card/UserCardForContributor'
import {mapGetters,mapActions} from 'vuex'
export default {
    props:{
        votes:{
            type:Number,
            default:567
        },
        name:{
            type:String,
            default:"Ashraful"
        },
        id:{
            type:Number,
            default:1605001
        },
        karma:{
            type:Number,
            default:0
        },
        imgSrc:{
            type:String,
            default:null
        },
        date:{
            type:String,
            default:"1 January,2021 11.11AM"
        },
        totalComments:{
            type:Number,
            default:0
        },
        value:{
            type:Number,
            default:0
        },
        isOwner:{
            type:Boolean,
            default:false
        },
        voteStatus:{
            type:Number,
            default:-2
        },
        answerId:{
            type:Number,
            default:-1
        },
    },
    components:{
        UserCard
    },
    data(){
        return{
            status:null,
            count:null
        }
    },
    methods:{
        ...mapActions('post',['upvotePost','downvotePost','deleteUpvotePost','deleteDownvotePost']),
        async upvote(){
          try{
            if(this.status==0){
              let response=await this.upvotePost({'id':this.answerId,'type':'answer'})
              this.status=1
              this.count=this.count+1
            }
            else if(this.voteStatus==1){
              let response=await this.deleteUpvotePost({'id':this.answerId,'type':'answer'})
              this.status=0
              this.count=this.count-1
            }else if(this.voteStatus==-1){
              this.deleteDownvotePost({'id':this.answerId,'type':'answer'})
              let response=await this.upvotePost({'id':this.answerId,'type':'answer'})
              this.status=1
              this.count=this.count+2
            }
          }catch(e){

          }
      },
      async downvote(){
          try{
            if(this.status==0){
              let response=await this.downvotePost({'id':this.answerId,'type':'answer'})
              this.count=this.count-1
              this.status=-1
            }else if(this.status==-1){
              let response=await this.deleteDownvotePost({'id':this.answerId,'type':'answer'})
              this.count=this.count+1
              this.status=0
            }else if(this.status==1){
              this.deleteUpvotePost({'id':this.answerId,'type':'answer'})
              let response=await this.downvotePost({'id':this.answerId,'type':'answer'})
              this.count=this.count-2
              this.status=-1
            }
          }catch(e){
            
          }
      }
    },
    mounted(){
      this.status=this.voteStatus
      this.count=this.votes
    }
}
</script>

<style>

</style>