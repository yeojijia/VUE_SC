<template>
  <van-popup v-model:show="_show" :position="isMobile?'bottom':'right'" class="setting-popup popup-transparent">
    <div class="head">
      <div class="back" @click="store.commit('SET_SETTING_FORM_SHOW',false)"> <van-icon name="arrow-left" /></div>
      <div class="tabs">
        <van-tabs v-model:active="active" shrink swipe-threshold>
          <van-tab v-for="item of tabs" :key="item.id" :name="item.id">
            <template #title>
              {{item.name}}
            </template>
          </van-tab>
        </van-tabs>
      </div>
    </div>
    <div class="popup-con">
      <div class="cross">
        <van-icon name="cross" @click="store.commit('SET_SETTING_FORM_SHOW',false)" />
      </div>
      <div class="popup-top">
        <div class="tabs-con">
          <van-tabs v-model:active="active" shrink swipe-threshold>
            <van-tab v-for="item of tabs" :key="item.id" :name="item.id">
              <template #title>
                {{item.name}}
              </template>
            </van-tab>
          </van-tabs>
        </div>
      </div>
      <div class="content">
        <keep-alive :exclude="['Withdraw']">
          <component :is="curCom" />
        </keep-alive>
      </div>
    </div>
  </van-popup>
</template>
<script setup>
import LoginSetting from './components/LoginSetting';
import FunSetting from './components/FunSetting';
import EmailSetting from './components/EmailSetting';
import PhoneSetting from './components/PhoneSetting'
import GoogleSetting from './components/GoogleSetting'
import { ref, computed, getCurrentInstance, markRaw } from 'vue'
import { useStore } from 'vuex';
const store = useStore()
const isMobile = computed(() => store.state.global.isMobile)
const { proxy } = getCurrentInstance()
const props = defineProps({
  show: Boolean
})
const emit = defineEmits(["update:show"])
const _show = computed({
  get: () => {
    return props.show;
  },
  set: (e) => {
    emit("update:show", e);
    if (!e) {
      proxy.$toast.clear()
    }
  },
});
const active = computed({
  get() {
    return store.state.user.settingFormType
  },
  set(type) {
    store.commit('SET_SETTING_FORM_TYPE', type)
  }
})
const curCom = computed(() => {
  switch (active.value) {
    case 'login':
      return markRaw(LoginSetting)
    case 'fun':
      return markRaw(FunSetting)
    case 'email':
      return markRaw(EmailSetting)
    case 'phone':
      return markRaw(PhoneSetting)
    case 'google':
      return markRaw(GoogleSetting)
  }
})


let tabs = ref([
  {
    id: 'login',
    name: proxy.$t('user.desc56'),
  },
  {
    id: 'fun',
    name: proxy.$t('user.desc57'),
  },
  {
    id: 'email',
    name: proxy.$t('user.desc58'),
  },
  // {
  //   id: 'phone',
  //   name: proxy.$t('user.desc59'),
  // },
  {
    id: 'google',
    name: proxy.$t('user.desc60'),
  },
])

function handleTabClick(type) {
  store.dispatch('setSettingFormShow', {
    type
  })
}

</script>


<style lang='scss' scoped>
.head {
  display: none;
}

.tabs {
  margin-top: 0.5rem;
  display: flex;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 1px;
    background: var(--gg-line);
  }

  .tab {
    padding: 0.15rem 0;
    margin-right: 0.3rem;
    font-family: 'PingFang SC';
    font-style: normal;
    font-weight: 400;
    font-size: 0.16rem;
    line-height: 0.22rem;
    color: var(--gg-subtitle);
    border-bottom: 1px solid;
    border-color: transparent;
    cursor: pointer;
    transition: all 0.3s linear;

    &.on {
      color: var(--gg-text);
      border-color: var(--theme);
    }

    &:last-child {
      margin-right: 0;
    }
  }
}

.tabs-con {
  padding-top: 0.5rem;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 1px;
    background: var(--gg-line);
  }
}

:deep {
  .van-tabs__nav {
    background: transparent;
  }

  .van-tabs--line .van-tabs__wrap {
    height: auto;
  }

  .van-tabs__line {
    display: none;
  }

  .van-tabs__nav--line.van-tabs__nav--shrink,
  .van-tabs__nav--line.van-tabs__nav--complete {
    padding: 0;
  }

  .van-tab {
    padding: 0.16rem 0;
    margin-left: 0.3rem;
    font-family: 'PingFang SC';
    font-style: normal;
    font-weight: 400;
    font-size: 0.16rem;
    line-height: 0.22rem;
    color: var(--gg-subtitle);

    &:first-child {
      margin-left: 0;
    }


  }

  .van-tab--active {
    font-weight: 600;
    color: var(--gg-text);
    position: relative;

    &::before {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 1px;
      background: var(--theme);
    }

  }
}

.popup-con {
  width: 90vw;
  max-width: 5rem;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding: 0 0.4rem;
  box-sizing: border-box;
  background: var(--gg-card-bg);

  .cross {
    position: absolute;
    top: 0.3rem;
    right: 0.3rem;
    color: var(--gg-text);
    z-index: 2;

    .van-icon {
      font-size: 0.18rem;
      cursor: pointer;
    }
  }

  .popup-top {
    margin-bottom: 0.2rem;
    box-sizing: border-box;

  }

  .content {
    flex: 1;
    position: relative;
    overflow-y: auto;

  }
}

@media (max-width: 749px) {
  :deep {
    .van-tab {
      margin-left: 0.2rem;
      font-size: 0.14rem;
      line-height: 0.2rem;
      padding: 0.12rem 0;
    }
  }

  .tabs-con {
    padding-top: 0.2rem;
    width: 100%;
  }

  .tabs {
    flex: 1;
    margin-top: 0;

    &::before {
      display: none;
    }

    .tab {
      margin-right: 0;
      padding: 0;
      line-height: 0.2rem;
      font-size: 0.14rem;
    }
  }

  .popup-con {
    flex: 1 1 auto;
    max-width: 100vw;
    width: 100%;
    height: 90vh;
    flex-direction: column;
    z-index: 101;
    position: relative;
    padding: 0.16rem 0.2rem;
    box-sizing: border-box;
    box-shadow: none;
    border-radius: 0.2rem 0.2rem 0 0;

    .cross {
      top: 0.16rem;
      right: 0.16rem;
    }

    .content {
      height: 0;
      flex: 1;
      height: 100%;
      box-sizing: border-box;
      overflow-y: auto;
    }
  }
}
</style>
