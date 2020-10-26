/*
 * @Author: your name
 * @Date: 2020-10-26 14:51:48
 * @LastEditTime: 2020-10-26 17:21:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \codesRepository\vue-cli\vue2\myvue\src\main.js
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './store/index.js'
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
