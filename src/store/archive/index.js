import {csflowAPI} from "../../api";

const state = {
    batches: [],
    resources: null,
    theses: null,
    thesisDetails: null,
    loaderFlags: {
        'batches': true,
        'resources': true,
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
    loadBatches({commit, state}) {
        if (state.batches.length > 0) {
            return;
        }

        commit('setLoaderFlag', 'batches');
        csflowAPI.get('/archive/batch')
            .then(response => {
                if (response.data.statusCode === 200) {
                    commit('setBatches', response.data.payload);
                }
            })
            .catch(e => {
                console.log(e);
            })
            .finally(() => {
                commit('unsetLoaderFlag', 'batches');
            });
    },
    loadResources({commit, state}) {
        if (state.resources) {
            return;
        }

        commit('setLoaderFlag', 'resources');
        csflowAPI.get('/archive/resource')
            .then(response => {
                let resources = {};
                response.data.payload.forEach(element => {
                    resources[element['batch']] = element['resources'];
                });

                commit('setResources', resources);
            })
            .catch(e => {
                console.log(e);
            })
            .finally(() => {
                commit('unsetLoaderFlag', 'resources');
            });
    },
    loadThesesBatch({commit, state}, batch) {
        if (state.theses && state.theses.batch === batch) {
            return;
        }

        commit('setLoaderFlag', 'theses');
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
            });
    },
    loadThesisDetails({commit}, id) {
        commit('setLoaderFlag', 'thesisDetails');
        csflowAPI.get('/archive/thesis/' + id)
            .then(response => {
                let details = {};
                details.id = id;
                details.payload = response.data.payload;

                commit('setThesisDetails', details);
            })
            .catch(e => {
                console.log(e);
                commit('setThesisDetails', null);
            })
            .finally(() => {
                commit('unsetLoaderFlag', 'thesisDetails');
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