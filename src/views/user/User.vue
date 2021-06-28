<template>
    <PaddedContainer>
        <v-skeleton-loader
            class="mx-auto text-center"
            v-if="getUserLoaderFlag"
            type="image"
        ></v-skeleton-loader>

        <v-card
            class="mx-auto mt-3"
            flat
            elevation="3"
            v-else-if="getLoadedUserForProfile!==null"
        >
            <!-- <v-row align="center"> -->
            <v-col cols="11">
                <v-row>
                    <v-avatar
                    size="150px"
                    class="mx-auto mt-2"
                    >
                        <img
                            v-if="this.getLoadedUserForProfile.profilePic!=null
                                    &&this.getLoadedUserForProfile.profilePic.length>1"
                            alt="Avatar"
                            :src="this.getLoadedUserForProfile.profilePic"
                        >
                        <v-icon
                            v-else
                            color="green"
                            dark
                            size="148"
                        >mdi-account-circle</v-icon>
                    </v-avatar>
                </v-row>
            </v-col>
            <v-col cols="1"></v-col>
            <!-- </v-row> -->
            <v-row>
                <v-col cols="11">
                    <v-row>
                        <v-card-title class="mx-auto">{{this.getLoadedUserForProfile.name}}</v-card-title>
                    </v-row>
                </v-col>
                <v-col cols="1">
                    <v-btn
                        v-if="$route.params.id=='me' || $route.params.id==getID"
                        :class="$isMobile()?'mr-3':'pr-12'"
                        text
                        icon
                        color="blue lighten-2"
                        @click="$router.push('/user/profile/edit')"
                    >
                        <v-icon>mdi-square-edit-outline</v-icon>
                    </v-btn>
                </v-col>
            </v-row>
            <v-col cols="11">
                <v-row>
                    <v-card-title class="mx-auto mt-n6">
                        {{this.getLoadedUserForProfile.id}}
                    </v-card-title>
                </v-row>
            </v-col>
            <div class="text-center">
                <v-chip
                    class="ma-2"
                    color="teal"
                    text-color="white"
                >
                    Total Questions:  {{this.getLoadedUserForProfile.totalQuestion}}
                </v-chip>

                <v-chip
                    class="ma-2"
                    color="teal"
                    text-color="white"
                >
                    Total Discussions:  {{this.getLoadedUserForProfile.totalDiscussion}}
                </v-chip>

                <v-chip
                    class="ma-2"
                    color="teal"
                    text-color="white"
                >
                    Total Answers:  {{this.getLoadedUserForProfile.totalAnswer}}
                </v-chip>

                <v-chip
                    class="ma-2"
                    color="teal"
                    text-color="white"
                >
                    Downvotes:  {{this.getLoadedUserForProfile.downvoteCount}}
                </v-chip>

                <v-chip
                    class="ma-2"
                    color="teal"
                    text-color="white"
                >
                    Upvotes:  {{this.getLoadedUserForProfile.upvoteCount}}
                </v-chip>

            </div>
                <!-- <v-container>
                    <v-card color="rgb(210,210,240)" light class="mx-3">
                        <v-list flat nav
                            class="transparent"
                        >
                            <v-list-item-group>
                                <v-list-item dense>
                                    <v-col cols="9" md="4">
                                        <v-list-item-icon>
                                            Student ID
                                        </v-list-item-icon>
                                    </v-col>
                                    <v-col  md="3">
                                        <v-list-item-content
                                          >
                                            {{this.getLoadedUserForProfile.id}}
                                        </v-list-item-content>
                                    </v-col>
                                </v-list-item>

                                <v-list-item class="mt-n7" dense>   
                                    <v-col cols="9" md="4">
                                        <v-list-item-icon>
                                            Total Discussion
                                        </v-list-item-icon>
                                    </v-col>
                                    <v-col md="3">
                                        <v-list-item-content>
                                            {{this.getLoadedUserForProfile.totalDiscussion}}
                                        </v-list-item-content>
                                    </v-col>
                                </v-list-item>

                                <v-list-item class="mt-n7" dense>   
                                    <v-col cols="9" md="4">
                                        <v-list-item-icon>
                                            Total Question
                                        </v-list-item-icon>
                                    </v-col>
                                    <v-col md="3">
                                        <v-list-item-content>
                                            {{this.getLoadedUserForProfile.totalQuestion}}
                                        </v-list-item-content>
                                    </v-col>
                                </v-list-item>

                                <v-list-item class="mt-n7" dense>   
                                    <v-col cols="9" md="4">
                                        <v-list-item-icon>
                                            Total Answers
                                        </v-list-item-icon>
                                    </v-col>
                                    <v-col md="3">
                                        <v-list-item-content>
                                            {{this.getLoadedUserForProfile.totalAnswer}}
                                        </v-list-item-content>
                                    </v-col>
                                </v-list-item>

                                <v-list-item class="mt-n7" dense>   
                                    <v-col cols="9" md="4">
                                        <v-list-item-icon>
                                            Upvotes
                                        </v-list-item-icon>
                                    </v-col>
                                    <v-col md="3">
                                        <v-list-item-content class="text-success">
                                            {{this.getLoadedUserForProfile.upvoteCount}}
                                        </v-list-item-content>
                                    </v-col>
                                </v-list-item>

                                <v-list-item class="mt-n7" dense>   
                                    <v-col cols="9" md="4">
                                        <v-list-item-icon>
                                            Downvotes
                                        </v-list-item-icon>
                                    </v-col>
                                    <v-col md="3">
                                        <v-list-item-content class="text-danger">
                                            {{this.getLoadedUserForProfile.downvoteCount}}
                                        </v-list-item-content>
                                    </v-col>
                                </v-list-item>
                            </v-list-item-group>
                        </v-list>
                    </v-card>
                </v-container> -->
        </v-card>
        
        <v-card
            height="60px"
            class="mt-8"
            v-if="getLoadedUserForProfile!==null"
        >
            <v-row class="">
                <v-card-text class="my-auto">
                    <p class="ml-3">{{this.getLoadedUserForProfile.name}}'s post</p>
                </v-card-text>
            </v-row>
        </v-card>

        <div v-if="getLoadedUserForProfile!==null">
            <v-row
                v-for="(post,idx) in getUserPost" :key="idx"
                class="my-2"
            >
                <v-col cols="12">
                    <post-card
                        :text="post.title"
                        :votes="post.upvoteCount-post.downvoteCount"
                        :small="$isMobile()?true:false"
                        class="mx-auto"
                        @click.native="$router.push('/postdetails/'+getUserPost[idx].ID)"
                    ></post-card>
                </v-col>
            </v-row>
        </div>
        <v-card
            height="100px"
            class="mt-12"
            v-if="getUserLoaderMessage!==null"
        >
            <v-row class="pa-5 mt-2">
                <v-card-text class="">
                    <p class="text-center">{{getUserLoaderMessage}}</p>
                </v-card-text>
            </v-row>
        </v-card>
    <!-- </v-col> -->
    </PaddedContainer>

</template>

<script>
import {mapGetters,mapActions} from 'vuex';
import PaddedContainer from "../../components/PaddedContainer"
import PostCard from "../../components/Card/PostCard"
import DetailsLoader from "@/components/DetailsLoader"
export default {
    name: "User",
    title(){
        return "My Profile"
    },
    computed:{
        ...mapGetters('user',['getLoadedUserForProfile','getIsUserLoaderError','getUserLoaderFlag','getUserLoaderMessage']),
        ...mapGetters('auth',['getID']),
        ...mapGetters('search',['getUserPost']),
        userPostData(){
            let postData=[]
            this.getUserPost.forEach(post => {
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
    methods:{
        ...mapActions('user',['getProfile']),
        ...mapActions('search',['loadUserPost'])
    },
    async mounted() {
        // console.log("here");
        await this.getProfile(this.$route.params.id);
        if(this.$route.params.id=='me' || this.$route.params.id==this.getID) this.loadUserPost('me');
        else this.loadUserPost(this.$route.params.id);
        // console.log(this.getLoadedUser);
    },
    data(){
        return{
            id:this.$route.params.id
        }
    },
    components:{
        PaddedContainer,
        PostCard,
        DetailsLoader   
    },
    watch: {
        '$route'(to, from) {
            this.id=to.params.id;
            this.getProfile(this.id);
            if(this.id=='me' || this.id==this.getID) this.loadUserPost('me');
            else this.loadUserPost(this.id);
            
        }
    }

}
</script>

<style scoped>
.k{
    background-color: rgb(217, 224, 224);
}
</style>