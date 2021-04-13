<template>
    <v-navigation-drawer app clipped v-if="getIsSignedIn && getDrawerSideBar" >
        <v-list
            dense
            nav
        >
            <template v-for="(item,index) in items">
                <v-list-item 
                    :to="item.link"
                    :key="index"
                    link
                >
                    <v-list-item-icon>
                        <v-icon>{{item.icon}}</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>{{item.title}}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </template>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
    computed:{
        ...mapGetters('auth',['getIsSignedIn','getSideBarItems','getDrawerSideBar'])
    },
    data:()=>({
        items:[
            {
                title:'Unanswered',
                icon:'mdi-magnify',
                link:'/about'
            }
        ]

    }),
    methods:{
        changeRoute(link){
            this.$router.push(link)
        },
    },
    
}
</script>

<style>

</style>
