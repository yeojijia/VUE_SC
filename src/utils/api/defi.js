import GeneralHttp from '../http/GeneralHttp'
import AuthHttp from '../http/AuthHttp'
import url from '../urls'
const { defi } = url

//质押列表分类
export const _type = (data) => {
  return GeneralHttp.post(`${defi.type}`)
}

//获取质押产品列表
export const _page = (data) => {
  if (localStorage.isLogin && JSON.parse(localStorage.isLogin)) {
    return AuthHttp.post(`${defi.pledge_page}`, data)
  } else {
    return GeneralHttp.post(`${defi.pledge_page}`, data)
  }
}

//质押
export const _deposit = (data) => {
  return AuthHttp.post(`${defi.deposit}`, data)
}

//领取奖励
export const _receive = (data) => {
  return AuthHttp.post(`${defi.receive}`, data)
}

//赎回
export const _redemption = (data) => {
  return AuthHttp.post(`${defi.redemption}`, data)
}

//统计
export const _statistics = (data) => {
  if (localStorage.isLogin && JSON.parse(localStorage.isLogin)) {
    return AuthHttp.post(`${defi.statistics}`, data)
  } else {
    return GeneralHttp.post(`${defi.statistics}`, data)
  }
}

//查询用户分红奖励
export const _pledgeShare = (data) => {
  return AuthHttp.post(`${defi.pledge_share}`, data)
}

//领取分红奖励
export const _pledgeShareDraw = (data) => {
  return AuthHttp.post(`${defi.pledge_share_draw}`, data)
}