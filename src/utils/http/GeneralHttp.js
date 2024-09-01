import axios from 'axios';
import Qs from 'qs'
const baseURL = process.env.NODE_ENV == 'development' ? '/api' : process.env.VUE_APP_BASE_URL
const GeneralHttp = axios.create({
  timeout: 30000,
  baseURL: process.env.VUE_APP_BASE_URL,
});

// axios.defaults.withCredentials = true
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


GeneralHttp.interceptors.request.use(
  (config) => new Promise((resolve) => {
    config.headers = {
      ...config.headers,
      'Accept-Language': localStorage.lang ? localStorage.lang : 'zh',
      client: 'app',
    };
    removePendingRequest(config); // 检查是否存在重复请求，若存在则取消已发的请求
    addPendingRequest(config); // 把当前请求信息添加到pendingRequest对象中
    resolve(config);
  }),
  (error) => {
    return Promise.error(error)
  },
);

GeneralHttp.interceptors.response.use(
  // 由服务端规定 如果是返回的加密字符串则在res.data.data字段中
  // auth服务的几个接口返回的数据在res.data中 不进行解密
  (res) => {
    removePendingRequest(res.config); // 从pendingRequest对象中移除请求
    if (res.status === 200) {
      const data = res.data
      if (data.code === 1) {
        spop({
          template: data.msg,
          group: 'http-error',
          style: 'error',
          autoclose: 2000
        })
        return Promise.reject(data)
      } else {
        return Promise.resolve(
          res.data.data ? res.data.data : res.data,
        )
      }
    } else {
      return Promise.reject(data)
    }
  },
  (error) => {
    removePendingRequest(error.config || {}); // 从pendingRequest对象中移除请求
    if (error.response) {
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
    return Promise.reject(error);
  },
);

export default GeneralHttp;
