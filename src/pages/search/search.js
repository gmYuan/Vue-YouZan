import './search.css'
import 'css/common.css'

import Vue from 'vue'
import axios from 'axios'
import api from 'js/api.js'
import qs from 'qs'
import Velocity from 'velocity-animate' // 返回顶部的动画效果

import mixin from 'js/mixin.js'

let {keyword, id} = qs.parse(location.search.substr(1))

let app = new Vue({ // eslint-disable-line no-unused-vars
  el: '.container',
  data () {
    return {
      searchList: null,
      keyword,
      showTopIcon: false
    }
  },

  methods: {
    getSearchList () {
      axios.post(api.searchLists, {keyword, id}).then(res => {
        this.searchList = res.data.lists
      })
    },

    showTop () {
      let scroll = Math.abs(document.body.getBoundingClientRect().top)
      if (scroll > 100) {
        this.showTopIcon = true
      } else {
        this.showTopIcon = false
      }
    },

    toTop () {
      Velocity(document.body, 'scroll', {duration: 500})
    }

  },

  created () {
    this.getSearchList()
  },
  mixins: [mixin]
})
