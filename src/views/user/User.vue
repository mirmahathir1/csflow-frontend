<template>
    <v-col
        cols="12"
        sm="8"
    >
<!--        <v-card-->
<!--            class="mx-auto text-center"-->
<!--            flat-->
<!--            v-if="getUserLoaderFlag"-->
<!--        >-->
<!--            <v-progress-circular-->
<!--                indeterminate-->
<!--                color="primary"-->
<!--                class="ma-5"-->
<!--            ></v-progress-circular>-->
<!--        </v-card>-->
        <v-skeleton-loader
            class="mx-auto text-center"
            v-if="getUserLoaderFlag"
            type="image"
        ></v-skeleton-loader>

        <v-card
            class="mx-auto"
            flat
            v-else-if="getLoadedUser!==null"
        >
            <v-card-text>
                <div>{{getLoadedUser.id}}</div>
                <p class="display-1 text--primary">
                    {{getLoadedUser.name}}
                </p>
                <p>{{getLoadedUser.email}}</p>
            </v-card-text>
        </v-card>

    </v-col>

</template>

<script>
import {mapGetters,mapActions} from 'vuex';
export default {
    name: "User.vue",
    computed:{
        ...mapGetters('user',['getLoadedUser','getIsUserLoaderError','getUserLoaderFlag','getUserLoaderMessage'])
    },
    methods:{
        ...mapActions('user',['getProfile'])
    },
    mounted() {
        this.getProfile(this.$route.params.id);
    }
}
</script>

<style scoped>

</style>