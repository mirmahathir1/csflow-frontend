const state = {
    drawer: false,
    privilegedDash: false,
};

const getters = {
    getDrawer: state => {
        return state.drawer;
    },
    getMainDash(state, getters) {
      return !getters.getPrivilegedDash;
    },
    getPrivilegedDash(state, getters, rootState, rootGetters) {
        return rootGetters['auth/getIsCR'] && state.privilegedDash;
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
    },
    unsetPrivilegedDash(state) {
        state.privilegedDash = false;
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
};


export default {
    state,
    actions,
    getters,
    mutations,
    namespaced: true
}
