import {csflowAPI} from '../../api';

const state = {
    token: null,
    signInLoaderFlag: false,

    isSignedIn: false,

    signInMessage: null,
    isSignInError: false,

    logoutLoaderFlag: false,
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

        if (getters.getToken === null) {
            commit('unsetIsSignedIn');
            return false;
        } else {
            commit('setIsSignedIn');
            return true;
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
    }
};


export default {
    state,
    actions,
    getters,
    mutations,
    namespaced: true
}
