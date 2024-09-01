import GeneralHttp from '../http/GeneralHttp'
import AuthHttp from '../http/AuthHttp'
import common from '../common'
import url from '../urls'
import qs from 'qs'
const { invite } = url


//洗码中心
export const _washInfo = (data) => {
  return AuthHttp.post(`${invite.washInfo}`, data)
}

//会员等级
export const _levelInfo = (data) => {
  return AuthHttp.post(`${invite.levelInfo}`, data)
}

//代理等级
export const _agencyInfo = (data) => {
  return AuthHttp.post(`${invite.agencyInfo}`, data)
}

//用户邀请信息
export const _userTeamInfo = (data) => {
  return AuthHttp.post(`${invite.userTeamInfo}`, data)
}

//邀请信息

export const _teamInfo = (data) => {
  return AuthHttp.post(`${invite.teamInfo}`, data)
}

//领取洗码奖励
export const _backwaterDraw = (data) => {
  return AuthHttp.post(`${invite.backwaterDraw}`, data)
}

//添加邀请码
export const _inviteCodeAdd = (data) => {
  return AuthHttp.post(`${invite.inviteCodeAdd}`, data)
}