<template>
  <div class="page">
    <page-nav />
    <div class="page-right" :class="{unfold:navUnfold,footBarShow:footBarShow}">
      <page-header v-show="headerShow" />
      <div class="wrap-con">
        <div class="wrap-scroll" ref="wrapDom">
          <div class="page-content">
            <slot />
          </div>
          <page-footer v-show="footPageShow" />
        </div>
      </div>
      <foot-bar v-if="footBarShow" />
    </div>
    <login v-model:show="loginPopupShow" />
    <register v-model:show="registerPopupShow" />
    <reset-password v-model:show="resetPasswordPopupShow" />
    <binding-prompt v-model:show="bindingPromptPopupShow" />
    <money-popup v-model:show="moneyShow" />
    <setting-form v-model:show="settingFormShow" />
    <transfer-popup v-model:show="transferShow" />
    <award-popup v-model:show="awardShow" />
    <winnings-exchange-popup v-model:show="winningsExchangeShow" />
  </div>
</template>
<script setup>
import PageNav from './components/PageNav'
import PageHeader from './components/PageHeader'
import PageFooter from './components/PageFooter'
import FootBar from './components/FootBar'
import Login from '../Login'
import Register from '../Register'
import ResetPassword from '../ResetPassword'
import BindingPrompt from '../BindingPrompt'
import MoneyPopup from '../MoneyPopup'
import SettingForm from '../SettingForm'
import TransferPopup from '../TransferPopup'
import AwardPopup from '../AwardPopup'
import WinningsExchangePopup from '../WinningsExchangePopup'
import { ref, computed, onMounted, nextTick, watch, getCurrentInstance, inject } from 'vue'
import { useRouter } from 'vue-router';
import { useStore } from 'vuex'
import { _langList } from '@/utils/api/common'
const store = useStore()
const router = useRouter()
const { proxy } = getCurrentInstance()

const reload = inject('reload')
const resize = computed(() => store.state.global.resize)
const isMobile = computed(() => store.state.global.isMobile)
const navUnfold = computed(() => store.state.global.navUnfold)
let langList = computed(() => store.state.global.langList)
let loginPopupShow = computed({
  get() {
    return store.state.user.loginPopupShow
  },
  set(e) {
    store.commit('SET_LOGIN_POPUP_SHOW', e)
  }
})
let registerPopupShow = computed({
  get() {
    return store.state.user.registerPopupShow
  },
  set(e) {
    store.commit('SET_REGISTER_POPUP_SHOW', e)
  }
})
let resetPasswordPopupShow = computed({
  get() {
    return store.state.user.resetPasswordPopupShow
  },
  set(e) {
    store.commit('SET_RESET_PASSWORD_POPUP_SHOW', e)
  }
})

let bindingPromptPopupShow = computed({
  get() {
    return store.state.money.bindingPromptPopupShow
  },
  set(e) {
    store.commit('SET_BINDING_PROMPT_POPUP_SHOW', e)
  }
})

let moneyShow = computed({
  get() {
    return store.state.money.moneyPopupShow
  },
  set(e) {
    store.commit('SET_MONEY_POPUP_SHOW', e)
  }
})

let transferShow = computed({
  get() {
    return store.state.money.transferShow
  },
  set(e) {
    store.commit('SET_TRANSFER_SHOW', e)
  }
})
const settingFormShow = computed({
  get() {
    return store.state.user.settingFormShow
  },
  set(e) {
    store.commit('SET_SETTING_FORM_SHOW', e)
  }
})
const awardShow = computed({
  get() {
    return store.state.user.awardShow
  },
  set(e) {
    store.commit('SET_AWARD_SHOW', e)
  }
})
const winningsExchangeShow = computed({
  get() {
    return store.state.user.winningsExchangeShow
  },
  set(e) {
    store.commit('SET_WINNINGS_EXCHANGE_SHOW', e)
  }
})
const headerShow = ref(true)
const footPageShow = ref(false)
const footBarShow = ref(false)
watch(() => {
  return {
    path: router.currentRoute.value.path,
    isMobile: isMobile.value
  }
}, ({ path }) => {

  if (isMobile.value) {
    const pathHide = [
      '/lottery',
      '/games/detail'
    ]
    if (pathHide.some(item => item === path)) {
      footBarShow.value = false
    } else {
      footBarShow.value = true
    }
    if (path === '/home') {
      footPageShow.value = true
    } else {
      footPageShow.value = false
    }
    if (path === '/my/min') {
      headerShow.value = false
    } else {
      headerShow.value = true
    }
  } else {
    if (path === '/lottery') {
      footPageShow.value = false
    } else {
      footPageShow.value = true
    }
  }

  nextTick(() => {
    wrapDom.value.scrollTop = 0;
  })
},
  { immediate: true }
)
//监听导航展开收起
watch(() => navUnfold.value, () => {
  // handleResizeChange()
})
let wrapDom = ref(null)
//监听浏览器窗口大小变化
function handleResize() {
  handleResizeChange()
  window.onresize = () => {
    handleResizeChange()
  }
}
let resizeTimer = null
function handleResizeChange() {
  if (resizeTimer) {
    clearTimeout(resizeTimer)
  }
  resizeTimer = setTimeout(() => {
    const width = document.documentElement.clientWidth
    store.commit('SET_IS_MOBILE', proxy.$common.isMobile())
    store.commit('SET_RESIZE', width)
  }, 500)
}
let resizeChangeTimer = null
//监听浏览器窗口大小变化刷新页面
watch(() => resize.value, (cur, prev) => {
  if (resizeChangeTimer) {
    clearTimeout(resizeChangeTimer)
  }
  resizeChangeTimer = setTimeout(() => {
    if (prev !== 0) {
      reload()
    }
  }, 500)
})
function getLangList() {
  if (langList.value.length === 0) {
    _langList().then(res => {
      if (res.length) {
        store.commit('SET_LANG_LIST', res)
        if (localStorage.lang) {
          if (!res.some(item => item.code === localStorage.lang)) {
            store.commit('SET_LANG', { lang: res[0].code, $i18n: proxy.$i18n })
          }
        } else {
          store.commit('SET_LANG', { lang: res[0].code, $i18n: proxy.$i18n })
        }
        // store.commit('SET_LANG', { lang: res[0].code, $i18n: proxy.$i18n })
        // reload()
      }

    })
  }
}
onMounted(() => {
  handleResize()
  getLangList()
  store.dispatch('getActivityCategory')
})
</script>


<style lang='scss' scoped>
.page {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: space-between;
  background: var(--gg-page-bg);


  .page-right {
    height: 100vh;
    flex: 1;
    display: flex;
    flex-direction: column;
    // padding-left: 2.6rem;
    // transition: all 0.3s ease-in;

    // &.unfold {
    //   padding-left: 0.64rem;
    // }



    .wrap-con {
      width: 100%;
      flex: 1;
      position: relative;

      .wrap-scroll {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        overflow-y: auto;
      }

      .page-content {
        width: 100%;
        padding-bottom: 0.5rem;
        min-height: 100%;
      }
    }
  }


}

@media only screen and (min-width: 750px) and (max-width: 1280px) {
  .page {
    .page-right {
      // padding-left: 0.64rem;

      .wrap-con {
        .page-content {
          padding-bottom: 0.3rem;
        }

        .wrap-scroll {
          // left: 0.64rem;

        }

      }
    }
  }
}

@media (max-width: 749px) {
  .page {
    .page-right {
      width: 100%;
      flex: 0 0 auto;

      &.footBarShow {
        padding-bottom: 0.5rem;

      }

      .wrap-con {
        .page-content {
          padding-bottom: 0.4rem;
        }

      }
    }
  }
}
</style>