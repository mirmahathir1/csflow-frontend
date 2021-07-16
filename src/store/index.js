import Vue from 'vue'
import Vuex from 'vuex'
import auth from '../store/auth'
import user from '../store/user'
import archive from '../store/archive'
import privileged from '../store/privileged';
import others from "./others/drawerControl";
import post from "../store/post";
import admin from '../store/admin';
import search from "../store/search";
import question_bank from "../store/question_bank";

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
    others,
    privileged,
    post,
    admin,
    search,
    question_bank,
  }
})

// store.dispatch('auth/autoLogin');

export default store;
