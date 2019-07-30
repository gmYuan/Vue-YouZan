<template>
  <div>

    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swp-page swiper-slide" v-for="(item, i) of lists" :key="i">
          <a class="js-no-follow" :href="item.clickUrl">
            <img
              class="goods-main-photo fadeIn"
              :src="item.img"
            />
          </a>
        </div>
      </div>

      <div class="swiper-pagination"></div>
    </div>

    
  </div>
</template>

<script>

import Swiper from 'swiper'
import 'swiper/dist/css/swiper.css'

export default {
  name: "mySwipe",
  props: ['lists'],

  mounted () {
     new Swiper ('.swiper-container', {
      loop: true, 
      pagination: {
        el: '.swiper-pagination',
      },
    })
  }
  

}

</script>

<style scoped>

.swiper-slide a img {
  width: 100%;
  height: 100%;
}

</style>
