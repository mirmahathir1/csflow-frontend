<template>
<div class="mx-2 mt-4">
  <v-card class="mt-2 ml-2" dense rounded="lg">
    <v-row>
        <v-col cols="2" md="1" class="my-auto">
            <p style="background-color:#f0f0f0">
              <v-row class="mx-auto text-center" >
                <v-icon class="mx-auto text-center" large color="green darken-2" @click="upvote">
                  mdi-triangle
                </v-icon>
              </v-row>
              <v-row class="mx-auto text-center">
                <span class="mx-auto text-center">{{post.vote}}</span>
              </v-row>
              <v-row class="mx-auto text-center">
                <v-icon class="mx-auto text-center" large color="red darken-2" @click="downvote">
                  mdi-triangle mdi-rotate-180
                </v-icon>
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
                  <v-list-item-subtitle>
                    ID:{{post.owner.studentId}}
                  </v-list-item-subtitle>
                  <v-list-item-subtitle :class="post.owner.karma>0?'text-success':'text-danger'">
                    Karma:{{post.owner.karma}}
                  </v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-avatar
                  tile
                  size="50"
                  color="grey"
                  v-if="post.owner.profilePic!=''"
                ><img :src="post.owner.profilePic" alt=""></v-list-item-avatar>
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
        {{post.acceptedAnswer}} Answers
      </v-chip>
      <v-chip
        class="ma-2"
        color="primary"
      >
        {{post.type}} Thread
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
            // post:{
            //     'text':'What is your name?What is your name?What is your name?What is your name?What is your name?What is your name?What is your name?What is your name?What is your name?What is your name?',
            //     'date':'21 August 2020,2.20AM',
            //     'type':'Question',
            //     'totalAnswer':9,
            //     'votes':5678,
            //     'tags':['CSE 300','AI','Networking'],
            //     'user':{'name':"Abser uddin",'karma':67,'image':"",'ID':1605026}
            // }
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
            'acceptedAnswer':9,
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
          try{
            if(this.voteStatus==0){
              let response=await this.upvotePost(this.postID)
            }
            else if(this.voteStatus==1){
              let response=await this.deleteUpvotePost(this.postID)
            }else if(this.voteStatus==-1){
              this.deleteDownvotePost(this.postID)
              let response=await this.upvotePost(this.postID)
            }
          }catch(e){

          }
      },
      async downvote(){
          try{
            if(this.voteStatus==0){
              let response=await this.downvotePost(this.postID)
            }else if(this.voteStatus==-1){
              let response=await this.deleteDownvotePost(this.postID)
            }else if(this.voteStatus==1){
              this.deleteUpvotePost(this.postID)
              let response=await this.downvotePost(this.postID)
            }
          }catch(e){
            
          }
      }
    }
}
</script>

<style>

</style>