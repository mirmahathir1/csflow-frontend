import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import './plugins/vuenotifications'
import App from './App.vue'
import store from './store'
import router from './router'

import vuetify from './plugins/vuetify';
import Mixins from '@/mixins/index';
import titleSetter from '@/mixins/titleSetter'
import Vuelidate from 'vuelidate';

// global styling
import "./assets/css/main.css";

Vue.use(Vuelidate);
Vue.mixin(Mixins);
Vue.mixin(titleSetter)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
