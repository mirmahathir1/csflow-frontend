import {csflowAPI} from '../../api';

const state = {
    userLoaderFlag: false,
    userLoaderMessage: null,
    isUserLoaderError: false,
    user: null,
};

const getters = {
    getUserLoaderFlag: state => {
        return state.userLoaderFlag;
    },
    getIsUserLoaderError: state=>{
        return state.isUserLoaderError;
    },
    getUserLoaderMessage: state=>{
        return state.userLoaderMessage;
    },
    getLoadedUser: state=>{
        return state.user;
    }

};
const mutations = {
    setUserLoaderFlag(state) {
        state.userLoaderFlag = true;
    },
    unsetUserLoaderFlag(state) {
        state.userLoaderFlag = false;
    },
    setUserLoaderMessage(state,payload){
        state.isUserLoaderError=true;
        state.userLoaderMessage = payload;
    },
    unsetUserLoaderMessage(state){
        state.isUserLoaderError=false;
        state.userLoaderMessage = null;
    },
    setUser(state,payload){
        state.user = payload;
    }


};
const actions = {

    async getProfile({ getters, commit},payload) {
        commit('setUserLoaderFlag');
        commit('unsetUserLoaderMessage');
        try{
            let response = await csflowAPI.get('/user/'+payload);
            commit('setUser',response.data.payload);
        }catch(e){
            commit('setUserLoaderMessage',e.response.data.message);
        }finally{
            commit('unsetUserLoaderFlag');
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
