import 'css/common.css'
import './index.css'

import Vue from 'vue'

import axios from 'axios'
import url from 'js/api.js'

let app = new Vue({ // eslint-disable-line no-unused-vars
  el: '#app',
  data: {
    hotLists: null
  },

  methods: {
    getHotList () {
      axios.get(url.hotLists, {
        pageNum: 1,
        pageSize: 6
      }).then(res => {
        console.log('11', res)
        this.hotLists = res.data.hotLists
      })
    }

  },

  created () {
    this.getHotList()
  }

})
