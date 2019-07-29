import 'css/common.css'
import './index.css'
import url from 'js/api.js'

import Vue from 'vue'
import axios from 'axios'

// 引入组件
import foot from 'components/Foot'

// 引入vant组件
import { List } from 'vant'
Vue.use(List)

let app = new Vue({   // eslint-disable-line no-unused-vars
  el: '#app',
  components: {
    foot
  },
  data: {
    hotLists: null,
    currentPage: 1,
    pageSize: 6,       // 每次请求获取的数据长度
    loading: false,    // 当前是否处于loading状态- 此时可发起数据请求
    finished: false,   // 下拉列表是否已加载完所有数据

    /* banner相关 */
    bannerList: null
  },

  methods: {

    getHotList () {
      this.loading = true // 需要加载新数据，所以状态为loading,不会触发load事件
      axios.get(url.hotLists, {
        pageNum: this.currentPage,
        pageSize: this.pageSize
      }).then(res => {
        console.log('111', res)
        let curLists = res.data.hotLists
        if (curLists.length < this.pageSize) {
          this.finished = true
        }
        if (this.hotLists) {
          this.hotLists = this.hotLists.concat(curLists)
        } else {
          this.hotLists = curLists
        }
        this.currentPage = this.currentPage++
        this.loading = false // 数据加载完成后，不再处于loading状态
      })
    },

    onLoad () {
      let self = this
      setTimeout(self.getHotList, 500)
    },

    getBanner () {
      axios.get(url.indexBanner).then(res => {
        this.bannerList = res.data.array
      })
    }

  },

  created () {
    this.getHotList()
    this.getBanner()
  }

})
