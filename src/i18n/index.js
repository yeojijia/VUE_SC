import en from "./en_US/index";
import zh from "./zh_CN/index";
import ru_RU from "./ru_RU/index"; // 俄语
import ko_KR from "./ko_KR/index"; // 韩语
import ja_JP from "./ja_JP/index"; // 日语
import th_TH from "./th_TH/index"; // 泰语
import ur_UR from "./ur_UR/index"; // 乌尔都语
import es_ES from "./es_ES/index"; // 西班牙语
import in_ID from "./in_ID/index"; // 印度尼西亚语
import vi_VI from "./vi_VI/index"; // 越南语
import vantLang from './vant-lang/index';
import { createI18n } from "vue-i18n";
import configs from '@/utils/configs'
const lang = localStorage.lang ? localStorage.lang : configs.lang
vantLang(lang)
const messages = {
  en,
  zh,
  ru_RU,
  ko_KR,
  ja_JP,
  th_TH,
  ur_UR,
  es_ES,
  in_ID,
  vi_VI,
};

const i18n = createI18n({
  legacy: false,
  // 全局注入 $t 函数
  globalInjection: true,
  locale: lang,
  messages,
  warnHtmlMessage: false
});
export default i18n;
