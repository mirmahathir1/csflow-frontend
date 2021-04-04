import Vue from 'vue'
import VueRouter from 'vue-router'
import Relevant from '../views/search/Relevant.vue'
import Search from "../views/search/Search";
import User from "../views/user/User";
import Auth from "../views/auth/Auth";
import SIgnIn from "../views/auth/SIgnIn";

Vue.use(VueRouter)

const routes = [
    {
        path: '/search',
        component: Search,
        children: [
            {
                path: 'relevant',
                component: Relevant
            },
        ]
    },
    {
        path: '/user',
        component: User
    },
    {
        path: '/auth',
        component: Auth,
        children: [
            {
                path: 'signIn',
                component: SIgnIn
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

export default router
