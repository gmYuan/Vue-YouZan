<template>
  <div class="container" style="min-height: 597px;">
    <div class="block-list address-list section section-first js-no-webview-block">
      <div
        class="block-item js-address-item address-item"
        :class="{'address-item-default': item.isDefault}"
        v-for="item of addressLists"
        :key="item.id"
        @click="toEdit(item)"
      >
        <div class="address-title">{{item.name}} {{item.tel}}</div>
        <p>{{item.provinceName}}{{item.cityName}}市{{item.districtName}}{{item.address}}</p>
      </div>
    </div>


    <div class="block stick-bottom-row center">
      <a class="btn btn-blue js-no-webview-block js-add-address-btn" @click="toEdit(null)">
        新增地址
      </a>
    </div>
  </div>
</template>

<script>

import Address from 'js/addressService.js'

export default {

  data () {
    return {
      addressLists: []
    }
  },


  methods: {

    toEdit(addressInfo){   // 跳转到编辑地址页
      this.$router.push({ path: 'addressEdit', query: {addressInfo} })
    },

    getAddressList () {
      Address.addressList().then(res => {
        // console.log(res)
        this.addressLists = res.data.lists
      })
    }


  },

  created() {
    this.getAddressList()

  }
}

</script>

<style>
</style>