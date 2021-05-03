import {csflowAPI} from '../../api';

const state = {
    userLoaderFlag: false,
    userLoaderMessage: null,
    isUserLoaderError: false,
    user: null,
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
        return new Promise((resolve, reject) => {
            csflowAPI.patch('/auth/password/change', payload)
            .then(response=>{
                resolve(response)
            }).catch(e=>{
                reject(e)
            })
        })
    },
    async uploadImage({ getters, commit},payload){
        return new Promise((resolve, reject) => {
            csflowAPI.patch('/user/profilePic', payload)
            .then(response=>{
                console.log(response)
                resolve(response)
            }).catch(e=>{
                console.log(e)
                reject(e)
            })
        })
    },
    async changeName({ getters, commit},payload){
        return new Promise((resolve, reject) => {
            csflowAPI.patch('/user', payload)
            .then(response=>{
                let res = csflowAPI.get('/user/me');
                commit('setUser',res.data.payload);
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
