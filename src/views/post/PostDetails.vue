<template>
  <PaddedContainerWithoutLeft>
      <PageHeader>{{type}} Details</PageHeader>
      <v-card rounded="lg" class="mt-6">
        <div class="pt-4 pb-4">
            <PostBox></PostBox>
        </div>
        <div class="pb-4">
            <div class="mt-2 mx-3">
                <Details></Details>
            </div>
            <CommentSection></CommentSection>
        </div>
      </v-card>
      <PageHeader class="pt-5">Answers</PageHeader>
      <v-card rounded="lg" class="mt-6">
          <AnswerSection></AnswerSection>
      </v-card>
      <div class="mt-4">
        <v-card rounded="lg" class="pa-8 ml-2 mb-4">
            <v-row class="pb-8">Write your reply:</v-row>
            <v-textarea outlined></v-textarea>
            <v-row>
                <v-btn
                    color="primary"
                    class="ml-auto"
                >
                    Submit
                </v-btn>
            </v-row>
        </v-card>
      </div>
  </PaddedContainerWithoutLeft>
</template>

<script>
import PaddedContainerWithoutLeft from "../../components/PaddedContainerWithoutLeft"
import PageHeader from "../../components/PageHeader"
import PostBox from "../../components/Post/postBox"
import Details from "../../components/Post/details"
import AnswerSection from "../../components/Post/answerSection"
export default {
    title(){
        return type+" Details"
    },
    name:'PostDetails',
    components:{
        PageHeader,
        PaddedContainerWithoutLeft,
        PostBox,
        AnswerSection,
        Details
    },
    props:{
        type:{
            type:String,
            default:'Question'
        }
    }
}
</script>

<style>

</style>