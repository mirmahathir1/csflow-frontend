<template>
  <div>
    <PaddedContainerWithoutLeft v-if="!isDeleted">
        <PageHeader>{{type}} Details</PageHeader>
        <v-card rounded="lg" class="mt-6" v-if="!getLoaderFlag('postLoader')&&!loading">
            <div class="pt-4 pb-4">
                <PostBox
                    :post="postBoxData"
                    :postID="parseInt($route.params.postID)"
                    :voteStatus="parseInt(getPost.voteStatus)"
                ></PostBox>
            </div>
            <div class="pb-4">
                <div class="mt-2 mx-3">
                    <Details
                        :text="getPost.description"
                        :files="getPost.files"
                        :isOwner="getPost.owner.ID==getID"
                        :contentType="'post'"
                        :contentId="parseInt($route.params.postID)"
                        :isReported="getPost.isReported"
                        :isFollowing="getPost.isFollowing"
                        @deleted="isDeleted=true"
                    ></Details>
                </div>
                <CommentSection
                    :comments="commentData"
                    :contentId="parseInt($route.params.postID)"
                    :contentType="'post'"
                ></CommentSection>
            </div>
        </v-card>
        <DetailsLoader v-else></DetailsLoader>
        <!-- <PageHeader class="pt-5">Answers</PageHeader> -->
        <div v-if="!getLoaderFlag('postAnswerLoader')&&!loading">
            <div v-if="isQuestion">
                <PageHeader class="pt-5">Answers</PageHeader>
                <v-card rounded="lg" class="mt-6" v-for="(answer,idx) in answerData" :key="idx">
                    <AnswerSection
                        :answers="answer"
                    ></AnswerSection>
                </v-card>
            </div>
        </div>
        <DetailsLoader v-else></DetailsLoader>
        <div class="mt-4" v-if="!getLoaderFlag('postAnswerLoader')&&!loading">
            <v-btn
                class="ma-2"
                color="info"
                @click="showReplyBox=true"
                v-if="isQuestion && !showReplyBox"
            >
                Write Reply
            </v-btn>
            <v-card rounded="lg" class="pa-8 ml-2 mb-4" v-if="isQuestion && showReplyBox">
                <v-row class="pb-8">Write your reply:</v-row>
                <v-textarea outlined v-model="newAnswer"></v-textarea>
                <v-row>
                    <v-btn
                        color="primary"
                        class="ml-auto"
                        :disabled="newAnswer==null||answerClicked"
                        :loading="answerClicked"
                        @click="doAnswer()"
                    >
                        Submit
                    </v-btn>
                    <v-btn
                        color="error"
                        class="ml-2"
                        @click="showReplyBox=false"
                    >
                        Cancel
                    </v-btn>
                </v-row>
            </v-card>
        </div>
    </PaddedContainerWithoutLeft>
  </div>
</template>

<script>
import {mapGetters,mapActions} from 'vuex'
import PaddedContainerWithoutLeft from "../../components/PaddedContainerWithoutLeft"
import PageHeader from "../../components/PageHeader"
import PostBox from "../../components/Post/postBox"
import Details from "../../components/Post/details"
import AnswerSection from "../../components/Post/answerSection"
import DetailsLoader from "../../components/DetailsLoader"
import CommentSection from "../../components/Post/commentSection"
export default {
    title(){
        return "Post Details"
    },
    name:'PostDetails',
    data(){
        return{
            newAnswer:null,
            answerClicked:false,
            isDeleted:false,
            showReplyBox:false,
            loading:true,
        };
    },
    components:{
        PageHeader,
        PaddedContainerWithoutLeft,
        PostBox,
        AnswerSection,
        Details,
        DetailsLoader,
        CommentSection
    },
    props:{
        // type:{
        //     type:String,
        //     default:'Question'
        // }
    },
    computed:{
        ...mapGetters('post',['getLoaderFlag','getMessage','getError','getPost','getPostAnswer']),
        ...mapGetters('auth',['getID']),
        type(){
            if(this.getPost==null) return 'Question'
            else return this.getPost.type.charAt(0).toUpperCase()+this.getPost.type.slice(1)
            // if(this.getLoaderFlag('postLoader')){
            //     return 'Question'
            // }
            // else return this.getPost.type
        },
        isQuestion(){
            if(this.getPost===null)
                return false;
            return 'Question'==this.getPost.type.charAt(0).toUpperCase()+this.getPost.type.slice(1)
        },
        postBoxData(){

            if(this.getPost===null)
                return [];

            let postData={
                'title':this.getPost.title,
                'date':this.convertToDate(this.getPost.createdAt),
                'type':this.getPost.type.charAt(0).toUpperCase()+this.getPost.type.slice(1),
                'totalAnswer':this.getPost.answerCount==null?0:this.getPost.answerCount,
                'vote':this.getPost.UpvoteCount-this.getPost.DownvoteCount,
                'tags':this.getTags(),
                'owner':{
                    'name':this.getPost.owner.Name,
                    'studentId':this.getPost.owner.ID,
                    'profilePic':this.getPost.owner.ProfilePic,
                    'karma':this.getPost.owner.Karma==""?0:this.getPost.owner.Karma
                }
            }
            return postData
        },
        commentData(){
            let comments=[]
            this.getPost.comments.forEach(comment => {
                comments.push({
                    'name':comment.owner.Name,
                    'id':comment.owner.ID,
                    'text':comment.description,
                    'date':this.convertToDate(comment.createdAt),
                    'contentID':comment.commentId,
                    'isReported':comment.isReported
                })
            });
            return comments
        },
        answerData(){
            // console.log(this.getPostAnswer.length)
            let answers=[]
            let comments=[]
            if(this.getPostAnswer==null) return []
            this.getPostAnswer.forEach(answer=>{
                comments=[]
                answer.comments.forEach(comment => {
                    comments.push({
                        'name':comment.owner.Name,
                        'id':comment.owner.ID,
                        'date':this.convertToDate(comment.createdAt),
                        'text':comment.description,
                        'contentID':comment.commentId,
                        'isReported':comment.isReported
                    })
                })
                answers.push({
                    'votes':answer.UpvoteCount-answer.DownvoteCount,
                    'voteStatus':answer.voteStatus,
                    'name':answer.owner.Name,
                    'id':answer.owner.ID,
                    'karma':parseInt(answer.owner.Karma),
                    'imgSrc':answer.owner.ProfilePic,
                    'date':this.convertToDate(answer.createdAt),
                    'totalComments':answer.comments.length,
                    'value':answer.answerId==this.getPost.acceptedAnswer?1:0,
                    'isOwner':parseInt(answer.owner.ID) ==this.getID?true:false,
                    'description':answer.Description,
                    'files':answer.files,
                    'answerId':answer.answerId,
                    'comments':comments,
                    'isReported':answer.isReported,
                    'isFollowing':answer.isFollowing,
                    'canBeAccepted':this.getPost.acceptedAnswer==null?true:false
                })
            })
            return answers
        }
    },
    methods:{
        ...mapActions('post',['loadPost','loadPostAnswer','makeAnswer']),
        convertToDate (date) {
            return new Date(date).toLocaleString('en-US', {
                day: 'numeric',
                year: 'numeric',
                month: 'long',
                hour: 'numeric',
                minute: 'numeric',
            });
        },
        getTags(){
            let tags=[]
            if(this.getPost.course!=null) tags.push(this.getPost.course)
            if(this.getPost.topic!=null && this.getPost.topic.length>0)
                tags.push(this.getPost.topic)
            if(this.getPost.book!=null && this.getPost.book.length>0 && this.getPost.book!="null")
                tags.push(this.getPost.book)
            this.getPost.customTag.forEach(tag => {
                tags.push(tag)
            });
            return tags
        },
        async doAnswer(){
            this.answerClicked=true
            // console.log(this.$route.params.postID)
            let id=this.$route.params.postID
            try{
                let response=await this.makeAnswer({'id':id,'answer':this.newAnswer,'files':[]})

                this.getPostAnswer.push({
                    'Description':this.newAnswer,
                    'DownvoteCount':0,
                    'PostID':id,
                    'UpvoteCount':0,
                    'answerId':response.data.payload.answerId,
                    'comments':[],
                    'createdAt':new Date().getTime(),
                    'files':[],
                    'isFollowing':false,
                    'isReported':false,
                    'owner':response.data.payload.owner,
                    'voteStatus':0,
                })

                console.log(this.getPostAnswer.length)
                this.answerClicked=false;
                this.newAnswer=null
                this.showReplyBox=false
            }catch(e){

            }
        }
    },
    async mounted(){
        await this.loadPost(this.$route.params.postID)
        await this.loadPostAnswer(this.$route.params.postID)
        this.loading=false
        // while(this.getPost==null || this.getPostAnswer==null){
        //
        // }
    }
}
</script>

<style>

</style>
