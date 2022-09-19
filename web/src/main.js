import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'

import VueSweetalert2 from 'vue-sweetalert2'

// If you don't need the styles, do not connect
import 'sweetalert2/dist/sweetalert2.min.css'

const options = {
  confirmButtonColor: '#1976D2',
  cancelButtonColor: 'red'
}
Vue.use(VueSweetalert2, options)

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
