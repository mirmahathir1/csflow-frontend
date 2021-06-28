<template>
  <div class="mx-2 mt-4">
    <v-card class="mt-2 ml-2" dense rounded="lg" v-if="!editClicked">
        <v-row class="">
            <v-col cols="9" class="text-justify my-auto mx-5">
                {{text}}
            </v-col>
            <v-col align-self="start" class="my-3 mx-2">
                <v-card dense rounded="lg" elevation="2" color="#1F7087">
                    <v-row>
                        <v-card-text class="mx-auto text-center mt-n3 white--text">
                            {{name}}
                        </v-card-text>
                    </v-row>
                    <v-row>
                        <v-list-item-action-text class="mx-auto text-center mt-n4 mb-2 white--text">
                            {{id}}
                        </v-list-item-action-text>
                    </v-row>
                </v-card>
            </v-col>
        </v-row>
        <v-card-actions>
            <v-list-item class="grow">
                <v-list-item-content>
                    <v-list-item-subtitle>
                    <v-chip
                        class="ma-2"
                        color="primary"
                    >
                    {{date}}
                    </v-chip>
                    </v-list-item-subtitle>
                </v-list-item-content>
                <v-row align="center" justify="end">
                    <v-btn
                        elevation="2"
                        rounded
                        class="ml-auto"
                        @click="doReport()"
                        v-if="!isOwner&&!reported"
                    >
                        Report
                    </v-btn>
                    <v-btn
                        elevation="2"
                        rounded
                        class="ml-auto"
                        @click="undoReport()"
                        v-if="!isOwner&&reported"
                    >
                        Reported
                    </v-btn>
                    <v-btn
                        icon
                        elevation="2"
                        rounded
                        class="ml-2"
                        color="success"
                        @click="doEdit()"
                        v-if="isOwner"
                    >
                        <v-icon>mdi-square-edit-outline</v-icon>
                    </v-btn>
                    <v-dialog
                        v-model="dialog"
                        width="500"
                    >
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn
                                icon
                                elevation="2"
                                rounded
                                class="ml-2 mr-2"
                                v-if="isOwner"
                                color="red lighten-2"
                                dark
                                v-bind="attrs"
                                v-on="on"
                                @click.native="dialog=true"
                            >
                                <v-icon>mdi-delete</v-icon>
                            </v-btn>
                        </template>

                        <v-card>
                            <v-card-title class="headline grey lighten-2">
                            Delete comment
                            </v-card-title>

                            <v-card-text>
                            Your comment will be deleted. Do you want to continue?.
                            </v-card-text>

                            <v-divider></v-divider>

                            <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                                color="primary"
                                :loading="deleteClicked"
                                @click="doDelete"
                            >
                                Yes
                            </v-btn>
                            <v-btn
                                @click="dialog = false"
                                color="red lighten-2"
                            >
                                No
                            </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-row>
            </v-list-item>
        </v-card-actions>
    </v-card>
    <v-card v-else class="mt-2 ml-2" dense rounded="lg">
        <div>
            <v-textarea outlined v-model="newComment" class="mt-4"></v-textarea>
            <v-row>
                <v-btn
                    color="red lighten-2"
                    class="ml-auto mr-3"
                    @click="editClicked=false"
                >
                    Cancel
                </v-btn>
                <v-btn
                    color="primary"
                    class="mr-4"
                    :disabled="newComment==null||editCommentClicked"
                    :loading="editCommentClicked"
                    @click="submitEditComment()"
                >
                    Submit
                </v-btn>
            </v-row>
        </div>
    </v-card>
  </div>
</template>

<script>
import {mapGetters,mapActions} from 'vuex'
export default {
    props:{
        name:{
            type:String,
            default:"Ashraful"
        },
        id:{
            type:Number,
            default:1605001
        },
        text:{
            type:String,
            default:"What a good question it is!!!"
        },
        date:{
            type:String,
            default:"1 January,2021 11.11AM"
        },
        contentID:{
            type:Number,
            default:0
        },
        isReported:{
            type:Boolean,
            default:false
        }
    },
    data(){
        return{
            reportClicked:false,
            dialog:false,
            deleteClicked:false,
            editClicked:false,
            editCommentClicked:false,
            newComment:null,
        }
    },
    methods:{
        ...mapActions('post',['report','delete','cancelReport','editComment']),
        async doReport(){
            this.reportClicked=!this.reportClicked
            let data={'type':'comment','id':this.contentID}
            try{
                let response=await this.report(data)
                // "await something" if you want to add anything
            }catch(e){

            }finally{

            }
        },
        async doEdit(){
            this.editClicked=true
            this.newComment=this.text
        },
        async doDelete(){
            this.deleteClicked=true
            let data={'type':'comment','id':this.contentID}
            try{
                let response=await this.delete(data)
                this.deleteClicked=false
                // "await something" if you want to add anything
            }catch(e){

            }finally{

            }
        },
        async undoReport(){
            let data={'type':'comment','id':this.contentID}
            try{
                let response=await this.cancelReport(data)
                // "await something" if you want to add anything
            }catch(e){

            }finally{

            }
        },
        async submitEditComment(){
            this.editCommentClicked=true
            let data={'description':this.newComment,'id':this.contentID}
            try{
                let response=await this.editComment(data)
                this.editCommentClicked=false
                await this.loadPost(this.$route.params.postID)
                await this.loadPostAnswer(this.$route.params.postID)
            }catch(e){

            }
        }
    },
    computed:{
        ...mapGetters('auth',['getID']),
        isOwner(){
            return this.getID==this.id
        },
        reported(){
            let condition;
            condition=this.isReported
            if(this.reportClicked) condition=!condition
            return condition
        }
    }
}
</script>

<style>

</style>