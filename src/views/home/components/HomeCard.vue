<template>
  <div class="home-card" ref="cardDom" :style="{
                              'margin-bottom': -cardDom.clientHeight / 2 + 'px'
                            }">
    <swiper class="swiper swiper-no-swiping" :autoplay="autoplayOptions" :modules="modules" :breakpoints="breakpoints"
      :centeredSlides="false" :autoHeight="true" :centeredSlidesBounds="true" @swiper="handleSetControlledSwiper">
      <swiper-slide class="box">
        <div class="left">
          <div class="text">
            <div class="title">
              {{$t('nav.desc11')}}
            </div>
            <p v-html="casinoInfo.description" />
          </div>
          <div class="btn" @click="router.push('/games/0')">{{$t('home.desc4')}}</div>
        </div>
        <div class="right">
          <img src="../../../assets/images/home/casino.png" />
        </div>
      </swiper-slide>
      <swiper-slide class="box">
        <div class="left">
          <div class="text">
            <div class="title">
              {{$t('nav.desc12')}}
            </div>
            <p v-html="sportInfo.description" />
          </div>
          <div class="btn" @click="router.push('/games/7')">{{$t('home.desc5')}}</div>
        </div>
        <div class="right">
          <img src="../../../assets/images/home/sport.png" />
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>
<script setup>
import { ref, onMounted, getCurrentInstance } from "vue";
import { Autoplay } from "swiper";
import { useRouter } from "vue-router";
import { _ads } from '@/utils/api/common'
const router = useRouter();
const { proxy } = getCurrentInstance()
const cardDom = ref(null)

let modules = [Autoplay];
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
  993: {
    slidesPerView: 2,
    spaceBetween: 16

  },
});
let controlledSwiper = ref(null);
function handleSetControlledSwiper(swiper) {
  controlledSwiper.value = swiper;
}

const tabActive = ref('casino') //sport

function handlePrev() {
  controlledSwiper.value.slidePrev()
  tabActive.value = 'casino'
}

function handleNext() {
  controlledSwiper.value.slideNext()
  tabActive.value = 'sport'
}

const casinoInfo = ref({})
const sportInfo = ref({})
function getInfo() {
  _ads({ positionKey: 'INDEX_Casino' }).then(res => {
    casinoInfo.value = res[0]
  })
  _ads({ positionKey: 'INDEX_Sport' }).then(res => {
    sportInfo.value = res[0]
  })
}
onMounted(() => {
  getInfo()
})

</script>



<style lang='scss' scoped>
.home-card {
  position: relative;
  z-index: 2;
  transform: translateY(-50%);


  .box {
    display: flex;
    justify-content: space-between;
    border-radius: 0.24rem;
    box-shadow: inset 0 -0.02rem 0 rgba(255, 255, 255, 0.2);
    // overflow: hidden;

    &:first-child {
      background: linear-gradient(270deg, #1356CC 0%, #00AFFF 100%);
    }

    &:nth-child(2) {
      background: linear-gradient(270deg, #0D7525 0%, #28D653 100%);
    }


    .text {
      width: 100%;
      position: relative;
      z-index: 1;

      .title {
        font-family: 'Venryn Sans';
        font-weight: 900;
        font-size: 0.2rem;
        line-height: 1.4em;
        text-transform: uppercase;
        color: #FFFFFF;

      }

      p {
        margin-top: 0.5em;
        font-family: 'PingFang SC';
        font-style: normal;
        font-weight: 400;
        font-size: 0.16rem;
        line-height: 1.4em;
        color: rgba(255, 255, 255, 0.8);
      }


    }

    .left {
      flex: 0 0 auto;
      width: 55%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 0.32rem;
      box-sizing: border-box;
      position: relative;
      z-index: 2;
    }

    .right {
      margin-right: 0.2rem;
      width: 0;
      flex: 1;
      min-height: 100%;
      // align-self: flex-end;
      position: relative;

      img {
        height: 110%;
        position: absolute;
        bottom: 0;
        right: 0;
      }
    }

    .btn {
      margin-top: 0.12rem;
      align-self: start;
      font-family: 'PingFang SC';
      font-style: normal;
      font-weight: 300;
      font-size: 0.2rem;
      line-height: 1.4em;
      padding: 0.13rem 0.3rem;
      color: #FFFFFF;
      background: rgba(255, 255, 255, 0.4);
      box-shadow: 0 0.04rem 0.08rem rgba(0, 0, 0, 0.1);
      border-radius: 0.12rem;
      cursor: pointer;
      white-space: nowrap;
      display: flex;
      align-items: center;
      justify-content: center;
    }



  }

  .swiper {
    // display: none;
    overflow: visible;

    .swiper-wrapper {
      // height: auto !important;
    }

    .swiper-slide {
      // overflow: hidden;
      min-height: 100%;
    }


  }
}

@media (max-width: 1100px) {
  .home-card {
    margin-bottom: -14%;


  }
}

@media (max-width: 992px) {
  .home-card {
    margin-bottom: -16%;

    .box {
      .left {
        padding: 0.2rem;
      }
    }
  }
}

@media (max-width: 749px) {
  .home-card {
    margin-top: 0.3rem;

    .tabs {
      margin-bottom: 0.1rem;
      display: inline-flex;
      background: var(--card-bg-3);
      border-radius: 0.04rem;
      overflow: hidden;


      .tab {
        height: 0.3rem;
        padding: 0 0.1rem;
        font-family: 'PingFang SC';
        font-style: normal;
        font-weight: 400;
        font-size: 0.14rem;
        line-height: 1.4em;
        display: flex;
        align-items: center;
        border-radius: 0.04rem;
        transition: all 0.3s linear;
        color: var(--gg-text);

        img {
          width: 0.13rem;
          height: 0.13rem;
          object-fit: cover;
          margin-right: 0.03rem;
        }

        &.on {
          background: var(--btn-bg-active-2);
          // color: var(--nav-btn-text-active);
        }
      }

    }

    .list {
      display: none;
    }

    .swiper {
      display: block;

      .box .text {
        .title {
          display: none;
        }

        p {
          font-size: 0.14rem;
        }
      }
    }
  }
}
</style>