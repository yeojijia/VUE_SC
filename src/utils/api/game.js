import GeneralHttp from '../http/GeneralHttp'
import AuthHttp from '../http/AuthHttp'
import common from '../common'
import url from '../urls'
import qs from 'qs'
const { game } = url




//获取运动列表
export const _getSports = (data) => {
  return GeneralHttp.post(`${game.getSports}`, data)
}

//获取运动事件信息
export const _getSportEvents = (data) => {
  return GeneralHttp.post(`${game.getSportEvents}`, data)
}

export const _gameUrl = ({ handler, code, gameId }) => {
  return AuthHttp.get(`${game.gameUrl}/${handler}/${code}?gameId=${gameId}`, {
    headers: {
      loginType: common.isMobile() ? 2 : 1
    }
  })
}

export const _getMyBetRecord = (data) => {
  return AuthHttp.post(`${game.getMyBetRecord}`, data)
}

//一键归集
export const _allBalanceToOffice = () => {
  return AuthHttp.get(`${game.allBalanceToOffice}`)
}

//获取三方余额
export const _getAllPlatformBalance = () => {
  return AuthHttp.get(`${game.getAllPlatformBalance}`)
}

//获取三方信息
export const _getAllPlatformInfo = () => {
  return AuthHttp.get(`${game.getAllPlatformInfo}`)
}

//手动划转
export const _transferBalance = (data) => {
  return AuthHttp.post(`${game.transferBalance}`, data)
}

//获取游戏资产
export const _gameTotalBalance = (data) => {
  return AuthHttp.post(`${game.totalBalance}`, data)
}
//游戏类型
export const _gameType = () => {
  return GeneralHttp.post(`${game.gameType}`)
}

//获取游戏列表
export const _gameList = (code) => {
  return GeneralHttp.get(`${game.gameList}/${code}`)
}

//最近参与
export const _gamesParticipation = () => {
  return AuthHttp.get(`${game.gamesParticipation}`)
}
