<template>
  <div class="member">
    <member-level :levelInfo="levelInfo" :agencyInfo="agencyInfo" />
    <div class="rule-con">
      <div class="tabs">
        <div class="tab" :class="{on:item.id===tabActive}" v-for="item of tabs" @click="tabActive = item.id">
          {{item.name}}</div>
      </div>
      <div class="rule-desc">
        <keep-alive>
          <component :is="curCom" :levelRule="levelInfo.levelVoList" :agencyRule="agencyInfo.levelVoList" />
        </keep-alive>
      </div>
    </div>
  </div>
</template>
<script setup>
import MemberLevel from './components/MemberLevel';
import LevelRule from './components/LevelRule'
import AgentRule from './components/AgentRule'
import { ref, getCurrentInstance, markRaw, onMounted, computed } from 'vue'
import { useStore } from 'vuex';
import { _levelInfo, _agencyInfo } from '@/utils/api/invite'
const { proxy } = getCurrentInstance()
const store = useStore()
let tabs = ref([{
  id: 'vip',
  name: proxy.$t('invite.desc48'),
  com: markRaw(LevelRule)
}, {
  id: 'agent',
  name: proxy.$t('invite.desc49'),
  com: markRaw(AgentRule)
}
])
let tabActive = computed({
  get() {
    return store.state.user.levelType
  },
  set(e) {
    store.commit('SET_LEVEL_TYPE', e)
  }
})
let curCom = computed(() => {
  return tabs.value.find(item => item.id === tabActive.value).com
})

const levelInfo = ref({})
function getLevelInfo() {
  _levelInfo().then(res => {
    levelInfo.value = res
  })
}

const agencyInfo = ref({})
function getAgencyInfo() {
  _agencyInfo().then(res => {
    agencyInfo.value = res
  })

}

onMounted(() => {
  getLevelInfo()
  getAgencyInfo()
})
</script>


<style lang='scss' scoped>
.rule-con {
  margin-top: 0.16rem;
  padding: 0.24rem;
  box-sizing: border-box;
  background: #22242D;
  border-radius: 0.2rem;
  background: var(--gg-card-bg);

  .tabs {
    display: flex;

    .tab {
      height: 0.36rem;
      border-radius: 0.08rem;
      font-family: 'PingFang SC';
      font-style: normal;
      font-weight: 400;
      font-size: 0.14rem;
      padding: 0 0.16rem;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      margin-right: 0.08rem;
      cursor: pointer;
      color: var(--gg-btn-text);
      border: 1px solid transparent;

      &.on {
        font-weight: 600;
        background: var(--gg-tab-btn-bg);
        border-color: var(--gg-tab-btn-border);
        box-shadow: var(--gg-tab-btn-shadow);
        color: var(--gg-text);
      }

      &:last-child {
        margin-right: 0;
      }
    }
  }
}

@media (max-width:749px) {
  .member {
    height: 100%;
    padding-bottom: 0.4rem;
    overflow-y: auto;
  }

  .rule-con {
    margin-top: 0.16rem;
    padding: 0.12rem 0.16rem 0.16rem;
    border-radius: 0.12rem;

    .tabs {
      .tab {
        height: 0.32rem;
        font-size: 0.14rem;
        padding: 0 0.12rem;
        border-radius: 0.08rem;
      }
    }
  }
}
</style>