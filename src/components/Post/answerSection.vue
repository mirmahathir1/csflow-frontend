<template>
  <v-card class="px-3 py-3" v-if="!isDeleted">
      <div>
          <AnswerTop
            :votes=answers.votes
            :name=answers.name
            :id=answers.id
            :karma=answers.karma
            :imgSrc=answers.imgSrc
            :date=answers.date
            :totalComments=answers.totalComments
            :value=answers.value
            :isOwner=answers.isOwner
            :voteStatus=answers.voteStatus
            :answerId=answers.answerId
            :canBeAccepted=answers.canBeAccepted
          ></AnswerTop>
      </div>
      <div class="pt-4">
          <Detail
            :text=answers.description
            :files=answers.files
            :isOwner=answers.isOwner
            :contentType="'answer'"
            :contentId="answers.answerId"
            :isReported="answers.isReported"
            :isFollowing="answers.isFollowing"
            @deleted="isDeleted=true"
          ></Detail>
      </div>
      <div>
          <CommentSection
            :comments="answers.comments"
            :contentId="answers.answerId"
            :contentType="'answer'"
          ></CommentSection>
      </div>
  </v-card>
</template>

<script>
import AnswerTop from './answerTop.vue'
import Detail from './details.vue'
import CommentSection from './commentSection'
export default {
    components:{
        AnswerTop,
        Detail,
        CommentSection
    },
    props:{
        answers:{
          type:Object,
          default:function(){
            return{
              'votes':567,
              'voteStatus':-2,
              'name':'Ashraful',
              'id':1605001,
              'karma':67,
              'imgSrc':null,
              'date':'1 January,2021 11.11AM',
              'totalComments':0,
              'value':0,
              'isOwner':false,
              'description':"What is your name?",
              'files':[],
              'answerId':-1,
              'comments':[],
              'isReported':false,
              'isFollowing':false,
              'canBeAccepted':true
            }
          }
        }
    },
    data(){
      return{
        isDeleted:false
      }
    }
}
</script>

<style>

</style>