/* 静态样式部分 */

import './goods_common.css'
import './goods_custom.css'
import './goods.css'
import './goods_theme.css'
import './goods_mars.css'
import './goods_sku.css'
import './goods_transition.css' // 过渡效果

/* 依赖部分 */
import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'

import api from 'js/api.js'
import mixin from 'js/mixin.js'

/* 引入组件 */
import mySwipe from 'components/Swiper.vue'

let {id} = qs.parse(location.search.substr(1))

let app = new Vue({ // eslint-disable-line no-unused-vars
  el: '#app',

  components: {
    mySwipe
  },

  data: {
    details: null,
    dealLists: null,
    tabList: ['商品详情', '本店成交'],
    tabIndex: 0,
    bannerList: null, // banner列表数据
    skuType: 0, // 当前点击类型， 1:净含量  2: 加入购物车   3:立即购买
    showSku: false  // 是否显示阴影和弹出层
  },

  methods: {
    getDetail () {
      axios.post(api.goodsDetail, {id}).then(res => {
        this.details = res.data.data
        // 赋值banner列表
        this.bannerList = []
        this.details.imgs.forEach(item => {
          this.bannerList.push({
            clickUrl: '',
            img: item
          })
        })
      })
    },
    getDeal (id) { // 获取Deal列表
      axios.post(api.goodsDeal, {id}).then(res => {
        this.dealLists = res.data.data.lists
      })
    },

    changeTab (index) {
      this.tabIndex = index
      if (index) { // 只有点击切换时，才会去加载请求
        this.getDeal({id})
      }
    },

    chooseSku (curType) {
      this.skuType = curType
      this.showSku = true
    }

  },

  watch: {
    showSku (val, oldVal) { // 监听showSku值，设置页面是否禁止滚动(滚动穿透问题)
      document.body.style.overflow = val ? 'hidden' : 'auto'
      document.querySelector('html').style.overflow = val ? 'hidden' : 'auto'

      document.body.style.height = val ? '100%' : 'auto'
      document.querySelector('html').style.height = val ? '100%' : 'auto'
    }
  },

  mixins: [mixin],

  created () {
    this.getDetail()
  }
})
