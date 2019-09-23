import api from 'js/api.js'
import fetch from 'js/fetch.js'

class Cart {
  static add(id) {
    return fetch(api.addCart, {id, number: 1})
  }
}

export default Cart