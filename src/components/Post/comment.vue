<template>
  <div class="mx-2 mt-4">
    <v-card class="mt-2 ml-2" dense rounded="lg">
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
                    >
                        Report
                    </v-btn>
                    <v-btn
                        icon
                        elevation="2"
                        rounded
                        class="ml-2"
                    >
                        <v-icon>mdi-square-edit-outline</v-icon>
                    </v-btn>
                    <v-btn
                        icon
                        elevation="2"
                        rounded
                        class="ml-2 mr-2"
                    >
                        <v-icon>mdi-delete</v-icon>
                    </v-btn>
                </v-row>
            </v-list-item>
        </v-card-actions>
    </v-card>
  </div>
</template>

<script>
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
        }
    }
}
</script>

<style>

</style>