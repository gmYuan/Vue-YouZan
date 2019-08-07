import 'css/common.css'
import './category.css'
import url from 'js/api.js'

import axios from 'axios'
import Vue from 'vue'

// import Foot from 'components/Foot.vue'
import mixin from 'js/mixin.js'

Vue.config.devtools = true

let app = new Vue({ // eslint-disable-line no-unused-vars
  el: '#app',
  // components: {
  //   Foot
  // },

  data: {
    topLists: null,
    topIndex: 0, // 一级分类索引，默认0为综合排行

    /* 二级分类数据 */
    subData: null,
    subRank: null
  },

  methods: {
    getTopLists () {
      axios.get(url.topLists).then(res => {
        this.topLists = res.data.lists
        console.log(this.topLists)
      })
    },

    getRankData () {
      axios.post(url.subRanks).then(res => {
        this.subRank = res.data.data
        console.log('rank', this.subRank)
      })
    },

    getSubList (index, parentId) {
      this.topIndex = index
      if (index === 0) {
        this.getRankData()
      } else {
        axios.post(url.subLists,{id: parentId}).then(res => {
          this.subData = res.data.data
          console.log('list', this.subData)
        })
      }
    },

    toSearch (item) {  // 跳转到列表页
      location.href = `search.html?keyword=${item.name}&id=${item.id}`
    }


  },

  created () {
    this.getTopLists()
    this.getSubList(0)
  },

  mixins: [mixin]


})
