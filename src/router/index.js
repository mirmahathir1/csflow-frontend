import Vue from 'vue'
import VueRouter from 'vue-router'

import store from "../store"

Vue.use(VueRouter)

const routes = [
    {
        path: '/test',
        name: 'Test',
        component: () => import('../components/Post/answerSection.vue'),
        meta: { requiresAuth: false }
    },
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
        path: '/search/advanced',
        name: 'AdvancedSearch',
        component: () => import('../views/search/AdvancedSearch.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/search',
        name: 'Search',
        component: () => import('../views/search/SearchPage.vue'),
        meta: { requiresAuth: true }
    },
    {
        path:  '/postdetails',
        name: 'PostDetails',
        component:()=>import('../views/post/PostDetails.vue'),
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
        meta: {requiresAuth: false}
    },
    {
        path: '/auth/signUp',
        name: 'SignUp',
        component: () => import('../views/auth/SignUp'),
        meta: {requiresAuth: false}
    },
    {
        path: '/auth/signUpConfirmation',
        name: 'SignUpConfirmation',
        component: () => import('../views/auth/AfterSignUp'),
        meta: {requiresAuth: false}
    },
    {
        path: '/auth/signUp/complete',
        name: 'SignUpComplete',
        component: () => import('../views/auth/SignupComplete'),
        meta: {requiresAuth: false}
    },
    {
        path: '/auth/password/forgot',
        name: 'Forgot',
        component: () => import('../views/auth/ForgotPassword'),
        meta: {requiresAuth: false}
    },
    {
        path: '/auth/password/recover',
        name: 'Recover',
        component: () => import('../views/auth/RecoverPassword'),
        meta: {requiresAuth: false}
    },
    {
        path: '/about',
        name: 'About',
        component: () => import('../views/About.vue'),
        meta: {requiresAuth: true}
    },
    {
        path:'/post/create',
        name:'CreatePost',
        component: () => import('../views/post/CreatePost'),
        meta: { requiresAuth: true }
    },

    ////////////////// archive module /////////////////////
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
        path: '/archive/thesis/search/:topic',
        name: 'ThesesSearchResult',
        component: () => import('../views/archive/ThesesSearchResult'),
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
    {
        path: '/archive/project/search/:topic',
        name: 'ProjectsSearchResult',
        component: () => import('../views/archive/ProjectsSearchResult'),
        meta: { requiresAuth: true }
    },

    ////////////////// privileged module /////////////////////
    {
        path: '/privileged/user',
        name: 'PrivilegedUserManager',
        component: () => import('../views/privileged/UserManager'),
        meta: { requiresAuth: true, requiresPrivilege: true }
    },
    {
        path: '/privileged/tag/existing',
        name: 'Existing Tags',
        component: () => import('../views/privileged/TagExisting'),
        meta: { requiresAuth: true, requiresPrivilege: true }
    },
    {
        path: '/privileged/tag/requested',
        name: 'Requested Tags',
        component: () => import('../views/privileged/TagRequested'),
        meta: { requiresAuth: true, requiresPrivilege: true }
    },
    {
        path: '/privileged/report/post',
        name: 'Report Manager Post',
        component: () => import('../views/privileged/ReportManagerPost'),
        meta: { requiresAuth: true, requiresPrivilege: true }
    },
    {
        path: '/privileged/report/answer',
        name: 'Report Manager Answer',
        component: () => import('../views/privileged/ReportManagerAnswer'),
        meta: { requiresAuth: true, requiresPrivilege: true }
    },
    {
        path: '/privileged/report/comment',
        name: 'Report Manager Comment',
        component: () => import('../views/privileged/ReportManagerComment'),
        meta: { requiresAuth: true, requiresPrivilege: true }
    },
    {
        path: '/privileged/archive/resource',
        name: 'Resource Manager',
        component: () => import('../views/privileged/ResourceManager'),
        meta: { requiresAuth: true, requiresPrivilege: true }
    },
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

            // turn on privileged sidebar if needed
            if (to.matched.some(record => record.meta.requiresPrivilege)) {
                await store.dispatch('others/setPrivilegedDash');
            }
        }
    } catch (e) {

    } finally {
        if (to.matched.some(record => record.meta.requiresAuth)) {
            if (!store.getters['auth/getIsSignedIn']) {
                next('/auth/signIn');
            } else {
                // check if privilege is needed
                if (to.matched.some(record => record.meta.requiresPrivilege)) {
                    if (!store.getters['auth/getIsCR']) {
                        next('/home');
                    } else {
                        next();
                    }
                } else {
                    next();
                }
            }
        } else {
            if (store.getters['auth/getIsSignedIn']) {
                next('/home');
            } else {
                next();
            }
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
