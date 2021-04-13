import {csflowAPI} from "../../api";

const state = {
    batches: [],
    resources: null,
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
};

const mutations = {
    setResources(state, payload) {
        state.resources = payload;
    },
    setBatches(state, payload) {
        state.batches = payload;
    }
};

const actions = {
  async loadResource({commit, state}) {
      if (state.resources) {
          return;
      }

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