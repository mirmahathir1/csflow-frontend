import {csflowAPI} from "../../api";

const state = {
    crs: null,
    crSubmitMessage: null,
    isCRSubmitError: false,

    courses: null,
    courseSubmitMessage: null,
    isCourseSubmitError: false,
    courseDeleteMessage: null,
    isCourseDeleteError: false,

    loaderFlags: {
        'crs': true,
        'crSubmission': false,
        'courses': true,
        'courseSubmission': false,
        'courseDeletion': false,
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
    getCourseSubmitError: state => {
        return state.isCourseSubmitError;
    },
    getCourseSubmitMessage: state => {
        return state.courseSubmitMessage;
    },
    getCourseDeleteError: state => {
        return state.isCourseDeleteError;
    },
    getCourseDeleteMessage: state => {
        return state.courseDeleteMessage;
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
    setCourseSubmitMessage(state, payload) {
        state.isCourseSubmitError = true;
        state.courseSubmitMessage = payload;
    },
    unsetCourseSubmitMessage(state) {
        state.isCourseSubmitError = false;
        state.courseSubmitMessage = null;
    },
    setCourseDeleteMessage(state, payload) {
        state.isCourseDeleteError = true;
        state.courseDeleteMessage = payload;
    },
    unsetCourseDeleteMessage(state) {
        state.isCourseDeleteError = false;
        state.courseDeleteMessage = null;
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
    },
    createCourse({commit}, payload) {
        commit('setLoaderFlag', 'courseSubmission');
        commit('unsetCourseSubmitMessage');

        return new Promise((resolve, reject) => {
            csflowAPI.post('/admin/course/', payload)
                .then(response => {
                    resolve(response);
                })
                .catch(e => {
                    commit('setCourseSubmitMessage', e.response.data.message);
                    reject(e);
                })
                .finally(() => {
                    commit('unsetLoaderFlag', 'courseSubmission');
                });
        });
    },
    updateCourse({commit}, {payload, courseID}) {
        commit('setLoaderFlag', 'courseSubmission');
        commit('unsetCourseSubmitMessage');

        return new Promise((resolve, reject) => {
            csflowAPI.patch('/admin/course/' + courseID, payload)
                .then(response => {
                    resolve(response);
                })
                .catch(e => {
                    commit('setCourseSubmitMessage', e.response.data.message);
                    reject(e);
                })
                .finally(() => {
                    commit('unsetLoaderFlag', 'courseSubmission');
                });
        });
    },
    deleteCourse({commit}, courseID) {
        commit('setLoaderFlag', 'courseDeletion');
        commit('unsetCourseDeleteMessage');

        return new Promise((resolve, reject) => {
            csflowAPI.delete('/admin/course/' + courseID)
                .then(response => {
                    resolve(response);
                })
                .catch(e => {
                    commit('setCourseDeleteMessage', e.response.data.message);
                    reject(e);
                })
                .finally(() => {
                    commit('unsetLoaderFlag', 'courseDeletion');
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