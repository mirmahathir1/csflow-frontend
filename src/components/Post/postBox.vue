<template>
<div class=" mt-4">
  <v-card class="mt-2" dense rounded="lg">
    <v-row>
        <v-col cols="2" md="1" class="my-auto">
            <p style="background-color:#f0f0f0">
              <v-row class="mx-auto text-center" >
                <v-btn class="mx-auto text-center" :text="status==1" :plain="status!=1" 
                       icon @click="upvote" :loading="upvoteLoading"
                >
                  <v-icon  large color="green darken-2" >
                    mdi-triangle
                  </v-icon>
                </v-btn>
              </v-row>
              <v-row class="mx-auto text-center">
                <span class="mx-auto text-center">{{count}}</span>
              </v-row>
              <v-row class="mx-auto text-center">
                <v-btn class="mx-auto text-center" :text="status==-1" :plain="status!=-1" 
                       icon @click="downvote" :loading="downvoteLoading"
                >
                  <v-icon large color="red darken-2">
                    mdi-triangle mdi-rotate-180
                  </v-icon>
                </v-btn>
              </v-row>
            </p>
        </v-col>
        <v-col cols="5" md="8" class="text-justify my-auto">
            {{post.title}}
        </v-col>
        <v-col cols="5" md="3" class="">
            <v-card rounded>
              <v-list-item three-line>
                <v-list-item-content>
                  <v-list-item-title class="mb-1" text-truncate>
                    {{post.owner.name}}
                  </v-list-item-title>
                  <v-list-item-subtitle v-if="post.owner.studentId<10000000">
                    ID:{{post.owner.studentId}}
                  </v-list-item-subtitle>
                  <v-list-item-subtitle :class="post.owner.karma>=0?'text-success':'text-danger'"
                    v-if="post.owner.studentId<10000000"
                  >
                    Karma: {{post.owner.karma.length==0?0:post.owner.karma}}
                  </v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-avatar
                  tile
                  size="50"
                  color="grey"
                  v-if="post.owner.profilePic!=null&&post.owner.profilePic.length>5"
                >
                  <img :src="post.owner.profilePic" alt="">
                </v-list-item-avatar>
                <v-list-item-avatar
                  v-else
                >
                  <v-icon
                      color="green"
                      dark
                      x-large
                  >mdi-account-circle</v-icon>
                </v-list-item-avatar>
              </v-list-item>
            </v-card>
            <!-- <div style="padding-right:5px">
              <UserCard></UserCard>
            </div> -->
        </v-col>
    </v-row>
    <v-card-text>
      <v-chip
        class="ma-2"
        color="primary"
      >
        {{post.date}}
      </v-chip>
      <v-chip
        class="ma-2"
        color="primary"
      >
        {{post.totalAnswer}} Answers
      </v-chip>
      <v-chip
        class="ma-2"
        color="primary"
      >
        {{post.type.charAt(0).toUpperCase()+post.type.slice(1)}} Thread
      </v-chip>
      <br>
      <!-- <v-card rounded class=""> -->
          <v-chip
          class="ma-2"
          color="indigo"
          text-color="white"
          v-for="(item,idx) in post.tags"
          :key="idx"
          >
              {{item}}
          </v-chip>
      <!-- </v-card> -->
    </v-card-text>
  </v-card>
  <!-- <UserCard></UserCard> -->
</div>
</template>

<script>
import PaddedContainer from '../PaddedContainerWithoutLeft'
import UserCard from '../Card/UserCard'
import {mapGetters,mapActions} from 'vuex'
export default {
    data(){
        return{
            status:null,
            count:null,
            downvoteLoading:false,
            upvoteLoading:false
        }
    },
    props:{
      post:{
        type:Object,
        default:function(){
          return{
            'title':'What is your name?What is your name?What is your name?What is your name?What is your name?What is your name?What is your name?What is your name?What is your name?What is your name?',
            'date':'21 August 2020,2.20AM',
            'type':'Question',
            'totalAnswer':9,
            'vote':5678,
            'tags':['CSE 300','AI','Networking'],
            'owner':{'name':"Abser uddin",'studentId':1605026,'profilePic':'','karma':67}
          }
        }
      },
      postID:{
        type: Number,
        default: -1
      },
      voteStatus:{
        type: Number,
        default: -5
      }
    },
    components:{
      PaddedContainer,
      UserCard
    },
    methods:{
      ...mapActions('post',['upvotePost','downvotePost','deleteDownvotePost','deleteUpvotePost']),
      async upvote(){
          this.upvoteLoading=true
          try{
            if(this.status==0){
              let response=await this.upvotePost({'id':this.postID,'type':'post'})
              this.status=1
              this.count=this.count+1
            }
            else if(this.status==1){
              let response=await this.deleteUpvotePost({'id':this.postID,'type':'post'})
              this.status=0
              this.count=this.count-1
            }else if(this.status==-1){
              this.deleteDownvotePost({'id':this.postID,'type':'post'})
              let response=await this.upvotePost({'id':this.postID,'type':'post'})
              this.status=1
              this.count=this.count+2
            }
          }catch(e){

          }
          this.upvoteLoading=false
      },
      async downvote(){
          this.downvoteLoading=true
          try{
            if(this.status==0){
              let response=await this.downvotePost({'id':this.postID,'type':'post'})
              this.count=this.count-1
              this.status=-1
            }else if(this.status==-1){
              let response=await this.deleteDownvotePost({'id':this.postID,'type':'post'})
              this.count=this.count+1
              this.status=0
            }else if(this.status==1){
              this.deleteUpvotePost({'id':this.postID,'type':'post'})
              let response=await this.downvotePost({'id':this.postID,'type':'post'})
              this.count=this.count-2
              this.status=-1
            }
          }catch(e){
            
          }
          this.downvoteLoading=false
      }
    },
    computed:{
      ...mapGetters('auth',['getIsGuest']),
    },
    mounted(){
      this.status=this.voteStatus
      this.count=this.post.vote
    }
}
</script>

<style>

</style>