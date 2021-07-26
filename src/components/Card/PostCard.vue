<template>
  <v-hover v-slot:default="{ hover }">
    <v-card
        class="rounded-lg"
        color="blue lighten-5"
        
        
        :elevation="hover ? 3 : 2"
        :class="{ 'my-hover': hover }"
    >
        <v-row class="mx-1 my-auto">
            <v-col :cols="small?'3':'3'" :md="small?'3':'1'" class="my-1" >
                <p style="background-color:#f0f0f0">
                    <v-row class="" >
                        <v-icon class="" large color="green darken-2">
                            mdi-triangle
                        </v-icon>
                    </v-row>
                    <v-row class="mx-auto text-center">
                        <span class="mx-auto text-center">{{votes}}</span>
                    </v-row>
                    <v-row class="">
                        <v-icon class="" large color="red darken-2">
                            mdi-triangle mdi-rotate-180
                        </v-icon>
                    </v-row>
                </p>
            </v-col>
            <v-col cols="9" :md="small?9:10" class="text-justify my-auto">
                {{text}}
            </v-col>
        </v-row>
    </v-card>
  </v-hover>
</template>

<script>
export default {
    name:"PostCard",
    props:{
        width:{
            type: Number,
            default:250
        },
        text:{
            type:String,
            default:"What is your name?"
        },
        votes:{
            type: Number,
            default: 0
        },
        small:{
            type:Boolean,
            default:true
        }
    }
}
</script>

<style>

</style>
    
    