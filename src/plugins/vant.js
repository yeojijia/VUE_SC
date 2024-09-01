/**
vant组件引用
**/
import {
  Button, Locale, Popup, Icon, Image as VanImage, Loading, Form, Field,
  List, Popover, Search, RadioGroup, Radio, Collapse, CollapseItem, Switch, CountDown, Step, Steps, Checkbox, Calendar, Badge, Tab, Tabs, DatetimePicker, Overlay, PullRefresh, NoticeBar, Swipe, SwipeItem, Progress, Uploader
} from "vant";

// import enUS from 'vant/lib/locale/lang/en-US';
import zhCN from "vant/lib/locale/lang/zh-CN";
// import zhTW from 'vant/lib/locale/lang/zh-TW';
Locale.use("zh-CN", zhCN);
// import 'vant/es/dialog/style';
// import 'vant/es/notify/style';
// import 'vant/es/image-preview/style';
import 'vant/lib/index.css'
// 通过循环去按需引入
export const vant = (app) => {
  [Button, Popup, Icon, VanImage, Loading, List, Popover,
    Search, RadioGroup, Radio, Collapse, CollapseItem, Form, Field, Switch, CountDown, Step, Steps, Checkbox, Calendar, Badge, Tab, Tabs, DatetimePicker, Overlay, PullRefresh, NoticeBar, Swipe, SwipeItem, Progress, Uploader].forEach((e) => {
      app.use(e);
    });
};
