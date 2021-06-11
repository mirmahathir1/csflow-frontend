import Vue from 'vue'
import VueNotification from '@kugatsu/vuenotification'

Vue.use(VueNotification, {
  timer: 3,
  position: 'bottomRight',
  showCloseIcn: true
})
