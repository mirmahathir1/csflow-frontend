<template>
  <div>
      <div v-for="(comment,idx) in comments" :key="idx" class="pt-2">
          <Comment 
            :name=comment.name
            :id=comment.id
            :date=comment.date
            :text=comment.text
        >
        </Comment>
      </div>
      <div class="mx-2 mt-4">
        <v-card rounded="lg" class="pa-8 ml-2 mb-4">
            <v-row class="pb-8">Write your comment:</v-row>
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
  </div>
</template>

<script>
import Comment from '../Post/comment'
export default {
    components:{
        Comment
    },
    data(){
        return{
            comments:[
                {'name':'Abser','id':1605026,'date':'1 May,2020 11.43AM','text':'What is your name?What is your name?What is your name?What is your name?What is your name?What is your name?What is your name?What is your name?What is your name?What is your name?What is your name?What is your name?What is your name?What is your name?'},
                {'name':'Abser','id':1605026,'date':'1 May,2020 11.43AM','text':'What is your name?'},
                {'name':'Abser','id':1605026,'date':'1 May,2020 11.43AM','text':'What is your name?'},
                {'name':'Abser','id':1605026,'date':'1 May,2020 11.43AM','text':'What is your name?'}
            ]
        };
    }
}
</script>

<style>

</style>