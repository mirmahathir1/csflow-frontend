<template>
  <v-card class="px-3 py-3">
      <div>
          <AnswerTop></AnswerTop>
      </div>
      <div class="pt-4">
          <Detail></Detail>
      </div>
      <div>
          <CommentSection></CommentSection>
      </div>
  </v-card>
</template>

<script>
import AnswerTop from './answerTop.vue'
import Detail from './details.vue'
import CommentSection from './commentSection'
export default {
    components:{
        AnswerTop,
        Detail,
        CommentSection
    }
}
</script>

<style>

</style>