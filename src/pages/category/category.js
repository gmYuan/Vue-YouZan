import 'css/common.css'
import './category.css'
import url from 'js/api.js'

import axios from 'axios'
import Vue from 'vue'

import Foot from 'components/Foot.vue'

Vue.config.devtools = true

let app = new Vue({ // eslint-disable-line no-unused-vars
  el: '#app',
  components: {
    Foot
  },
  data: {
    topLists: null,
    topIndex: 0 // 一级分类索引，默认0为综合排行
  },
  methods: {
    getTopLists () {
      axios.get(url.topLists).then(res => {
        this.topLists = res.data.lists
        console.log(this.topLists)
      })
    },
    getSubList (parentId, index) {
      this.topIndex = index
    }
  },

  created () {
    this.getTopLists()
  }
})
