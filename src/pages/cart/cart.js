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
      get () { // Q3 勾选所有店铺后，自动勾选全选按钮
        if (this.cartLists && this.cartLists.length > 0) {
          return this.cartLists.every(shop => {
            return shop.isChecked
          })
        }
        return false
      },
      set (newValue) { // Q5  勾选全选后，自动勾选店铺A按钮 和 店铺A下所有商品
        if (this.cartLists && this.cartLists.length > 0) {
          this.cartLists.forEach(shop => {
            shop.isChecked = newValue
            shop.goodsList.forEach(good => {
              good.isChecked = newValue
            })
          })
        }
      }
    },

    allRemovedSelected: { // 删除状态下的 全选按钮
      get () {
        if (this.editShop) {
          return this.editShop.isRemovedChecked
        }
        return false
      },

      set (newValue) {
        if (this.editShop) {
          this.editShop.isRemovedChecked = newValue
          this.editShop.goodsList.forEach(good => {
            good.isRemovedChecked = newValue
          })
        }
      }
    },



    getSelectedInfo () {  // 所有选择结算的 数组(含有 所有勾选结算的商品)
      if (this.cartLists && this.cartLists.length > 0) {
        let arr = []
        let total = 0
        this.cartLists.forEach(shop => {
          shop.goodsList.forEach(good => {
            if (good.isChecked) {
              arr.push(good)
              total += good.price * good.number
            }
          })
        })
             
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.totalPrice = total
        return arr
      }
      return []
    },

    removeSelectedList () {   // 所有选择删除的 数组(含有 所有勾选删除的商品)
      if (this.editShop) {
        let arr = []
        this.editShop.goodsList.forEach(good => {
          if (good.isRemovedChecked) {
            arr.push(good)
          }
        })
        return arr
      }
      return []
    }


  },

  data: {
    cartLists: null,
    totalPrice: 0,
    editShop: null
  },

  methods: {
    getCartList () {  // 获取购物车列表页数据
      axios.post(api.cartList).then(res => {
        if (res.data.cartList && res.data.cartList.length > 0) {
          res.data.cartList.forEach(shop => {
            shop.isChecked = true
            shop.isRemovedChecked = false

            shop.isediting = false       // 新增 店铺切换编辑功能
            shop.editingMsg = '编辑'

            shop.goodsList.forEach(good => {
              good.isChecked = true
              good.isRemovedChecked = false
            })

          })
        }
        this.cartLists = res.data.cartList
      })
    },
   

    selectGood(shop, good) {           //Q2 切换商品勾选状态 + 对应店铺状态

      let checkedAttr = this.editShop ? 'isRemovedChecked' : 'isChecked'
      good[checkedAttr] = !good[checkedAttr]
      shop[checkedAttr] =  shop.goodsList.every(good => {
        return good[checkedAttr] == true
      })
    },

    selectShop(shop) {  // Q4 切换店铺勾选状态 + 对应下商品状态

      let checkedAttr = this.editShop ? 'isRemovedChecked' : 'isChecked'
      shop[checkedAttr] = !shop[checkedAttr]
      shop.goodsList.forEach(good => {
        good[checkedAttr] = shop[checkedAttr]
      })
    },

    selectAll() {   // 正常状态下全选
      let checkedAttr = this.editShop ? 'allRemovedSelected' : 'allSelected'
      this[checkedAttr] = !this[checkedAttr]
    },


    editDelete (shop) { // 切换店铺 显示/编辑状态
      // console.log('shop', shop)
      shop.isediting = !shop.isediting
      shop.editingMsg = shop.isediting ? '完成' : '编辑'
      this.cartLists.forEach(item => {
        if (item.shopId != shop.shopId) {
          item.isediting = false
          item.editingMsg = shop.isediting ? '' : '编辑'
        }
      })

      this.editShop = shop.isediting ? shop: null
    },

    EditGoodNum (type, good) {
      switch (type) {   // type 1:增加商品数量    2:减少商品数量
        case 1:
          axios.post(api.addCart, {id: good.id, number: 1}).then(res => {
            good.number++
          })
          break

        case 2:
          if (good.number == 1) return
          axios.post(api.minudCart, {id: good.id, number: 1}).then(res => {
            good.number--
          })
          break
      }
    },

    deleteGood (shop, good, shopIndex, goodIndex) {
      axios.post(api.removeCart, {id: good.id}).then(res => {
        shop.goodsList.splice(goodIndex, 1)
      
        if (!shop.goodsList.length) { // 删除到店铺下无商品时: 不显示店铺 + 状态恢复为显示状态
          this.removeShop(shopIndex)
        }
      })
    },
 
    removeShop (shopIndex) {  // 删除店铺 + 恢复为显示状态 + 每个店铺和状态变为显示状态
      this.cartLists.splice(shopIndex, 1)
      this.editShop = null
      this.cartLists.forEach(shop => {
        shop.isediting = false
        shop.editingMsg = '编辑'
      })

    }

  },


  mixins: [mixin],

  created () {
    this.getCartList()
  }
})