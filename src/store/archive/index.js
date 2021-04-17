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
        'thesisCreation': false,
    },

    isThesisCreationError: false,
    thesisCreationMessage: null,
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
    },
    getThesisCreationError: state => {
        return state.isThesisCreationError;
    },
    getThesisCreationMessage: state => {
        return state.thesisCreationMessage;
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
    },
    setThesisCreationMessage(state, payload) {
        state.isThesisCreationError = true;
        state.thesisCreationMessage = payload;
    },
    unsetThesisCreationMessage(state) {
        state.isThesisCreationError = false;
        state.thesisCreationMessage = null;
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
    },
    createThesis({commit}, payload) {
        commit('setLoaderFlag', 'thesisCreation');
        commit('unsetThesisCreationMessage');

        return new Promise((resolve, reject) => {
            csflowAPI.post('/archive/thesis', payload)
                .then(response => {
                    resolve(response);
                })
                .catch(e => {
                    console.log(e.response);
                    commit('setThesisCreationMessage', e.response.data.message);
                    reject(e);
                })
                .finally(() => {
                    commit('unsetLoaderFlag', 'thesisCreation');
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