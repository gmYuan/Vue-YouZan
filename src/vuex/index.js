import Address from '@/modules/js/addressService'

// S1 注册插件
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

// S2 创建插件实例
const store = new Vuex.Store({
  state: {
    addressLists: []
  },

  mutations: {
    init (state, lists) {
     state.addressLists = lists
    }
  },

  actions: {

  }

})




