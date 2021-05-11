import Vue from 'vue'
import Vuex from 'vuex'
import auth from '../store/auth'
import user from '../store/user'
import archive from '../store/archive'
import others from "./others/drawerControl";

Vue.use(Vuex)

let store = new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth,
    user,
    archive,
    others
  }
})

// store.dispatch('auth/autoLogin');

export default store;
