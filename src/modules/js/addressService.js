import fetch from './fetch'
import api from './api'

class Address {

  static addressList() {
    return fetch(api.addressList)
  }

  static addAddress (data) {
    return fetch(api.addAddress, data)
  }

  static removeAddress (id) {
    return fetch(api.removeAddress, id)
  }

  static updateAddress (data) {
    return fetch(api.updateAddress, data)
  }

  static setDefaultAddress (id) {
    return fetch(api.setDefaultAddress, id)
  }

}

export default Address