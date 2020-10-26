/*
 * @Author: your name
 * @Date: 2020-10-26 14:59:20
 * @LastEditTime: 2020-10-26 15:12:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \codesRepository\vue-cli\vue2\myvue\src\store\index.js
 */
import Vue from 'vue'
import Vuex from 'vuex'
import state from './state.js'
import getters from './getters.js'
import actions from './actions.js'
import mutations from './mutations.js'
Vue.use(Vuex) 

const store=new Vuex.Store({
    state,
    mutations,
    actions,
    getters
})
export default store