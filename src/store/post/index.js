import {csflowAPI} from '../../api'
const state={
    messages:{
        'requestNewTag':null,
    },
    loaderFlags:{
        'requestNewTag':false,
        'courseLoader':true
    },
    error:{
        'requestNewTag':false,
    },
    courses:null,
    books:null,
    topics:null
}

const getters={
    getLoaderFlag: state=> flag=>{
        return state.loaderFlags[flag]
    },
    getMessage: state=>flag=>{
        return state.messages[flag]
    },
    getError: state=>flag=>{
        return state.error[flag]
    },
    getCourses:state=>{
        return state.courses
    }
};

const mutations={
    setLoaderFlag(state,flag){
        state.loaderFlags[flag]=true
    },
    unsetLoaderFlag(state,flag){
        state.loaderFlags[flag]=false
    },
    setMessage(state,flag,message){
        state.messages[flag]=message
    },
    unsetMessage(state,flag){
        state.messages[flag]=null
    },
    setError(state,flag){
        state.error[flag]=true
    },
    unsetError(state,flag){
        state.error[flag]=false
    },
    setCourses(state,data){
        state.courses=data
    },
    setBooks(state,data){
        state.books=data
    },
    setTopics(state,data){
        state.topics=data
    },
};

const actions={
    requestTag({commit},payload){
        commit('setLoaderFlag','requestNewTag')

        return new Promise((resolve,reject)=>{
            csflowAPI.post('/tag',payload)
            .then(response=>{
                resolve(response)
            })
            .catch(e=>{
                commit('setMessage','requestNewTag',e.response.data.message)
                commit('setError','requestNewTag')
                reject(e)
            })
            .finally(()=>{
                commit('unsetLoaderFlag','requestNewTag')
                commit('unsetMessage','requestNewTag')
                commit('unsetError','requestNewTag')
            })
        })
    },
    loadCourses({commit}){
        console.log('yeah')
        commit('setLoaderFlag','courseLoader')
        // return new Promise((resolve,reject)=>{
            csflowAPI.get('/tag')
            .then(response=>{
                commit('setCourses',response.data.payload)
                commit('unsetLoaderFlag','courseLoader')
                // resolve(response)
            })
            .catch(e=>{
                console.log(e.response)
                // reject(e)
            })
            .finally(()=>{
                
            })
        // })
    },
    loadBooks({commit},{courseId}){
        csflowAPI.get('/tag/'+courseId+'/books')
        .then(response=>{
            commit('setBooks',response.data.payload)
        })
        .catch(e=>{
            console.log(e.response)
            // reject(e)
        })
        .finally(()=>{
            
        })
    },
    loadTopics({commit},{courseId}){
        csflowAPI.get('/tag/'+courseId+'/topics')
        .then(response=>{
            commit('setTopics',response.data.payload)
        })
        .catch(e=>{
            console.log(e.response)
            // reject(e)
        })
        .finally(()=>{
            
        })
    },
    submitPost({commit},payload){
        return new Promise((resolve,reject)=>{
            csflowAPI.post('/post',payload)
            .then(response=>{
                resolve(response)
            })
            .catch(e=>{
                // commit('setMessage','requestNewTag',e.response.data.message)
                // commit('setError','requestNewTag')
                reject(e)
            })
            .finally(()=>{
                // commit('unsetLoaderFlag','requestNewTag')
                // commit('unsetMessage','requestNewTag')
                // commit('unsetError','requestNewTag')
            })
        })
    }
};

export  default{
    state,
    getters,
    mutations,
    actions,
    namespaced:true
}