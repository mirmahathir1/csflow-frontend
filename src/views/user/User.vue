<template>

    <v-col
        cols="12"
        sm="8"
    >

        <v-card
            class="mx-auto text-center"
            flat
            v-if="$store.getters['user/getUserLoaderFlag']"
        >
            <v-progress-circular
                indeterminate
                color="primary"
                class="ma-5"
            ></v-progress-circular>
        </v-card>

        <v-card
            class="mx-auto"
            flat
            v-else-if="$store.getters['user/getLoadedUser']!==null"
        >
            <v-card-text>
                <div>{{$store.getters['user/getLoadedUser'].id}}</div>
                <p class="display-1 text--primary">
                    {{$store.getters['user/getLoadedUser'].name}}
                </p>
                <p>{{$store.getters['user/getLoadedUser'].email}}</p>
            </v-card-text>
        </v-card>

    </v-col>

</template>

<script>
export default {
    name: "User.vue",
    mounted() {
        this.$store.dispatch('user/getProfile',this.$route.params.id);
    }
}
</script>

<style scoped>

</style>