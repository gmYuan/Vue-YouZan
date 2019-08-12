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

let app = new Vue({ // eslint-disable-line no-unused-vars
  el: '#app'
})
