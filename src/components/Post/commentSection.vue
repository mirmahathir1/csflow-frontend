<template>
  <div>
      <div v-for="(comment,idx) in commentData" :key="idx" class="pt-2">
        <Comment 
            :name=comment.name
            :id=comment.id
            :date=comment.date
            :text=comment.text
            :contentID=comment.contentID
            :isReported=comment.isReported
        >
        </Comment>
      </div>
      <div class="mx-2 mt-4">
        <v-btn
            class="ma-2"
            color="success"
            @click="showReplyBox=true"
            v-if="!showReplyBox"
        >
        Make Comment
        </v-btn>
        <v-card rounded="lg" class="pa-8 ml-2 mb-4" v-if="showReplyBox">
            <v-row class="pb-8">Write your comment:</v-row>
            <v-textarea outlined v-model="newComment"></v-textarea>
            <v-row>
                <v-btn
                    color="primary"
                    class="ml-auto"
                    @click="doComment"
                    :loading="clicked"
                    :disabled="newComment==null||clicked"
                >
                    Submit
                </v-btn>
                <v-btn
                    color="error"
                    class="ml-2"
                    :disabled="clicked"
                    @click="showReplyBox=false"
                >
                    Cancel
                </v-btn>
            </v-row>
        </v-card>
      </div>
  </div>
</template>

<script>
import {mapGetters,mapActions} from 'vuex'
import Comment from '../Post/comment'
export default {
    components:{
        Comment
    },
    props:{
        comments:{
            type:Array,
            default: 
                    [
                        {'name':'Abser',
                         'id':1605026,
                         'text':'What is your name?',
                         'date':'1 May,2020 11.43AM',
                         'contentID':0,
                         'isReported':false
                        }
                    ]
            
        },
        contentId:{
            type:Number,
            default:0
        },
        contentType:{
            type:String,
            default:'post'
        }
    },
    data(){
        return{
            clicked:false,
            newComment:null,
            isCommentAdded:false,
            allComments:[],
            showReplyBox:false
            // comments:[
            //     {'name':'Abser','id':1605026,'date':'1 May,2020 11.43AM','text':'What is your name?What is your name?What is your name?What is your name?What is your name?What is your name?What is your name?What is your name?What is your name?What is your name?What is your name?What is your name?What is your name?What is your name?'},
            //     {'name':'Abser','id':1605026,'date':'1 May,2020 11.43AM','text':'What is your name?'},
            //     {'name':'Abser','id':1605026,'date':'1 May,2020 11.43AM','text':'What is your name?'},
            //     {'name':'Abser','id':1605026,'date':'1 May,2020 11.43AM','text':'What is your name?'}
            // ]
        };
    },
    methods:{
        ...mapActions('post',['makeComment']),
        convertToDate (date) {
            return new Date(date).toLocaleString('en-US', {
                day: 'numeric',
                year: 'numeric',
                month: 'long',
                hour: 'numeric',
                minute: 'numeric',
            });
        },
        async doComment(){
            this.clicked=true
            try{
                let response=await this.makeComment({'comment':this.newComment,'id':this.contentId,'type':this.contentType})
        
                this.isCommentAdded=true
                this.allComments.push({
                    'name':this.getMe['name'],
                    'id':this.getID,
                    'text':this.newComment,
                    'date':this.convertToDate(new Date().getTime()),
                    'contentID':response.data.payload.commentId,
                    'isReported':false
                })
                
            }catch(e){

            }finally{
                this.clicked=false
                this.newComment=null
            }
        }
    },
    computed:{
        ...mapGetters('auth',['getID','getMe']),
        commentData(){
            if(!this.isCommentAdded){
                this.allComments=this.comments
            }
            return this.allComments
        }
    }
}
</script>

<style>

</style>