const state = {
    drawer: false,
    privilegedDash: false,
    adminDash: false,
};

const getters = {
    getDrawer: state => {
        return state.drawer;
    },
    getMainDash(state, getters) {
      return !getters.getPrivilegedDash && !getters.getAdminDash;
    },
    getPrivilegedDash(state, getters, rootState, rootGetters) {
        return rootGetters['auth/getIsCR'] && state.privilegedDash;
    },
    getAdminDash(state, getters, rootState, rootGetters) {
        return rootGetters['auth/getIsAdmin'] && state.adminDash;
    },
};
const mutations = {
    setDrawer(state) {
        state.drawer = true;
    },
    unsetDrawer(state) {
        state.drawer = false;
    },
    defineDrawerFlag(state, payload) {
        state.drawer = payload;
    },
    setPrivilegedDash(state) {
        state.privilegedDash = true;
        state.adminDash = false;
    },
    unsetPrivilegedDash(state) {
        state.privilegedDash = false;
    },
    setAdminDash(state) {
        state.adminDash = true;
        state.privilegedDash = false;
    },
    unsetAdminDash(state) {
        state.adminDash = false;
    },
};

const actions = {
    setDrawer({getters, commit}) {
        commit('setDrawer');
    },
    unsetDrawer({getters, commit}) {
        commit('unsetDrawer');
    },
    defineDrawerFlag({getters,commit},payload){
        commit('defineDrawerFlag',payload)
    },
    toggleDrawer({getters,commit}){
        if(getters.getDrawer){
            commit('unsetDrawer');
        }else{
            commit('setDrawer');
        }
    },
    setPrivilegedDash({commit}) {
        commit('setPrivilegedDash');
    },
    unsetPrivilegedDash({commit}) {
        commit('unsetPrivilegedDash');
    },
    setAdminDash({commit}) {
        commit('setAdminDash');
    },
    unsetAdminDash({commit}) {
        commit('unsetAdminDash');
    },
};


export default {
    state,
    actions,
    getters,
    mutations,
    namespaced: true
}
