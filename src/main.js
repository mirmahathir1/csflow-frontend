import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import store from './store'
import router from './router'

import vuetify from './plugins/vuetify';
import Mixins from '@/mixins/index';
import Vuelidate from 'vuelidate';

Vue.use(Vuelidate);
Vue.mixin(Mixins);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
