import './search.css'
import 'css/common.css'

import Vue from 'vue'
import axios from 'axios'
import api from 'js/api.js'
import qs from 'qs'

let {keyword, id} = qs.parse(location.search.substr(1))

let app = new Vue({ // eslint-disable-line no-unused-vars
  el: '.container',
  data () {
    return {
      searchList: null,
      keyword
    }
  },

  methods: {
    getSearchList () {
      axios.post(api.searchLists, {keyword, id}).then(res => {
        this.searchList = res.data.lists
      })
    }
  },

  created () {
    this.getSearchList()
  }
})
