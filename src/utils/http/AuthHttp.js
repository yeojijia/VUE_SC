import axios from 'axios';
import Qs from 'qs'
import configs from '../configs';
import store from '@/store';
import i18n from '@/i18n'
const $t = i18n.global.t
const AuthHttp = axios.create({
  timeout: 30000,
  baseURL: process.env.VUE_APP_BASE_URL
});
function generateReqKey(config) {
  const { method, url, params, data } = config;
  return [method, url, Qs.stringify(params), Qs.stringify(data)].join("&");
}
const pendingRequest = new Map();
function addPendingRequest(config) {
  const requestKey = generateReqKey(config);
  config.cancelToken = config.cancelToken || new axios.CancelToken((cancel) => {
    if (!pendingRequest.has(requestKey)) {
      pendingRequest.set(requestKey, cancel);
    }
  });
}
function removePendingRequest(config) {
  const requestKey = generateReqKey(config);
  if (pendingRequest.has(requestKey)) {
    const cancelToken = pendingRequest.get(requestKey);
    cancelToken(requestKey);
    pendingRequest.delete(requestKey);
  }
}

const authorizeToken = (config) => new Promise((resolve, reject) => {
  removePendingRequest(config, reject); // 检查是否存在重复请求以及是否登录，若存在则取消已发的请求
  addPendingRequest(config); // 把当前请求信息添加到pendingRequest对象中
  resolve(config);
});

AuthHttp.interceptors.request.use(
  (config) => new Promise((resolve) => {
    const {
      access_token = '',
    } = localStorage.tokenInfo ? JSON.parse(localStorage.tokenInfo) : {};
    config.headers = {
      ...config.headers,
      'Accept-Language': localStorage.lang ? localStorage.lang : 'zh',
      client: 'app',
    };
    if (access_token) {
      config.headers.Authorization = `Bearer ${access_token}`
    }
    removePendingRequest(config); // 检查是否存在重复请求，若存在则取消已发的请求
    addPendingRequest(config); // 把当前请求信息添加到pendingRequest对象中
    resolve(config);
  })
  ,
  (error) => {
    Promise.error(error);
  },
);


AuthHttp.interceptors.response.use(
  (res) => {
    removePendingRequest(res.config); // 从pendingRequest对象中移除请求
    if (res.status === 200) {
      const data = res.data
      if (data.code === 0) {
        return data.data
      } else if (data.code === 501) {
        spop({
          template: $t('common.desc4'),
          style: 'info',
          group: 'login-prompt',
          autoclose: 2000
        })
        return Promise.reject()
      }
      else if (data.code === 20037) {
        spop({
          template: data.msg,
          style: 'error',
          group: 'http-error',
          autoclose: 2000
        })
      } else {
        if (data.msg) {
          spop({
            template: data.msg,
            style: 'error',
            group: 'http-error',
            autoclose: 2000
          })
        }
        return Promise.reject()
      }
    } else {
      return Promise.reject()
    }
  },
  (error) => {
    removePendingRequest(error.config || {}); // 从pendingRequest对象中移除请求
    if (error.response && error.response.status === 401) {
      store.dispatch('clearLoginInfo')
      spop({
        template: $t('common.desc3'),
        group: 'Expired',
        style: 'error',
        autoclose: 2000
      })
    } else if (error.response) {
      spop({
        template: error.response.data.msg,
        group: 'http-error',
        style: 'error',
        autoclose: 2000
      })
    } else {
      // spop({
      //   template: error.message,
      //   style: 'error',
      //   autoclose: 2000
      // })

    }
    return Promise.reject()
  },
);

export default AuthHttp;
