import {csflowAPI} from "../../api";

const state = {
    batches: [],
    resources: null,
    theses: null,
    resourceLoaderFlag: true,
    thesesLoaderFlag: true,
};

const getters = {
    getBatches: state => {
        return state.batches;
    },
    getResources: state => batch => {
        if (state.resources) {
            return state.resources[batch];
        } else {
            return null;
        }
    },
    getResourceLoaderFlag: state => {
        return state.resourceLoaderFlag;
    },
    getThesesLoaderFlag: state => {
        return state.thesesLoaderFlag;
    },
    getTheses: state => {
        return state.theses;
    }
};

const mutations = {
    setResources(state, payload) {
        state.resources = payload;
    },
    setBatches(state, payload) {
        state.batches = payload;
    },
    setResourceLoaderFlag(state) {
        state.resourceLoaderFlag = true;
    },
    unsetResourceLoaderFlag(state) {
        state.resourceLoaderFlag = false;
    },
    setTheses(state, payload) {
        state.theses = payload;
    },
    setThesesLoaderFlag(state) {
        state.thesesLoaderFlag = true;
    },
    unsetThesesLoaderFlag(state) {
        state.thesesLoaderFlag = false;
    }
};

const actions = {
    loadResource({commit, state}) {
        if (state.resources) {
            return;
        }

        commit('setResourceLoaderFlag');
        console.log('calling api');
        csflowAPI.get('/archive/resource')
            .then(response => {
                let resources = {}, batches = [];
                response.data.payload.forEach(element => {
                    resources[element['batch']] = element['resources'];
                    batches.push(element['batch']);
                });

                commit('setResources', resources);
                commit('setBatches', batches);
            })
            .catch(e => {
                console.log(e);
            })
            .finally(() => {
                commit('unsetResourceLoaderFlag');
            });
    },
    loadTheses({commit, state}, batch) {
        if (state.theses && state.theses.batch === batch) {
            return;
        }

        commit('setThesesLoaderFlag');
        console.log('calling api');
        csflowAPI.get('/archive/thesis/batch/' + batch)
            .then(response => {
                let theses = {};
                theses.batch = batch;
                theses.payload = response.data.payload;

                commit('setTheses', theses);
            })
            .catch(e => {
                console.log(e);
                commit('setTheses', null);
            })
            .finally(() => {
                commit('unsetThesesLoaderFlag');
            })
    }
};

export default {
    state,
    actions,
    getters,
    mutations,
    namespaced: true
}