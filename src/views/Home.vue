<template>
  <div>
    <PaddedContainer>
      <PageHeader>
            Relevant Posts
      </PageHeader>
      <v-row
        v-for="(post,idx) in relevantPostData" :key="idx"
        class="my-2"
      >
        <post-box
          :post="post"
          :postID="parseInt(getRelevantPost[idx].ID)"
          :voteStatus="parseInt(getRelevantPost[idx].voteStatus)"
          @click.native="$router.push('/postdetails/'+getRelevantPost[idx].ID)"
        >
        </post-box>
      </v-row>
      <template v-slot:right>
        <v-sheet
          rounded="lg"
          class="pa-8 mx-auto"
        >
          <v-row align="center">Top Contributors</v-row>
          <hr>
          <v-row
            v-for="(user,idx) in getTopUser" :key="idx"
            class="my-2"
          >
            <user-card
              :small="true"
              :name="user['name']"
              :ID="user['id']"
              :karma="parseInt(user['upvoteCount']-user['downvoteCount'])"
              :image="user['profilePic']"
              class="mx-auto"
              @click.native="$router.push('/user/' + user['id'])"
            ></user-card>
          </v-row>
          <v-row>
            <v-col cols="12" class="px-0">
              <div class="mx-auto mb-3 mt-5">
                <v-pagination
                    v-model="page"
                    :length="pages"
                    circle
                    :total-visible="$isMobile() ? 6 : 7"
                ></v-pagination>
              </div>
            </v-col>
          </v-row>
        </v-sheet>

        <v-sheet
          rounded="lg"
          class="mt-3 pa-8 mx-auto"
        >
          <v-row align="center">Popular Posts</v-row>
          <hr>
          <v-row
            v-for="(post,idx) in getTopPost" :key="idx"
            class="my-3"
          >
            <v-col cols="12">
              <post-card
                :text="post.title"
                :votes="post.upvoteCount-post.downvoteCount"
                class="mx-auto"
                @click.native="$router.push('/postdetails/'+getTopPost[idx].ID)"
              ></post-card>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" class="px-0">
              <div class="mx-auto mb-3 mt-5">
                <v-pagination
                    v-model="page"
                    :length="pages"
                    circle
                    :total-visible="$isMobile() ? 6 : 7"
                ></v-pagination>
              </div>
            </v-col>
          </v-row>
        </v-sheet>
      </template>

    </PaddedContainer>
  </div>
</template>

<script>
import PaddedContainer from "../components/PaddedContainerWithoutLeft"
import PageHeader from "@/components/PageHeader"
import UserCard from "@/components/Card/UserCardForContributor"
import PostCard from "@/components/Card/PostCard.vue"
import PostBox from "@/components/Post/postBox.vue"
import DetailsLoader from "@/components/DetailsLoader"
import { mapGetters, mapActions } from 'vuex'
export default {
    name: 'Home',
    title(){
        return 'Home';
    },
    data(){
      return{
        page: 1,
        pageSize: 5,
      };
    },
    components:{
      PaddedContainer,
      UserCard,
      DetailsLoader,
      PageHeader,
      PostCard,
      PostBox
    },
    computed:{
      ...mapGetters('privileged', ['getLoaderFlag', 'getUsers']),
      ...mapGetters('search',['getTopPost','getUnansweredPost','getTopUser','getRelevantPost']),
      users() {
        let ret = [];
        if (this.getUsers) {
          ret = this.getUsers.sort((a, b) => Number(a['karma']) < Number(b['karma']) ? 1 : -1);
          ret = [...ret];
        }
        return ret;
      },
      usersPage() {
        return this.users.slice((this.page-1)*this.pageSize, this.page*this.pageSize);
      },
      pages() {
        if (this.getUsers) {
          return Math.ceil(this.users.length/this.pageSize);
        }
      },
      postaPage(){
        
      },
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
    methods: {
      ...mapActions('privileged', ['loadUsers']),
      ...mapActions('search',['loadTopPost','loadRelevantPost','loadTopUser','loadUnansweredPost','loadUserPost']),
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
    mounted() {
      this.loadTopPost({'skip':0,'limit':10})
      this.loadRelevantPost({'skip':0,'limit':10})
      this.loadTopUser({'skip':0,'limit':10})
      this.loadUnansweredPost({'skip':0,'limit':10})
    },
}
</script>

<style>

</style>