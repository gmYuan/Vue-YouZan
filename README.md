# Vue-YouZan



## 项目预览


## 项目介绍

该项目实现了有赞卖家移动端的部分页面，包括: 首页


## 技术栈

Vue + Vue-Router + Vuex + Swiper + Vant


## 问题记录

1 Q1: 如何实现下拉加载功能

A:
S1 引入vant + list组件
   
S2 监听load事件- onLoad方法
   
S2.1 设置loading为ture(自动/手动)
   
S2.2 发起数据请求
     
S2.3 加载状态结束后loading改回false + 改变下次发送请求的分页索引
   
S2.4 当返回的当前页数量 < 预定的每页数据时，说明已经返回所有数据，finished设为true

部分代码

```JS

export default {

// S1 引入vant组件
import { List } from 'vant'
Vue.use(List)

let app = new Vue({ 
  el: '#app',

  data: {
    hotLists: null,
    currentPage: 1,
    pageSize: 6,     // 每次请求获取的数据长度
    loading: false, // 当前是否处于loading状态- 此时可发起数据请求
    finished: false // 下拉列表是否已加载完所有数据
  },

  methods: {
    getHotList () {
      this.loading = true         // S2.1需要加载新数据，所以状态为loading,不会触发load事件
      axios.get(url.hotLists, {     // S2.2
        pageNum: this.currentPage,
        pageSize: this.pageSize
      }).then(res => {
        console.log('111', res)
        let curLists = res.data.hotLists
        if (curLists.length < this.pageSize) {   // S2.4
          this.finished = true
        }
        if (this.hotLists) {
          this.hotLists = this.hotLists.concat(curLists)
        } else {
          this.hotLists = curLists
        }
        this.currentPage = this.currentPage++   //S2.3
        this.loading = false       // 数据加载完成后，不再处于loading状态
      })
    },
    onLoad () {
      let self = this
      setTimeout(self.getHotList, 500)    //节流
    }
  },

  created () {
    this.getHotList()
  }

})

}
```

2 Q2: 多个组件间公有的属性/方法/数据等，如何对其进行复用

A: 使用mixin封装公有options: filters / components/ methods......

S1 新建mixin.js文件, mixin对象内部配置公有的 Vue实例属性

S2 导出mixin对象, 在组件中引入 + 配置: mixins: [mixin]

示例代码:

```js
import Foot from 'components/Foot.vue'
const mixin = {

  /* 过滤器部分 */
  filters: {
    currency (price) {
      let priceStr = '' + price
      if (priceStr.indexOf('.') > -1) {
        let arr = priceStr.split('.')
        return arr[0] + '.' + (arr[1] + '0').substr(0,2)
      } else {
        return priceStr + '.00'
      }
    }
  },

   /* 组件部分 */
  components: {
    Foot
  },
}

export default mixin

</script>
```


3.1 Q: 如何实现  勾选完店铺A下所有商品后，自动勾选上店铺A按钮(自底向上) 

A:

S1 changeGoodCheck函数:  通过Array.every方法，当所有店铺商品都是勾选状态时，才会返回true给 店铺按钮勾选值


3.2 Q: 如何实现勾选所有店铺后，自动勾选全选按钮(自底向上) 

A:

S1 因为全选按钮不在v-for的遍历范围内，所以无法直接写在 店铺-商品部分的changeGoodCheck函数内

S2 此时，可以使用计算属性， 来拿到店铺列表数组内容: allSelected  + Array.every方法


3.3 Q: 如何实现 勾选店铺后，自动勾选该店铺下所有商品(自上而下)

A: 

S1 点击店铺取反状态 + 遍历店铺下的商品，使其选取状态等于 店铺状态


3.4 Q: 如何实现 勾选全选后，自动勾选店铺A按钮 和 店铺A下所有商品

A: 

S1 点击全选按钮后，allSelected取反 + 遍历店铺和商品的checked状态，使其等于allSelected值即可

S2 因为allSelected是通过计算属性实现的, 所以直接allSelected取反操作不会生效，需要在 计算属性的set中写相关逻辑


具体实现:

```JS
export default {
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

    selectAll() {    // Q5
      this.allSelected = !this.allSelected
    }

  },


  mixins: [mixin],

  created () {
    this.getCartList()
  }
})

}
```


4 Q: 购物车编辑功能相关功能及实现 有哪些

A:

S1 编辑 <--> 完成样式切换

S2 商品 显示/编辑状态 样式切换  -->  商品数量绑定

S3 页面底部 删除按钮/结算按钮 切换显示  ==> `全局变量editShop来区分`

S4 店铺/商品的  勾选结算按钮/勾选删除按钮的切换显示(互不影响)  ==> 根据当前是否是 编辑状态(editShop)

   S4.1 方法1: v-show切换显示2个DOM按钮元素: 勾选结算/勾选删除

   S4.2 方法2: `1个按钮， 是否勾选(的状态)通过 店铺/商品的当前状态来区分判断:  isChecked/isRemovedChecked  (√)`

S5 勾选结算/勾选删除 的全选按钮 切换显示 ==> `三元运算符 + allSelected/allRemovedSelected 计算属性` 来区分显示


S6 区分在 结算/删除状态下， 对商品/店铺/全选按钮点击后的 勾选状态进行切换 ==> `根据edisShop状态值, 切换isChecked/isRemovedChecked值(三元运算符) + 对象动态key值`

S7 `可以在计算属性里 进行逻辑处理`




## 其他
