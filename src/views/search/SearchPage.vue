<template>
    <PaddedContainer>
        <PageHeader>
            Search results
        </PageHeader>
        <v-row
            v-for="(post,idx) in getSearchResults" :key="idx"
            class="my-2"
        >
            <v-col cols="12">
            <post-box
                :post=postBoxData[idx]
                @click.native="$router.push('/post/details/'+getSearchResults[idx].ID)"
            >
            </post-box>
            </v-col>
        </v-row>
    </PaddedContainer>
</template>

<script>
import PaddedContainer from "@/components/PaddedContainerWithoutLeft"
import PageHeader from "@/components/PageHeader"
import PostBox from "@/components/Post/postBox.vue"
import {mapGetters,mapActions} from 'vuex'
export default {
    name:"serach",
    title(){
        return 'Search'
    },
    components:{
        PaddedContainer,
        PageHeader,
        PostBox
    },
    data(){
        return{
          i:0
        };
    },
    computed:{
        ...mapGetters('post',['getSearchResults']),
        postBoxData(){
            let postData=[]
            for (let idx = 0; idx < this.getSearchResults.length; idx++) {
                postData[idx]={
                    'title':this.getSearchResults[idx].title,
                    'date':this.convertToDate(this.getSearchResults[idx].createdAt),
                    'type':this.getSearchResults[idx].type,
                    'totalAnswer':this.getSearchResults[idx].answerCount==null?0:this.getSearchResults[idx].answerCount,
                    'vote':this.getSearchResults[idx].UpvoteCount-this.getSearchResults[idx].DownvoteCount,
                    'tags':this.getTags(idx),
                    'owner':{
                        'name':this.getSearchResults[idx].owner.Name,
                        'studentId':this.getSearchResults[idx].owner.ID,
                        'profilePic':this.getSearchResults[idx].owner.ProfilePic,
                        'karma':this.getSearchResults[idx].owner.Karma
                    }
                }

            }
            return postData
        }
    },
    methods:{
        getTags(idx){
            let tags=[]
            let book=this.getSearchResults[idx].book;
            if(this.getSearchResults[idx].course!=null) tags.push(this.getSearchResults[idx].course)
            if(this.getSearchResults[idx].topic!=null&&this.getSearchResults[idx].topic.length>0) 
                tags.push(this.getSearchResults[idx].topic)
            if(book!=null&&book.length>0&&book!="null")
                tags.push(this.getSearchResults[idx].book)
            this.getSearchResults[idx].customTag.forEach(tag => {
                if(tags.length!==0) tags.push(tag)
            });
            return tags
        },
        convertToDate (date) {
            return new Date(date).toLocaleString('en-US', {
                day: 'numeric',
                year: 'numeric',
                month: 'long',
                hour: 'numeric',
                minute: 'numeric',
            });
        },
    }
}
</script>

<style>

</style>
