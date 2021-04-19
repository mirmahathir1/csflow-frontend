<template>
  <v-card class="mt-2 ml-2" dense>
    <v-row>
        <v-col cols="2" md="1" class="my-auto">
          <v-list-item>
            <p>
            <v-icon class="" medium color="green darken-2">
              mdi-arrow-up-bold-outline
            </v-icon><br>
            {{post.votes}}
            <br>
            <v-icon class="" medium color="red darken-2">
              mdi-arrow-down-bold-outline
            </v-icon>
            </p>
          </v-list-item>
        </v-col>
        <v-col cols="5" md="8" class="text-justify my-auto">
            {{post.text}}
        </v-col>
        <v-col cols="5" md="3" class="">
            <v-card>
              <v-list-item three-line>
                <v-list-item-content>
                  
                  <!-- <div class="overline mb-4">
                    OVERLINE
                  </div> -->
                  <v-list-item-title class="mb-1">
                    {{post.user.name}}
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    ID:{{post.user.ID}}
                  </v-list-item-subtitle>
                  <v-list-item-subtitle :class="post.user.karma>0?'text-success':'text-danger'">
                    Karma:{{post.user.karma}}
                  </v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-avatar
                  tile
                  size="50"
                  color="grey"
                ><img src="../../assets/mahathir.png" alt=""></v-list-item-avatar>
              </v-list-item>
            </v-card>
        </v-col>
    </v-row>
    <v-card-text>
      <v-chip
        class="ma-2"
        color="primary"
      >
        {{post.date}}
      </v-chip>
      <v-chip
        class="ma-2"
        color="primary"
      >
        {{post.totalAnswer}} Answers
      </v-chip>
      <v-chip
        class="ma-2"
        color="primary"
      >
        {{post.type}} Thread
      </v-chip>
      <v-card class="" elevation="2">
          <v-chip
          class="ma-2"
          color="indigo"
          text-color="white"
          v-for="(item,idx) in post.tags"
          :key="idx"
          >
              {{item}}
          </v-chip>
      </v-card>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
    data(){
        return{
            post:{
                'text':'What is your name?What is your name?What is your name?What is your name?What is your name?What is your name?What is your name?What is your name?What is your name?What is your name?',
                'date':'21 August 2020,2.20AM',
                'type':'Question',
                'totalAnswer':9,
                'votes':56,
                'tags':['CSE 300','AI','Networking'],
                'user':{'name':"Abser uddin",'karma':67,'image':"",'ID':1605026}
            }
        }
    }
}
</script>

<style>

</style>