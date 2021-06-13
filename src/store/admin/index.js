import {csflowAPI} from "../../api";

const state = {
    crs: null,
    crSubmitMessage: null,
    isCRSubmitError: false,

    courses: null,

    loaderFlags: {
        'crs': true,
        'crSubmission': false,
        'courses': true,
    },
};

const getters = {
    getLoaderFlag: state => flag => {
        return state.loaderFlags[flag];
    },
    getCRs: state => {
        return state.crs;
    },
    getCRSubmitError: state => {
        return state.isCRSubmitError;
    },
    getCRSubmitMessage: state => {
        return state.crSubmitMessage;
    },
    getCourses: state => {
        return state.courses;
    },
};

const mutations = {
    setLoaderFlag(state, flag) {
        state.loaderFlags[flag] = true;
    },
    unsetLoaderFlag(state, flag) {
        state.loaderFlags[flag] = false;
    },
    setCRs(state, payload) {
        state.crs = payload;
    },
    setCRSubmitMessage(state, payload) {
        state.isCRSubmitError = true;
        state.crSubmitMessage = payload;
    },
    unsetCRSubmitMessage(state) {
        state.isCRSubmitError = false;
        state.crSubmitMessage = null;
    },
    setCourses(state, payload) {
        state.courses = payload;
    },
};

const actions = {
    loadCRs({commit}, id) {
        commit('setLoaderFlag', 'crs');
        commit('setCRs', null);
        csflowAPI.get('/admin/batch/privileged/' + id)
            .then(response => {
                commit('setCRs', response.data.payload);
            })
            .catch(e => {
                console.log(e.response);
            })
            .finally(() => {
                commit('unsetLoaderFlag', 'crs');
            });
    },
    submitCR({commit}, {id, payload}) {
        commit('setLoaderFlag', 'crSubmission');
        commit('unsetCRSubmitMessage');

        return new Promise((resolve, reject) => {
            csflowAPI.patch('/admin/batch/privileged/' + id, payload)
                .then(response => {
                    resolve(response);
                })
                .catch(e => {
                    commit('setCRSubmitMessage', e.response.data.message);
                    reject(e);
                })
                .finally(() => {
                    commit('unsetLoaderFlag', 'crSubmission');
                });
        });
    },
    loadCourses({commit}) {
        commit('setLoaderFlag', 'courses');
        commit('setCourses', null);

        csflowAPI.get('/admin/course')
            .then(response => {
                commit('setCourses', response.data.payload);
            })
            .catch(e => {
                console.log(e.response);
            })
            .finally(() => {
                commit('unsetLoaderFlag', 'courses');
            });
    }
};

export default {
    state,
    actions,
    getters,
    mutations,
    namespaced: true
}