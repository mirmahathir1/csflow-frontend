import Vue from 'vue'
import VueRouter from 'vue-router'

import store from "../store"

Vue.use(VueRouter)

const routes = [
    {
        path: '/search/relevant',
        name: 'Relevant',
        component: () => import('../views/search/Relevant.vue')
    },

    {
        path: '/user/:id',
        name: 'User',
        component: () => import('../views/user/User')
    },
    {
        path: '/user/profile/edit',
        name: 'EditProfile',
        component: () => import('../views/user/EditProfile')
    },
    {
        path: '/auth/signIn',
        name: 'SignIn',
        component: () => import('../views/auth/SignIn')
    },
    {
        path: '/auth/signUp',
        name: 'SignUp',
        component: () => import('../views/auth/SignUp')
    },
    {
        path: '/auth/signUpConfirmation',
        name: 'SignUpConfirmation',
        component: () => import('../views/auth/AfterSignUp')
    },
    {
        path: '/auth/signUp/complete',
        name: 'SignUpComplete',
        component: () => import('../views/auth/SignupComplete')
    },
    {
        path: '/auth/password/forgot',
        name: 'Forgot',
        component: () => import('../views/auth/ForgotPassword')
    },
    {
        path: '/auth/password/recover',
        name: 'Recover',
        component: () => import('../views/auth/RecoverPassword')
    },
    {
        path: '/about',
        name: 'About',
        component: () => import('../views/About.vue')
    },
    {
        path:'/box',
        name:'Box',
        component: () => import('../components/Box/postBox')
    },
    {
        path:'/post/create',
        name:'Create Post',
        component: () => import('../views/post/CreatePost')
    },
    {
        path: '/archive/resource',
        name: 'Resources',
        component: () => import('../views/archive/Resources')
    },
    {
        path: '/archive/resource/:batch',
        name: 'ResourcesBatch',
        component: () => import('../views/archive/ResourcesBatch')
    },
    {
        path: '/archive/thesis',
        name: 'Theses',
        component: () => import('../views/archive/Theses')
    },
    {
        path: '/archive/thesis/batch/:batch',
        name: 'ThesesBatch',
        component: () => import('../views/archive/ThesesBatch')
    },
    {
        path: '/archive/thesis/new',
        name: 'ThesisCreation',
        component: () => import('../views/archive/ThesisCreation')
    },
    {
        path: '/archive/thesis/:id/edit',
        name: 'ThesisUpdate',
        component: () => import('../views/archive/ThesisUpdate')
    },
    {
        path: '/archive/thesis/:id',
        name: 'ThesisDetails',
        component: () => import('../views/archive/ThesisDetails')
    },
    {
        path: '/archive/project',
        name: 'Projects',
        component: () => import('../views/archive/Projects')
    },
    {
        path: '/archive/project/batch/:batch',
        name: 'ProjectsBatch',
        component: () => import('../views/archive/ProjectsBatch')
    },
    {
        path: '/archive/project/batch/:batch/:course',
        name: 'ProjectsCourse',
        component: () => import('../views/archive/ProjectsCourse')
    },
    {
        path: '/archive/project/new',
        name: 'ProjectCreation',
        component: () => import('../views/archive/ProjectCreation')
    },
    {
        path: '/archive/project/:id/edit',
        name: 'ProjectUpdate',
        component: () => import('../views/archive/ProjectUpdate')
    },
    {
        path: '/archive/project/:id',
        name: 'ProjectDetails',
        component: () => import('../views/archive/ProjectDetails')
    },
]

const router = new VueRouter({
    routes
})


// router.beforeEach((to, from, next) => {
//     if(to.name=="create post" || to.name=="SignUpConfirmation"){
//         next();
//     }
//     if(!store.getters['auth/getIsSignedIn'] && to.name=='Forgot' && to.name=='Recover'){
//         next();
//     }
//     if(!store.getters['auth/getIsSignedIn'] && to.name!='SignIn' && to.name!='SignUp' && to.name!='Box'){
//         next('/auth/signIn');
//     }
//     if(store.getters['auth/getIsSignedIn'] && to.name=='SignIn'){
//         next('/search/relevant');
//     }

//     if(to.path != from.path){
//         next();
//     }



// })
export default router
