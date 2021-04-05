import Vue from 'vue'
import Vuex from 'vuex'
import auth from '../store/auth'
Vue.use(Vuex)

let store = new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth
  }
})

store.dispatch('auth/autoLogin');

export default store;
