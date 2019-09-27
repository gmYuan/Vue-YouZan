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
              >{{mapItem.label}}</option>
            </select>

            <select class="js-city-selector" v-model="cityValue">
              <option value="-1">选择城市</option>
              <option
                v-for="(cityItem, i) of cityMap"
                :key="i"
                :value="cityItem.value"
              >{{cityItem.label}}</option>
            </select>

            <select class="js-county-selector" name="area_code" data-code v-model="districtValue">
              <option value="-1">选择地区</option>
              <option
                v-for="(districtItem, i) of districtMap"
                :key="i"
                :value="districtItem.value"
              >{{districtItem.label}}</option>
            </select>
          </div>
        </div>
        <!-- } 选择地区部分 -->

        <div class="block-item">
          <label>详细地址</label>
          <input
            type="text"
            placeholder="街道门牌信息"
            name="address_detail"
            v-model="address"
            maxlength="100"
          />
        </div>
      </div>
    </div>

    <div class="block section js-save block-control-btn" @click="saveAddress">
      <div class="block-item c-blue center">保存</div>
    </div>

    <div class="block section js-delete block-control-btn" v-show="type == 'edit'" @click="removeAddress">
      <div class="block-item c-red center">删除</div>
    </div>

    <div class="block stick-bottom-row center js-save-default" v-show="type == 'edit'" @click="setDefaultAddress">
      <button class="btn btn-standard js-save-default-btn">设为默认收货地址</button>
    </div>
  </div>
</template>



<script>
import addressMap from "./address.json"; // 省市区对应数据文件

import Address from "js/addressService.js"; // 封装接口层

export default {
  data() {
    return {
      type: "", // 用来区分 新增地址/编辑地址

      id: "", // 地址id
      name: "",
      tel: "",
      provinceValue: -1, // 数字-文字
      cityValue: -1,
      districtValue: -1,
      address: "",

      addressMap: addressMap.list, // 3级级联城市, 最外层为省
      cityMap: null, // 3级级联城市, 第2层为市
      districtMap: null // 3级级联城市, 第3层为区
    };
  },

  methods: {
    getAddressInfo() {
      // 判断跳转类型 + 当是编辑地址时，存入带入的数据
      this.type = this.$route.query.addressInfo ? "edit" : "add"


      if (this.type === "edit") {
        let info = this.$route.query.addressInfo;
        // console.log(info);

        this.id = info.id;
        this.name = info.name;
        this.tel = info.tel;
        this.provinceValue = parseInt(info.provinceValue);
        this.address = info.address;
      }
    },

    saveAddress() {  // 新增或者更新地址
      let { name, tel, provinceValue, cityValue, districtValue, address } = this
      let data = { name, tel, provinceValue, cityValue, districtValue, address }
      if (this.type === "add") {
        Address.addAddress(data).then(res => {
          this.$router.go(-1);
        })
      } else if (this.type === "edit") {
        data.id = this.id
        Address.updateAddress(data).then(res => {
          this.$router.go(-1);
        })
      }
    },

    removeAddress() {
      Address.removeAddress({id: this.id}).then(res => {
        this.$router.go(-1);
      })
    },

    setDefaultAddress() {
      Address.setDefaultAddress({id: this.id}).then(res => {
        this.$router.go(-1);
      })
    },

  },

  watch: {
    provinceValue(newVal) {
      // 每次修改省份时: 确定二级市数组 + 重置二级市/三级区  对应的value值为未选状态
      if (newVal == -1) return;

      this.cityMap = this.addressMap.find(item => {
        return item.value == newVal;
      }).children;

      this.cityValue = -1;
      this.districtValue = -1;

      if (this.type === "edit") {
        let info = this.$route.query.addressInfo;
        this.cityValue = parseInt(info.cityValue);
      }
    },

    cityValue(newVal) {
      // 每次修改市时: 确定三级区数组 + 重置三级区 对应的value值为未选状态
      if (newVal == -1) return;

      this.districtMap = this.cityMap.find(item => {
        return item.value == newVal;
      }).children;

      this.districtValue = -1;

      if (this.type === "edit") {
        let info = this.$route.query.addressInfo;
        this.districtValue = parseInt(info.districtValue);
      }
    }
  },

  created() {
    this.getAddressInfo();
  }
};
</script>

<style>
</style>
