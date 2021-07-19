import {csflowAPI} from "../../api";

const state = {
    batches: [],

    resources: null,

    theses: null,
    thesisDetails: null,
    isThesisSubmitError: false,
    thesisSubmitMessage: null,
    isThesisDeleteError: false,
    thesisDeleteMessage: null,
    thesisTags: null,
    thesesSearchResult: null,
    isThesisOwnerRemoveError: false,
    thesisOwnerRemoveMessage: null,
    removing: null, // who is being removed
    isThesisOwnerResponseError: false,
    thesisOwnerResponseMessage: null,

    projectCourses: null,
    projects: null,
    projectDetails: null,
    isProjectSubmitError: false,
    projectSubmitMessage: null,
    isProjectDeleteError: false,
    projectDeleteMessage: null,
    projectTags: null,
    projectsSearchResult: null,
    isProjectOwnerRemoveError: false,
    projectOwnerRemoveMessage: null,
    isProjectOwnerResponseError: false,
    projectOwnerResponseMessage: null,

    loaderFlags: {
        'batches': true,
        'resources': true,
        'theses': true,
        'thesisDetails': true,
        'thesisSubmission': false,
        'thesisDeletion': false,
        'thesisTags': true,
        'thesesSearch': true,
        'thesisOwnerRemoval': false,
        'thesisOwnerResponse': false,
        'projectCourses': true,
        'projects': true,
        'projectDetails': true,
        'projectSubmission': false,
        'projectDeletion': false,
        'projectTags': true,
        'projectsSearch': true,
        'projectOwnerRemoval': false,
        'projectOwnerResponse': false,
    },
};

const getters = {
    getBatches: state => {
        return state.batches.filter(batch => batch['ID'] !== 0);
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
    },
    getThesisTags: state => {
        return state.thesisTags;
    },
    getThesesSearchResult: state => {
        return state.thesesSearchResult;
    },
    getThesisOwnerRemoveError: state => {
        return state.isThesisOwnerRemoveError;
    },
    getThesisOwnerRemoveMessage: state => {
        return state.thesisOwnerRemoveMessage;
    },
    getThesisOwnerResponseError: state => {
        return state.isThesisOwnerResponseError;
    },
    getThesisOwnerResponseMessage: state => {
        return state.thesisOwnerResponseMessage;
    },
    getProjectCourses: state => {
        return state.projectCourses;
    },
    getProjects: state => {
        return state.projects;
    },
    getProjectDetails: state => {
        return state.projectDetails;
    },
    getProjectSubmitError: state => {
        return state.isProjectSubmitError;
    },
    getProjectSubmitMessage: state => {
        return state.projectSubmitMessage;
    },
    getProjectDeleteError: state => {
        return state.isProjectDeleteError;
    },
    getProjectDeleteMessage: state => {
        return state.projectDeleteMessage;
    },
    getProjectTags: state => {
        return state.projectTags;
    },
    getProjectsSearchResult: state => {
        return state.projectsSearchResult;
    },
    getProjectOwnerRemoveError: state => {
        return state.isProjectOwnerRemoveError;
    },
    getProjectOwnerRemoveMessage: state => {
        return state.projectOwnerRemoveMessage;
    },
    getProjectOwnerResponseError: state => {
        return state.isProjectOwnerResponseError;
    },
    getProjectOwnerResponseMessage: state => {
        return state.projectOwnerResponseMessage;
    },
    getRemoving: state => {
        return state.removing;
    },
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
    },
    setThesisTags(state, payload) {
        state.thesisTags = payload;
    },
    setThesesSearchResult(state, payload) {
        state.thesesSearchResult = payload;
    },
    setThesisOwnerRemoveMessage(state, payload) {
        state.isThesisOwnerRemoveError = true;
        state.thesisOwnerRemoveMessage = payload;
    },
    unsetThesisOwnerRemoveMessage(state) {
        state.isThesisOwnerRemoveError = false;
        state.thesisOwnerRemoveMessage = null;
    },
    setThesisOwnerResponseMessage(state, payload) {
        state.isThesisOwnerResponseError = true;
        state.thesisOwnerResponseMessage = payload;
    },
    unsetThesisOwnerResponseMessage(state) {
        state.isThesisOwnerResponseError = false;
        state.thesisOwnerResponseMessage = null;
    },
    setProjectCourses(state, payload) {
        state.projectCourses = payload;
    },
    setProjects(state, payload) {
        state.projects = payload;
    },
    setProjectDetails(state, payload) {
        state.projectDetails = payload;
    },
    setProjectSubmitMessage(state, payload) {
        state.isProjectSubmitError = true;
        state.projectSubmitMessage = payload;
    },
    unsetProjectSubmitMessage(state) {
        state.isProjectSubmitError = false;
        state.projectSubmitMessage = null;
    },
    setProjectDeleteMessage(state, payload) {
        state.isProjectDeleteError = true;
        state.projectDeleteMessage = payload;
    },
    unsetProjectDeleteMessage(state) {
        state.isProjectDeleteError = false;
        state.projectDeleteMessage = null;
    },
    setProjectTags(state, payload) {
        state.projectTags = payload;
    },
    setProjectsSearchResult(state, payload) {
        state.projectsSearchResult = payload;
    },
    setProjectOwnerRemoveMessage(state, payload) {
        state.isProjectOwnerRemoveError = true;
        state.projectOwnerRemoveMessage = payload;
    },
    unsetProjectOwnerRemoveMessage(state) {
        state.isProjectOwnerRemoveError = false;
        state.projectOwnerRemoveMessage = null;
    },
    setProjectOwnerResponseMessage(state, payload) {
        state.isProjectOwnerResponseError = true;
        state.projectOwnerResponseMessage = payload;
    },
    unsetProjectOwnerResponseMessage(state) {
        state.isProjectOwnerResponseError = false;
        state.projectOwnerResponseMessage = null;
    },
    setRemoving(state, payload) {
        state.removing = payload;
    },
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
    loadThesesBatch({commit}, batch) {
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
    },
    loadThesisTags({commit, state}, force) {
        return new Promise((resolve, reject) => {
            if (state.thesisTags && !force) {
                resolve(state.thesisTags);
                return;
            }

            commit('setLoaderFlag', 'thesisTags');
            commit('setThesisTags', null);
            csflowAPI.get('/archive/thesis/topics')
                .then(response => {
                    commit('setThesisTags', response.data.payload);
                    resolve(response.data.payload);
                })
                .catch(e => {
                    reject(e);
                })
                .finally(() => {
                    commit('unsetLoaderFlag', 'thesisTags');
                });
        });
    },
    searchTheses({commit}, text) {
        commit('setLoaderFlag', 'thesesSearch');
        commit('setThesesSearchResult', null);
        csflowAPI.get('/archive/thesis/search?text=' + text)
            .then(response => {
                let theses = {};
                theses.text = text;
                theses.payload = response.data.payload;

                commit('setThesesSearchResult', theses);
            })
            .catch(e => {
                console.log(e.response);
            })
            .finally(() => {
                commit('unsetLoaderFlag', 'thesesSearch');
            });
    },
    removeThesisRequest({commit, state}, {thesisID, userID, idx}) {
        commit('setRemoving', userID);
        commit('setLoaderFlag', 'thesisOwnerRemoval');
        commit('unsetThesisOwnerRemoveMessage');

        return new Promise((resolve, reject) => {
            csflowAPI.delete('/archive/thesis/' + thesisID + '/remove/' + userID)
                .then(response => {
                    // remove user from requested array
                    if (state.thesisDetails && state.thesisDetails.id === thesisID) {
                        state.thesisDetails.payload['requested_owners'].splice(idx, 1);
                    }
                    resolve(response);
                })
                .catch(e => {
                    commit('setThesisOwnerRemoveMessage', e.response.data.message);
                    reject(e);
                })
                .finally(() => {
                    commit('unsetLoaderFlag', 'thesisOwnerRemoval');
                    commit('setRemoving', null);
                });
        });
    },
    respondToThesisRequest({commit, state}, {thesisID, accept}) {
        commit('setLoaderFlag', 'thesisOwnerResponse');
        commit('unsetThesisOwnerResponseMessage');

        return new Promise((resolve, reject) => {
            let apiCall = accept ? csflowAPI.patch : csflowAPI.delete;

            apiCall('/archive/thesis/' + thesisID + (accept ? '/accept' : '/reject'))
                .then(response => {
                    resolve(response);
                })
                .catch(e => {
                    commit('setThesisOwnerResponseMessage', e.response.data.message);
                    reject(e);
                })
                .finally(() => {
                    commit('unsetLoaderFlag', 'thesisOwnerResponse');
                });
        });
    },
    loadProjectCourses({commit}, batch) {
        commit('setProjectCourses', null);
        commit('setLoaderFlag', 'projectCourses');
        csflowAPI.get('/archive/project/batch/' + batch)
            .then(response => {
                let courses = {};
                courses.batch = batch;
                courses.payload = response.data.payload;

                commit('setProjectCourses', courses);
            })
            .catch(e => {
                console.log(e.response);
            })
            .finally(() => {
                commit('unsetLoaderFlag', 'projectCourses');
            });
    },
    loadProjects({commit}, {batch, course}) {
        commit('setProjects', null);
        commit('setLoaderFlag', 'projects');
        csflowAPI.get('/archive/project/batch/' + batch + '/' + course)
            .then(response => {
                let projects = {};
                projects.batch = batch;
                projects.course = course;
                projects.payload = response.data.payload;

                commit('setProjects', projects);
            })
            .catch(e => {
                console.log(e.response);
            })
            .finally(() => {
                commit('unsetLoaderFlag', 'projects');
            });
    },
    loadProjectDetails({commit, state}, {id, force}) {
        return new Promise((resolve, reject) => {
            if (!force && state.projectDetails && state.projectDetails['id'] === id) {
                resolve('already loaded');
                return;
            }

            commit('setProjectDetails', null);
            commit('setLoaderFlag', 'projectDetails');
            csflowAPI.get('/archive/project/' + id)
                .then(response => {
                    let details = {};
                    details.id = id;
                    details.payload = response.data.payload;
                    commit('setProjectDetails', details);

                    resolve('loaded');
                })
                .catch(e => {
                    reject(e);
                })
                .finally(() => {
                    commit('unsetLoaderFlag', 'projectDetails');
                });
        });
    },
    createProject({commit}, payload) {
        commit('setLoaderFlag', 'projectSubmission');
        commit('unsetProjectSubmitMessage');

        return new Promise((resolve, reject) => {
            csflowAPI.post('/archive/project', payload)
                .then(response => {
                    resolve(response);
                })
                .catch(e => {
                    commit('setProjectSubmitMessage', e.response.data.message);
                    reject(e);
                })
                .finally(() => {
                    commit('unsetLoaderFlag', 'projectSubmission');
                });
        });
    },
    updateProject({commit}, {payload, projectID}) {
        commit('setLoaderFlag', 'projectSubmission');
        commit('unsetProjectSubmitMessage');

        return new Promise((resolve, reject) => {
            csflowAPI.patch('/archive/project/' + projectID, payload)
                .then(response => {
                    resolve(response);
                })
                .catch(e => {
                    commit('setProjectSubmitMessage', e.response.data.message);
                    reject(e);
                })
                .finally(() => {
                    commit('unsetLoaderFlag', 'projectSubmission');
                });
        });
    },
    deleteProject({commit}, projectID) {
        commit('setLoaderFlag', 'projectDeletion');
        commit('unsetProjectDeleteMessage');

        return new Promise((resolve, reject) => {
            csflowAPI.delete('/archive/project/' + projectID)
                .then(response => {
                    resolve(response);
                })
                .catch(e => {
                    commit('setProjectDeleteMessage', e.response.data.message);
                    reject(e);
                })
                .finally(() => {
                    commit('unsetLoaderFlag', 'projectDeletion');
                });
        });
    },
    loadProjectTags({commit, state}, force) {
        return new Promise((resolve, reject) => {
            if (state.projectTags && !force) {
                resolve(state.projectTags);
                return;
            }

            commit('setLoaderFlag', 'projectTags');
            commit('setProjectTags', null);
            csflowAPI.get('/archive/project/topics')
                .then(response => {
                    commit('setProjectTags', response.data.payload);
                    resolve(response.data.payload);
                })
                .catch(e => {
                    reject(e);
                })
                .finally(() => {
                    commit('unsetLoaderFlag', 'projectTags');
                });
        });
    },
    searchProjects({commit}, text) {
        commit('setLoaderFlag', 'projectsSearch');
        commit('setProjectsSearchResult', null);
        csflowAPI.get('/archive/project/search?text=' + text)
            .then(response => {
                let  projects= {};
                 projects.text = text;
                 projects.payload = response.data.payload;

                commit('setProjectsSearchResult', projects);
            })
            .catch(e => {
                console.log(e.response);
            })
            .finally(() => {
                commit('unsetLoaderFlag', 'projectsSearch');
            });
    },
    removeProjectRequest({commit, state}, {projectID, userID, idx}) {
        commit('setRemoving', userID);
        commit('setLoaderFlag', 'projectOwnerRemoval');
        commit('unsetProjectOwnerRemoveMessage');

        return new Promise((resolve, reject) => {
            csflowAPI.delete('/archive/project/' + projectID + '/remove/' + userID)
                .then(response => {
                    // remove user from requested array
                    if (state.projectDetails && state.projectDetails.id === projectID) {
                        state.projectDetails.payload['requested_owners'].splice(idx, 1);
                    }
                    resolve(response);
                })
                .catch(e => {
                    commit('setProjectOwnerRemoveMessage', e.response.data.message);
                    reject(e);
                })
                .finally(() => {
                    commit('unsetLoaderFlag', 'projectOwnerRemoval');
                    commit('setRemoving', null);
                });
        });
    },
    respondToProjectRequest({commit, state}, {projectID, accept}) {
        commit('setLoaderFlag', 'projectOwnerResponse');
        commit('unsetProjectOwnerResponseMessage');

        return new Promise((resolve, reject) => {
            let apiCall = accept ? csflowAPI.patch : csflowAPI.delete;

            apiCall('/archive/project/' + projectID + (accept ? '/accept' : '/reject'))
                .then(response => {
                    resolve(response);
                })
                .catch(e => {
                    commit('setProjectOwnerResponseMessage', e.response.data.message);
                    reject(e);
                })
                .finally(() => {
                    commit('unsetLoaderFlag', 'projectOwnerResponse');
                });
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