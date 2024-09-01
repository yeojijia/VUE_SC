/****
 *  用户相关
 * ***/
import router from '@/router'
import common from '@/utils/common'
import contract from "@/contract";
import i18n from '@/i18n'
const $t = i18n.global.t
import { _login, _walletLogin, _loginSignKey, _refreshToken, _userAllMsg, _userInfo, _logout } from '@/utils/api/user'
import { _getCode, _checkVerifyCode } from '@/utils/api/common'
import { _totalBalance } from '@/utils/api/money'
import { _userTeamInfo } from '@/utils/api/invite'
import { _getAllPlatformInfo, _transferBalance, _getAllPlatformBalance, _gameTotalBalance } from '@/utils/api/game'
const { BSC } = contract
let clearLoginInfo_timer = null

let tokenInfo = {}
let isLogin = false
let levelType = 'vip'
let inviteCom = 'Laundry'
if (localStorage.tokenInfo) {
  tokenInfo = JSON.parse(localStorage.tokenInfo)
} else {
  localStorage.tokenInfo = JSON.stringify(tokenInfo)
}
if (localStorage.levelType) {
  levelType = localStorage.levelType
}
if (localStorage.inviteCom) {
  inviteCom = localStorage.inviteCom
}

if (localStorage.isLogin) {
  isLogin = JSON.parse(localStorage.isLogin)
}

const state = {
  isLogin,
  loginPopupShow: false,
  registerPopupShow: false,
  resetPasswordPopupShow: false,
  tokenInfo,
  noReadMsgNumber: 0,
  readMsgIds: [],
  userInfo: {},
  levelType,//vip agent
  inviteCom,//Laundry Award Member
  totalBalance: 0,
  platformBalanceList: [],
  gameTotalBalance: 0,
  inviteInfo: {},
  gamePlatformList: [],
  settingFormShow: false,
  settingFormType: 'login',//login fun email phone google
  captcha: {
    key: '',
    url: ''
  },
  awardShow: false,//抽奖弹窗
  winningsExchangeShow: false,//奖品兑换弹窗
}
const actions = {
  login({ commit, dispatch }, data) {
    return new Promise((resolve, reject) => {
      _login({
        ...data,
        grant_type: 'password',
        scope: 'server',
      }).then(async res => {
        res.timeStamp = new Date().getTime();
        commit('SET_TOKEN_INFO', res);
        await dispatch('refreshToken')
        dispatch('getUserInfo')
        dispatch('getTotalBalance')
        // dispatch('setNoReadMsgNumber')
        resolve()
      }).catch(() => {
        reject()
      })
    })
  },
  walletLogin({ commit, dispatch }) {
    return new Promise(async (resolve, reject) => {
      try {
        const address = await BSC.wallet.connect()
        const key = await _loginSignKey({
          address,
          chainId: 56
        })
        const sign = await BSC.wallet.getSignature(key)
        _walletLogin({
          walletAddress: address,
          signCode: sign
        }).then(async res => {
          res.timeStamp = new Date().getTime();
          commit('SET_TOKEN_INFO', res);
          await dispatch('refreshToken')
          dispatch('getUserInfo')
          dispatch('getTotalBalance')
          // dispatch('setNoReadMsgNumber')
          resolve()
        }).catch(() => {
          reject()
        })
      } catch (error) {
        reject()
      }
    })
  },
  //刷新token
  refreshToken({ commit, state }) {
    const { refresh_token = '' } = state.tokenInfo
    return new Promise((resolve, reject) => {
      _refreshToken(refresh_token)
        .then((res) => {
          res.timeStamp = new Date().getTime();
          // 更新token
          commit('SET_TOKEN_INFO', res);
          resolve(res.access_token);
        })
        .catch(() => {
          reject({
            code: 'cancel',
            status: 'tokenOverdue',
            message: $t('Login expired, please log in again'),
            backgroundRequest: headers.backgroundRequest,
          });
        })
    })
  },
  async getCode({ commit }) {
    const res = await _getCode()
    commit('SET_CAPTCH', res)
  },
  checkVerifyCode(ctx, code) {
    return _checkVerifyCode(code)
  },
  getUserInfo({
    commit
  }, backgroundRequest) {
    return new Promise((resolve, reject) => {
      _userInfo(backgroundRequest)
        .then(res => {
          if (res) {
            commit('SET_USER_INFO', res);
            commit('SET_IS_LOGIN', true)
          }
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  setNoReadMsgNumber({
    commit, dispatch
  }, number = null) {
    if (number !== null) {
      commit('GET_NO_READMSGNUMBER', number);
    } else {
      dispatch('getUserAllMsg')
    }
  },
  getUserAllMsg({ commit }) {
    _userAllMsg().then(data => {
      let res = common.decryption(data)
      let noReadMsgNumber = 0
      let readIds = ''
      if (res) {
        readIds = res.map(item => item.id);
        const alreadyRead = localStorage.getItem('alreadyRead') || '[]';
        noReadMsgNumber = readIds.filter(
          item => !JSON.parse(alreadyRead).includes(item)
        ).length;
      }

      commit('GET_NO_READMSGNUMBER', noReadMsgNumber);
      commit('GET_READ_MSGIDS', readIds);
    })
  },
  //获取总余额
  async getTotalBalance({ commit }) {
    const res = await _totalBalance()
    commit('SET_TOTAL_BALANCE', res)
  },
  //获取中心钱包余额以及游戏平台余额
  async getGameTotalBalance({ commit }) {
    const res = await _gameTotalBalance()
    commit('SET_CENTER_WALLET_BALANCE', res.totalBalance)
    if (res.status === 2) {
      spop({
        template: $t('common.desc118'),
        style: 'info',
        autoclose: 2000
      })
    }
  },
  async getGameBalanceList({ commit }) {
    const res = await _getAllPlatformBalance()
    commit('SET_PLATFORM_BALANCE', res)
  },
  async getPlatformBalanceInfo({ commit }) {
    const res1 = await _gameTotalBalance()
    commit('SET_CENTER_WALLET_BALANCE', res1.totalBalance)
    if (res1.status === 2) {
      spop({
        template: $t('common.desc118'),
        style: 'info',
        autoclose: 2000
      })
    }
    const res2 = await _getAllPlatformBalance()
    commit('SET_PLATFORM_BALANCE', res2)
  },
  //用户中心邀请信息
  async getUserInviteInfo({ commit, state }) {
    if (state.inviteInfo.inviteUrl) {
      return Promise.resolve()
    }
    const res = await _userTeamInfo()
    res.inviteUrl = `${window.location.origin}?inviteCode=${res.inviteCode}`
    commit('SET_INVITE_INFO', res)
  },
  //获取所有游戏平台name
  async getAllPlatformInfo({ commit }) {
    const res = await _getAllPlatformInfo()
    commit('SET_PLATFORM_LIST', res)
  },
  //划转
  transfer({ commit }, { transferAmount, toPlatform }) {
    return _transferBalance({
      fromPlatform: 'OFFICE',
      toPlatform,
      transferAmount
    })
  },
  //退出登录
  logOut({ commit }) {
    _logout().finally(() => {
      commit('SET_TOKEN_INFO', {})
      commit('SET_USER_INFO', {});
      commit('SET_IS_LOGIN', false)
      commit('SET_INVITE_INFO', {})
      router.push('/home')
    })

  },
  clearLoginInfo({ commit }) {
    if (clearLoginInfo_timer) {
      clearTimeout(clearLoginInfo_timer)
    }
    clearLoginInfo_timer = setTimeout(() => {
      commit('SET_TOKEN_INFO', {})
      commit('SET_USER_INFO', {});
      commit('SET_IS_LOGIN', false)
      router.push('/home')
    }, 400)
  },
  setSettingFormShow({ commit, rootState }, {
    show,
    type
  }) {
    commit('SET_SETTING_FORM_TYPE', type)
    commit('SET_SETTING_FORM_SHOW', show)
  },

}
const mutations = {
  SET_WINNINGS_EXCHANGE_SHOW(state, bool) {
    state.winningsExchangeShow = bool
  },
  SET_AWARD_SHOW(state, bool) {
    state.awardShow = bool
  },
  SET_CAPTCH(state, data) {
    const { captchaKey, captcha_image_content } = data
    state.captcha = {
      key: captchaKey,
      url: captcha_image_content
    }
  },
  SET_CENTER_WALLET_BALANCE(state, balance) {
    state.gameTotalBalance = balance
  },
  SET_PLATFORM_BALANCE(state, list) {
    state.platformBalanceList = list
  },
  SET_SETTING_FORM_TYPE(state, type) {
    state.settingFormType = type
  },
  SET_SETTING_FORM_SHOW(state, bool) {
    state.settingFormShow = bool
  },
  SET_PLATFORM_LIST(state, list) {
    state.gamePlatformList = list
  },
  SET_INVITE_INFO(state, info) {
    state.inviteInfo = info
  },
  SET_TOTAL_BALANCE(state, totalBalance) {
    state.totalBalance = totalBalance
  },
  SET_INVITE_COM(state, com) {
    state.inviteCom = com
    localStorage.inviteCom = com
  },
  SET_LEVEL_TYPE(state, type) {
    state.levelType = type
    localStorage.levelType = type
  },
  SET_USER_INFO(state, data) {
    state.userInfo = data;
  },
  GET_READ_MSGIDS(state, data) {
    state.readMsgIds = data;
  },
  GET_NO_READMSGNUMBER(state, data) {
    state.noReadMsgNumber = data;
  },
  SET_TOKEN_INFO(state, info) {
    state.tokenInfo = info
    localStorage.tokenInfo = JSON.stringify(info)
  },
  SET_IS_LOGIN(state, bool) {
    state.isLogin = bool
    localStorage.isLogin = state.isLogin
  },
  SET_LOGIN_POPUP_SHOW(state, bool) {
    state.loginPopupShow = bool
  },
  SET_REGISTER_POPUP_SHOW(state, bool) {
    state.registerPopupShow = bool
  },
  SET_RESET_PASSWORD_POPUP_SHOW(state, bool) {
    state.resetPasswordPopupShow = bool
  },

}
const getters = {
  isLogin: (state) => state.isLogin,
  totalBalance: (state) => state.totalBalance
}

export default {
  namespaced: false, // 命名开启
  state,
  actions,
  mutations,
  getters
}


