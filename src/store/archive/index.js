import {csflowAPI} from "../../api";

const state = {
    batches: [],
    resources: null,
    theses: null,
    thesisDetails: null,
    loaderFlags: {
        'resource': true,
        'theses': true,
        'thesisDetails': true,
    }
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
    getTheses: state => {
        return state.theses;
    },
    getThesisDetails: state => {
        return state.thesisDetails;
    },
    getLoaderFlag: state => flag => {
        return state.loaderFlags[flag];
    }
};

const mutations = {
    setResources(state, payload) {
        state.resources = payload;
    },
    setBatches(state, payload) {
        state.batches = payload;
    },
    setTheses(state, payload) {
        state.theses = payload;
    },
    setThesisDetails(state, payload) {
        state.thesisDetails = payload;
    },
    setLoaderFlag(state, flag) {
        state.loaderFlags[flag] = true;
    },
    unsetLoaderFlag(state, flag) {
        state.loaderFlags[flag] = false;
    }
};

const actions = {
    loadResource({commit, state}) {
        if (state.resources) {
            return;
        }

        commit('setLoaderFlag', 'resource');
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
                commit('unsetLoaderFlag', 'resource');
            });
    },
    loadTheses({commit, state}, batch) {
        if (state.theses && state.theses.batch === batch) {
            return;
        }

        commit('setLoaderFlag', 'theses');
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
                commit('unsetLoaderFlag', 'theses');
            })
    },
    loadThesisDetails({commit}) {

    }
};

export default {
    state,
    actions,
    getters,
    mutations,
    namespaced: true
}