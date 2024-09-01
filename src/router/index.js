import { createRouter, createWebHistory } from "vue-router";
import store from "@/store";
import i18n from '@/i18n'
const $t = i18n.global.t
const routes = [
  {
    path: "/",
    redirect: '/home',
    meta: {
      role: 'sightseer'
    },
  },
  {
    path: "/home",
    name: "home",
    meta: {
      role: 'sightseer'
    },
    component: () => import("@/views/home"),
  },
  {
    path: "/my/:id",
    name: "my",
    meta: {
      role: 'user'
    },
    component: () => import("@/views/my"),
  },
  {
    path: "/my/min",
    name: "myMin",
    meta: {
      role: 'user'
    },
    component: () => import("@/views/my/min"),
  },
  {
    path: "/defi",
    name: "defi",
    meta: {
      role: 'sightseer'
    },
    component: () => import("@/views/defi"),
  },
  {
    path: "/games/:id",
    name: "games",
    meta: {
      role: 'sightseer'
    },
    component: () => import("@/views/games"),
  },
  {
    path: "/sports/:id",
    name: "sports",
    meta: {
      role: 'sightseer'
    },
    component: () => import("@/views/sports"),
  },
  // {
  //   path: "/lotterys/:id",
  //   name: "lotterys",
  //   meta: {
  //     role: 'sightseer'
  //   },
  //   component: () => import("@/views/lotterys"),
  // },
  {
    path: "/games/detail",
    name: "gamesDetail",
    meta: {
      role: 'user',
      hasIframe: true
    },
    component: () => import("@/views/games/detail"),
  },
  {
    path: "/activity",
    name: "activity",
    meta: {
      role: 'sightseer'
    },
    component: () => import("@/views/activity"),
  },
  // {
  //   path: "/lottery",
  //   name: "lottery",
  //   meta: {
  //     role: 'sightseer'
  //   },
  //   component: () => import("@/views/lottery"),
  // },
  {
    path: "/help",
    name: "help",
    meta: {
      role: 'sightseer'
    },
    component: () => import("@/views/help"),
  },
  {
    path: "/help/detail",
    name: "helpDetail",
    meta: {
      role: 'sightseer'
    },
    component: () => import("@/views/help/detail"),
  },
  {
    path: "/404",
    name: "error404",
    meta: {
      role: 'sightseer'
    },
    component: () => import("@/views/error404/error404.vue"),
  },
  {
    path: "/:pathMath(.*)",
    redirect: '/404'
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const isLogin = store.getters.isLogin
  const role = to.meta.role
  if (to.meta.hasIframe) {
    to.meta.lastRouter = from.path
  }
  if (!isLogin && role === 'user') {
    spop({
      template: $t('common.desc4'),
      style: 'info',
      group: 'login-prompt',
      autoclose: 2000
    })
    if (from.meta.role === 'user') {
      next('/')
    } else {
      next(from.fullPath)
    }
  } else {
    next()
  }
})

export default router;
