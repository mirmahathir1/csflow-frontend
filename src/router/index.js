import Vue from 'vue'
import VueRouter from 'vue-router'
import Relevant from '../views/search/Relevant.vue'
import Search from "../views/search/Search";
import User from "../views/user/User";
import Auth from "../views/auth/Auth";
import SignIn from "../views/auth/SignIn";

import store from "../store"

Vue.use(VueRouter)

const routes = [
    {
        path: '/search',
        component: Search,
        name: 'Search',
        children: [
            {
                path: 'relevant',
                component: Relevant,
                name: 'Relevant'
            },
        ]
    },
    {
        path: '/user/:id',
        component: User,
        name: 'User'
    },
    {
        path: '/auth',
        component: Auth,
        name: 'Auth',
        children: [
            {
                path: 'signIn',
                component: SignIn,
                name: 'SignIn'
            }
        ]
    },
    {
        path: '/about',
        name: 'About',
        component: () => import('../views/About.vue')
    }
]

const router = new VueRouter({
    routes
})


router.beforeEach((to, from, next) => {
    if(!store.getters['auth/getIsSignedIn'] && to.name!='SignIn'){
        next('/auth/signIn');
    }
    if(store.getters['auth/getIsSignedIn'] && to.name=='SignIn'){
        next('/search/relevant');
    }

    if(to.name!=from.name){
        next();
    }



})
export default router
