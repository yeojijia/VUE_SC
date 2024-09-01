<template>
  <div class="nav-con" :class="{unfold:navUnfold}">
    <div class="nav-head">
      <div class="nav-btn-con">
        <nav-btn />
      </div>
    </div>
    <div class="nav-scroll">
      <div class="nav-content">
        <div class="nav-con-top">
          <div class="roulette-btn" @click="handleRoulette" :title="$t('nav.desc20')" v-if="isRoulette">
            <img src="../../../../../assets/images/common/icon_roulette.svg" />
          </div>
          <div class="winnings-btn" @click="handleWinning" :title="$t('my.desc109')">
            <img src="../../../../../assets/images/common/icon_winnings.svg" />
          </div>
          <div class="nav">
            <div class="item" :class="{on:curNav===item.path,border:item.border}" v-for="item of navTops" :key="item.id"
              :title="item.title" @click.stop="handlePath(item)">
              <div class="val"><img :src="item.src" /></div>
            </div>
          </div>
        </div>
      </div>
      <div class="lang-theme">
        <div class="lang-con">
          <van-popover v-model:show="langShow" placement="right-end">
            <template #reference>
              <div class="lang">
                <img :src="require(`../../../../../assets/images/nav/icon_lang.svg`)" />
              </div>
            </template>
            <div class="options">
              <div class="item" :class="{on:item.code === langId}" v-for="item of langList" :key="item.code"
                @click="langId = item.code">
                {{item.name}}
              </div>
            </div>
          </van-popover>
        </div>
        <div class="theme-con">
          <van-popover v-model:show="themeShow" placement="right-end">
            <template #reference>
              <div class="btn night" v-if="theme==='night'">
                <img :src="require(`../../../../../assets/images/common/icon_night.svg`)" />
              </div>
              <div class="btn daytime" v-if="theme==='daytime'">
                <img :src="require(`../../../../../assets/images/common/icon_daytime.svg`)" />
              </div>
            </template>
            <div class="options">
              <div class="item" v-for="item of themeList" :key="item.id" @click="handleThemeTab(item.name)">
                {{item.title}}
              </div>
            </div>
          </van-popover>
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
const isLogin = computed(() => store.getters.isLogin)
const isMobile = computed(() => store.state.global.isMobile)
const navUnfold = computed(() => store.state.global.navUnfold)
const isRoulette = computed(() => store.getters.isRoulette)
let curNav = ref('/home')
const navTops = ref([
  {
    id: 1,
    src: require('../../../../../assets/images/nav/icon_home.svg'),
    title: proxy.$t('nav.desc1'),
    path: '/home',
  },
  {
    id: 2,
    src: require('../../../../../assets/images/nav/icon_defi.svg'),
    title: proxy.$t('nav.desc2'),
    path: '/defi',
    border: true,
  },
  {
    id: 3,
    src: require('../../../../../assets/images/nav/icon_game_qipai_on.svg'),
    title: proxy.$t('nav.desc14'),
    path: '/games/1',
  },
  {
    id: 4,
    src: require('../../../../../assets/images/nav/icon_game_shixun_on.svg'),
    title: proxy.$t('nav.desc15'),
    path: '/games/2',
  },
  {
    id: 5,
    src: require('../../../../../assets/images/nav/icon_game_dianzi_on.svg'),
    title: proxy.$t('nav.desc16'),
    path: '/games/3',
  },
  {
    id: 6,
    src: require('../../../../../assets/images/nav/icon_game_buyu_on.svg'),
    title: proxy.$t('nav.desc17'),
    path: '/games/4',
  },
  {
    id: 7,
    src: require('../../../../../assets/images/nav/icon_game_dianjing_on.svg'),
    title: proxy.$t('nav.desc18'),
    path: '/games/5',
    border: true,
  },
  {
    id: 9,
    src: require('../../../../../assets/images/nav/icon_game_tiyu_on.svg'),
    title: proxy.$t('nav.desc3'),
    path: '/sports/1',
    border: true,
  },
  {
    id: 10,
    src: require('../../../../../assets/images/nav/icon_lottery_myself_on.svg'),
    title: proxy.$t('nav.desc19'),
    path: '/lottery',
  },
  {
    id: 8,
    src: require('../../../../../assets/images/nav/icon_lottery_on.svg'),
    title: proxy.$t('nav.desc19'),
    path: '/lotterys/1',
    border: true,
  },
  {
    id: 11,
    src: require('../../../../../assets/images/nav/icon_discounts.svg'),
    title: proxy.$t('nav.desc5'),
    path: '/activity',
    name: '/activity'
  },
  {
    id: 12,
    src: require('../../../../../assets/images/nav/icon_help.svg'),
    title: proxy.$t('nav.desc6'),
    path: '/help',
  },
  {
    id: 99,
    src: require('../../../../../assets/images/nav/icon_services.svg'),
    title: proxy.$t('nav.desc24'),
    path: '',
  },

])
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
  if (isMobile.value) {
    store.commit('SET_NAV_UNFOLD')
  }
  if (item.id == 99) {
    window.open(store.state.global.serviceUrl)
  } else if (item.path) {
    router.push(item.path)
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

const langShow = ref(false)
const themeShow = ref(false)

let themeList = ref([
  {
    id: 1,
    name: 'night',
    src: require('../../../../../assets/images/common/icon_night.svg'),
    title: proxy.$t('common.desc119'),
  },
  {
    id: 2,
    name: 'daytime',
    src: require('../../../../../assets/images/common/icon_daytime.svg'),
    title: proxy.$t('common.desc120'),
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

let theme = computed({
  get() {
    return store.state.global.theme
  },
  set(e) {
    store.commit('SET_THEME', e)
  }
})

function handleThemeTab(val) {
  theme.value = val
}
onMounted(() => {
  if (localStorage.theme) {
    theme.value = localStorage.theme
  }
})
</script>


<style lang='scss' scoped>
.options {
  width: 1.2rem;
  right: 0;
  padding: 0.1rem 0.11rem;
  box-sizing: border-box;
  border-radius: 0.08rem;
  z-index: 99;
  overflow: hidden;
  background: var(--gg-card-bg);

  .item {
    margin-bottom: 0.04rem;
    cursor: pointer;
    padding: 0.1rem;
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
    white-space: nowrap;

    &:hover {
      color: var(--theme);
    }
  }
}

.nav-con {
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  z-index: 2;
  box-sizing: border-box;
  transition: all 0.2s linear;
  display: flex;
  flex-direction: column;
  transform: translateX(-100%);
  background: var(--gg-card-bg);
  width: 0.8rem;

  &.unfold {
    transform: none;
  }

  .nav-head {
    flex: 0 0 auto;
  }

  .nav-scroll {
    height: 0;
    width: 100%;
    flex: 1;
    overflow-y: auto;
    overflow-x: visible;

  }

  .nav-content {
    width: 0.8rem;
    box-sizing: border-box;
  }

  .nav-btn-con {
    width: 100%;
    height: 0.64rem;
    align-items: center;
    justify-content: center;
    display: flex;
  }

  .casino-sport {
    padding-right: 0.1rem;
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    cursor: pointer;


    .btn {
      width: 100%;
      margin-bottom: 0.08rem;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--gg-subtitle);
      background-color: transparent;
      padding: 0.08rem 0.1rem 0.08rem 0.15rem;
      border-top-right-radius: 0.2rem;
      border-bottom-right-radius: 0.2rem;
      box-sizing: border-box;
      transition: all 0.3s linear;

      &:first-child {
        margin-right: 0.15rem;
      }

      &.on,
      &:hover {
        background: var(--nav-btn-bg-active);
        color: var(--nav-btn-text-active);
      }

      .img {
        width: 0.28rem;
        height: 0.28rem;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      img {
        width: 0.16rem;
        height: 0.16rem;
        object-fit: cover;
        margin-right: 0.1rem;
      }

      span {
        white-space: nowrap;
      }
    }


    .btn {

      span {
        display: none;
      }

      img {
        margin-right: 0;
        width: 0.2rem;
        height: 0.2rem;
      }

      &:first-child {
        margin-right: 0;

      }
    }
  }





  .lang-theme {
    width: 100%;
    padding-bottom: 0.2rem;
  }

  .lang-con {
    position: relative;

    :deep {
      .van-popover__wrapper {
        width: 100%;
        height: 0.48rem;

      }
    }

    .lang {
      width: 100%;
      height: 0.48rem;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;



      img {
        width: 0.2rem;
        height: 0.2rem;
        object-fit: contain;
        overflow: hidden;
      }


    }


  }

  .theme-con {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-radius: 0.04rem;
    overflow: hidden;




    .btn {

      width: 100%;
      height: 0.48rem;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;

      img {
        width: 0.2rem;
        height: 0.2rem;
        object-fit: contain;
      }

    }
  }

  .nav {
    display: flex;
    flex-direction: column;
    width: 100%;



    .item {
      cursor: pointer;

      padding: 0 0.08rem;

      .val {
        width: 100%;
        height: 0.48rem;
        border: 1px solid transparent;
        box-sizing: border-box;
        border-radius: 0.08rem;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s linear;
      }

      &.on {
        .val {
          background: var(--gg-nav-bg-active);
          border-color: var(--gg-nav-border-active);
        }
      }

      &.border {
        border-bottom: 1px solid var(--gg-line);
        padding-bottom: 0.14rem;
        margin-bottom: 0.14rem;
      }

      &:last-child {
        margin-bottom: 0;
      }

      img {
        width: 0.2rem;
        height: 0.2rem;
        object-fit: contain;
      }

    }
  }

  .roulette-btn {
    width: 100%;
    height: 0.48rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    img {
      width: 0.2rem;
      height: 0.2rem;
      object-fit: contain;
    }
  }

  .winnings-btn {
    width: 100%;
    height: 0.48rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    img {
      width: 0.2rem;
      height: 0.2rem;
      object-fit: contain;
    }

  }
}

@media (max-width: 749px) {
  .nav-con {
    display: none;
  }
}
</style>