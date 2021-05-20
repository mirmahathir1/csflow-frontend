import {csflowAPI} from "../../api";

const state = {
    users: null,

    tags: null,
    tagsUnwrapped: null,
    tagCourses: null,

    requestedTags: null,

    tagSubmitMessage: null,
    isTagSubmitError: false,
    tagDeleteMessage: null,
    isTagDeleteError: false,

    reportedComments: null,

    isReportResolveError: false,
    reportResolveMessage: null,
    isReportDeleteError: false,
    reportDeleteMessage: null,

    loaderFlags: {
        'users': true,
        'tags': true,
        'tagCourses': true,
        'tagSubmission': false,
        'tagDeletion': false,
        'requestedTags': true,
        'reportedComments': true,
        'reportResolution': false,
        'reportDeletion': false,
    }
};

const getters = {
    getLoaderFlag: state => flag => {
        return state.loaderFlags[flag];
    },
    getUsers: state => {
        return state.users;
    },
    getTags: state => {
        return state.tags;
    },
    getTagsUnwrapped: state => {
        return state.tagsUnwrapped;
    },
    getTagSubmitError: state => {
        return state.isTagSubmitError;
    },
    getTagSubmitMessage: state => {
        return state.tagSubmitMessage;
    },
    getTagDeleteError: state => {
        return state.isTagDeleteError;
    },
    getTagDeleteMessage: state => {
        return state.tagDeleteMessage;
    },
    getRequestedTags: state => {
        return state.requestedTags;
    },
    getTagCourses: state => {
        return state.tagCourses;
    },
    getReportedComments: state => {
        return state.reportedComments;
    },
    getReportResolveError: state => {
        return state.isReportResolveError;
    },
    getReportResolveMessage: state => {
        return state.reportResolveMessage;
    },
    getReportDeleteError: state => {
        return state.isReportDeleteError;
    },
    getReportDeleteMessage: state => {
        return state.reportDeleteMessage;
    },
};

const mutations = {
    setLoaderFlag(state, flag) {
        state.loaderFlags[flag] = true;
    },
    unsetLoaderFlag(state, flag) {
        state.loaderFlags[flag] = false;
    },
    setUsers(state, payload) {
        state.users = payload;
    },
    setTags(state, payload) {
        state.tags = payload;
    },
    setTagsUnwrapped(state, payload) {
        state.tagsUnwrapped = payload;
    },
    setTagSubmitMessage(state, payload) {
        state.isTagSubmitError = true;
        state.tagSubmitMessage = payload;
    },
    unsetTagSubmitMessage(state) {
        state.isTagSubmitError = false;
        state.tagSubmitMessage = null;
    },
    setTagDeleteMessage(state, payload) {
        state.isTagDeleteError = true;
        state.tagDeleteMessage = payload;
    },
    unsetTagDeleteMessage(state) {
        state.isTagDeleteError = false;
        state.tagDeleteMessage = null;
    },
    setRequestedTags(state, payload) {
        state.requestedTags = payload;
    },
    setTagCourses(state, payload) {
        state.tagCourses = payload;
    },
    setReportedComments(state, payload) {
        state.reportedComments = payload;
    },
    setReportResolveMessage(state, payload) {
        state.isReportResolveError = true;
        state.reportResolveMessage = payload;
    },
    unsetReportResolveMessage(state) {
        state.isReportResolveError = false;
        state.reportResolveMessage = null;
    },
    setReportDeleteMessage(state, payload) {
        state.isReportDeleteError = true;
        state.reportDeleteMessage = payload;
    },
    unsetReportDeleteMessage(state) {
        state.isReportDeleteError = false;
        state.reportDeleteMessage = null;
    },
};

const actions = {
    clearError({commit}, which) {
        if (which === 'all' || which === 'submit') {
            commit('unsetTagSubmitMessage');
        }
        if (which === 'all' || which === 'delete') {
            commit('unsetTagDeleteMessage');
        }
    },
    loadUsers({ commit }) {
        commit('setLoaderFlag', 'users');
        commit('setUsers', null);
        csflowAPI.get('/privileged/user')
            .then(response => {
                commit('setUsers', response.data.payload);
            })
            .catch(e => {
                console.log(e.response);
            })
            .finally(() => {
                commit('unsetLoaderFlag', 'users');
            });
    },
    loadTags({ commit }) {
        commit('setLoaderFlag', 'tags');
        commit('setTags', null);
        csflowAPI.get('/privileged/tag')
            .then(response => {
                // unwrap the tags
                let tags = [];
                response.data.payload.forEach((e, idx) => {
                    e['books'].forEach(book => {
                       tags.push({
                           id: book['id'],
                           name: book['name'],
                           type: 'book',
                           courseId: e['courseId'],
                       })
                    });
                    e['topics'].forEach(topic => {
                        tags.push({
                            id: topic['id'],
                            name: topic['name'],
                            type: 'topic',
                            courseId: e['courseId'],
                        })
                    });
                });

                commit('setTagsUnwrapped', tags);
                commit('setTags', response.data.payload);
            })
            .catch(e => {
                console.log(e.response);
            })
            .finally(() => {
                commit('unsetLoaderFlag', 'tags');
            });
    },
    createTag({commit}, payload) {
        commit('setLoaderFlag', 'tagSubmission');
        commit('unsetTagSubmitMessage');

        return new Promise((resolve, reject) => {
            csflowAPI.post('/privileged/tag/', payload)
                .then(response => {
                    resolve(response);
                })
                .catch(e => {
                    commit('setTagSubmitMessage', e.response.data.message);
                    reject(e);
                })
                .finally(() => {
                    commit('unsetLoaderFlag', 'tagSubmission');
                });
        });
    },
    updateTag({commit}, {payload, tagID}) {
        commit('setLoaderFlag', 'tagSubmission');
        commit('unsetTagSubmitMessage');

        return new Promise((resolve, reject) => {
            csflowAPI.patch('/privileged/tag/' + tagID, payload)
                .then(response => {
                    resolve(response);
                })
                .catch(e => {
                    commit('setTagSubmitMessage', e.response.data.message);
                    reject(e);
                })
                .finally(() => {
                    commit('unsetLoaderFlag', 'tagSubmission');
                });
        });
    },
    deleteTag({commit}, tagID) {
        commit('setLoaderFlag', 'tagDeletion');
        commit('unsetTagDeleteMessage');

        return new Promise((resolve, reject) => {
            csflowAPI.delete('/privileged/tag/' + tagID)
                .then(response => {
                    resolve(response);
                })
                .catch(e => {
                    commit('setTagDeleteMessage', e.response.data.message);
                    reject(e);
                })
                .finally(() => {
                    commit('unsetLoaderFlag', 'tagDeletion');
                });
        });
    },
    loadRequestedTags({commit}) {
        commit('setLoaderFlag', 'requestedTags');
        commit('setRequestedTags', null);

        csflowAPI.get('/privileged/tag/requested')
            .then(response => {
                commit('setRequestedTags', response.data.payload);
            })
            .catch(e => {
                console.log(e.response);
            })
            .finally(() => {
                commit('unsetLoaderFlag', 'requestedTags');
            });
    },
    acceptRequestedTag({commit}, tagID) {
        commit('setLoaderFlag', 'tagSubmission');
        commit('unsetTagSubmitMessage');

        return new Promise((resolve, reject) => {
            csflowAPI.post('/privileged/tag/' + tagID)
                .then(response => {
                    resolve(response);
                })
                .catch(e => {
                    commit('setTagSubmitMessage', e.response.data.message);
                    reject(e);
                })
                .finally(() => {
                    commit('unsetLoaderFlag', 'tagSubmission');
                });
        });
    },
    editAndAcceptRequestedTag({commit}, {tagID, payload}) {
        commit('setLoaderFlag', 'tagSubmission');
        commit('unsetTagSubmitMessage');

        return new Promise((resolve, reject) => {
            csflowAPI.patch('/privileged/tag/requested/' + tagID, payload)
                .then(response => {
                    resolve(response);
                })
                .catch(e => {
                    commit('setTagSubmitMessage', e.response.data.message);
                    reject(e);
                })
                .finally(() => {
                    commit('unsetLoaderFlag', 'tagSubmission');
                });
        });
    },
    rejectRequestedTag({commit}, tagID) {
        commit('setLoaderFlag', 'tagDeletion');
        commit('unsetTagDeleteMessage');

        return new Promise((resolve, reject) => {
            csflowAPI.delete('/privileged/tag/requested/' + tagID)
                .then(response => {
                    resolve(response);
                })
                .catch(e => {
                    commit('setTagDeleteMessage', e.response.data.message);
                    reject(e);
                })
                .finally(() => {
                    commit('unsetLoaderFlag', 'tagDeletion');
                });
        });
    },
    loadTagCourses({commit, state}) {
        if (state.tagCourses) {
            return;
        }

        commit('setLoaderFlag', 'tagCourses');
        commit('setTagCourses', null);

        csflowAPI.get('/privileged/tagCourse')
            .then(response => {
                commit('setTagCourses', response.data.payload);
            })
            .catch(e => {
                console.log(e.response);
            })
            .finally(() => {
                commit('unsetLoaderFlag', 'tagCourses');
            });
    },
    loadReportedComments({commit}) {
        commit('setLoaderFlag', 'reportedComments');
        commit('setReportedComments', null);

        csflowAPI.get('/privileged/report/comment')
            .then(response => {
                commit('setReportedComments', response.data.payload);
            })
            .catch(e => {
                console.log(e.response);
            })
            .finally(() => {
               commit('unsetLoaderFlag', 'reportedComments');
            });
    },
    resolveReport({commit}, {type, id}) {
        commit('setLoaderFlag', 'reportResolution');
        commit('unsetReportResolveMessage');

        return new Promise((resolve, reject) => {
           csflowAPI.delete('/privileged/report/' + type + '/' + id + '/resolve')
               .then(response => {
                   resolve(response);
               })
               .catch(e => {
                   commit('setReportResolveMessage', e.response.data.message);
                   reject(e);
               })
               .finally(() => {
                   commit('unsetLoaderFlag', 'reportResolution');
               });
        });
    },
    deleteReport({commit}, {type, id}) {
        commit('setLoaderFlag', 'reportDeletion');
        commit('unsetReportDeleteMessage');

        return new Promise((resolve, reject) => {
            csflowAPI.delete('/privileged/report/' + type + '/' + id + '/remove')
                .then(response => {
                    resolve(response);
                })
                .catch(e => {
                    commit('setReportDeleteMessage', e.response.data.message);
                    reject(e);
                })
                .finally(() => {
                    commit('unsetLoaderFlag', 'reportDeletion');
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