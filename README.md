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




## 其他
