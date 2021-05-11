import {csflowAPI} from '../../api';

const state = {
    userLoaderFlag: false,
    userLoaderMessage: null,
    isUserLoaderError: false,
    user: null,
    userForProfile:null,
    name:null
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
    },
    getLoadedUserForProfile: state=>{
        return state.userForProfile;
    },
    getName: state=>{
        return state.name;
    },

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
        state.name=payload.name
    },
    setUserForProfile(state,payload){
        state.userForProfile = payload;
    }


};
const actions = {
    getUser({commit},payload){
        return new Promise((resolve, reject) => {
            // commit('setUserLoaderFlag');
            // commit('unsetUserLoaderMessage');

            csflowAPI.get('/user/'+payload)
                .then(response => {
                    commit('setUser', response.data.payload);
                    resolve(response.data.payload);
                })
                .catch(e => {
                    // commit('setUserLoaderMessage', e.response.data.message);
                    reject(e);
                })
                .finally(() => {
                    // commit('unsetUserLoaderFlag');
                });
        });
    },
    getProfile({commit}, payload) {
        return new Promise((resolve, reject) => {
            commit('setUserLoaderFlag');
            commit('unsetUserLoaderMessage');

            csflowAPI.get('/user/'+payload)
                .then(response => {
                    commit('setUserForProfile', response.data.payload);
                    resolve(response.data.payload);
                })
                .catch(e => {
                    commit('setUserLoaderMessage', e.response.data.message);
                    reject(e);
                })
                .finally(() => {
                    commit('unsetUserLoaderFlag');
                });
        });
    },
    async deleteUser({ getters, commit}){
        return new Promise((resolve, reject) => {
            csflowAPI.delete('/user')
            .then(response=>{
                resolve(response)
            }).catch(e=>{
                reject(e)
            })
        })
    },
    async changePassword({ getters, commit},payload){
        try {
            await csflowAPI.patch('/auth/password/change', payload);
            return null;
        }catch(e){
            return e;
        }

    },
    async uploadImage({ getters, commit},payload){
        try {
            await csflowAPI.patch('/user/profilePic', payload)
        }catch (e){

        }
    },
    async changeName({ getters, commit},payload){
        return new Promise((resolve, reject) => {
            csflowAPI.patch('/user', payload)
            .then(response=>{
                // let res = csflowAPI.get('/user/me');
                // commit('setUser',res.data.payload);
                resolve(response)
            }).catch(e=>{
                reject(e)
            })
        })
    }
};


export default {
    state,
    actions,
    getters,
    mutations,
    namespaced: true
}
