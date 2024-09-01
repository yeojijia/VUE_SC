import GeneralHttp from '../http/GeneralHttp'
import AuthHttp from '../http/AuthHttp'
import url from '../urls'
const { lottery } = url


export const _allLotteryInfoList = () => {
  return GeneralHttp.get(`${lottery.allLotteryInfoMap}`)
}
//获取所有彩种
export const _allLotteryInfoMap = () => {
  return GeneralHttp.get(`${lottery.allLotteryInfoMap}`)
}

//获取所有玩法
export const _getLotteryPlayTypeList = (lotteryType) => {
  return GeneralHttp.get(`${lottery.getLotteryPlayTypeList}?lotteryType=${lotteryType}`)
}

// 获取赔率
export const _getUserOdds = (playTypeCode) => {
  return GeneralHttp.get(`${lottery.getUserOdds}?playTypeCode=${playTypeCode}`)
}

//获取开奖历史记录
export const _getOpenHistory = (lotteryId) => {
  return GeneralHttp.get(`${lottery.getOpenHistory}?lotteryId=${lotteryId}`)
}
//当前期号信息
export const _getCurrentInfo = (lotteryId) => {
  return GeneralHttp.get(`${lottery.getCurrentInfo}?lotteryId=${lotteryId}`)
}

//投注
export const _bet = (data) => {
  return AuthHttp.post(`${lottery.bet}`, data)
}

//批量投注
export const _batchBet = (data) => {
  return AuthHttp.post(`${lottery.batchBet}`, data)
}

//近期投注
export const _getMyBetRecordPage = (data) => {
  return AuthHttp.post(`${lottery.getMyBetRecordPage}`, data)
}

//投注统计
export const _statistics = (lotteryId) => {
  return AuthHttp.get(`${lottery.statistics}?lotteryId=${lotteryId}`)

}