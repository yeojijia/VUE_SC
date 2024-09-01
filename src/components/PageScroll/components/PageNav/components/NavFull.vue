<template>
  <div class="nav-con" :class="{unfold:navUnfold}">
    <div class="logo-cross com-container">
      <img class="logo" :src="logoImg"
        @click="router.push('/home')" />
      <div class="cross">
        <van-icon name="cross" @click.stop="store.commit('SET_NAV_UNFOLD')" />
      </div>
    </div>
    <div class="nav-head">
      <div class="nav-btn-con">
        <nav-btn />
      </div>
      <div class="logo-con" @click="router.push('/home')">
        <img class="logo" :src="logoImg" />
      </div>
    </div>
    <div class="nav-scroll">
      <div class="nav-content">
        <div class="roulette-btn" @click="handleRoulette" v-if="isRoulette">
          <img src="../../../../../assets/images/common/icon_roulette.svg" />
          <div class="name">{{ $t('nav.desc20') }}</div>
        </div>
        <div class="winnings-btn" @click="handleWinning">
          <img src="../../../../../assets/images/common/icon_winnings.svg" />
          <div class="name">{{ $t('my.desc109') }}</div>
        </div>
        <div class="nav-con-top">
          <div class="nav">
            <div class="item" :class="{on:itemHasOn(item),isChild:item.childShow}" v-for="item of navTops" :key="item.id"
              @click.stop="handlePath(item)">
              <!-- <img :src="item.src" /> -->
              <div class="name">
                <div class="val">{{item.title}}</div>
                <van-icon name="arrow" v-if="item.childs&&item.childs.length>0" />
              </div>
              <div class="child-list" v-if="item.childs&&item.childs.length>0">
                <div class="child" :class="{on:curNav===child.path}" v-for="child of item.childs" :key="child.id"
                  @click.stop="handleChildPath(child)">
                  <img :src="child.src" />
                  <span>{{child.title}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="nav-con-bot">
          <div class="lang-theme">
            <div class="lang-con">
              <div class="title">{{ $t('common.desc2') }}</div>
              <van-popover v-model:show="langShow" placement="top">
                <template #reference>
                  <div class="lang">
                    <div class="name">
                      <div class="val">{{langInfo?.name}}</div>
                      <van-icon name="arrow-down" />
                    </div>
                  </div>
                </template>
                <div class="options">
                  <div class="item" :class="{on:item.code === langId}" v-for="item of langList" :key="item.code"
                    @click="langId = item.code">
                    {{item.name}}
                  </div>
                </div>
              </van-popover>
              <!-- <div class="lang" @click="langShow = !langShow">
                <div class="name">
                  <div class="val">{{langInfo?.name}}</div>
                  <van-icon name="arrow-down" />
                </div>

                <div class="options" v-if="langShow">
                  <div class="item" :class="{on:item.code === langId}" v-for="item of langList" :key="item.code"
                    @click="langId = item.code">
                    {{item.name}}
                  </div>
                </div>
              </div> -->
            </div>
            <div class="theme-con">
              <div class="switch">
                <div class="btn night" :class="{on:theme==='night'}" @click="handleThemeTab('night')">
                  <img :src="require(`../../../../../assets/images/common/${theme}/icon_night.svg`)" />
                  <!-- <span>{{$t('common.desc119')}}</span> -->
                </div>
                <div class="btn daytime" :class="{on:theme==='daytime'}" @click="handleThemeTab('daytime')">
                  <img :src="require(`../../../../../assets/images/common/${theme}/icon_daytime.svg`)" />
                  <!-- <span>{{$t('common.desc120')}}</span> -->
                </div>
              </div>
              <div class="expain">
                <div class="val">
                  <template v-if="theme==='night'">
                    {{$t('common.desc119') }}
                  </template>
                  <template v-else>
                    {{ $t('common.desc120') }}
                  </template>
                </div>
                <div class="name">{{ $t('common.desc150') }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import NavBtn from '../../NavBtn';
import { ref, computed, inject, getCurrentInstance, watch, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router';
const store = useStore()
const { proxy } = getCurrentInstance()
const router = useRouter()
const reload = inject('reload')
const isMobile = computed(() => store.state.global.isMobile)
const navUnfold = computed(() => store.state.global.navUnfold)
const isLogin = computed(() => store.getters.isLogin)
const isRoulette = computed(() => store.getters.isRoulette)
let theme = computed({
  get() {
    return store.state.global.theme
  },
  set(e) {
    store.commit('SET_THEME', e)
  }
})
const logoInfo = computed(() => {
  return store.state.global.logoInfo
})
const logoImg = computed(() => {
  return theme.value == 'night' ? logoInfo.value.logo_image_night : logoInfo.value.logo_image_day
})
let curNav = ref('/home')


function handleRoulette() {
  if (!isLogin.value) {
    store.commit('SET_LOGIN_POPUP_SHOW', true)
    return
  }
  store.commit('SET_AWARD_SHOW', true)
}

function handleWinning() {
  if (!isLogin.value) {
    store.commit('SET_LOGIN_POPUP_SHOW', true)
    return
  }
  store.commit('SET_WINNINGS_EXCHANGE_SHOW', true)
}

function handlePath(item) {
  if (item.childs && item.childs.length > 0) {
    item.childShow = !item.childShow
    return
  }
  if (isMobile.value) {
    store.commit('SET_NAV_UNFOLD')
  }
  if (item.id == 99) {
    window.open(store.state.global.serviceUrl)
  } else if (item.path) {
    router.push(item.path)
  }
}
function handleChildPath(child) {
  if (isMobile.value) {
    store.commit('SET_NAV_UNFOLD')
  }

  if (child.path) {
    router.push(child.path)
  }
}

let langList = computed(() => {
  return store.state.global.langList
})
let langId = computed({
  get() {
    return store.getters.lang
  },
  set(lang) {
    store.commit('SET_LANG', { lang, $i18n: proxy.$i18n })
    reload()
  }
})
const langInfo = computed(() => {
  return langList.value.find(item => item.code === langId.value)
})
const langShow = ref(false)
let navTops = ref([
    {
      id: 1,
      title: proxy.$t('nav.desc1'),
      path: '/home',
    },
    {
      id: 2,
      title: proxy.$t('nav.desc2'),
      path: '/defi',
    },
    {
      id: 3,
      title: proxy.$t('nav.desc21'),
      childShow: true,
      childs: [
        {
          id: 1,
          src: require('../../../../../assets/images/nav/icon_game_qipai_on.svg'),
          title: proxy.$t('nav.desc14'),
          path: '/games/1',

        },

        {
          id: 2,
          src: require('../../../../../assets/images/nav/icon_game_shixun_on.svg'),
          title: proxy.$t('nav.desc15'),
          path: '/games/2',
        },
        {
          id: 3,
          src: require('../../../../../assets/images/nav/icon_game_dianzi_on.svg'),
          title: proxy.$t('nav.desc16'),
          path: '/games/3',
        },
        {
          id: 4,
          src: require('../../../../../assets/images/nav/icon_game_buyu_on.svg'),
          title: proxy.$t('nav.desc17'),
          path: '/games/4',
        },
        {
          id: 5,
          src: require('../../../../../assets/images/nav/icon_game_dianjing_on.svg'),
          title: proxy.$t('nav.desc18'),
          path: '/games/5',
        },
      ]
    },
    {
      id: 9,
      title: proxy.$t('nav.desc3'),
      childs: [
        {
          src: require('../../../../../assets/images/nav/icon_game_tiyu_on.svg'),
          title: proxy.$t('nav.desc3'),
          path: '/sports/1',
        }
      ]
    },
    {
      id: 8,
      title: proxy.$t('nav.desc19'),
      childs: [
        {
          id: 1,
          src: require('../../../../../assets/images/nav/icon_lottery_myself_on.svg'),
          title: proxy.$t('nav.desc22',{n1:logoInfo.value.site_name}),
          path: '/lottery',
        },
        {
          id: 2,
          src: require('../../../../../assets/images/nav/icon_lottery_on.svg'),
          title: proxy.$t('nav.desc23'),
          path: '/lotterys/1',
        },
      ]
    },
    {
      id: 11,
      title: proxy.$t('nav.desc5'),
      path: '/activity',
    },
    {
      id: 12,
      title: proxy.$t('nav.desc6'),
      path: '/help',
    },
    {
      id: 99,
      title: proxy.$t('nav.desc24'),
      path: '',
    },
  ])


watch(() => {
  return {
    path: router.currentRoute.value.fullPath,
  }
}, ({ path }) => {

  curNav.value = path
},
  { immediate: true }
)
watch(() => {
  return {
    logoInfo: store.state.global.logoInfo,
  }
}, ({ logoInfo }) => {
  navTops.value[4].childs[0].title = proxy.$t('nav.desc22',{n1:logoInfo.site_name})
},
  { immediate: true }
)


function handleThemeTab(val) {
  theme.value = val
}

function itemHasOn(item) {
  if (item.childs) {
    return item.childs.some(item => item.path === curNav.value)
  }
  return item.path === curNav.value
}
onMounted(() => {
  if (localStorage.theme) {
    theme.value = localStorage.theme
  }
})
</script>


<style lang='scss' scoped>
.nav-con {
  width: 2.6rem;
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  z-index: 2;
  transition: all 0.2s linear;
  display: flex;
  flex-direction: column;
  transform: none;
  background: var(--gg-card-bg);

  // opacity: 0;
  &.unfold {
    transform: translateX(-100%);
  }

  .logo-cross {
    display: none;
  }

  .nav-scroll {
    flex: 1;
    overflow-y: auto;

  }

  .nav-content {
    width: 100%; //2.6rem;
    padding: 0.32rem 0.2rem 0;
    box-sizing: border-box;
    position: relative;

  }

  .nav-head {
    width: 100%;
    height: 0.64rem;
    display: flex;
    align-items: center;
    overflow: hidden;

    .nav-btn-con {
      flex: 0 0 auto;
      padding: 0 0.16rem;
      display: flex;
      align-items: center;
      justify-content: center;
      // display: none;
    }

    .logo {
      height: 0.28rem;
      cursor: pointer;
    }
  }

  .lang-theme {
    padding-bottom: 0.4rem;
  }

  .lang-con {
    margin-top: 0.24rem;

    .title {
      margin-bottom: 0.12rem;
      font-family: 'Venryn Sans';
      font-weight: 900;
      font-size: 0.16rem;
      line-height: 1.4em;
      text-transform: uppercase;
      color: var(--gg-text);
    }

    :deep {
      .van-popover__wrapper {
        width: 100%;
      }
    }

    // display: none;
    .lang {
      transition: all 0.3s linear;


      position: relative;


      .name {
        padding: 0.12rem 0.16rem;
        color: var(--gg-text);
        background: var(--gg-inp-bg);
        box-shadow: var(--gg-inp-shadow);
        border-radius: 0.08rem;
        box-sizing: border-box;
        width: 100%;

        display: flex;
        align-items: center;
        justify-content: space-between;
        cursor: pointer;

        .val {
          width: 0;
          flex: 1;
          font-family: 'PingFang SC';
          font-weight: 600;
          font-style: normal;
          font-size: 0.14rem;
          line-height: 1.5em;
        }

        .van-icon {
          flex: 0 0 auto;
          font-weight: 600;
          font-size: 0.16rem;
          display: flex;
          align-items: center;

        }
      }




    }
  }

  .theme-con {
    margin-top: 0.24rem;
    width: 100%;
    display: flex;
    align-items: center;
    border-radius: 0.04rem;
    overflow: hidden;

    .switch {
      width: 0.88rem;
      height: 0.42rem;
      background: var(--gg-inp-bg);
      box-shadow: var(--gg-inp-shadow);
      border-radius: 0.1rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .btn {
      cursor: pointer;
      flex: 1;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid transparent;
      border-radius: 0.1rem;

      &.on {
        background: var(--gg-btn-bg);
        border-color: var(--gg-btn-border);
        // color: var(--nav-btn-text-active);
      }

      img {
        width: 0.24rem;
        height: 0.24rem;
        object-fit: contain;
      }
    }

    .expain {
      margin-left: 0.16rem;
      display: flex;
      flex-direction: column;

      .val {
        font-size: 0.16rem;
        line-height: 1.5em;
        color: var(--gg-text);
      }

      .name {
        font-size: 0.14rem;
        line-height: 1.5em;
        color: var(--gg-subtitle);
      }
    }
  }

  .nav {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding-bottom: 0.1rem;
    border-bottom: 1px solid var(--gg-line);



    .item {
      padding: 0.1rem 0;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      cursor: pointer;
      transition: all 0.3s linear;



      &:last-child {
        margin-bottom: 0;
      }

      &:hover,
      &.on {
        .name {
          color: var(--theme);

          .van-icon {
            color: var(--gg-nav-color-active);
          }
        }




      }

      &.isChild {
        .name {
          color: var(--gg-nav-color-active);
          font-weight: 500;

          .van-icon {
            color: var(--gg-nav-color-active);
            transform: rotate(-90deg);
          }
        }

        .child-list {
          padding-top: 0.12rem;
          height: auto;
        }
      }

      .name {
        width: 100%;
        display: flex;
        justify-content: space-between;
        color: var(--gg-text);

        .val {
          font-family: 'Venryn Sans';
          font-weight: 900;
          font-size: 0.16rem;
          line-height: 1.4em;
          text-transform: uppercase;
        }

        .van-icon {
          margin-right: 0.16rem;
          font-size: 0.16rem;
          color: var(--gg-nav-color);
        }
      }

      .child-list {
        width: 100%;
        display: flex;
        flex-direction: column;
        height: 0;
        overflow: hidden;
        box-sizing: border-box;

        .child {
          height: 0.44rem;
          padding: 0 0.12rem;
          display: flex;
          align-items: center;
          border-radius: 0.08rem;
          color: var(--gg-subtitle);
          border: 1px solid transparent;

          &:hover,
          &.on {
            background: var(--gg-nav-bg-active);
            border-color: var(--gg-nav-border-active);
            color: var(--gg-nav-color-active);
          }

          span {
            font-size: 0.15rem;
            line-height: 1.4em;
          }

          img {
            margin-right: 0.08rem;
            width: 0.2rem;
            height: 0.2rem;
            object-fit: contain;
          }
        }
      }
    }
  }

  .roulette-btn {
    margin-bottom: 0.12rem;
    width: 100%;
    height: 0.44rem;
    display: flex;
    align-items: center;
    padding: 0 0.2rem;
    background: var(--gg-btn-bg);
    border: 1px solid var(--gg-btn-border);
    border-radius: 0.1rem;
    cursor: pointer;

    img {
      margin-right: 0.12rem;
      flex: 0 0 auto;
      width: 0.2rem;
      height: 0.2rem;
      object-fit: contain;
    }

    .name {
      font-family: 'PingFang SC';
      font-style: normal;
      font-weight: 500;
      font-size: 0.15rem;
      line-height: 1.4em;
      color: var(--gg-btn-color);
    }
  }

  .winnings-btn {
    margin-bottom: 0.14rem;
    width: 100%;
    height: 0.44rem;
    display: flex;
    align-items: center;
    padding: 0 0.2rem;
    background: linear-gradient(180deg, #0BB4F8 0%, #098FF1 100%);
    border: 1px solid var(--gg-btn-border);
    border-radius: 0.1rem;
    cursor: pointer;

    img {
      margin-right: 0.12rem;
      flex: 0 0 auto;
      width: 0.2rem;
      height: 0.2rem;
      object-fit: contain;
    }

    .name {
      font-family: 'PingFang SC';
      font-style: normal;
      font-weight: 500;
      font-size: 0.15rem;
      line-height: 1.4em;
      color: var(--gg-btn-color);
    }

  }

}

.options {
  width: 2.2rem;
  padding: 0.1rem 0.11rem;
  box-sizing: border-box;
  border-radius: 0.1rem;
  z-index: 99;
  overflow: hidden;
  background: var(--gg-inp-bg);
  box-shadow: var(--gg-inp-shadow);

  .item {
    margin-bottom: 0.04rem;
    cursor: pointer;
    padding: 0.1rem;
    width: 100%;
    font-size: 0.14rem;
    font-weight: 400;
    text-align: left;
    color: var(--gg-text);
    line-height: 1.5em;
    box-sizing: border-box;
    border-radius: 0.05rem;
    white-space: normal;
    overflow: hidden;
    display: flex;
    align-items: center;

    &:hover {
      color: var(--theme);
    }
  }
}

@media (max-width: 749px) {
  .nav-con {
    height: 100%;
    transform: translateX(-100%);

    .nav-head {
      display: none;
    }


    .nav-btn-con {
      display: none;
    }





    &.unfold {
      transform: none;
    }

    .casino-sport {
      display: none;
    }

    .nav {
      .item {
        padding: 0.08rem 0;

      }
    }
  }
}
</style>