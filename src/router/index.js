import Vue from 'vue'
import VueRouter from 'vue-router'

import store from "../store"

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Index',
        component: () => import('../views/Index')
    },
    {
        path: '/home',
        name: 'Home',
        component: () => import('../views/Home.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/search/relevant',
        name: 'Relevant',
        component: () => import('../views/search/Relevant.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/user/:id',
        name: 'User',
        component: () => import('../views/user/User'),
        meta: { requiresAuth: true }
    },
    {
        path: '/user/profile/edit',
        name: 'EditProfile',
        component: () => import('../views/user/EditProfile'),
        meta: { requiresAuth: true }
    },
    {
        path: '/auth/signIn',
        name: 'SignIn',
        component: () => import('../views/auth/SignIn'),
        meta: {isLoggedIn: true}
    },
    {
        path: '/auth/signUp',
        name: 'SignUp',
        component: () => import('../views/auth/SignUp'),
        meta: {isLoggedIn: true}
    },
    {
        path: '/auth/signUpConfirmation',
        name: 'SignUpConfirmation',
        component: () => import('../views/auth/AfterSignUp'),
        meta: {isLoggedIn: true}
    },
    {
        path: '/auth/signUp/complete',
        name: 'SignUpComplete',
        component: () => import('../views/auth/SignupComplete'),
        meta: {isLoggedIn: true}
    },
    {
        path: '/auth/password/forgot',
        name: 'Forgot',
        component: () => import('../views/auth/ForgotPassword'),
        meta: {isLoggedIn: true}
    },
    {
        path: '/auth/password/recover',
        name: 'Recover',
        component: () => import('../views/auth/RecoverPassword'),
        meta: {isLoggedIn: true}
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
        name:'CreatePost',
        component: () => import('../views/post/CreatePost'),
        meta: { requiresAuth: true }
    },
    {
        path: '/archive',
        name: 'Archive',
        component: () => import('../views/archive/Archive'),
        meta: { requiresAuth: true }
    },
    {
        path: '/archive/resource',
        name: 'Resources',
        component: () => import('../views/archive/Resources'),
        meta: { requiresAuth: true }
    },
    {
        path: '/archive/resource/:batch',
        name: 'ResourcesBatch',
        component: () => import('../views/archive/ResourcesBatch'),
        meta: { requiresAuth: true }
    },
    {
        path: '/archive/thesis',
        name: 'Theses',
        component: () => import('../views/archive/Theses'),
        meta: { requiresAuth: true }
    },
    {
        path: '/archive/thesis/batch/:batch',
        name: 'ThesesBatch',
        component: () => import('../views/archive/ThesesBatch'),
        meta: { requiresAuth: true }
    },
    {
        path: '/archive/thesis/new',
        name: 'ThesisCreation',
        component: () => import('../views/archive/ThesisCreation'),
        meta: { requiresAuth: true }
    },
    {
        path: '/archive/thesis/:id/edit',
        name: 'ThesisUpdate',
        component: () => import('../views/archive/ThesisUpdate'),
        meta: { requiresAuth: true }
    },
    {
        path: '/archive/thesis/:id',
        name: 'ThesisDetails',
        component: () => import('../views/archive/ThesisDetails'),
        meta: { requiresAuth: true }
    },
    {
        path: '/archive/project',
        name: 'Projects',
        component: () => import('../views/archive/Projects'),
        meta: { requiresAuth: true }
    },
    {
        path: '/archive/project/batch/:batch',
        name: 'ProjectsBatch',
        component: () => import('../views/archive/ProjectsBatch'),
        meta: { requiresAuth: true }
    },
    {
        path: '/archive/project/batch/:batch/:course',
        name: 'ProjectsCourse',
        component: () => import('../views/archive/ProjectsCourse'),
        meta: { requiresAuth: true }
    },
    {
        path: '/archive/project/new',
        name: 'ProjectCreation',
        component: () => import('../views/archive/ProjectCreation'),
        meta: { requiresAuth: true }
    },
    {
        path: '/archive/project/:id/edit',
        name: 'ProjectUpdate',
        component: () => import('../views/archive/ProjectUpdate'),
        meta: { requiresAuth: true }
    },
    {
        path: '/archive/project/:id',
        name: 'ProjectDetails',
        component: () => import('../views/archive/ProjectDetails'),
        meta: { requiresAuth: true }
    },
    

    ////////////////// privileged module /////////////////////
    {
        path: '/privileged/user',
        name: 'PrivilegedUserManager',
        component: () => import('../views/privileged/UserManager'),
        meta: { requiresAuth: true, requiresPrivilege: true }
    }
]

const router = new VueRouter({
    routes
});

// store.dispatch('auth/autoLogin');

let attemptedAutoLogin = false;
router.beforeEach(async (to, from, next) => {
    try {
        // try to auto login
        if (!attemptedAutoLogin) {
            attemptedAutoLogin = true;
            await store.dispatch('auth/autoLogin');
        }
    } catch (e) {

    } finally {
        if (to.matched.some(record => record.meta.requiresAuth)) {
            if (!store.getters['auth/getIsSignedIn']) {
                next('/auth/signIn');
            } else {
                next();
            }
        } else if(to.matched.some(record => record.meta.isLoggedIn)){
            if (store.getters['auth/getIsSignedIn']) {
                next('/home');
            } else {
                next();
            }
        } else {
            next();
        }
    }

    // if(to.name=="CreatePost" || to.name=="SignUpConfirmation"){
    //     next();
    // }
    // if(!store.getters['auth/getIsSignedIn'] && to.name=='Forgot' && to.name=='Recover'){
    //     next();
    // }
    // if(!store.getters['auth/getIsSignedIn'] && to.name!='SignIn' && to.name!='SignUp' && to.name!='Box'){
    //     next('/auth/signIn');
    // }
    // if(store.getters['auth/getIsSignedIn'] && to.name=='SignIn'){
    //     next('/search/relevant');
    // }
    //
    // if(to.path != from.path){
    //     next();
    // }
});

export default router
