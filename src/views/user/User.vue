<template>
    <!-- <v-col
        cols="12"

        sm="8"
    > -->
<!--        <v-card-->
<!--            class="mx-auto text-center"-->
<!--            flat-->
<!--            v-if="getUserLoaderFlag"-->
<!--        >-->
<!--            <v-progress-circular-->
<!--                indeterminate-->
<!--                color="primary"-->
<!--                class="ma-5"-->
<!--            ></v-progress-circular>-->
<!--        </v-card>-->
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
            v-else-if="getLoadedUser!==null"
        >
            <v-row align="center">
                <v-avatar
                  size="150px"
                  class="mx-auto mt-2"
                >
                    <img
                        alt="Avatar"
                        src="./mahathir.png"
                    >
                </v-avatar>
            </v-row>
            <v-row align="center">
                <v-card-title class="mx-auto">{{user.name}}</v-card-title>
            </v-row>
                <v-container>
                    <v-card color="rgb(217, 224, 224);" dark class="mx-3">
                        <v-list flat nav
                            class="transparent"
                        >
                            <v-list-item-group>
                                <v-list-item dense>
                                    <v-col md="4">
                                        <v-list-item-icon>
                                            Student ID
                                        </v-list-item-icon>
                                    </v-col>
                                    <v-col md="3">
                                        <v-list-item-content>
                                            {{user.id}}
                                        </v-list-item-content>
                                    </v-col>
                                </v-list-item>

                                <v-list-item class="mt-n7" dense>   
                                    <v-col md="4">
                                        <v-list-item-icon>
                                            Total Discussion
                                        </v-list-item-icon>
                                    </v-col>
                                    <v-col md="3">
                                        <v-list-item-content>
                                            {{user.discussion}}
                                        </v-list-item-content>
                                    </v-col>
                                </v-list-item>

                                <v-list-item class="mt-n7" dense>   
                                    <v-col md="4">
                                        <v-list-item-icon>
                                            Total Question
                                        </v-list-item-icon>
                                    </v-col>
                                    <v-col md="3">
                                        <v-list-item-content>
                                            {{user.question}}
                                        </v-list-item-content>
                                    </v-col>
                                </v-list-item>

                                <v-list-item class="mt-n7" dense>   
                                    <v-col md="4">
                                        <v-list-item-icon>
                                            Total Answers
                                        </v-list-item-icon>
                                    </v-col>
                                    <v-col md="3">
                                        <v-list-item-content>
                                            {{user.answers}}
                                        </v-list-item-content>
                                    </v-col>
                                </v-list-item>

                                <v-list-item class="mt-n7" dense>   
                                    <v-col md="4">
                                        <v-list-item-icon>
                                            Upvotes
                                        </v-list-item-icon>
                                    </v-col>
                                    <v-col md="3">
                                        <v-list-item-content class="text-success">
                                            {{user.upvotes}}
                                        </v-list-item-content>
                                    </v-col>
                                </v-list-item>

                                <v-list-item class="mt-n7" dense>   
                                    <v-col md="4">
                                        <v-list-item-icon>
                                            Downvotes
                                        </v-list-item-icon>
                                    </v-col>
                                    <v-col md="3">
                                        <v-list-item-content class="text-danger">
                                            {{user.downvotes}}
                                        </v-list-item-content>
                                    </v-col>
                                </v-list-item>
                            </v-list-item-group>
                        </v-list>
                    </v-card>
                </v-container>
            <!-- </v-card-text> -->
        </v-card>
        
        <v-card
            height="60px"
            class="mt-8"
        >
            <v-row class="">
                <v-card-text class="my-auto">
                    <p class="ml-3">{{user.name}}'s post</p>
                </v-card-text>
            </v-row>
        </v-card>
    <!-- </v-col> -->
    </PaddedContainer>

</template>

<script>
import {mapGetters,mapActions} from 'vuex';
import PaddedContainer from "../../components/PaddedContainer"
export default {
    name: "User.vue",
    computed:{
        ...mapGetters('user',['getLoadedUser','getIsUserLoaderError','getUserLoaderFlag','getUserLoaderMessage'])
    },
    methods:{
        ...mapActions('user',['getProfile'])
    },
    mounted() {
        this.getProfile(this.$route.params.id);
    },
    data(){
        return{
            user:{'E-mail':'mirmahathir@gmail.com',
                  'discussion': 278,
                  'question': 15,
                  'answers' : 20,
                  'upvotes': 78,
                  'downvotes': 45,
                  'id':1605011,
                  'name':'Mir Mahathir Mohammad'
            }
        }
    },
    components:{
        PaddedContainer
    }
}
</script>

<style scoped>
.k{
    background-color: rgb(217, 224, 224);
}
</style>