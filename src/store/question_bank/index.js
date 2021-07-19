import {csflowAPI} from '../../api';

const state = {
    topics: null,

    questions: null,
    isQuestionSubmitError: false,
    questionSubmitMessage: null,
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
        'questions': false,
        'questionSubmission': false,
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
    getQuestionSubmitError: state => {
        return state.isQuestionSubmitError;
    },
    getQuestionSubmitMessage: state => {
        return state.questionSubmitMessage;
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
    setQuestionSubmitMessage(state, payload) {
        state.isQuestionSubmitError = true;
        state.questionSubmitMessage = payload;
    },
    unsetQuestionSubmitMessage(state) {
        state.isQuestionSubmitError = false;
        state.questionSubmitMessage = null;
    },
};

const actions = {
    loadTopics({commit, state}) {
        if (state.topics) return;

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
        return new Promise((resolve, reject) => {
            csflowAPI.get('/search', {'params': state.searchParams})
                .then(response => {
                    commit('setQuestions', response.data.payload);
                    resolve(response);
                })
                .catch(e => {
                    reject(e);
                })
                .finally(() => {
                    commit('unsetLoaderFlag', 'questions');
                });
        });
    },
    setSearchParams({commit}, payload) {
        commit('setSearchParams', payload);
    },
    clearSearch({commit}) {
        commit('setQuestions', null);
        commit('unsetLoaderFlag', 'questions');
    },
    createQuestion({commit}, payload) {
        commit('setLoaderFlag', 'questionSubmission');
        commit('unsetQuestionSubmitMessage');

        return new Promise((resolve, reject) => {
           csflowAPI.post('/post', payload)
               .then(response => {
                   resolve(response);
               })
               .catch(e => {
                   commit('setQuestionSubmitMessage', e.response.data.message);
                   reject(e);
               })
               .finally(() => {
                   commit('unsetLoaderFlag', 'questionSubmission');
               });
        });
    },
};

export default {
    state,
    actions,
    getters,
    mutations,
    namespaced: true
}