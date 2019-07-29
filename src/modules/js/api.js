// let host = "production/..."   真实环境host

let host = 'https://www.easy-mock.com/mock/5d2729c21752820de7a8a8f7/youzan'

let url = {
  hotLists: '/index/hotLists',
  indexBanner: '/index/banner'
}

for (let key in url) {
  url[key] = host + url[key]
}

export default url
