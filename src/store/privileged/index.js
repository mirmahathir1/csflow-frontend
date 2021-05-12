import {csflowAPI} from "../../api";

const state = {
    users: null,
    loaderFlags: {
        'users': true,
    }
};

const getters = {
    getLoaderFlag: state => flag => {
        return state.loaderFlags[flag];
    },
    getUsers: state => {
        return state.users;
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
};

export default {
    state,
    actions,
    getters,
    mutations,
    namespaced: true
}