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
    getCartList() {  // 获取购物车列表页数据
      axios.post(api.cartList).then(res => {
        if (res.data.cartList && res.data.cartList.length > 0) {
          res.data.cartList.forEach(shop => {
            shop.isChecked = false
            shop.goodsList.forEach(good => {
              good.isChecked = false
            })

          })
        }
        this.cartLists = res.data.cartList
      })
    },
   
    changeCheck(shop, good) {           // 切换商品勾选状态 + 对应店铺状态
      good.isChecked = !good.isChecked
      shop.isChecked =  shop.goodsList.every(good => {
        return good.isChecked == true
      })
    }

  },


  mixins: [mixin],

  created () {
    this.getCartList()
  }
})