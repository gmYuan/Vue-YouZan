<template>

  <div class="container" style="min-height: 597px;">
    <div class="section section-first">
      <div class="block form js-form">
        <input class="js-id" name="id" type="hidden" value />
        <div class="block-item" style="border-top:0;">
          <label>收货人</label>
          <input type="text" placeholder="请输入姓名" name="user_name" v-model="name" maxlength="20" />
        </div>
        <div class="block-item">
          <label>联系电话</label>
          <input type="tel" placeholder="联系电话" name="tel" v-model="tel" maxlength="11" />
        </div>

        <!-- 选择地区部分 { -->
        <div class="block-item">
          <label>选择地区</label>

          <div class="select-group">
            <select class="js-province-selector" v-model="provinceValue">
              <option value="-1">选择省份</option>
              <option 
                v-for="(mapItem, i) of addressMap"
                :key="i"
                :value="mapItem.value"
              >
              {{mapItem.label}}
              </option>
            </select>

            <select class="js-city-selector">
              <option value="-1">选择城市</option>
            </select>

            <select class="js-county-selector" name="area_code" data-code>
              <option value="-1">选择地区</option>
            </select>

          </div>
        </div>
        <!-- } 选择地区部分 -->


        <div class="block-item">
          <label>详细地址</label>
          <input type="text" placeholder="街道门牌信息" name="address_detail" v-model="address" maxlength="100" />
        </div>
      </div>
    </div>
    <div class="block section js-save block-control-btn">
      <div class="block-item c-blue center">保存</div>
    </div>
    <div class="block section js-delete block-control-btn" v-show="type == 'edit'">
      <div class="block-item c-red center">删除</div>
    </div>
    <div class="block stick-bottom-row center js-save-default" v-show="type == 'edit'">
      <button class="btn btn-standard js-save-default-btn">设为默认收货地址</button>
    </div>
  </div>
  
</template>



<script>

import addressMap from "./address.json"



export default {
  data () {
    return {
      type: '',  // 用来区分 新增地址/编辑地址

      id: '',   // 地址id
      name: '',
      tel: '',
      provinceValue: -1,   // 数字-文字
      cityValue: -1,
      districtValue: -1,
      address: '',

      addressMap: addressMap.list,          // 3级级联城市, 最外层为省
      cityMap: null,                        // 3级级联城市, 第2层为市
      districtMap: null,                    // 3级级联城市, 第3层为区




    }
  },

  methods: {
    getAddressInfo() {
      this.type = this.$route.query.addressInfo ? 'edit' : 'add'
    }

  },

  watch: {
    provinceValue(newVal) {
      if (newVal == -1) return

      this.cityMap = this.addressMap.find((item) => {
        return item.value == newVal
      }).children
    }

    
  },

  created () {
    this.getAddressInfo()
  }


}

</script>

<style>
</style>
