<template>
  <div class="page-footer">
    <div class="com-container">
      <div class="foot-top">
        <div class="top-left">
          <div class="logo-desc">
            <img class="logo" :src="logoImg"
              @click="router.push('/home')" />
            <div class="desc" v-html="introInfo.description" />
          </div>
        </div>
        <div class="box nav" v-show="menus1">
          <div class="title">{{menus1?.title}}</div>
          <div class="box-list">
            <a class="item" v-for="item of menus1?.nodeList" :key="item.id"
              @click="handlePathClick(item)"><span>{{item.title}}</span></a>
          </div>
        </div>
        <div class="box coin" v-show="menus2">
          <div class="title">{{menus2?.title}}</div>
          <div class="box-list">
            <div class="item" v-for="item of menus2?.nodeList" :key="item.id" @click="handlePathClick(item)">

              <com-image class="img" :src="item.imgUrl" v-if="item.imgUrl" />
              <!-- <span>{{item.title}}</span> -->
            </div>

          </div>
        </div>
        <div class="box contact" v-show="menus3">
          <div class="title">{{menus3?.title}}</div>
          <div class="box-list">
            <a class="item" v-for="item of menus3?.nodeList" :key="item.id" @click="handlePathClick(item)">
              <com-image class="img" :src="item.imgUrl" />
              <!-- <span>{{item.title}}</span> -->
            </a>
          </div>
        </div>
        <div class="box follow" v-show="menus4">
          <div class="title">{{menus4?.title}}</div>
          <div class="box-list">
            <a class="item" v-for="item of menus4?.nodeList" :key="item.id" @click="handlePathClick(item)">
              <com-image class="img" :src="item.imgUrl" v-if="item.imgUrl" />
              <span>{{item.title}}</span>
            </a>
          </div>
        </div>
      </div>
      <div class="foot-bot">
        <div class="bot-info">
          <div class="info-top">
            <img :src="logoInfo.licence_img" />
            <p>{{ logoInfo.licence_description }}</p>
          </div>
          <div class="info-bot">
            <div class="bot-left">
              <p>{{ logoInfo.version_info }}</p>
            </div>
            <div class="bot-right">
              <img :src="logoInfo.minor_mark" />
            </div>
          </div>
        </div>
        <div class="dowmload">
          <div class="title">{{$t('home.desc21')}}</div>
          <div class="img">
            <img src="../../../assets/images/footer/code.png" />
          </div>
        </div>
        <div class="bot-provider">
          <div class="title">{{$t('home.desc19')}}</div>
          <div class="list">
            <swiper class="swiper" :modules="modules" :autoplay="autoplayOptions" :breakpoints="breakpoints"
              @swiper="handleSetControlledSwiper">
              <swiper-slide v-for="item of providerList" :key="item.id" @click="handleItemClick(item)">
                <div class="item-con">
                  <div class="item">
                    <div class="img-con">
                      <com-image class="img" :src="item.imgUrl" />
                    </div>
                  </div>
                </div>
              </swiper-slide>
            </swiper>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, getCurrentInstance, computed, onBeforeMount, inject } from "vue";
import { _ads, _articlesIndex, _leaveMessage, _langList } from '@/utils/api/common'
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { Autoplay } from "swiper";
const { proxy } = getCurrentInstance()
const openUrl = proxy.$common.openUrl
const router = useRouter()
const store = useStore();
const isLogin = computed(() => store.getters.isLogin)
const reload = inject('reload')
let theme = computed(() => store.state.global.theme)
const logoInfo = computed(() => {
  return store.state.global.logoInfo
})
const logoImg = computed(() => {
  return theme.value == 'night' ? logoInfo.value.logo_image_night : logoInfo.value.logo_image_day
})
const site_name = computed(() => {
  return logoInfo.value.site_name
})


//简介
let introInfo = ref({})

function getIntro() {
  _ads({ positionKey: 'BOTTOM_BGM_JIANJIE' }).then(res => {
    introInfo.value = res[0]
  })
}

let menus1 = ref([])
let menus2 = ref([])
let menus3 = ref([])
let menus4 = ref([])
async function getMenus() {
  const menu1 = _ads({ positionKey: 'BOTTOM_MENU_1' })
  const menu2 = _ads({ positionKey: 'BOTTOM_MENU_2' })
  const menu3 = _ads({ positionKey: 'BOTTOM_MENU_3' })
  const menu4 = _ads({ positionKey: 'BOTTOM_MENU_4' })
  Promise.all([menu1, menu2, menu3, menu4]).then((res) => {
    menus1.value = res[0][0]
    menus2.value = res[1][0]
    menus3.value = res[2][0]
    menus4.value = res[3][0]
  })
}

//swiper
let modules = [Autoplay];
let autoplayOptions = ref({
  delay: 3000,
  disableOnInteraction: false,
  pauseOnMouseEnter: true,
  reverseDirection: false,
});
let breakpoints = ref({
  320: {
    slidesPerView: 4,
    spaceBetween: 6,
  },
  750: {
    slidesPerView: 3,
    spaceBetween: 9,
  },
  1200: {
    slidesPerView: 3,
    spaceBetween: 9,
  },
  1500: {
    slidesPerView: 4,
    spaceBetween: 12,
  },
});
let controlledSwiper = ref(null);
function handleSetControlledSwiper(swiper) {
  controlledSwiper.value = swiper;
}

function handleItemClick(item) {
  let url = item.forwardPath
  if (url.replace(/\s+/g, '')) window.open(url.replace(/\s+/g, ''), '_blank')
}
const providerList = ref([])
function getProvider() {
  _ads({ positionKey: 'INDEX_PROVIDE_BUSINESS' }).then(res => {

    providerList.value = res
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
onBeforeMount(async () => {
  getIntro()
  getMenus()
  getProvider()


})
</script>


<style lang='scss' scoped>
.page-footer {
  background: var(--gg-foot-msg-bg);
  box-shadow: var(--gg-foot-msg-shadow);
  border-radius: 0.4rem 0.4rem 0 0;
  color: var(--gg-text);

  .foot-top {
    padding: 0.4rem 0;
    display: flex;
    justify-content: space-between;

    .top-left {
      flex: 0 0 auto;
      width: 30%;
      max-width: 4.2rem;

      .logo-desc {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
      }

      .logo {

        height: 0.32rem;
      }

      .desc {
        margin-top: 0.18rem;
        font-family: 'PingFang SC';
        font-style: normal;
        font-weight: 400;
        font-size: 0.14rem;
        line-height: 1.5em;
        color: var(--gg-subtitle);
      }

      .nav-list {
        display: none;
      }
    }

    .box {
      display: flex;
      flex-direction: column;

      &.nav {
        flex: 0 0 auto;

        .box-list {
          flex-direction: column;
        }

        .item {
          margin-bottom: 0.08rem;
        }
      }

      &.coin {
        .box-list {
          width: 1.52rem;
          // justify-content: space-between;
        }

        .item {
          margin-right: 0.16rem;
          margin-bottom: 0.16rem;
          display: flex;
          align-items: center;
          width: 0.4rem;
          height: 0.4rem;

          &:nth-child(3n) {
            margin-right: 0;
          }

          .img {
            flex: 0 0 auto;
            width: 0.4rem;
            height: 0.4rem;
          }
        }
      }

      &.contact {
        flex: 0 0 auto;

        .box-list {
          width: 1.52rem;
          // flex-direction: column;
        }

        .item {
          margin-right: 0.16rem;
          margin-bottom: 0.16rem;
          width: 0.4rem;
          height: 0.4rem;
          display: flex;
          align-items: center;

          &:nth-child(3n) {
            margin-right: 0;
          }

          .img {
            flex: 0 0 auto;
            width: 0.4rem;
            height: 0.4rem;
          }
        }
      }

      &.follow {

        .box-list {
          width: 1.45rem;
          margin-right: -0.12rem;

        }

        .item {
          padding-right: 0.2rem;
          margin-bottom: 0.15rem;

          .img {
            margin-right: 0.12rem;
            margin-bottom: 0.12rem;
            width: 0.24rem;
            height: 0.24rem;
            object-fit: cover;
          }
        }
      }

      .title {
        margin-bottom: 0.14rem;
        font-family: 'Venryn Sans';
        font-weight: 900;
        font-size: 0.16rem;
        line-height: 1.4em;
        color: var(--gg-text);
        text-transform: uppercase;

      }

      .box-list {
        // max-width: 1.5rem;
        display: flex;
        flex-wrap: wrap;
      }

      .item {
        font-family: 'PingFang SC';
        font-style: normal;
        font-weight: 400;
        font-size: 0.14rem;
        line-height: 1.4em;
        color: var(--gg-subtitle);

        span {
          transition: all 0.3s linear;
        }
      }

      a {
        cursor: pointer;

        span {

          border-bottom: 1px solid transparent;
        }

        &:hover {
          color: var(--system-2);

          span {

            border-color: var(--system-2);
          }
        }
      }
    }
  }

  .foot-bot {
    padding: 0.3rem 0;
    display: flex;
    justify-content: space-between;

    .bot-info {
      flex: 0 0 auto;
      display: flex;
      flex-direction: column;
      width: 40%;

      .info-top {
        width: 100%;
        display: flex;


        img {
          flex: 0 0 auto;
          width: 0.6rem;
          height: 0.6rem;
          object-fit: contain;
        }

        p {
          flex: 1 1 auto;
          margin-left: 0.2rem;
          font-family: 'PingFang SC';
          font-style: normal;
          font-weight: 400;
          font-size: 0.12rem;
          line-height: 0.17rem;
          color: var(--gg-subtitle);
        }
      }

      .info-bot {
        padding: 0.05rem 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-family: 'PingFang SC';
        font-style: normal;
        font-weight: 400;
        font-size: 0.12rem;
        line-height: 0.17rem;
        color: var(--gg-subtitle);

        p {
          margin-bottom: 0.04rem;

          &:last-child {
            margin-bottom: 0;
          }
        }

        .bot-right {
          padding-left: 0.2rem;

          img {
            width: 0.32rem;
          }
        }
      }
    }

    .title {
      margin-bottom: 0.12rem;
      font-family: 'Venryn Sans';
      font-style: normal;
      font-weight: 900;
      font-size: 0.14rem;
      line-height: 1.4em;
      text-transform: uppercase;
      color: var(--gg-text);
    }

    .dowmload {
      .img {
        width: 0.8rem;
        height: 0.8rem;
        padding: 0.06rem;
        background: var(--gg-bot-card-bg);
        border: 1px solid var(--gg-bot-card-border);
        border-radius: 0.12rem;

        img {
          width: 100%;
        }

      }
    }

    .bot-provider {
      // flex: 1;
      width: 40%;

      .list {
        width: 100%;
        height: 80px;
        display: flex;
        align-items: center;
      }

      .swiper {
        width: 100%;

        .item-con {
          width: 100%;
          box-sizing: border-box;
        }

        .item {
          width: 100%;
          cursor: pointer;
          border-radius: 0.12rem;
          overflow: hidden;

          background: var(--gg-bot-card-bg);
          border: 1px solid var(--gg-bot-card-border);

          &:hover {
            .img-con {
              .img {
                transform: scale(1.05);
              }
            }
          }

          .img-con {
            width: 100%;
            height: 0;
            padding-bottom: 53.91%;
            overflow: hidden;
            position: relative;

            .img {
              position: absolute;
              width: 100%;
              height: 100%;
              transition: all 0.3s linear;
            }
          }
        }
      }
    }


  }




}



@media (max-width:1500px) {
  .page-footer .foot-top {
    .top-left {
      width: 25%;
    }


  }
}

@media (max-width:992px) {
  .page-footer {
    .foot-top {
      flex-wrap: wrap;

      .top-left {
        margin-bottom: 0.3rem;
        max-width: 100%;
        width: 100%;
      }
    }

    .foot-bot {
      flex-wrap: wrap;

      .bot-info {
        width: 100%;
      }

      .bot-provider {
        width: 60%;
      }
    }
  }
}

@media (max-width:749px) {
  .page-footer {
    border-radius: 0.24rem 0.24rem 0 0;

    .foot-top {
      padding: 0;

      .top-left {
        margin-bottom: 0;
        padding: 0.2rem 0;
        display: flex;
        justify-content: space-between;

        .logo-desc {
          flex: 1;
          align-items: center;
        }

        .logo {
          height: 0.24rem;
        }

        .desc {
          margin-top: 0.08rem;
          font-size: 0.12rem;
          line-height: 0.16rem;
        }


      }

      .box {
        margin-left: 0;
        width: 100%;
        border-top: 1px solid;
        border-color: var(--gg-line);
        padding: 0.2rem 0;


        .title {
          width: 100%;
          text-align: center;
          margin-bottom: 0.1rem;
        }

        &.nav {

          .box-list {
            flex-direction: row;
            justify-content: center;
            flex-wrap: wrap;

            .item {
              margin-bottom: 0;
              padding: 0.02rem 0.06rem;
            }
          }
        }

        &.coin {
          .box-list {
            width: 100%;
            justify-content: center;

            .item {
              margin-right: 0;
              margin-bottom: 0;
              padding: 0.02rem 0.06rem;
              width: auto;
              display: flex;
              flex-direction: column;
              align-items: center;
              font-size: 0.12rem;

              .img {
                width: 0.36rem;
                height: 0.36rem;
              }
            }
          }
        }

        &.contact {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;

          .box-list {
            width: 100%;
            flex-direction: row;
            justify-content: center;

            .item {
              margin-right: 0;
              margin-bottom: 0;
              padding: 0.02rem 0.06rem;
              width: auto;
              display: flex;
              flex-direction: column;
              align-items: center;
              font-size: 0.12rem;

              .img {
                width: 0.36rem;
                height: 0.36rem;
              }
            }
          }
        }

        &.follow {
          .box-list {
            width: 100%;
            justify-content: center;

            .item {
              margin: 0 0.15rem 0.1rem;

              img {
                margin-right: 0;
              }
            }
          }
        }
      }
    }

    .foot-bot {
      padding: 0.2rem 0 0.4rem;
      border-top: 1px solid;
      border-color: var(--gg-line);

      .title {
        text-align: center;
        font-size: 0.16rem;
        line-height: 0.23rem;
      }

      .bot-info {
        .info-top {
          flex-direction: column;
          align-items: center;

          img {
            width: 0.52rem;
            height: 0.52rem;
          }

          p {
            margin-left: 0;
            margin-top: 0.12rem;
          }
        }

        .info-bot {
          .bot-right img {
            width: 0.24rem;
          }
        }
      }

      .dowmload {
        display: none;
      }

      .bot-provider {
        margin-top: 0.2rem;
        width: 100%;

        .list {
          height: auto;
        }

        .swiper .item {
          border-radius: 0.08rem;
        }
      }
    }
  }
}
</style>