import {csflowAPI} from '../../api';

const state = {
    topPost:[],
    relevantPost:[],
    topUser:[],
    unansweredPost:[],
    userPost:[]
};

const getters={
    getTopPost: state=>{
        return state.topPost
    },
    getRelevantPost:state=>{
        return state.relevantPost
    },
    getTopUser:state=>{
        return state.topUser
    },
    getUnansweredPost:state=>{
        return state.unansweredPost
    },
    getUserPost:state=>{
        return state.userPost
    }
};

const mutations={
    setTopPost(state,data){
        state.topPost=data
    },
    setRelevantPost(state,data){
        state.relevantPost=data
    },
    setTopUser(state,data){
        state.topUser=data
    },
    setUnansweredPost(state,data){
        state.unansweredPost=data
    },
    setUserPost(state,data){
        state.userPost=data
    }
};

const actions={
    loadTopPost({commit},payload){
        return new Promise((resolve,reject)=>{
            csflowAPI.get('/search/topPost',{'params':payload})
            .then(response=>{
                console.log(response.data.payload)
                commit('setTopPost',response.data.payload)
                resolve(response)
            })
            .catch(e=>{
                reject(e)
            })
        })
    },
    loadRelevantPost({commit},payload){
        return new Promise((resolve,reject)=>{
            csflowAPI.get('/search/relevantPost',{'params':payload})
            .then(response=>{
                console.log(response.data.payload)
                commit('setRelevantPost',response.data.payload)
                resolve(response)
            })
            .catch(e=>{
                reject(e)
            })
        })
    },
    loadTopUser({commit},payload){
        return new Promise((resolve,reject)=>{
            csflowAPI.get('/search/topUser',{'params':payload})
            .then(response=>{
                console.log(response.data.payload)
                commit('setTopUser',response.data.payload)
                resolve(response)
            })
            .catch(e=>{
                reject(e)
            })
        })
    },
    loadUnansweredPost({commit},payload){
        return new Promise((resolve,reject)=>{
            csflowAPI.get('/search/unansweredPost',{'params':payload})
            .then(response=>{
                console.log(response.data.payload)
                commit('setUnansweredPost',response.data.payload)
                resolve(response)
            })
            .catch(e=>{
                reject(e)
            })
        })
    },
    loadUserPost({commit},id){
        return new Promise((resolve,reject)=>{
            csflowAPI.get('/post/'+id,)
            .then(response=>{
                console.log(response.data.payload)
                commit('setUserPost',response.data.payload)
                resolve(response)
            })
            .catch(e=>{
                reject(e)
            })
        })
    },
    loadAll(){
        this.loadTopPost({'skip':0,'limit':10})
        this.loadRelevantPost({'skip':0,'limit':10})
        this.loadTopUser({'skip':0,'limit':10})
        this.loadUnansweredPost({'skip':0,'limit':10})
        this.loadUserPost('1605011')

    }

};

export default {
    state,
    actions,
    getters,
    mutations,
    namespaced: true
}