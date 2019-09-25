// let host = "production/..."   真实环境host

// let host = 'https://www.easy-mock.com/mock/5d2729c21752820de7a8a8f7/youzan'

let host = 'http://rap2api.taobao.org/app/mock/166163'


let url = {
  hotLists: '/index/hotLists',
  indexBanner: '/index/banner',

  topLists: '/category/topList',
  subLists: '/category/subList',
  subRanks: '/category/subRank',
  searchLists: '/search/list',

  goodsDetail: '/goods/details',
  goodsDeal: '/goods/deal',
  
  cartList: '/cart/list',   // 购物车列表
  addCart: '/cart/add',
  updateCart: '/cart/update',  //修改购物车商品
  minudCart: '/cart/reduce',   // 减少商品
  removeCart: '/cart/remove',  // 删除商品
  mulRemoveCart: '/cart/mulremove',  //批量删除商品


  /* 个人地址相关  */
  addressList: '/address/list',   // 地址列表

  addAddress: '/address/add',
  removeAddress: '/address/remove', 
  updateAddress: 'address/update',  

  setDefaultAddress: 'address/setDefault'  // 设置为默认地址
  

  
}

for (let key in url) {
  url[key] = host + url[key]
}

export default url
