<template>
  <PaddedContainerWithoutLeft>
      <PageHeader>Question Details</PageHeader>
      <v-card rounded="lg" class="mt-6">
        <div class="pt-4 pb-4">
            <PostBox></PostBox>
        </div>
      </v-card>
      <PageHeader class="pt-5">Answers</PageHeader>
  </PaddedContainerWithoutLeft>
</template>

<script>
import PaddedContainerWithoutLeft from "../../components/PaddedContainerWithoutLeft"
import PageHeader from "../../components/PageHeader"
import PostBox from "../../components/Box/postBox"
export default {
    title(){
        return "Question Details"
    },
    name:'PostDetails',
    components:{
        PageHeader,
        PaddedContainerWithoutLeft,
        PostBox
    }
}
</script>

<style>

</style>