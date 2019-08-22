/* 静态样式部分 */

import './goods_common.css'
import './goods_custom.css'
import './goods.css'
import './goods_theme.css'
import './goods_mars.css'
import './goods_sku.css'

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
    bannerList: null // banner列表数据
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
    getDeal (id) {
      axios.post(api.goodsDeal, {id}).then(res => {
        this.dealLists = res.data.data.lists
      })
    },

    changeTab (index) {
      this.tabIndex = index
      if (index) { // 只有点击切换时，才会去加载请求
        this.getDeal({id})
      }
    }
  },

  mixins: [mixin],

  created () {
    this.getDetail()
  }
})
