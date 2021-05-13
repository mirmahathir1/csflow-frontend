import {csflowAPI} from "../../api";

const state = {
    users: null,
    tags: null,
    tagsUnwrapped: null,
    loaderFlags: {
        'users': true,
        'tags': true,
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
};

const actions = {
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
    }
};

export default {
    state,
    actions,
    getters,
    mutations,
    namespaced: true
}