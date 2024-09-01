<template>
  <div class="defi-total">
    <div class="box-top">
      <div class="left">
        <div class="title">{{$t('defi.desc1')}}</div>
      </div>
      <div class="right">
        <div class="prev-next">
          <div class="btn" @click="controlledSwiper.slidePrev()"><van-icon name="arrow-left" /></div>
          <div class="btn" @click="controlledSwiper.slideNext()"><van-icon name="arrow" /></div>
        </div>
      </div>
    </div>
    <swiper class="swiper" :modules="modules" :autoplay="autoplayOptions" :breakpoints="breakpoints"
      @swiper="handleSetControlledSwiper">
      <swiper-slide>
        <div class="item">
          <div class="name">{{$t('defi.desc2')}}</div>
          <div class="val ">$ {{ info.tvlAmount ? decal(info.tvlAmount,3) : 0 }}</div>
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="item">
          <div class="name">{{$t('defi.desc3')}}</div>
          <div class="val ">0 USDT</div>
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="item">
          <div class="name">{{$t('defi.desc4')}}</div>
          <div class="val ">0 USDT</div>
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="item">
          <div class="name">{{$t('defi.desc5')}}</div>
          <div class="val ">0 USDT</div>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { Autoplay } from "swiper";
import { getCurrentInstance } from "vue";
const { proxy } = getCurrentInstance();
const decal = proxy.$common.decal
const props = defineProps({
  info: Object,
});
let modules = ref([Autoplay]);
let autoplayOptions = ref({
  delay: 3000,
  disableOnInteraction: false,
  pauseOnMouseEnter: true,
  reverseDirection: false,
});
let breakpoints = ref({
  320: {
    slidesPerView: 1,
    spaceBetween: 0
  },
  750: {
    slidesPerView: 2,
    spaceBetween: 16
  },
  992: {
    slidesPerView: 3,
    spaceBetween: 16,
  },
  1441: {
    slidesPerView: 4,
    spaceBetween: 16,
  },
});
let controlledSwiper = ref(null);
function handleSetControlledSwiper(swiper) {
  controlledSwiper.value = swiper;
}


</script>

<style lang='scss' scoped>
.defi-total {
  width: 100%;
  margin-top: 0.4rem;

  .box-top {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .left {
      padding-right: 0.2rem;
      display: flex;
      flex-direction: column;

      .title {
        font-family: 'Venryn Sans';
        font-weight: 900;
        font-size: 0.2rem;
        line-height: 1.4em;
        color: var(--gg-text);
        text-transform: uppercase
      }

      p {
        font-family: 'PingFang SC';
        font-style: normal;
        font-weight: 400;
        font-size: 0.14rem;
        line-height: 1.5em;
        color: var(--nav-btn-text);

      }
    }



    .right {
      align-self: flex-end;
      margin-left: 0.15rem;
      display: flex;
      display: none;



      .prev-next {
        display: flex;
        align-items: center;
        justify-content: center;

        .btn {
          width: 0.38rem;
          height: 0.38rem;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--gg-home-head-btn-bg);
          border: 1px solid var(--gg-home-head-btn-border);
          border-radius: 0.1rem;
          cursor: pointer;
          opacity: 0.8;
          transition: all 0.3s linear;
          box-sizing: border-box;

          .van-icon {
            font-weight: bold;
            font-size: 0.12rem;
            color: var(--gg-home-head-icon);
          }

          &:hover {
            opacity: 1;


          }

          &:first-child {
            margin-right: 0.1rem;
          }
        }
      }
    }
  }
}

.swiper {
  width: 100%;
  position: relative;
  padding: 0.12rem 0;

  .swiper-slide {
    height: auto;
    min-height: 100%;
  }


  .item {
    position: relative;
    width: 100%;
    min-height: 100%;
    background: var(--gg-intr-bg);
    box-shadow: var(----gg-intr-shadow);
    border-radius: 0.2rem;
    padding: 0.2rem 0.24rem;
    overflow: hidden;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .name {
      flex: 0 0 auto;
      font-family: 'PingFang SC';
      font-style: normal;
      font-weight: 400;
      font-size: 0.14rem;
      line-height: 1.2em;
      color: var(--gg-intr-title);
    }

    .val {
      margin-top: 0.12rem;
      flex: 1 1 auto;
      font-family: 'PingFang SC';
      font-style: normal;
      font-weight: 500;
      font-size: 0.32rem;
      line-height: 1.14em;
      color: var(--gg-text);
      display: flex;
      align-items: center;
    }

    img {
      position: absolute;
      top: 0;
      right: 0;
      height: 100%;
    }
  }
}

@media (max-width:1820px) {
  .swiper {

    .item {
      .val {
        font-size: 0.28rem;
      }
    }
  }
}

@media (max-width:1536px) {
  .swiper {

    .item {
      .val {
        font-size: 0.24rem;
      }
    }
  }
}

@media (max-width:1440px) {
  .defi-total {
    .box-top {
      .right {
        display: flex;
      }

    }
  }
}

@media (max-width:749px) {
  .defi-total {
    margin-top: 0.2rem;

    .box-top {
      .left {
        .title {
          font-size: 0.16rem;
        }

        p {
          font-size: 0.12rem;
        }
      }

      .right {
        .prev-next {
          margin-right: 0.08rem;

          .btn {
            width: 0.24rem;
            height: 0.24rem;
            border-radius: 0.06rem;

            &:first-child {
              margin-right: 0.04rem;
            }
          }
        }
      }
    }

  }

  .swiper {

    .item {
      padding: 0.2rem 0.16rem;
      border-radius: 0.12rem;


      .val {
        font-size: 0.28rem;
        line-height: 0.39rem;
      }
    }
  }
}
</style>
