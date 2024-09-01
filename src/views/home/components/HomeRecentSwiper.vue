<template>
  <home-box :title="title" :total="list.length" :rightShow="true" @prev="controlledSwiper.slidePrev()"
    @next="controlledSwiper.slideNext()">
    <swiper class="swiper" :modules="modules" :breakpoints="breakpoints" :centeredSlides="false" :autoHeight="true"
      :centeredSlidesBounds="true" @swiper="handleSetControlledSwiper">
      <swiper-slide v-for="(item,index) of  list" :key="index" @click="handleItemClick(item)">
        <div class="item">
          <com-image class="img" :src="item.picurl" />
          <div class="text">
            <div class="name">{{item.name}}</div>
            <div class="vendor">{{item.thirdpartyModuleName}} </div>
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
import { useStore } from "vuex";
import { useRouter } from "vue-router";
const router = useRouter();
const store = useStore()

const props = defineProps({
  list: Array,
  title: String,
})
let modules = [Autoplay];
let autoplayOptions = ref({
  delay: 3000,
  disableOnInteraction: false,
  pauseOnMouseEnter: true,
  reverseDirection: false,
});
let breakpoints = ref({
  320: {
    slidesPerView: 2,
    spaceBetween: 8
  },
  750: {
    slidesPerView: 3,
    spaceBetween: 12
  },
  992: {
    slidesPerView: 4,
    spaceBetween: 12
  },
  1536: {
    slidesPerView: 5,
    spaceBetween: 15
  },
  1700: {
    slidesPerView: 6,
    spaceBetween: 15

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
    cursor: pointer;
    width: 100%;
    padding: 0.14rem;
    box-sizing: border-box;
    background: var(--gg-home-head-btn-bg);
    border: 1px solid var(--gg-home-head-btn-border);
    border-radius: 0.16rem;
    overflow: hidden;
    display: flex;

    .img {
      flex: 0 0 auto;
      width: 33.33%;
      height: 0;
      padding-bottom: 33.33%;
      border-radius: 0.1rem;
      overflow: hidden;

    }

    .text {
      padding: 0.04rem 0;
      flex: 1 1 auto;
      margin-left: 0.08rem;
      display: flex;
      flex-direction: column;
      justify-content: center;

      .name {
        font-family: 'PingFang SC';
        font-style: normal;
        font-weight: 500;
        font-size: 0.16rem;
        line-height: 1.4em;
        color: var(--gg-text);
      }

      .vendor {
        margin-top: 0.1rem;
        font-family: 'PingFang SC';
        font-style: normal;
        font-weight: 400;
        font-size: 0.14rem;
        line-height: 1.4em;
        color: var(--gg-subtitle);
      }


    }
  }
}

@media (max-width: 749px) {
  .swiper {

    .item {
      border-radius: 0.1rem;
      padding: 0.1rem;

      .img {
        width: 0.48rem;
      }

      .text {
        .name {
          font-size: 0.14rem;
        }

        .vendor {
          margin-top: 0.02rem;
          font-size: 0.12rem;
        }
      }
    }
  }
}
</style>