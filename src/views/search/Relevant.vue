<template>
    <PaddedContainer>
        <PageHeader>
            Relevant Posts
        </PageHeader>
        <v-row
            v-for="(post,idx) in posts" :key="idx"
            class="my-2"
        >
            <post-box :post=post>
            </post-box>
        </v-row>
    </PaddedContainer>
</template>

<script>
// @ is an alias to /src
import PaddedContainer from "@/components/PaddedContainerWithoutLeft"
import PageHeader from "@/components/PageHeader"
import PostBox from "@/components/Post/postBox.vue"
export default {
  name: 'Home',
  components: {
      PaddedContainer,
      PageHeader,
      PostBox
  },
  data(){
      return{
          posts:[
            {
                'text':'What is your name?What is your name?What is your name?What is your name?What is your name?What is your name?What is your name?What is your name?What is your name?What is your name?',
                'date':'21 August 2020,2.20AM',
                'type':'Question',
                'totalAnswer':9,
                'votes':5678,
                'tags':['CSE 300','AI','Networking'],
                'owner':{'name':"Abser uddin",'karma':67,'image':"",'ID':1605026}
            },
            {
                'text':'What is your name?What is your name?What is your name?What is your name?What is your name?What is your name?What is your name?What is your name?What is your name?What is your name?',
                'date':'21 August 2020,2.20AM',
                'type':'Question',
                'totalAnswer':9,
                'votes':5678,
                'tags':['CSE 300','AI','Networking'],
                'owner':{'name':"Abser uddin",'karma':67,'image':"",'ID':1605026}
            },
            {
                'text':'What is your name?What is your name?What is your name?What is your name?What is your name?What is your name?What is your name?What is your name?What is your name?What is your name?',
                'date':'21 August 2020,2.20AM',
                'type':'Question',
                'totalAnswer':9,
                'votes':5678,
                'tags':['CSE 300','AI','Networking'],
                'owner':{'name':"Abser uddin",'karma':67,'image':"",'ID':1605026}
            },
          ]
      };
  }
}
</script>
