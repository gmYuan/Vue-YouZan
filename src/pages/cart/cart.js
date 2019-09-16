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

  computed: {
    allSelected: {
      get(){     // Q3 勾选所有店铺后，自动勾选全选按钮
        if (this.cartLists && this.cartLists.length > 0) {
          return this.cartLists.every(shop => {
            return shop.isChecked
          })
        }
        return false
      },
      set(newValue){   // Q5  勾选全选后，自动勾选店铺A按钮 和 店铺A下所有商品
        if (this.cartLists && this.cartLists.length > 0) {
          this.cartLists.forEach(shop => {
            shop.isChecked = newValue
            shop.goodsList.forEach(good => {
              good.isChecked = newValue
            })
          })
        }
      }
    }

  },

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
   
    selectGood(shop, good) {           //Q2 切换商品勾选状态 + 对应店铺状态
      good.isChecked = !good.isChecked
      shop.isChecked =  shop.goodsList.every(good => {
        return good.isChecked == true
      })
    },

    selectShop(shop) {  // Q4 切换店铺勾选状态 + 对应下商品状态
      shop.isChecked = !shop.isChecked
      shop.goodsList.forEach(good => {
        good.isChecked = shop.isChecked
      })
    },

    selectAll() {
      this.allSelected = !this.allSelected
    }

  },


  mixins: [mixin],

  created () {
    this.getCartList()
  }
})