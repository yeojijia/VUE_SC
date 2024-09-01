<template>
  <div v-cloak class="banner">
    <img class="banner-bg" :src="require(`../../../assets/images/home/${theme}/bg.png`)" />
    <div class="com-container ">
      <home-activity-msg />
      <div class="banner-con">
        <div class="left">
          <p>
            <template v-if="isLogin">
              {{ $t('home.desc24') }} 200%
            </template>
            <template v-else>
              {{ $t('home.desc29') }}
            </template>

          </p>
          <h2 v-html="$t('home.desc25')"></h2>
          <div class="btn-con">
            <template v-if="isLogin">
              <div class="btn" @click="store.dispatch('setMoneyPopupShow',{show:true,type:'recharge'})">{{
                $t('home.desc26') }}</div>
              <div class="btn stake" @click="router.push('/defi')">{{ $t('home.desc27') }}</div>
            </template>
            <template v-else>
              <div class="btn" @click="handleToRegister">{{ $t('home.desc28') }}</div>
            </template>
          </div>
        </div>
        <div class="right">
          <img class="people img" src="../../../assets/images/home/people.png" />
        </div>
        <div class="min">
          <p class="hello" v-if="isLogin" v-html="$t('home.desc23',{n:`<span>${userInfo.nickName}</span>`},{n1:site_name}) ">
          </p>
          <p class="hello" v-else>
            {{ $t('home.desc22',{n1:site_name}) }}
          </p>

        </div>
      </div>
    </div>
  </div>
  <div class="com-container">
    <div class="home-card" ref="cardDom" v-if="casinoInfo?.description&&sportInfo?.description">
      <swiper class="swiper " :autoplay="autoplayOptions" :modules="modules" :breakpoints="breakpoints"
        :centeredSlides="false" :autoHeight="true" :centeredSlidesBounds="true" :pagination="{ clickable: true }"
        @swiper="handleSetControlledSwiper">
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
        <div class="swiper-pagination" />
      </swiper>
    </div>
  </div>
</template>
<script setup>
import HomeActivityMsg from "./HomeActivityMsg"
import { ref, onMounted, computed } from "vue";
import { Pagination, Autoplay } from "swiper";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { _ads } from '@/utils/api/common'
const store = useStore()
const router = useRouter();
let theme = computed(() => store.state.global.theme)
const isLogin = computed(() => store.getters.isLogin)
const userInfo = computed(() => {
  return store.state.user.userInfo
})
const logoInfo = computed(() => {
  return store.state.global.logoInfo
})
const site_name = computed(() => {
  return logoInfo.value.site_name
})

//跳转注册
function handleToRegister() {
  store.commit('SET_LOGIN_POPUP_SHOW', false)
  store.commit('SET_REGISTER_POPUP_SHOW', true)
}
const cardDom = ref(null)
let cardDomH = ref(0)
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
    slidesPerView: 1,
    spaceBetween: 0
  },
  750: {
    slidesPerView: 2,
    spaceBetween: 20
  },
});
let controlledSwiper = ref(null);
function handleSetControlledSwiper(swiper) {

  controlledSwiper.value = swiper;
}

const casinoInfo = ref({})
const sportInfo = ref({})
async function getInfo() {
  const Casino = await _ads({ positionKey: 'INDEX_Casino' })
  const Sport = await _ads({ positionKey: 'INDEX_Sport' })
  Promise.all([Casino, Sport]).then(res => {
    casinoInfo.value = res[0][0]
    sportInfo.value = res[1][0]
  })
}


onMounted(() => {
  getInfo()
})


</script>

<style lang="scss" scoped>
.banner {
  width: 100%;
  position: relative;
  padding-bottom: 1rem;

  .banner-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .min {
    display: none;
  }

  .banner-con {
    padding-top: 0.48rem;
    position: relative;
    display: flex;
    justify-content: space-between;

    .left {
      flex: 1;
      padding-right: 10%;
      // width: 70%;
      position: relative;
      z-index: 1;
      margin-bottom: 0.8rem;
      box-sizing: border-box;


      p {
        font-family: 'PingFang SC';
        font-style: normal;
        font-weight: 600;
        font-size: 0.28rem;
        line-height: 1.4em;
        color: var(--gg-text);
      }

      h2 {
        max-width: 7rem;
        margin-top: 0.11rem;
        font-family: 'Venryn Sans';
        font-weight: 900;
        font-size: 0.54rem;
        line-height: 1.26em;
        color: var(--gg-text);

        :deep span {
          font-family: 'Venryn Sans';
          font-weight: 900;
          color: var(--theme);
        }

      }

      .btn-con {
        margin-top: 0.22rem;
        display: flex;

      }

      .btn {
        min-width: 1.54rem;
        margin-right: 0.2rem;
        cursor: pointer;
        padding: 0 0.3rem;
        height: 0.48rem;
        background: var(--gg-btn-bg);
        border: 1px solid var(--gg-btn-border);
        border-radius: 0.1rem;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: 'PingFang SC';
        font-style: normal;
        font-weight: 600;
        font-size: 0.16rem;
        color: var(--gg-btn-color);
        white-space: nowrap;

        &:last-child {
          margin-right: 0;
        }

        &.stake {
          background: linear-gradient(180deg, #0BB4F8 0%, #098FF1 100%);
        }
      }
    }

    .right {
      flex: 0 0 auto;
      // flex: 1;
      // margin-right: 2%;
      width: 31.85%;
      min-width: 4.4rem;
      position: relative;

      .img {
        width: 100%;
        position: absolute;
        right: 0.4rem;
        bottom: -0.7rem;
        // bottom: -23%;
        z-index: 1;
      }

      .bg {
        position: absolute;
        bottom: 0;
        right: 50%;
        width: 75%;
        height: 100%;
        transform: translate(68%, 0);
      }

      .min {
        display: none;
      }
    }
  }


}


.home-card {
  margin-top: -1rem;
  position: relative;
  z-index: 2;
  // transform: translateY(50%);


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
      width: 60%; //50%;
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
        max-width: 100%;
        max-height: 110%;
        object-fit: contain;
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
      padding: 0.1rem 0.27rem;
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
    overflow: visible;

    .swiper-slide {
      min-height: 100%;
    }

    :deep {
      .swiper-pagination-bullet {
        background-color: #FFFFFF;
      }

      .swiper-pagination-bullet-active {
        background-color: #FFFFFF;
      }
    }

  }
}





@media (max-width: 1536px) {
  .banner {
    .banner-con {
      .left {
        p {
          font-size: 0.24rem;
        }

        h2 {
          font-size: 0.5rem;
        }

        h3 {
          font-size: 0.24rem;
        }
      }
    }
  }

  .home-card {
    .box {
      .left {
        padding: 0.24rem;
      }
    }
  }
}

@media (max-width: 1200px) {
  .banner {
    .banner-con {
      .left {
        padding-right: 0.5rem;

        h2 {
          font-size: 0.44rem;
        }

      }

      .right {
        min-width: 4rem;
      }
    }
  }

  .home-card {
    .box {
      .btn {
        margin-top: 0.3rem;
      }

      .left {
        width: 100%;
      }

      .right {
        position: absolute;
        right: 0;
        bottom: 0;
        width: 25%;
      }
    }
  }
}


@media (max-width: 992px) {
  .banner {
    .banner-con {

      .left {

        h2 {
          font-size: 0.32rem;
        }

        h3 {
          font-size: 0.2rem;
        }
      }

      .right {
        min-width: 3.5rem;
      }
    }
  }
}


@media (max-width: 749px) {
  .banner {
    background: none;
    padding-bottom: 0;
    margin-bottom: 0.35rem;


    .banner-con {
      padding: 0;
      padding-top: 0.2rem;


      .left {
        flex: 0 0 auto;
        max-width: 100%;
        width: 100%;
        padding-right: 0;
        margin-bottom: 0.05rem;


        p {
          font-size: 0.14rem;
        }

        h2 {
          margin-top: 0.08rem;
          width: 100%;
          font-size: 0.24rem;
          line-height: 1.58em;
        }

        .btn-con {
          width: 100%;
          margin-top: 0.1rem;
          margin-bottom: 0;
        }

        .btn {
          min-width: auto;
          margin-right: 0.1rem;
          height: 0.32rem;
          padding: 0 0.14rem;
          font-size: 0.14rem;
          border-radius: 0.08rem;
        }
      }

      .right {
        position: absolute;
        right: 0;
        bottom: -0.35rem;
        margin-right: 0;
        min-width: 1rem;
        display: flex;
        align-items: center;

        width: 1.56rem;

        .img {
          right: 0;
          bottom: -0.2rem;
        }

      }
    }
  }

  .home-card {
    margin-top: 0;
    width: 100%;
    border-radius: 0.12rem;
    overflow: hidden;

    .box {
      border-radius: 0;

      .text {
        .title {
          font-size: 0.16rem;
        }

        p {
          font-size: 0.13rem;
        }
      }

      .btn {
        margin-top: 0.1rem;
        font-weight: 900;
        font-size: 0.12rem;
        padding: 0 0.08rem;
        height: 0.28rem;
        border-radius: 0.06rem;
      }

      .left {
        padding: 0.16rem;
        width: 60%;
      }

      .right {
        margin-right: 0.1rem;
        flex: 1;
        width: 0;
        position: relative;
      }
    }

    .swiper {
      overflow: hidden;

    }
  }

  .swiper {
    width: 100%;

    .item {
      border-radius: 0.06rem;

      .text {
        padding: 0.1rem;

        .title {
          margin-bottom: 0.05rem;
          font-size: 0.16rem;
        }

        p {
          font-size: 0.12rem;
        }
      }
    }
  }
}
</style>
