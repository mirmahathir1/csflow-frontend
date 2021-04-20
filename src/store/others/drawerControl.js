const state = {
    drawer: false
};

const getters = {
    getDrawer: state => {
        return state.drawer;
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
    }
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
    }

};


export default {
    state,
    actions,
    getters,
    mutations,
    namespaced: true
}
