import {csflowAPI} from '../../api';

const state = {
    topics: null,

    questions: null,
    searchParams: {
        "text": null,
        "courseId": null,
        "topic": null,
        "book": null,
        "level": null,
        "term": null
    },

    loaderFlags: {
        'topics': true,
        'questions': true,
    }
};

const getters = {
    getLoaderFlag: state => flag => {
        return state.loaderFlags[flag];
    },
    getTopics: state => {
        return state.topics;
    },
    getQuestions: state => {
        return state.questions;
    },
};

const mutations = {
    setLoaderFlag(state, flag) {
        state.loaderFlags[flag] = true;
    },
    unsetLoaderFlag(state, flag) {
        state.loaderFlags[flag] = false;
    },
    setTopics(state, payload) {
        state.topics = payload;
    },
    setQuestions(state, payload) {
        state.questions = payload;
    },
    setSearchParams(state, payload) {
        state.searchParams = payload;
    },
};

const actions = {
    loadTopics({commit}) {
        commit('setLoaderFlag', 'topics');
        commit('setTopics', null);
        csflowAPI.get('/tag')
            .then(response => {
                commit('setTopics', response.data.payload);
            })
            .catch(e => {
                console.log(e.response);
            })
            .finally(() => {
                commit('unsetLoaderFlag', 'topics');
            });
    },
    loadQuestions({commit, state}, payload) {
        commit('setLoaderFlag', 'questions');
        commit('setQuestions', null);
        csflowAPI.get('/search', {'params': state.searchParams})
            .then(response => {
                commit('setQuestions', response.data.payload);
            })
            .catch(e => {
                console.log(e.response);
            })
            .finally(() => {
                commit('unsetLoaderFlag', 'questions');
            });
    },
    setSearchParams({commit}, payload) {
        commit('setSearchParams', payload);
    },
    clearSearch({commit}) {
        commit('setQuestions', null);
        commit('unsetLoaderFlag', 'questions');
    },
};

export default {
    state,
    actions,
    getters,
    mutations,
    namespaced: true
}