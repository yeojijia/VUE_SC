import axios from 'axios';
import route from '../../router'
import common from "../common";
axios.defaults.timeout = 60000; //请求超时
axios.defaults.baseURL = process.env.VUE_APP_BASE_URL; //请求base url
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'; //设置post请求是的header信息
//http request 拦截器
axios.interceptors.request.use(
  config => {
    config.headers = {
      ...config.headers,
      'Accept-Language': `zh`,
      client: 'app',
      deviceType: 'H5'
    };
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

axios.interceptors.response.use(
  response => {
    let {
      code,
      message,
      msg
    } = response.data;
    if (code == 0) {
      return Promise.resolve(response.data);
    } else if (code == 401) {
      spop({
        template: msg || message,
        style: 'error',
        autoclose: 2000
      })
      localStorage.removeItem('token');
      setTimeout(() => {
        route.push('/login');
      }, 1500)
    } else {
      msg = message || msg
      spop({
        template: msg,
        style: 'error',
        autoclose: 2000
      })
      return Promise.reject(response)
    }
  },
  err => {

    if (err.code === 'ECONNABORTED' && err.message.indexOf('timeout') !== -1) {
      let message = ''

      let lang = localStorage.getItem('language');
      switch (lang) {
        case 'zh':
          message = '网络异常，连接超时...'
          break;
        case 'en':
          message = 'Network exception, connection timed out...'
          break;
        case 'ru_RU':
          message = 'Сетевое исключение, время ожидания соединения истекло...'
          break;

        default:
          message = 'Желіде ерекше жағдай, қосылым уақыты аяқталды...'
          break;
      }
      spop({
        template: message,
        style: 'error',
        autoclose: 2000
      })
    }
    return Promise.reject(err)
  }
)

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function get(url, params = {}, headers = {}) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params,
      headers: headers
    })
      .then(response => {
        resolve(response.data);
      })
      .catch(err => {
        reject(err)
      })
  })
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url, data = {}, config = {
  isUpload: false
}) {
  return new Promise((resolve, reject) => {
    axios.post(url, data, config)
      .then(response => {
        resolve(response.data);
      }, err => {
        reject(err)
      })
  })
}