<template>
  <div class="my">
    <div class="com-container tabs-con">
      <!-- <van-tabs v-model:active="tabActive" shrink swipe-threshold v-if="tabs.length">
        <van-tab v-for="item of tabs" :key="item.id" :name="item.id">
          <template #title>
            <img class="icon" :src="item.icon" />
            {{item.name}}
          </template>
        </van-tab>
      </van-tabs>
      <div class="menu">
        <img class="img" :src="require(`@/assets/images/foottar/${theme}/icon_menu.svg`)" @click.stop="minTabShow=true" />
      </div> -->
    </div>
    <div class="com-container scroll">
      <div class="breadcrumb">
        <span>{{ $t('nav.desc13') }} <van-icon name="arrow" /></span>
        <span>{{ activeName }}</span>
      </div>
      <component :is="comActive" />
    </div>
    <!-- <div class="min-tabs-con" :class="{show:minTabShow}">
      <div class="min-tabs-overlay" @click="minTabShow = false" />
      <div class="tabs">
        <div class="tab" v-for="item of tabs" :key="item.id" :name="item.id" @click="handleItemClick(item.id)">
          <img class="icon" :src="item.icon" />
          {{item.name}}
        </div>
      </div>
    </div> -->
  </div>
</template>
<script setup>

import { ref, computed, getCurrentInstance, markRaw, watch } from 'vue'
import MyOverview from './components/MyOverview'
import MyTrade from './components/MyTrade'
import MyGame from './components/MyGame'
import MyActivity from './components/MyActivity'
import MyNotice from './components/MyNotice'
import Laundry from './components/Laundry'
import Award from './components/Award'
import Member from './components/Member'
import Setting from './components/setting'
import Winnings from './components/Winnings'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
const { proxy } = getCurrentInstance()
const store = useStore()
const router = useRouter()
let theme = computed(() => store.state.global.theme)
const tabs = ref([
  {
    id: '1',
    icon: require('../../assets/images/my/icon_tab1.png'),
    name: proxy.$t('my.desc1'),
    com: markRaw(MyOverview)
  },
  {
    id: '2',
    icon: require('../../assets/images/my/icon_tab2.png'),
    name: proxy.$t('my.desc2'),
    com: markRaw(MyTrade)
  },
  {
    id: '3',
    icon: require('../../assets/images/my/icon_tab3.png'),
    name: proxy.$t('my.desc3'),
    com: markRaw(MyGame)
  },
  {
    id: '4',
    icon: require('../../assets/images/my/icon_tab5.png'),
    name: proxy.$t('my.desc4'),
    com: markRaw(MyNotice)
  },
  {
    id: '5',
    icon: require('../../assets/images/nav/icon_nav_laundry.png'),
    name: proxy.$t('invite.desc1'),
    com: markRaw(Laundry)
  },
  {
    id: '6',
    icon: require('../../assets/images/nav/icon_nav_invite.png'),
    name: proxy.$t('invite.desc2'),
    com: markRaw(Award)
  },
  {
    id: '7',
    icon: require('../../assets/images/nav/icon_nav_member.png'),
    name: proxy.$t('invite.desc3'),
    com: markRaw(Member)
  },
  {
    id: '8',
    icon: require('../../assets/images/nav/icon_nav_winnings.png'),
    name: proxy.$t('my.desc105'),
    com: markRaw(Winnings)
  },
  {
    id: '9',
    icon: require('../../assets/images/nav/icon_nav_setting.png'),
    name: proxy.$t('my.desc104'),
    com: markRaw(Setting)
  },
])
const minTabShow = ref(false)
const tabActive = ref('1')
const comActive = computed(() => {
  return tabs.value.find(item => item.id === tabActive.value).com
})
const activeName = computed(() => {
  return tabs.value.find(item => item.id === tabActive.value).name
})
watch(() => tabActive.value, (e) => {
  if (e) {
    router.push(`/my/${e}`)
  }
})
watch(() => {
  return {
    params: router.currentRoute.value.params,
    path: router.currentRoute.value.fullPath
  }
}, ({ params, path }) => {
  const { id } = params
  if (id && path.indexOf('my') > -1) {
    tabActive.value = id
  }
},
  { immediate: true }
)
function handleItemClick(id) {
  tabActive.value = id
  minTabShow.value = false
}
</script>


<style lang='scss' scoped>
.my {
  margin-top: 0.24rem;
  color: var(--gg-text);



  .breadcrumb {
    margin-bottom: 0.2rem;
    font-family: 'PingFang SC';
    font-style: normal;
    font-weight: 400;
    font-size: 0.14rem;
    line-height: 1.5em;
    color: var(--gg-subtitle);
    display: flex;
    align-items: center;

    :deep {
      .van-icon {
        font-size: 0.16rem;
        margin: 0 0.06rem;
      }
    }

    span {

      &:last-child {
        font-weight: 500;
        color: var(--gg-text);
      }
    }
  }
}

@media (max-width:749px) {
  .my {
    margin-top: 0;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding-top: 0;

    .breadcrumb {
      display: none;
    }



    .scroll {
      flex: 1;
      width: 100%;
      overflow: hidden;
    }

  }
}
</style>