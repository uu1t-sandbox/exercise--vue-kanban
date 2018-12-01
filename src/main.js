import Vue from 'vue'
import App from './App.vue'
import ErrorBoundary from './ErrorBoundary.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

Vue.component(ErrorBoundary.name, ErrorBoundary)
/* eslint-disable no-console */
Vue.config.errorHandler = (err, vm, info) => {
  console.error('errorHandler err:', err)
  console.error('errorHandler vm:', vm)
  console.error('errorHandler info:', info)
}
/* eslint-enable no-console */

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
