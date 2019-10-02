import Address from '@/modules/js/addressService'

// S1 注册插件
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

// S2 创建插件实例
const store = new Vuex.Store({
  state: {
    addressLists: null
  },

  mutations: {
    init (state, lists) {
     state.addressLists = lists
    },

    addAddress (state, newAddress) {
      state.addressLists.push(newAddress)
    }
  },

  actions: {
    getAddressLists({commit}) {
      Address.addressList().then (res => {
        commit('init', res.data.lists)
      })
    },

    addAddressAction({commit},  newAdd) {
      Address.addAddress(newAdd).then(res => {
        commit('addAddress', newAdd)
      })
    }
  }

})

export default store




