<template>
    <v-card rounded="lg">
        <v-card-text  v-if="!editClicked">
            <p class="mx-3 text--darken-2 black--text">
                {{text}}
            </p>
            <div v-if="files.length!=0">
                <v-list-item-content v-for="(imgSrc,idx) in files" :key="idx">
                    <v-img
                        :src="imgSrc"
                    ></v-img>
                </v-list-item-content>
            </div>
        </v-card-text>
        <div v-else>
            <v-textarea outlined v-model="newAnswer" :value="text" class="mt-4"></v-textarea>
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
                    :disabled="newAnswer==null||editAnswerClicked"
                    :loading="editAnswerClicked"
                    @click="submitEditAnswer()"
                >
                    Submit
                </v-btn>
            </v-row>
        </div>
        <v-card-actions>
            <v-list-item class="grow">
                <v-row align="center" justify="end">
                    <v-btn
                        elevation="2"
                        rounded
                        class=""
                        v-if="!isOwner&&!reported"
                        color="warning"
                        @click="doReport()"
                    >
                        Report
                    </v-btn>
                    <v-btn
                        elevation="2"
                        rounded
                        class=""
                        v-if="!isOwner&&reported"
                        @click="undoReport()"
                        color="error"
                    >
                        Reported
                    </v-btn>
                    <v-btn
                        elevation="2"
                        rounded
                        class="ml-2"
                        v-if="!isOwner&&!followed"
                        color="primary"
                        @click="doFollow()"
                    >
                        Follow
                    </v-btn>
                    <v-btn
                        elevation="2"
                        rounded
                        class="ml-2"
                        v-if="!isOwner&&followed"
                        color="primary"
                        @click="undoFollow()"
                    >
                        Following
                    </v-btn>
                    <v-btn
                        icon
                        elevation="2"
                        rounded
                        class="ml-2"
                        v-if="isOwner&&!editClicked"
                        color="success"
                        @click="doEdit()"
                    >
                        <v-icon>mdi-square-edit-outline</v-icon>
                    </v-btn>
                    <!-- <v-btn
                        icon
                        elevation="2"
                        rounded
                        class="ml-2 mr-2"
                        v-if="isOwner"
                        color="error"
                        @click="doDelete()"
                    >
                        <v-icon>mdi-delete</v-icon>
                    </v-btn> -->
                    <v-dialog
                    v-model="dialog"
                    width="500"
                    v-if="isOwner&&!editClicked"
                    >
                        <template v-slot:activator="{ on, attrs }">
                            <!-- <v-btn
                            color="red lighten-2"
                            dark
                            v-bind="attrs"
                            v-on="on"
                            >
                            Delete
                            </v-btn> -->
                            <v-btn
                                icon
                                elevation="2"
                                rounded
                                class="ml-2 mr-2"
                                
                                color="red lighten-2"
                                dark
                                v-bind="attrs"
                                v-on="on"
                                @click="dialog=true"
                            >
                                <v-icon>mdi-delete</v-icon>
                            </v-btn>
                        </template>

                        <v-card>
                            <v-card-title class="headline grey lighten-2">
                            Delete {{contentType}}
                            </v-card-title>

                            <v-card-text>
                            Your {{contentType}} will be deleted. Do you want to continue?.
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
</template>

<script>
import {mapGetters,mapActions} from 'vuex'
export default {
    data(){
        return{
            editClicked:false,
            editAnswerClicked:false,
            reportClicked:false,
            followClicked:false,
            deleteClicked:false,
            newAnswer:null,
            dialog:false
        }
    },
    props:{
        text:{
            type:String,
            default:"Listen to your favorite artists and albums whenever and wherever, online and offline.Listen to your favorite artists and albums whenever and wherever, online and offline."
        },
        files:{
            type:Array,
            default:[]
        },
        isOwner:{
            type:Boolean,
            default:false
        },
        contentType:{
            type:String,
            default:"Post"
        },
        contentId:{
            type:Number,
            default:0
        },
        isReported:{
            type:Boolean,
            default:false
        },
        isFollowing:{
            type:Boolean,
            default:false
        }
    },
    computed:{
        reported(){
            let condition;
            if(this.isOwner) return false
            condition=this.isReported
            if(this.reportClicked) condition=!condition;
            return condition;
        },
        followed(){
            let condition;
            if(this.isOwner) return false
            condition=this.isFollowing
            if(this.followClicked) condition=!condition;
            return condition;
        }
    },
    methods:{
        ...mapActions('post',['report','follow','delete','cancelReport','cancelFollow','editAnswer']),
        async doReport(){
            this.reportClicked=!this.reportClicked
            let data={'type':this.contentType,'id':this.contentId}
            try{
                let response=await this.report(data)
                // "await something" if you want to add anything
            }catch(e){

            }finally{

            }
        },
        async doFollow(){
            this.followClicked=!this.followClicked;
            let data={'type':this.contentType,'id':this.contentId}
            try{
                let response=await this.follow(data)
                // "await something" if you want to add anything
            }catch(e){

            }finally{

            }
        },
        async doDelete(){
            this.deleteClicked=true
            let data={'type':this.contentType,'id':this.contentId}
            try{
                let response=await this.delete(data)
                // "await something" if you want to add anything
            }catch(e){

            }finally{

            }
        },
        doEdit(){
            if(this.contentType.toLowerCase()=='post'){
                this.$router.push('/post/edit/'+this.contentId)
            }else{
                this.editClicked=true
                this.newAnswer=this.text
            }
        },
        async undoReport(){
            this.reportClicked=!this.reportClicked
            let data={'type':this.contentType,'id':this.contentId}
            try{
                let response=await this.cancelReport(data)
            }catch(e){

            }finally{

            }
        },
        async undoFollow(){
            this.followClicked=!this.followClicked;
            let data={'type':this.contentType,'id':this.contentId}
            try{
                let response=await this.cancelFollow(data)
            }catch(e){

            }finally{

            }
        },
        async submitEditAnswer(){
            let data={'description':this.newAnswer,'files':[],'id':this.contentId}
            try{
                let response=await this.editAnswer(data)
                this.editClicked=false
                // this.text=this.newAnswer
            }catch(e){

            }finally{

            }
        }
    }

}
</script>

<style>

</style>