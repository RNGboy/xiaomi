import Vue from 'vue'
import App from './App.vue'
import router from './router/index'




Vue.config.productionTip = false

// 赋值$bus,Vue实例是能作为事件总线的
Vue.prototype.$bus = new Vue()

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
