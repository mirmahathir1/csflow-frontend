import {csflowAPI} from '../../api';

const state = {
    token: null,
    signInLoaderFlag: false,

    isSignedIn: false,

    signInMessage: null,
    isSignInError: false,

    sideBarItems:[],

    logoutLoaderFlag: false,
    signUpLoaderFlag: false,
    signUpMessage:null,
    isSignUpError: false,

    drawerSidebar:false
};

const getters = {
    getToken: state => {
        return state.token;
    },
    getSignInLoaderFlag: state =>{
        return state.signInLoaderFlag;
    },
    getIsSignedIn: state =>{
        return state.isSignedIn;
    },
    getSignInMessage: state=>{
        return state.signInMessage;
    },
    getIsSignInError: state=>{
        return state.isSignInError
    },
    getLogoutLoaderFlag: state=>{
        return state.logoutLoaderFlag;
    },
    getSignUpLoaderFlag: state=>{
        return state.signUpLoaderFlag
    },
    getSignUpMessage: state=>{
        return state.signUpMessage;
    },
    getIsSignUpError: state=>{
        return state.isSignUpError
    },
    getSideBarItems: state=>{
        return state.sideBarItems;
    },
    getDrawerSideBar: state=>{
        return state.drawerSidebar
    }

};
const mutations = {
    setToken(state,payload) {
        state.token = payload;
    },
    unsetToken(state){
        state.token = null;
    },
    setSignInLoaderFlag(state){
        state.signInLoaderFlag = true;
    },
    unsetSignInLoaderFlag(state){
        state.signInLoaderFlag = false;
    },
    setIsSignedIn(state){
        state.isSignedIn=true;
    },
    unsetIsSignedIn(state){
        state.isSignedIn=false;
    },

    setSignInMessage(state,payload){
        state.signInMessage = payload;
        state.isSignInError = true;
    },
    unsetSignInMessage(state){
        state.signInMessage = null;
        state.isSignInError = false;
    },

    setSideBarItems(state,type){
        state.sideBarItems=[
            {
                title:'Unanswered',
                link:'/auth/signUp',
                icon:'login'
            }
        ]
    },

    setSignUpLoaderFlag(state){
        state.signUpLoaderFlag=true
    },
    unsetSignUpLoaderFlag(state){
        state.signUpLoaderFlag=false
    },

    setSignUpMessage(state,payload){
        state.signUpMessage = payload;
        state.isSignUpError=true;
    },
    unsetSignUpMessage(state){
        state.signUpMessage = null;
        state.isSignUpError=false;
    },

    loadTokenFromLocalStorage(state) {
        state.token = localStorage.getItem('token');
    },

    saveTokenToLocalStorage(state) {
        localStorage.setItem('token', state.token);
    },

    removeTokenFromLocalStorage(state) {
        localStorage.removeItem('token');
    },

    setLogoutLoaderFlag(state){
        state.logoutLoaderFlag = true;
    },
    unsetLogoutLoaderFlag(state){
        state.logoutLoaderFlag = false;
    },
    changeDrawerSideBar(state){
        if(state.isSignedIn) state.drawerSidebar=!state.drawerSidebar;
    }
};
const actions = {
    async logout({ getters, commit }) {
        commit('setLogoutLoaderFlag');

        try{
            await csflowAPI.post('/auth/signOut');
        }catch(e){

        }finally{
            commit('unsetToken');
            commit('unsetIsSignedIn');
            commit('unsetLogoutLoaderFlag');
            commit('removeTokenFromLocalStorage');
        }
    },
    async logoutAll({getters,commit}){
        commit('setLogoutLoaderFlag');

        try{
            await csflowAPI.post('/auth/signOutAllDevice');
        }catch(e){

        }finally{
            commit('unsetToken');
            commit('unsetIsSignedIn');
            commit('unsetLogoutLoaderFlag');
            commit('removeTokenFromLocalStorage');
        }
    },

    autoLogin({ getters, commit }) {
        commit('loadTokenFromLocalStorage');

        try {
            let response = csflowAPI.post('/auth/signIn/auto',);
            commit('setIsSignedIn');
            commit('setSideBarItems');
            return true;
            
        } catch(e){
            commit('unsetIsSignedIn');
            commit('unsetToken');
            return false;
        }
            
    },

    async login({ getters, commit }, payload) {
        commit('unsetSignInMessage');
        commit('unsetIsSignedIn');
        commit('setSignInLoaderFlag');

        try {
            let response = await csflowAPI.post('/auth/signIn', payload);
            commit('setToken',response.data.payload);
            commit('setIsSignedIn');
            commit('setSideBarItems','user');
            commit('saveTokenToLocalStorage',response.data.payload);
            return true;
        }catch (e){
            console.log(e.response);
            commit('setSignInMessage',e.response.data.message);
            commit('unsetIsSignedIn');
            return false;
        }finally {
            commit('unsetSignInLoaderFlag');
        }
    },

    async signUp({ getters, commit }, payload){
        commit('unsetSignInMessage');
        commit('unsetIsSignedIn');
        commit('setSignUpLoaderFlag');

        try {
            let response = await csflowAPI.post('/auth/signUp', payload);
            commit('unsetSignUpMessage')
            return true;
        }catch (e){
            console.log(e.response);
            commit('setSignUpMessage',e.response.data.message);
            return false;
        }finally {
            commit('unsetSignUpLoaderFlag');
        }
    },
    
    // async setDrawerSideBar({getters,commit}){
    //     commit('changeDrawerSideBar');
    // },

    async forgetPassword({getters,commit},payload){
        return new Promise((resolve, reject) => {
            csflowAPI.patch('/auth/password/forgot', payload)
            .then(response=>{
                resolve(response)
            }).catch (e=>{
                console.log(e.response);
                reject(e)
            })
        })         
    },

    async recoverPassword({getters,commit},payload){
        return new Promise((resolve, reject) => {
            csflowAPI.patch('/auth/password/recover', payload)
            .then(response=>{
                resolve(response)
            }).catch (e=>{
                console.log(e.response);
                reject(e)
            })
        })         
    },

    async completeSignup({getters,commit},payload){
        return new Promise((resolve, reject) => {
            csflowAPI.patch('/auth/signUp', payload)
            .then(response=>{
                // commit('setToken',payload.token);
                // commit('setIsSignedIn');
                // commit('setSideBarItems','user');
                // commit('saveTokenToLocalStorage',payload.token);
                resolve(response)
            }).catch (e=>{
                console.log(e.response);
                reject(e)
            })
        })         
    },
    
};


export default {
    state,
    actions,
    getters,
    mutations,
    namespaced: true
}
