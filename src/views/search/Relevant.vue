<template>
    <PaddedContainer>
        <PageHeader>
            Relevant Posts
        </PageHeader>

        <v-row
            v-for="(post,idx) in relevantPostData" :key="idx"
            class="my-2"
        >
            <v-col cols="12">
                <post-box :post=post>
                </post-box>
            </v-col>
        </v-row>
    </PaddedContainer>
</template>

<script>
// @ is an alias to /src
import PaddedContainer from "@/components/PaddedContainerWithoutLeft"
import PageHeader from "@/components/PageHeader"
import PostBox from "@/components/Post/postBox.vue"
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'Home',
  components: {
      PaddedContainer,
      PageHeader,
      PostBox
  },
  computed:{
    ...mapGetters('search',['getRelevantPost']),
    relevantPostData(){
        let postData=[]
        this.getRelevantPost.forEach(post => {
          let tags=[]
          if(post.course!=null) tags.push(post.course)
          if(post.topic!=null) tags.push(post.topic)
          if(post.book!=null) tags.push(post.book)
          post.customTag.forEach(tag => {
              tags.push(tag)
          });
          postData.push({
            'title':post.title,
            'date':this.convertToDate(post.createdAt),
            'type':post.type.charAt(0).toUpperCase()+post.type.slice(1),
            'accenptedAnswer':post.accenptedAnswer==null?0:post.accenptedAnswer,
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
  mounted() {
    this.loadRelevantPost({'skip':0,'limit':20})
  },
  methods:{
    ...mapActions('search',['loadRelevantPost']),
    convertToDate (date) {
        return new Date(date).toLocaleString('en-US', {
            day: 'numeric',
            year: 'numeric',
            month: 'long',
            hour: 'numeric',
            minute: 'numeric',
        });
    },
  },
  
}
</script>
