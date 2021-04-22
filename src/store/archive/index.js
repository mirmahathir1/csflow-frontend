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
        'thesisSubmission': false,
        'thesisDeletion': false,
    },

    isThesisSubmitError: false,
    thesisSubmitMessage: null,
    isThesisDeleteError: false,
    thesisDeleteMessage: null,
};

const getters = {
    getBatches: state => {
        return state.batches;
    },
    getResources: state => batch => {
        if (state.resources && batch in state.resources) {
            return state.resources[batch];
        }

        return null;
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
    getThesisSubmitError: state => {
        return state.isThesisSubmitError;
    },
    getThesisSubmitMessage: state => {
        return state.thesisSubmitMessage;
    },
    getThesisDeleteError: state => {
        return state.isThesisDeleteError;
    },
    getThesisDeleteMessage: state => {
        return state.thesisDeleteMessage;
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
    setThesisSubmitMessage(state, payload) {
        state.isThesisSubmitError = true;
        state.thesisSubmitMessage = payload;
    },
    unsetThesisSubmitMessage(state) {
        state.isThesisSubmitError = false;
        state.thesisSubmitMessage = null;
    },
    setThesisDeleteMessage(state, payload) {
        state.isThesisDeleteError = true;
        state.thesisDeleteMessage = payload;
    },
    unsetThesisDeleteMessage(state) {
        state.isThesisDeleteError = false;
        state.thesisDeleteMessage = null;
    }
};

const actions = {
    loadBatches({commit, state}) {
        if (state.batches.length > 0) {
            return;
        }

        commit('setBatches', []);
        commit('setLoaderFlag', 'batches');
        csflowAPI.get('/archive/batch')
            .then(response => {
                if (response.data.statusCode === 200) {
                    commit('setBatches', response.data.payload);
                }
            })
            .catch(e => {
                console.log(e.response);
            })
            .finally(() => {
                commit('unsetLoaderFlag', 'batches');
            });
    },
    loadResources({commit, state}) {
        commit('setResources', null);
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
                console.log(e.response);
            })
            .finally(() => {
                commit('unsetLoaderFlag', 'resources');
            });
    },
    loadThesesBatch({commit, state}, batch) {
        commit('setTheses', null);
        commit('setLoaderFlag', 'theses');
        csflowAPI.get('/archive/thesis/batch/' + batch)
            .then(response => {
                let theses = {};
                theses.batch = batch;
                theses.payload = response.data.payload;

                commit('setTheses', theses);
            })
            .catch(e => {
                console.log(e.response);
            })
            .finally(() => {
                commit('unsetLoaderFlag', 'theses');
            });
    },
    loadThesisDetails({commit, state}, {id, force}) {
        return new Promise((resolve, reject) => {
            if (!force && state.thesisDetails && state.thesisDetails['id'] === id) {
                resolve('already loaded');
                return;
            }

            commit('setThesisDetails', null);
            commit('setLoaderFlag', 'thesisDetails');
            csflowAPI.get('/archive/thesis/' + id)
                .then(response => {
                    let details = {};
                    details.id = id;
                    details.payload = response.data.payload;
                    commit('setThesisDetails', details);

                    resolve('loaded');
                })
                .catch(e => {
                    reject(e);
                })
                .finally(() => {
                    commit('unsetLoaderFlag', 'thesisDetails');
                });
        });
    },
    createThesis({commit}, payload) {
        commit('setLoaderFlag', 'thesisSubmission');
        commit('unsetThesisSubmitMessage');

        return new Promise((resolve, reject) => {
            csflowAPI.post('/archive/thesis', payload)
                .then(response => {
                    resolve(response);
                })
                .catch(e => {
                    commit('setThesisSubmitMessage', e.response.data.message);
                    reject(e);
                })
                .finally(() => {
                    commit('unsetLoaderFlag', 'thesisSubmission');
                });
        });
    },
    updateThesis({commit}, {payload, thesisID}) {
        commit('setLoaderFlag', 'thesisSubmission');
        commit('unsetThesisSubmitMessage');

        return new Promise((resolve, reject) => {
            csflowAPI.patch('/archive/thesis/' + thesisID, payload)
                .then(response => {
                    resolve(response);
                })
                .catch(e => {
                    commit('setThesisSubmitMessage', e.response.data.message);
                    reject(e);
                })
                .finally(() => {
                    commit('unsetLoaderFlag', 'thesisSubmission');
                });
        });
    },
    deleteThesis({commit}, thesisID) {
        commit('setLoaderFlag', 'thesisDeletion');
        commit('unsetThesisDeleteMessage');

        return new Promise((resolve, reject) => {
            csflowAPI.delete('/archive/thesis/' + thesisID)
                .then(response => {
                    resolve(response);
                })
                .catch(e => {
                    commit('setThesisDeleteMessage', e.response.data.message);
                    reject(e);
                })
                .finally(() => {
                    commit('unsetLoaderFlag', 'thesisDeletion');
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