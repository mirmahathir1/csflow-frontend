<template>
    <v-card rounded="lg">
        <v-card-text>
            <p class="mx-3 text--darken-2 black--text">
                {{text}}
            </p>
            <v-list-item-content v-if="imgSrc!=null">
                <v-img
                    :src="imgSrc"
                ></v-img>
            </v-list-item-content>
        </v-card-text>
        <v-card-actions>
            <v-list-item class="grow">
                <!-- <v-list-item-title class="mx-3">
                    {{text}}
                </v-list-item-title>
                <v-list-item-content v-if="imgSrc!=null">
                    <v-img
                        :src="imgSrc"
                    ></v-img>
                </v-list-item-content> -->
                <v-row align="center" justify="end">
                    <v-btn
                        elevation="2"
                        rounded
                        class=""
                    >
                        Report
                    </v-btn>
                    <v-btn
                        elevation="2"
                        rounded
                        class="ml-2"
                    >
                        Follow
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
</template>

<script>
export default {
    props:{
        text:{
            type:String,
            default:"Listen to your favorite artists and albums whenever and wherever, online and offline.Listen to your favorite artists and albums whenever and wherever, online and offline."
        },
        imgSrc:{
            type:String,
            default:null
        }
    }
}
</script>

<style>

</style>