import Foot from 'components/Foot.vue'


const mixin = {

  /* 过滤器部分 */
  filters: {
    currency (price) {
      let priceStr = '' + price
      if (priceStr.indexOf('.') > -1) {
        let arr = priceStr.split('.')
        return arr[0] + '.' + (arr[1] + '0').substr(0,2)
      } else {
        return priceStr + '.00'
      }
    }
  },

   /* 组件部分 */
  components: {
    Foot
  },
}

export default mixin