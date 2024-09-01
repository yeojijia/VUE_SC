import GeneralHttp from '../http/GeneralHttp'
import AuthHttp from '../http/AuthHttp'
import url from '../urls'
import qs from 'qs'
const { money } = url




//总的账户余额
export const _totalBalance = () => {
  return AuthHttp.post(`${money.totalBalance}`)
}

//获取账户余额
export const _asset = (data) => {
  return AuthHttp.post(`${money.asset}`, data)
}


//充值初始化
export const _chargeInit = (data) => {
  return AuthHttp.post(`${money.chargeInit}`, data)

}

//获取可充值币对列表
export const _chargeCoins = (data) => {
  return AuthHttp.post(`${money.chargeCoins}`, data)
}

//充值回调
export const _chargeRecord = (data) => {
  return AuthHttp.post(`${money.chargeRecord}`, data)
}

//添加提现地址
export const _withDrawAddressAdd = (data) => {
  return AuthHttp.post(`${money.withDrawAddressAdd}`, data)
}
//提现地址列表
export const _withDrawAddressList = (data) => {
  return AuthHttp.post(`${money.withDrawAddressList}`, data)
}
//删除提现方式
export const _delWithDrawType = (id) => {
  return AuthHttp.delete(`${money.delWithDrawType}/${id}`)
}

//提现信息
export const _withDrawInfo = (data) => {
  return AuthHttp.post(`${money.withDrawInfo}`, data)
}

//提现
export const _coinWithDraw = (data) => {
  return AuthHttp.post(`${money.coinWithDraw}`, data)
}

//提现币种列表
export const _coinWithDrawList = (data) => {
  return AuthHttp.post(`${money.coinWithDrawList}`, data)
}

//闪兑币列表
export const _coinExchangeList = () => {
  return AuthHttp.post(`${money.coin_exchange_list}`)
}

//闪兑信息
export const _exchangeInfo = (data) => {
  return AuthHttp.post(`${money.exchange_info}`, data)
}

//闪兑
export const _exchange = (data) => {
  return AuthHttp.post(`${money.wallet_exchange}`, data)
}

//获取币种余额
export const _coinBalance = (id) => {
  return AuthHttp.post(`${money.coinBalance}/${id}`)
}

//闪兑支付币列表
export const _exchangePayCoinList = (data) => {
  return AuthHttp.post(`${money.exchangePayCoinList}`, data)
}

//闪兑返回币列表
export const _exchangeReturnCoinList = (data) => {
  return AuthHttp.post(`${money.exchangeReturnCoinList}`, data)
}







