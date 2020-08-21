import Vue from 'vue'
import App from './App.vue'
import router from './route'
import store from './store'

import LazyLoad from 'vue-lazyload'

Vue.use(LazyLoad,{
  loading:require('./assets/img/common/placeholder.png')
})
Vue.config.productionTip = false
Vue.prototype.$bus=new Vue()

new Vue({
  render: h => h(App),
    router,
    store
}).$mount('#app')
