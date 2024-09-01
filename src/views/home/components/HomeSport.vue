<template>
  <home-box :type="type" :title="title" :intr="intr" :total="list.length" :rightShow="true"
    @prev="controlledSwiper.slidePrev()" @next="controlledSwiper.slideNext()">
    <swiper class="swiper" :modules="modules" :autoplay="autoplayOptions" :breakpoints="breakpoints"
      @swiper="handleSetControlledSwiper">
      <swiper-slide v-for="(item,index) of  list" :key="index">
        <div class="item" @click="handleItemClick(item)">
          <div class="img-con">
            <com-image class="img" :src="item.picurl" />
          </div>
          <div class="item__mask">
            <div class="btn">{{$t('home.desc20')}}</div>
          </div>
        </div>
      </swiper-slide>
    </swiper>
  </home-box>
</template>
<script setup>
import HomeBox from './HomeBox'
import { ref } from "vue";
import { Autoplay } from "swiper";
import { useRouter } from "vue-router";
import { useStore } from 'vuex';
const store = useStore()
const router = useRouter();
const props = defineProps({
  list: Array,
  title: String,
  intr: String,
  type: String
})

let modules = ref([Autoplay]);
let autoplayOptions = ref({
  delay: 3000,
  disableOnInteraction: false,
  pauseOnMouseEnter: true,
  reverseDirection: false,
});
let breakpoints = ref({
  320: {
    slidesPerView: 2,
    spaceBetween: 10
  },
  750: {
    slidesPerView: 2,
    spaceBetween: 16
  },
  992: {
    slidesPerView: 3,
    spaceBetween: 16,
  },
});
let controlledSwiper = ref(null);
function handleSetControlledSwiper(swiper) {
  controlledSwiper.value = swiper;
}

function handleItemClick(item) {
  store.commit('SET_GAME_URL_PARAMS', {
    handler: item.handler,
    code: item.code,
    thirdpartyPlatformCode: item.thirdpartyPlatformCode,
    id: item.id
  })
  router.push('/games/detail')
}
</script>



<style lang='scss' scoped>
.swiper {
  width: 100%;
  padding: 0.1rem 0;

  .item {
    width: 100%;
    background: var(--gg-card-bg);
    border-radius: 0.2rem;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    cursor: pointer;

    &:hover {
      .item__mask {
        opacity: 1;

        .btn {
          transform: translate(-50%, -50%) scale(1);
        }
      }

    }

    .item__mask {
      position: absolute;
      z-index: 1;
      bottom: 0;
      left: 0;
      right: 0;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      transition: 200ms linear;
      opacity: 0;
      display: flex;
      align-items: center;
      justify-content: center;

      .btn {
        width: 54.5%;
        min-width: 0.8rem;
        height: 0.36rem;
        background: var(--gg-btn-bg);
        border: 1px solid var(--gg-btn-border);
        border-radius: 0.1rem;
        font-family: 'PingFang SC';
        font-style: normal;
        font-weight: 400;
        font-size: 0.16rem;
        color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0.95);
        transition: 500ms linear;

      }
    }

    .img-con {
      flex: 0 0 auto;
      width: 100%;
      height: 0;
      padding-bottom: 100%;
      // padding-bottom: 60.34%;
      position: relative;
      overflow: hidden;

    }

    .img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;

    }




  }
}

@media (max-width: 749px) {
  .swiper {

    .item {
      border-radius: 0.06rem;
    }
  }
}
</style>