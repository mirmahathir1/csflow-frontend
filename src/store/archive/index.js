import {csflowAPI} from "../../api";

const state = {
    batches: [],
    resources: null,
    resourceLoaderFlag: true,
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
        console.log('unsetting');
        state.resourceLoaderFlag = false;
    }
};

const actions = {
  async loadResource({commit, state}) {
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
  }
};

export default {
    state,
    actions,
    getters,
    mutations,
    namespaced: true
}