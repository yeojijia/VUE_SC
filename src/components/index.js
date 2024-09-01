import { Swiper, SwiperSlide } from 'swiper/vue/swiper-vue'
import ComImage from './ComImage'
import ComSelect from './ComSelect'
import RulePopup from './RulePopup'
import LoadingBtn from './LoadingBtn'
import ComList from './ComList'
import ComPopup from './ComPopup'
import NoData from './NoData'
import ComCalendar from './ComCalendar'
import ComHead from './ComHead'
import BotPopup from './BotPopup'
import ComDate from './ComDate'
import LoadingNodata from './LoadingNodata'
import CaptchCode from './CaptchCode'
import GameItem from './GameItem'
import GameSearch from './GameSearch'



const components = {
  'swiper': Swiper,
  'swiper-slide': SwiperSlide,
  'com-image': ComImage,
  'com-select': ComSelect,
  'rule-popup': RulePopup,
  'loading-btn': LoadingBtn,
  'com-list': ComList,
  'com-popup': ComPopup,
  'no-data': NoData,
  'com-calendar': ComCalendar,
  'com-head': ComHead,
  'bot-popup': BotPopup,
  'com-date': ComDate,
  'loading-nodata': LoadingNodata,
  'captch-code': CaptchCode,
  'game-item': GameItem,
  'game-search': GameSearch,
};

export default {
  install(app) {
    Object.keys(components).forEach((key) => {
      app.component(key, components[key]);
    });
  },
};
