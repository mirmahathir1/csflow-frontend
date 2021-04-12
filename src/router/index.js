import Vue from 'vue'
import VueRouter from 'vue-router'
import Relevant from '../views/search/Relevant.vue'
import User from "../views/user/User";
import SignIn from "../views/auth/SignIn";
import Resources from "../views/archive/Resources";
import ResourcesBatch from "../views/archive/ResourcesBatch";

import store from "../store"

Vue.use(VueRouter)

const routes = [
    {
        path: '/search/relevant',
        component: Relevant,
        name: 'Relevant',
    },

    {
        path: '/user/:id',
        component: User,
        name: 'User'
    },
    {
        path: '/auth/signIn',
        component: SignIn,
        name: 'SignIn',
    },
    {
        path: '/about',
        name: 'About',
        component: () => import('../views/About.vue')
    },
    {
        path: '/archive/resource',
        name: 'Resources',
        component: Resources
    },
    {
        path: '/archive/resource/:batch',
        name: 'ResourcesBatch',
        component: ResourcesBatch
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

    if(to.path != from.path){
        next();
    }



})
export default router
