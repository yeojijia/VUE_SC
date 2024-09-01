import BigNumber from "bignumber.js";
import CryptoJS from "crypto-js";
import md5 from "js-md5";
import { decode, encode } from 'js-base64';
import config from './configs'
import {
  Toast
} from 'vant'
export default {
  //转换时间为当前时区时间
  toTimeZone(time, format) {
    let date = new Date(time);
    let offset = date.getTimezoneOffset() * 60000;
    let localTime = date.getTime() - offset;
    let localTimeDate = new Date(localTime)
    let YYYY = localTimeDate.getFullYear()
    let MM = localTimeDate.getMonth() + 1
    let DD = localTimeDate.getDate()
    let hh = localTimeDate.getHours()
    let mm = localTimeDate.getMinutes()
    let ss = localTimeDate.getSeconds()
    if (MM < 10) {
      MM = `0${MM}`
    }
    if (DD < 10) {
      DD = `0${DD}`
    }
    if (hh < 10) {
      hh = `0${hh}`
    }
    if (mm < 10) {
      mm = `0${mm}`
    }
    if (ss < 10) {
      ss = `0${ss}`
    }
    if (format === 'YYYY-MM-DD') {
      return `${YYYY}-${MM}-${DD}`
    } else {
      return `${YYYY}-${MM}-${DD} ${hh}:${mm}:${ss}`
    }
  },
  //获取随机数 m为长度 n为数量
  getRandomInts(m, n) {
    let arr = []
    while (arr.length < n) {
      let randomInt = Math.floor(Math.random() * m)
      if (arr.indexOf(randomInt) === -1) {
        arr.push(randomInt)
      }
    }
    return arr.sort((n1, n2) => n1 - n2)
  },
  letterHasNum(name) {
    return /\d/.test(name)
  },
  // 生成id
  createId() {
    return (
      Date.parse(new Date()) / 1000 + (Math.floor(Math.random() * (9999 - 1000)) + 1000).toString()
    )
  },
  // 判断当前设备是否为移动端
  isMobile() {
    let flag =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
    const clientWidth = document.documentElement.clientWidth;
    if (clientWidth < 750) {
      flag = true
    }
    return flag;
  },

  //  时间格式
  moment(date = new Date(), type = 'YYYY') {
    class Moment {
      constructor(date) {
        this.date = date
      }
      returnZero(num) {
        return num * 1 < 10 ? `0${num}` : num
      }
      before(day) {
        let time = this.date.getTime()
        time -= day * 24 * 60 * 60 * 1000
        this.date = new Date(time)
        return this
      }
      format(str) {
        let time = this.date
        const YYYY = time.getFullYear()
        const MM = time.getMonth() + 1
        const DD = time.getDate()
        const hh = time.getHours()
        const mm = time.getMinutes()
        const ss = time.getSeconds()
        const obj = {
          YYYY,
          MM,
          DD,
          hh,
          mm,
          ss
        }
        for (let key in obj) {
          const reg = new RegExp(key)
          const val = this.returnZero(obj[key])
          str = str.replace(reg, () => val)
        }
        return str
      }
    }
    return new Moment(date)
  },
  whatsapp_share(url, name) {
    // const curHref = window.location.href;
    // content是自己定义的一些需要分享的内容;
    let content = name;

    content += '\n' + url;
    if (!this.isMobile()) {
      spop({
        template: '请在手机上操作',
        style: 'info',
        autoclose: 2000
      })
    } else {
      // 调起 WhatsApp,自己选择联系人进行内容分享
      let shareLink = 'whatsapp://send?text=' + encodeURIComponent(content);
      // 调起 WhatsApp 给指定手机号发消息
      // let toSomeoneLink = 'whatsapp://send?phone=' + url + '&text='+ encodeURIComponent(content);
      window.location.href = shareLink;
      // 如果用户没有安装APP，则提示用户去安装APP
      // setTimeout(() => {
      //   window.location.href = 'https://www.whatsapp.com/';
      // }, 2000);
    }
  },

  //输入金额正则过滤
  amountFloat(val) {
    let sNum = val.toString(); //先转换成字符串类型
    if (sNum.indexOf('.') == 0) { //第一位就是 .
      sNum = '0' + sNum
    }
    sNum = sNum.replace(/[^\d.]/g, ""); //清除“数字”和“.”以外的字符
    sNum = sNum.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
    sNum = sNum.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
    sNum = sNum.replace(/^(\-)*(\d+)\.(\d\d\d\d).*$/, '$1$2.$3'); //只能输入4个小数
    //以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
    if (sNum.indexOf(".") < 0 && sNum != "") {
      sNum = parseFloat(sNum);
    }
    return sNum
  },
  mdpassword(data) {
    return md5(data);
  },
  toFixed(num, k) {
    return parseFloat(num).toFixed(k)
  },
  // 加密
  encrypt(word) {
    const key = CryptoJS.enc.Utf8.parse(config.secretKey);
    const iv = CryptoJS.enc.Utf8.parse(config.secretKey); // 偏移量
    const srcs = CryptoJS.enc.Utf8.parse(word);

    const encrypted = CryptoJS.AES.encrypt(srcs, key, {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    return encode(encrypted.toString())
  },
  // 解密
  decrypt(word) {
    const key = CryptoJS.enc.Utf8.parse(config.secretKey);
    const iv = CryptoJS.enc.Utf8.parse(config.secretKey); // 偏移量
    const decodeBase64 = decode(word);
    const decrypt = CryptoJS.AES.decrypt(decodeBase64, key, {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    return CryptoJS.enc.Utf8.stringify(decrypt).toString();
  },
  //  加密方法
  aes(word) {
    const key = CryptoJS.enc.Utf8.parse(config.secretKey);
    const iv = CryptoJS.enc.Utf8.parse(config.secretKey);
    let srcs = CryptoJS.enc.Utf8.parse(word);
    let encrypted = CryptoJS.AES.encrypt(srcs, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    // return encrypted.toString();
    return encrypted.ciphertext.toString();
  },
  //  解密方法
  //  data：要解密的字符串
  //  key：加密因子
  //  iv：偏移量
  ads(data) {
    const key = CryptoJS.enc.Utf8.parse(config.secretKey); // 加密因子
    const iv = CryptoJS.enc.Utf8.parse(config.secretKey); // 偏移量
    let encryptedHexStr = CryptoJS.enc.Hex.parse(data);

    let str = CryptoJS.enc.Base64.stringify(encryptedHexStr)

    let decrypted = CryptoJS.AES.decrypt(str, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC, // AES加密模式
      padding: CryptoJS.pad.Pkcs7 // 填充:  pkcs7 paddin
    })
    return CryptoJS.enc.Utf8.stringify(decrypted).toString();
    return decrypted.toString(CryptoJS.enc.Utf8).toString()
  },
  sign(obj) {
    let apiSecret = "test";
    if (process.env.NODE_ENV == 'production') {
      // apiSecret = "32e7847376f90a180b0c18a1f4e644a5";
      apiSecret = "XWQofMQvjgqKv0TR";
    }
    var keys = [];
    for (let key in obj) {
      keys.push(key);
    }

    keys.sort();
    let strTemp = '';
    for (let k in keys) {
      let value = obj[keys[k]];
      if ('string' != typeof value) {
        value = JSON.stringify(value);
      }
      strTemp += keys[k] + '=' + value + '&';
    }
    strTemp = strTemp.replace(/&$/, ""); //去掉最后的逗号
    return CryptoJS.HmacSHA256(strTemp, apiSecret).toString();
  },
  GetRandomNum(min, max) {
    var range = max - min;
    var rand = Math.random();
    return min + Math.round(rand * range);
  },
  //输出n位小数
  decal(num, n) {
    if (num) {
      const index = num.toString().indexOf('.')
      if (index > -1) {
        return Number(num.toString().substring(0, index + n + 1))
      } else {
        return num
      }
    } else {
      return num
    }
  },
  // 判断app环境
  getPlatform() {
    let p = navigator.platform;
    let u = navigator.userAgent;
    let is_android = u.indexOf("Android") > -1 || u.indexOf("Linux") > -1;
    let is_ios = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    if (is_android) {
      //Android终端
      return "ANDROID";
    } else if (is_ios) {
      //IOS终端
      return "IOS";
    } else {
      return "pc"
    }
  },

  isEmail(email) {
    let reg = /^[a-zA-Z0-9]+([-_.][A-Za-zd]+)*@([a-zA-Z0-9]+[-.])+[A-Za-zd]{2,5}$/
    return reg.test(email)
  },
  openUrl(url) {
    if (url && url.replace(/\s+/g, '')) window.open(url.replace(/\s+/g, ''))

  },
  debounce(fn, wait) {

    let timeout = null;      //定义一个定时器
    return () => {
      if (timeout !== null)
        clearTimeout(timeout);  //清除这个定时器
      timeout = setTimeout(fn, wait);
    }
  },
  //获取几年之前/后的时间
  getYear(num) {
    const date = new Date();
    const year = date.getFullYear()
    const month = date.getMonth()
    const day = date.getDate()
    return new Date(date.setFullYear(year + num, month, day))
  },
  //获取几月之前/后的时间
  getMonth(num) {
    const date = new Date();
    const month = date.getMonth()
    return new Date(date.setMonth(month + num))
  },
  //除法
  getValueDivided(value, value2) {
    let bg1 = new BigNumber(value);
    let bg2 = new BigNumber(value2);
    let num = bg1.dividedBy(bg2).toFixed();
    return num;
  },
  //乘法
  getValueMultip(value, value2) {
    let params1 = new BigNumber(value);
    let valueDecimals = params1.multipliedBy(value2).toFixed();
    return valueDecimals;
  },
  // 减法
  getValueMinus(value, value2) {
    let bg1 = new BigNumber(value);
    let bg2 = new BigNumber(value2);
    let num = bg1.minus(bg2).toFixed();
    return num;
  },
  //加法
  getValueAdd(value, value2) {
    var bg1 = new BigNumber(value);
    var bg2 = new BigNumber(value2);
    let num = bg1.plus(bg2).toFixed();
    return num;
  },
};