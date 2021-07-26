<template>
  <PaddedContainer>
      <PageHeader>
            Unanswered Posts
      </PageHeader>
      <v-row
        v-for="(post,idx) in unansweredPostData" :key="idx"
        class="my-2"
      >
        <v-col cols="12">
            <post-box
            :post="post"
            :postID="parseInt(getUnansweredPost[idx].ID)"
            :voteStatus="parseInt(getUnansweredPost[idx].voteStatus)"
            @click.native="$router.push('/post/details/'+getUnansweredPost[idx].ID)"
            >
            </post-box>
        </v-col>
      </v-row>
  </PaddedContainer>
</template>

<script>
import PaddedContainer from "../../components/PaddedContainerWithoutLeft"
import PageHeader from "@/components/PageHeader"
import PostBox from "@/components/Post/postBox.vue"
import DetailsLoader from "@/components/DetailsLoader"
import { mapGetters, mapActions } from 'vuex'
export default {
    name:'Unanswered',
    title(){
        return 'Unanswered Post'
    },
    data(){
        return{

        };
    },
    components:{
        PageHeader,
        PostBox,
        DetailsLoader,
        PaddedContainer
    },
    computed:{
        ...mapGetters('search',['getUnansweredPost']),
        unansweredPostData(){
            let postData=[]
            this.getUnansweredPost.forEach(post => {
                let tags=[]
                if(post.course!=null) tags.push(post.course)
                if(post.topic!=null && post.topic.length>0) tags.push(post.topic)
                if(post.book!=null && post.book.length>0 && post.book!="null") tags.push(post.book)
                post.customTag.forEach(tag => {
                    tags.push(tag)
                });
                postData.push({
                    'title':post.title,
                    'date':this.convertToDate(post.createdAt),
                    'type':post.type.charAt(0).toUpperCase()+post.type.slice(1),
                    'totalAnswer':post.answerCount==null?0:post.answerCount,
                    'vote':post.vote==null?0:post.vote,
                    'tags':tags,
                    'owner':{
                        'name':post.owner.Name,
                        'studentId':post.owner.ID,
                        'profilePic':post.owner.ProfilePic,
                        'karma':post.owner.Karma
                    }
                })
            });
            return postData;
        }
    },
    methods:{
        ...mapActions('search',['loadUnansweredPost']),
        convertToDate (date) {
            return new Date(date).toLocaleString('en-US', {
                day: 'numeric',
                year: 'numeric',
                month: 'long',
                hour: 'numeric',
                minute: 'numeric',
            });
        }
    },
    mounted(){
        this.loadUnansweredPost()
    }
}
</script>

<style>

</style>
