import {csflowAPI} from '../../api'
const state={
    messages:{
        'requestNewTag':null,
        'postMessage':null,
        'postAnswerMessage':null,
    },
    loaderFlags:{
        'requestNewTag':false,
        'courseLoader':true,
        'postLoader':false,
        'postAnswerLoader':false,
        'bookLoader':false
    },
    error:{
        'requestNewTag':false,
        'postError':false,
        'postAnswerError':false,
    },
    courses:null,
    books:null,
    topics:null,
    post:null,
    postAnswer:null,
    searchResults:[]
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
    },
    getBooks:state=>{
        return state.books
    },
    getTopics:state=>{
        return state.topics
    },
    getPost:state=>{
        return state.post
    },
    getPostAnswer:state=>{
        return state.postAnswer
    },
    getSearchResults:state=>{
        return state.searchResults
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
    setPost(state,data){
        state.post=data
    },
    setPostAnswer(state,data){
        state.postAnswer=data
    },
    setSearchResults(state,data){
        state.searchResults=data
    }
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
        commit('setLoaderFlag','courseLoader')
            csflowAPI.get('/tag')
            .then(response=>{
                commit('setCourses',response.data.payload)
                commit('unsetLoaderFlag','courseLoader')
            })
            .catch(e=>{
                console.log(e.response)
            })
            .finally(()=>{

            })
    },
    loadBooks({commit},courseId){
        commit('setLoaderFlag','bookLoader')
        csflowAPI.get('/tag/'+courseId+'/books')
        .then(response=>{
            commit('setBooks',response.data.payload)
        })
        .catch(e=>{
            console.log(e.response)
            // reject(e)
        })
        .finally(()=>{
            commit('unsetLoaderFlag','bookLoader')
        })
    },
    loadTopics({commit},courseId){
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
                reject(e)
            })
            .finally(()=>{

            })
        })
    },
    loadPost({commit},id){
        commit('setLoaderFlag','postLoader')
        commit('unsetMessage','postMessage')
        commit('unsetError','postError')
        return new Promise((resolve,reject)=>{
            csflowAPI.get('/post/'+id)
            .then(response=>{
                commit('setPost',response.data.payload)
                resolve(response)
            })
            .catch(e=>{
                commit('setMessage','postMessage',e.response.data.message)
                commit('setError','postError')
                reject(e)
            })
            .finally(()=>{
                commit('unsetLoaderFlag','postLoader')
                console.log('done')
            })
        })
    },
    loadPostAnswer({commit},id){
        commit('setLoaderFlag','postAnswerLoader')
        commit('unsetMessage','postAnswerMessage')
        commit('unsetError','postAnswerError')
        return new Promise((resolve,reject)=>{
            csflowAPI.get('/post/'+id+'/answer')
            .then(response=>{
                commit('setPostAnswer',response.data.payload)
                resolve(response)
            })
            .catch(e=>{
                commit('setMessage','postAnswerMessage',e.response.data.message)
                commit('setError','postAnswerError')
                reject(e)
            })
            .finally(()=>{
                commit('unsetLoaderFlag','postAnswerLoader')
            })
        })
    },
    async report({commit},payload){
        return new Promise((resolve, reject) => {
            csflowAPI.post('/'+payload.type+'/'+payload.id+'/report')
            .then(response=>{
                resolve(response)
            })
            .catch(e=>{
                reject(e)
            })
        })
    },
    async follow({commit},payload){
        return new Promise((resolve, reject) => {
            csflowAPI.post('/'+payload.type+'/'+payload.id+'/follow')
            .then(response=>{
                resolve(response)
            })
            .catch(e=>{
                reject(e)
            })
        })
    },
    async delete({commit},payload){
        return new Promise((resolve, reject) => {
            csflowAPI.delete('/'+payload.type+'/'+payload.id)
            .then(response=>{
                resolve(response)
            })
            .catch(e=>{
                reject(e)
            })
        })
    },
    async makeAnswer({commit},data){
        let payload={"description":data.answer,"files":data.files}
        return new Promise((resolve,reject)=>{
            csflowAPI.post('/post/'+data.id+'/answer',payload)
            .then(response=>{
                resolve(response)
            })
            .catch(e=>{
                reject(e)
            })
        })
    },
    async makeComment({commit},data){
        let payload={"description":data.comment}
        return new Promise((resolve,reject)=>{
            csflowAPI.post('/post/'+data.id+'/comment',payload)
            .then(response=>{
                resolve(response)
            })
            .catch(e=>{
                reject(e)
            })
        })
    },
    async cancelReport({commit},data){
        return new Promise((resolve,reject)=>{
            csflowAPI.delete('/'+data.type+'/'+data.id+'/report',)
            .then(response=>{
                resolve(response)
            })
            .catch(e=>{
                reject(e)
            })
        })
    },
    async cancelFollow({commit},data){
        return new Promise((resolve,reject)=>{
            csflowAPI.delete('/'+data.type+'/'+data.id+'/follow',)
            .then(response=>{
                resolve(response)
            })
            .catch(e=>{
                reject(e)
            })
        })
    },
    async editAnswer({commit},data){
        let payload={'description':data.description,'files':data.files}
        return new Promise((resolve,reject)=>{
            csflowAPI.patch('/answer/'+data.id,payload)
            .then(response=>{
                resolve(response)
            })
            .catch(e=>{
                reject(e)
            })
        })
    },
    async editComment({commit},data){
        let payload={'description':data.description}
        return new Promise((resolve,reject)=>{
            csflowAPI.patch('/comment/'+data.id,payload)
            .then(response=>{
                resolve(response)
            })
            .catch(e=>{
                reject(e)
            })
        })
    },
    async editPost({commit},payload){

    },
    searchPost({commit},data){
        let params={
            'skip':data.params.skip,
            'limit':data.params.limit,
            ...data.payload,
        }
        return new Promise((resolve,reject)=>{
            console.log("payload for search: ",data.payload);
            csflowAPI.get('/search',{'params':params})
            .then(response=>{
                commit('setSearchResults',response.data.payload)
                resolve(response)
            })
            .catch(e=>{
                reject(e)
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
