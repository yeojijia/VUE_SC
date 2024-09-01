let webLang = 'zh'
!function () {
  webLang = navigator.language || navigator.userLanguage;//常规浏览器语言和IE浏览器
  webLang = webLang.substr(0, 2);//截取lang前2位字符
  if (webLang !== 'zh') {
    webLang = 'en'
  }
}()
let lang = localStorage.getItem("lang") || webLang
export default {
  lang,// 国际化  zh中文健体    en英文
  requestTimeOut: 20000,
  secretKey: 'pigxpigxpigxpigx',
};
