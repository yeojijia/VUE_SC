import GeneralHttp from '../http/GeneralHttp'
import AuthHttp from '../http/AuthHttp'
import url from '../urls'
import qs from 'qs'
const { user, money } = url

//注册
export const _register = ({ query, data }) => {
  return GeneralHttp.post(`${user.register}?${qs.stringify(query)}`, data, {
    headers: {
      // 同登录接口
      deviceNo: '',
      deviceType: 'H5',
      deviceName: '',
    },
  },)
}

//登录
export const _login = (data) => {
  return GeneralHttp.post(`${user.token}?${qs.stringify(data)}`, {}, {
    headers: {
      Authorization: 'Basic YXBwOmFwcA==',
      deviceNo: '', // web上传空
      deviceType: 'H5', // Android ios PC H5
      deviceName: '', // app传手机品牌名称 web传浏览器名称 // TODO
    }
  })
}
//刷新token
export const _refreshToken = (refresh_token) => {
  const params = {
    refresh_token,
    grant_type: 'refresh_token',
    scope: 'server',
  };
  return GeneralHttp.post(`${user.token}?${qs.stringify(params)}`, params, {
    headers: {
      // isToken: false,
      Authorization: 'Basic YXBwOmFwcA==',
      // backgroundRequest: true,
    },
  })
}


//获取登陆签名随机数
export const _loginSignKey = (data) => {
  return GeneralHttp.post(`${user.loginSignKey}`, data)
}

//钱包登录
export const _walletLogin = (params) => {
  return GeneralHttp.post(`${user.walletLogin}?${qs.stringify(params)}`, {}, {
    headers: {
      Authorization: 'Basic YXBwOmFwcA==',
      deviceNo: '', // web上传空
      deviceType: 'H5', // Android ios PC H5
      deviceName: '', // app传手机品牌名称 web传浏览器名称 // TODO
    }
  })
}

//退出
export const _logout = () => {
  return AuthHttp.delete(`${user.logout}`, {
    headers: { backgroundRequest: true },
  })
}

//用户信息
export const _userInfo = () => {
  return AuthHttp.post(
    `${user.userInfo}`,
    {}
  )
}
//登录记录
export const _loginLog = () => {
  return AuthHttp.post(
    `${user.loginLog}`,
    {}
  )
}

//修改用户信息
export const _updateUserInfo = (data) => {
  return AuthHttp.post(
    `${user.updateUserInfo}`,
    data
  )
}

//获取谷歌二维码
export const _googleQr = (data) => {
  return AuthHttp.post(
    `${user.googleQr}`,
    data
  )
}
//重置谷歌二维码
export const _googleReset = (data) => {
  return AuthHttp.post(
    `${user.googleReset}`,
    data
  )
}
//绑定谷歌
export const _googleBind = (data) => {
  return AuthHttp.post(
    `${user.googleBind}`,
    data
  )
}


//所有用户信息
export const _userAllMsg = () => {
  return AuthHttp.post(`${user.userAllMessage}`,
    {})
}


//交易类型
export const _getBillType = () => {
  return AuthHttp.post(`${user.getBillType}`)
}

//获取本人交易明细
export const _getBillPage = (data) => {
  return AuthHttp.post(`${user.getBillPage}`,
    data)
}

//获取闪兑记录详情
export const _exchangeRecord = (id) => {
  return AuthHttp.post(`${money.exchangeRecord}/${id}`)
}
//获取闪充值记录详情
export const _rechargeRecord = (id) => {
  return AuthHttp.post(`${money.rechargeRecord}/${id}`)
}//获取提现记录详情
export const _withdrawRecord = (id) => {
  return AuthHttp.post(`${money.withdrawRecord}/${id}`)
}
//获取洗码详情
export const _backwaterRecord = (id) => {
  return AuthHttp.post(`${money.backwaterRecord}/${id}`)
}
//分红详情
export const _pledgeShareRecord = (id) => {
  return AuthHttp.post(`${money.pledgeShareRecord}/${id}`)
}
//发送邮箱验证码 //email password fundPassword
export const _sendEmailCode = (data) => {
  return AuthHttp.post(`${user.sendEmailCode}`, data)
}

//设置资金密码
export const _setFundPassword = (data) => {
  return AuthHttp.post(`${user.setFundPassword}`, data)
}


//修改资金密码
export const _updateFundPassword = (data) => {
  return AuthHttp.post(`${user.updateFundPassword}`, data)
}

//找回密码
export const _findPassword = (data) => {
  return GeneralHttp.post(`${user.findPassword}`, data)
}

//修改登录密码
export const _updatePassword = (data) => {
  return AuthHttp.post(`${user.updatePassword}`, data)
}

//绑定邮箱
export const _bindEmail = (data) => {
  return AuthHttp.post(`${user.bindEmail}`, data)
}

//修改绑定邮箱
export const _updateEmail = (data) => {
  return AuthHttp.post(`${user.updateEmail}`, data)
}

//修改昵称
export const _updateNickName = (data) => {
  return AuthHttp.post(`${user.updateNickName}`, data)
}

//发送邮箱验证码
export const _sendEmailCodeByAddress = (data) => {
  return GeneralHttp.post(`${user.sendEmailCodeByAddress}`, data)
}

//抽奖信息
export const _turntableInfo = () => {
  return AuthHttp.post(`${user.turntableInfo}`)
}

//抽奖
export const _turntableDraw = (data) => {
  return AuthHttp.post(`${user.turntableDraw}`, data)
}

//抽奖记录
export const _turntableRecord = (data) => {
  return AuthHttp.post(`${user.turntableRecord}`, data)
}

//抽奖次数
export const _turntableTimes = (data) => {
  return AuthHttp.post(`${user.turntableTimes}`, data)
}

//中奖记录
export const _turntableRecordAll = (data) => {
  return AuthHttp.post(`${user.turntableRecordAll}`, data)
}

//上传文件
export const _uploadFile = (data) => {
  return AuthHttp.post(`${user.upload}`, data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

//修改头像
export const _updateAvatar = (data) => {
  return AuthHttp.post(`${user.updateAvatar}`, data)
}