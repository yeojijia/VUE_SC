
import { createApp } from "vue";
import App from "./App.vue";
import './plugins/spop/spop.min'
import router from "./router";
import store from "./store";
import { Toast, Dialog } from "vant";
import { vant } from "./plugins/vant";
import '@vant/touch-emulator';
// 引入模块后自动生效
import 'vue3-draggable-resizable/dist/Vue3DraggableResizable.css'
import 'swiper/swiper.scss'
import 'swiper/modules/autoplay/autoplay.scss'
import 'swiper/modules/pagination/pagination.scss'
import './plugins/spop/spop.min.css'
import './styles/rest.css'
import './styles/font.css'
import './styles/root.css'
import './styles/common.css'

import _ from 'lodash'
import i18n from "./i18n/index";
// import './styles/font/index.css'
import './assets/fonts/fonts.css'
import glComponent from "./components/index";
import contract from "./contract";
// import VueDOMPurifyHTML from 'vue-dompurify-html'
import directive from './utils/directive'
import echarts from './plugins/echarts.min'
import VueLuckyCanvas from '@lucky-canvas/vue'
import URL from "./utils/urls";
import common from './utils/common'
import xss from 'xss';
import './assets/js/rem'
import Vue3DraggableResizable from 'vue3-draggable-resizable'



Toast.allowMultiple()

const app = createApp(App);

app.config.globalProperties = {
  $contract: contract,
  $toast: Toast,
  $dialog: Dialog,
  $echarts: echarts,
  $i18n: i18n,
  $t: i18n.global.t,
  // $get: get,
  // $post: post,
  $_: _,
  URL,
  $common: common,
  $xss: xss
};

vant(app);
directive(app)
app.use(store).use(router).use(i18n).use(glComponent).use(VueLuckyCanvas).use(Vue3DraggableResizable).mount("#app");

