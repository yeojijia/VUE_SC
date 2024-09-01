/****
 *  全局参数
 * ***/
import configs from '@/utils/configs'
import vantLang from '../../i18n/vant-lang';
import { _getActivityCategory, _systemConfigLogoInfo, _appContentGetServiceLink } from '@/utils/api/common'
import i18n from '@/i18n'
const $t = i18n.global.t
import { _turntableInfo, _turntableRecordAll } from '@/utils/api/user'
let lang = configs.lang
vantLang(lang)
let gameUrlParams = {}
if (localStorage.gameUrlParams) {
  gameUrlParams = JSON.parse(localStorage.gameUrlParams)
}
let loginSpopTimer = null
const state = {
  theme: 'night',
  navUnfold: false,
  lang,
  langList: [],
  resize: 0,
  isMobile: false,
  chainList: [
    {
      id: 0,
      name: 'BEP20',
      value: 1
    },
    {
      id: 1,
      name: 'ERC20',
      value: 1
    },
    {
      id: 2,
      name: 'TRC20',
      value: 2
    },
  ],
  gameUrlParams,
  turntableRecord: [],
  turntableInfo: {},
  activityCategory: [],
  logoInfo: {}, // logo配置
  serviceUrl: '', // 客服外链
}
const actions = {
  getServiceUrl({ commit }) {
    _appContentGetServiceLink().then(res => {
      commit('SET_SERVICE_URL', res)
    })
  },
  getlogoInfo({ commit }) {
    _systemConfigLogoInfo().then(res => {
      commit('SET_LOGO_IMG', res)
    })
  },
  getTurntable({ commit }) {
    _turntableInfo().then(res => {
      commit('SET_TURNTABLE_INFO', res)
    })
    _turntableRecordAll().then(res => {
      commit('SET_TURNTABLE_RECORD', res)
    })
  },
  getActivityCategory({ commit }) {
    return new Promise((resolve, reject) => {
      _getActivityCategory().then(res => {
        commit('SET_ACTIVITY_CATEGORY', res)
        resolve()
      })
    })
  },
  loginSpop() {
    loginSpopTimer = setTimeout(() => {
      clearTimeout(loginSpopTimer)
      loginSpopTimer = null
      spop({
        template: $t('common.desc4'),
        style: 'info',
        group: 'login-prompt',
        autoclose: 2000
      })
    }, 500)

  }
}
const mutations = {
  SET_SERVICE_URL(state, data) {
    state.serviceUrl = data
  },
  SET_LOGO_IMG(state, data) {
    state.logoInfo = data
  },
  SET_ACTIVITY_CATEGORY(state, data) {
    state.activityCategory = data
  },
  SET_TURNTABLE_INFO(state, data) {
    state.turntableInfo = data
  },
  SET_TURNTABLE_RECORD(state, data) {
    state.turntableRecord = data
  },
  SET_LANG_LIST(state, list) {
    state.langList = list
  },
  SET_GAME_URL_PARAMS(state, params) {
    state.gameUrlParams = JSON.parse(JSON.stringify(params))
    localStorage.gameUrlParams = JSON.stringify(params)
  },
  SET_THEME(state, theme) {
    let htmlDom = document.documentElement
    htmlDom.setAttribute('data-theme', theme)
    state.theme = theme
    localStorage.theme = theme
  },
  SET_NAV_UNFOLD(state) {
    state.navUnfold = !state.navUnfold
  },
  SET_LANG(state, { lang, $i18n }) {
    state.lang = lang
    $i18n.locale = lang
    vantLang(lang)
    localStorage.lang = lang
  },
  SET_RESIZE(state, width) {
    state.resize = width
  },
  SET_IS_MOBILE(state, bool) {
    state.isMobile = bool
  }
}
const getters = {
  lang: (state) => state.lang,
  isRoulette: (state) => state.activityCategory.some(item => item.id === 4),
}

export default {
  namespaced: false, // 命名开启
  state,
  actions,
  mutations,
  getters
}


