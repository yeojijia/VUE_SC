<template>
  <van-popup v-model:show="_show" :position="isMobile?'bottom':'right'" class="popup-transparent">
    <div class="head">
      <div class="back" @click="store.commit('SET_MONEY_POPUP_SHOW',false)"> <van-icon name="arrow-left" /></div>
      <div class="tabs">
        <div class="tab" :class="{on:active===item.id}" v-for="item of tabs" :key="item.id"
          @click="handleTabClick(item.id)">
          {{item.name}}</div>
      </div>
    </div>
    <div class="popup-con">
      <div class="cross">
        <van-icon name="cross" @click="store.commit('SET_MONEY_POPUP_SHOW',false)" />
      </div>
      <div class="popup-top">
        <div class="tabs">
          <div class="tab" :class="{on:active===item.id}" v-for="item of tabs" :key="item.id"
            @click="handleTabClick(item.id)">
            {{item.name}}</div>
        </div>
      </div>
      <div class="content">
        <keep-alive :exclude="['Withdraw']">
          <component :is="curCom" :show="_show" :tab="active" />
        </keep-alive>
      </div>
    </div>
  </van-popup>
</template>
<script setup>
import Recharge from './components/Recharge';
import Withdraw from './components/Withdraw';
import Collection from './components/Collection';
import Flash from './components/Flash'
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
const active = computed(() => {
  return store.state.money.moneyPopupType
})
const curCom = computed(() => {
  switch (active.value) {
    case 'recharge':
      return markRaw(Recharge)
    case 'withdraw':
      return markRaw(Withdraw)
    case 'flash':
      return markRaw(Flash)
    case 'collection':
      return markRaw(Collection)
  }
})


let tabs = ref([
  {
    id: 'recharge',
    name: proxy.$t('common.desc1'),
  },
  {
    id: 'withdraw',
    name: proxy.$t('common.desc6'),
  },
  {
    id: 'flash',
    name: proxy.$t('common.desc60'),
  },
  {
    id: 'collection',
    name: proxy.$t('common.desc7'),
  },
])

function handleTabClick(type) {
  store.dispatch('setMoneyPopupShow', {
    show: true,
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
  border-bottom: 1px solid var(--gg-line);


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

.popup-con {
  width: 90vw;
  max-width: 5rem;
  height: 100vh;
  // max-height: 7rem;
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
    // padding: 0 0.1rem;
    box-sizing: border-box;




  }

  .content {
    flex: 1 1 auto;
    position: relative;

  }
}

@media (max-width: 749px) {
  :deep {
    .van-tab {
      margin-left: 0.2rem;
      font-size: 0.14rem;
      line-height: 0.2rem;
    }
  }



  .tabs {
    flex: 1;
    margin-top: 0;

    &::before {
      display: none;
    }

    .tab {
      margin-right: 0.24rem;
      padding: 0.12rem 0;
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

    .popup-top {
      margin-bottom: 0.16rem;
      padding-top: 0.2rem;
      width: 100%;
    }

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
