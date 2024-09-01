<template>
  <swiper class="swiper" :autoplay="autoplayOptions" :modules="modules" :breakpoints="breakpoints" :centeredSlides="false"
    :autoHeight="true" :centeredSlidesBounds="true" :pagination="{ clickable: true }" @swiper="handleSetControlledSwiper">
    <swiper-slide class="item" v-for="item of list" :key="item.id" @click="handlePathClick(item)">
      <div class="bg">
        <img class="bg-img" :src="require(`../../../assets/images/home/${theme}/intr_bg.svg`)" />
      </div>
      <div class="title overflow1">{{item.title}}</div>
      <div class="item-bot">
        <div class="text">
          <p v-html="item.description"></p>
          <div class="btn">{{ $t('home.desc30') }}</div>
        </div>
        <div class="img-con">
          <com-image class="img" :src="item.imgUrl" :fit="'contain'" />
        </div>
      </div>
    </swiper-slide>
  </swiper>
</template>
<script setup>
import { ref, computed, onMounted, getCurrentInstance } from "vue";
import { Pagination, Autoplay } from "swiper";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { _ads } from '@/utils/api/common'
const store = useStore()
const router = useRouter();
const { proxy } = getCurrentInstance()
let theme = computed(() => store.state.global.theme)
const isLogin = computed(() => store.getters.isLogin)
const openUrl = proxy.$common.openUrl
const userInfo = computed(() => {
  return store.state.user.userInfo
})
const list = ref([])


let modules = ref([Pagination, Autoplay]);
let autoplayOptions = ref({
  delay: 3000,
  disableOnInteraction: false,
  pauseOnMouseEnter: true,
  reverseDirection: false,
  pagination: ".swiper-pagination",
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
  993: {
    slidesPerView: 3,
    spaceBetween: 16
  },
  1536: {
    slidesPerView: 4,
    spaceBetween: 16,
  },
});
let controlledSwiper = ref(null);
function handleSetControlledSwiper(swiper) {
  controlledSwiper.value = swiper;
}

function getInfo() {
  const info1 = _ads({ positionKey: 'INDEX_JiaoXI' })
  const info2 = _ads({ positionKey: 'INDEX_GGM' })
  const info3 = _ads({ positionKey: 'INDEX_TuiJian' })
  const info4 = _ads({ positionKey: 'INDEX_TradeGGame' })
  Promise.all([info1, info2, info3, info4]).then(res => {
    list.value = res.map(item => {
      return item[0]
    })
  })
}

function handlePathClick(item) {
  if (!isLogin.value) {
    store.commit('SET_LOGIN_POPUP_SHOW', true)
  } else if (item.forwardType === 1 && item.forwardPath) {
    router.push(item.forwardPath);
  } else {
    openUrl(item.forwardPath);
  }
}

onMounted(() => {
  getInfo()
})
</script>


<style lang='scss' scoped>
.swiper {
  padding-top: 0.4rem;
  padding-bottom: 0.2rem;
  position: relative;
  width: 100%;
  cursor: pointer;
  // overflow: visible;

  .swiper-slide {
    min-height: 100%;
  }

  :deep {
    .swiper-pagination-bullets.swiper-pagination-horizontal {
      bottom: 0;
    }
  }


  .item {
    min-height: 100%;
    padding: 0.28rem 0.2rem 0.24rem;
    overflow: hidden;
    position: relative;
    background: var(--gg-intr-bg);
    box-shadow: var(--gg-intr-shadow);
    border-radius: 0.24rem;
    display: flex;
    flex-direction: column;

    .bg {
      // content: '';
      position: absolute;
      top: 10%;
      left: 0;
      width: 106%;
      height: 0;
      padding-bottom: 93.34%;

      .bg-img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: contain;
      }

      // background: url('../../../assets/images/home/intr_bg.svg') no-repeat center;
      // background-size: auto;

    }

    .title {
      width: 100%;
      font-family: 'Venryn Sans';
      font-weight: 900;
      font-size: 0.2rem;
      line-height: 1.4em;
      text-transform: uppercase;
      color: var(--gg-text);
      position: relative;
      z-index: 2;

    }

    &-bot {
      min-height: 0;
      width: 100%;
      display: flex;
      flex: 1;
      position: relative;
      z-index: 2;

      .img-con {
        flex: 0 0 auto;
        width: 40%;
        min-width: 1rem;

      }

      .img {
        width: 100%;
        height: 0;
        padding-bottom: 100%;
      }

      .text {
        width: 0;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        p {
          margin-top: 0.04rem;
          font-family: 'PingFang SC';
          font-style: normal;
          font-weight: 400;
          font-size: 0.16rem;
          line-height: 1.4em;
          color: var(--gg-intr-text);
        }

        .btn {
          align-self: start;
          white-space: nowrap;
          height: 0.32rem;
          margin-top: 0.2rem;
          padding: 0 0.3rem;
          font-size: 0.14rem;
          line-height: 1.4em;
          background: var(--gg-btn-bg-common);
          border: 1px solid var(--gg-btn-border-common);
          color: var(--gg-btn-color-common);
          border-radius: 0.08rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }

  }
}



@media (max-width: 749px) {

  .swiper {
    padding-top: 0.24rem;
    overflow: hidden;

    .item {
      border-radius: 0.12rem;
      padding: 0.16rem 0.12rem;

      .title {
        font-family: 'PingFang SC';
        font-weight: 500;
        font-size: 0.14rem;
      }

      .img-con {
        width: 34%;
        min-width: auto;

      }



      .text {
        flex-direction: row;

        .title {
          margin-bottom: 0.05rem;
          font-size: 0.16rem;
        }

        p {
          display: none;
        }

        .btn {
          align-self: flex-end;
          margin-top: 0.2rem;
          height: 0.22rem;
          padding: 0 0.17rem;
          font-size: 0.12rem;
        }
      }
    }
  }
}
</style>