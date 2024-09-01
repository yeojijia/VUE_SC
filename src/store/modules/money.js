/****
 *  money参数
 * ***/
import { _getAllPlatformBalance } from '@/utils/api/game'
import { _asset } from '@/utils/api/money'
const state = {
  moneyPopupShow: false,
  moneyPopupType: 'recharge',//recharge withdraw flash collection
  coinType: 'digital', //legal
  bindingPromptPopupShow: false,
  emailUpdatePopupShow: true,
  transferShow: false,
  moneyCoin: '',
  digitalBalance: 0,
  digitalList: []
}
const actions = {
  setMoneyPopupShow({ commit, rootState }, {
    show,
    type
  }) {

    if ((type === 'withdraw' || type === 'collection') && !rootState.user.userInfo.googleSecret) {
      commit('SET_BINDING_PROMPT_POPUP_SHOW', true)
    }
    else {
      commit('SET_MONEY_POPUP_SHOW', show)
      commit('SET_MONEY_POPUP_TYPE', type)
    }
  },
  getDigitalAsset({ commit }, type) {
    commit('SET_DIGITAL_ASSET', {
      totalBalance: 0, coinWalletInfoVoList: []
    })
    _asset({
      type
    }).then(res => {
      commit('SET_DIGITAL_ASSET', res)
    })
  }

}
const mutations = {
  SET_DIGITAL_ASSET(state, { totalBalance, coinWalletInfoVoList }) {
    state.digitalBalance = totalBalance
    state.digitalList = coinWalletInfoVoList
  },
  SET_MONEY_COIN(state, coin) {
    state.moneyCoin = coin
  },
  SET_TRANSFER_SHOW(state, bool) {
    state.transferShow = bool
  },
  SET_COIN_TYPE(state, type) {
    state.coinType = type
  },

  SET_MONEY_POPUP_SHOW(state, bool) {
    state.moneyPopupShow = bool
  },
  SET_MONEY_POPUP_TYPE(state, type) {
    state.moneyPopupType = type
  },
  SET_BINDING_PROMPT_POPUP_SHOW(state, bool) {
    state.bindingPromptPopupShow = bool
  },
  SET_EMAIL_UPDATE_POPUP_SHOW(state, bool) {
    state.emailUpdatePopupShow = bool
  }

}
const getters = {

}

export default {
  namespaced: false, // 命名开启
  state,
  actions,
  mutations,
  getters
}


