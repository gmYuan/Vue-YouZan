/* 静态样式部分 */
import './cart_base.css'
import './cart_trade.css'
import './cart.css'

/* 依赖部分 */
import Vue from 'vue'
import mixin from 'js/mixin.js'

import axios from 'axios'
import api from 'js/api.js'


let app = new Vue({ // eslint-disable-line no-unused-vars
  el: '.container',

  computed: {},
  data: {
    cartLists: null,
  },

  methods: {
    getCartList() {
      axios.post(url.cartList).then(res => {
        console.log(res)
      })
    }
  },


  mixins: [mixin],

  created () {
   
  }
})