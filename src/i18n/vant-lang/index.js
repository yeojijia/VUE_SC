import { Locale } from 'vant';
import zh from 'vant/lib/locale/lang/zh-CN';
import en from 'vant/lib/locale/lang/en-US';


const langs = [
  {
    name: 'zh',
    module: zh
  },
  {
    name: 'en',
    module: en
  },
]

export default function locales(lang) {
  for (let i = 0; i < langs.length; i++) {
    const item = langs[i];
    if (item.name === lang) {
      Locale.use(item.name, item.module)
    }

  }
}
