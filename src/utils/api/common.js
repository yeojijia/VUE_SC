import GeneralHttp from '../http/GeneralHttp'
import AuthHttp from '../http/AuthHttp'
import url from '../urls'
const { common } = url

export const _ads = (data) => {
  return GeneralHttp.post(`${common.ads}`, data)
}

export const _articlesDetail = (id) => {
  return GeneralHttp.get(`${common.articles_detail}/${id}`)
}

export const _articlesCategory = (type) => {
  return GeneralHttp.post(`${common.articlesCategory}/${type}`)
}

export const _articlesIndex = () => {
  return GeneralHttp.get(`${common.articles_index}`)
}

export const _articlesPage = (data) => {
  return GeneralHttp.post(`${common.articles_page}`, data)
}

export const _getBulletinType = (data) => {
  return GeneralHttp.post(`${common.getBulletinType}`, data)
}

export const _getByPageAndLikeAndOrder = (pageParam, searchParam) => {
  return GeneralHttp.post(`${common.getByPageAndLikeAndOrder}`, { pageParam, searchParam })
}

export const _bulletin = (id) => {
  return GeneralHttp.get(`${common.bulletin}/${id}`)
}

//留言
export const _leaveMessage = (data) => {
  return AuthHttp.post(`${common.leaveMessage}`, data)

}

//活动类型
export const _getActivityCategory = () => {
  return GeneralHttp.get(`${common.getActivityCategory}`)
}
//活动列表
export const _getByCategory = (id) => {
  return AuthHttp.get(`${common.getByCategory}/${id}`)
}
//活动详情
export const _activityInfo = (id) => {
  return GeneralHttp.get(`${common.activityInfo}/${id}`)
}

//彩金列表
export const _rewardsList = (data) => {
  return AuthHttp.post(`${common.rewardsList}`, data)
}
//彩金领取
export const _rewardsDraw = (data) => {
  return AuthHttp.post(`${common.rewardsDraw}`, data)
}
//彩金兑换
export const _exchangeWinnings = (data) => {
  return AuthHttp.post(`${common.exchangeWinnings}`, data)
}
//获取验证码
export const _getCode = () => {
  return GeneralHttp.get(`${common.getCode}`,)
}

//校验验证码
export const _checkVerifyCode = (code) => {
  return GeneralHttp.post(`${common.checkVerifyCode}?verifyCode=${code}`)
}

//公告通知
export const _message = () => {
  return AuthHttp.get(`${common.message}`)
}

//通知详情
export const _messageDetail = (id) => {
  return AuthHttp.get(`${common.messageDetail}/${id}`)
}

export const _langList = () => {
  return GeneralHttp.post(`${common.langList}`)
}

export const _systemConfigLogoInfo = () => {
  return GeneralHttp.get(`${common.systemConfigLogoInfo}`)
}

export const _appContentGetServiceLink = () => {
  return GeneralHttp.get(`${common.appContentGetServiceLink}`)
}