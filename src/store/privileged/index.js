import {csflowAPI} from "../../api";

const state = {
    users: null,

    tags: null,
    tagsUnwrapped: null,

    requestedTags: null,

    tagSubmitMessage: null,
    isTagSubmitError: false,
    tagDeleteMessage: null,
    isTagDeleteError: false,

    loaderFlags: {
        'users': true,
        'tags': true,
        'tagSubmission': false,
        'tagDeletion': false,
        'requestedTags': true,
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
    }
};

export default {
    state,
    actions,
    getters,
    mutations,
    namespaced: true
}