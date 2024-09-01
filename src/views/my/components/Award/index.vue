<template>
  <div class="award">
    <award-info :info="teamInfo" />
    <award-earnings :info="teamInfo" />
    <div class="list-con">
      <div class="tabs">
        <div class="tab" :class="{on:tabActive===item.id}" v-for="item of tabs" :key="item.id"
          @click="tabActive = item.id"> {{item.name}}</div>
      </div>
      <component :is="curCom" :rebateVoList="teamInfo.rebateVoList" :teamList="teamInfo.teamList" />
    </div>
  </div>
</template>
<script setup>
import AwardInfo from './components/AwardInfo'
import AwardEarnings from './components/AwardEarnings'
import EarningsList from './components/EarningsList'
import TeamList from './components/TeamList'
import { _teamInfo } from '@/utils/api/invite'
import { ref, getCurrentInstance, computed, markRaw, onMounted } from 'vue'
const { proxy } = getCurrentInstance()
const tabs = ref([
  {
    id: 1,
    name: proxy.$t('invite.desc40'),
    com: markRaw(EarningsList)
  },
  {
    id: 2,
    name: proxy.$t('invite.desc41'),
    com: markRaw(TeamList)
  },
])
const tabActive = ref(1)
const curCom = computed(() => {
  return tabs.value.find(item => item.id === tabActive.value).com
})

const teamInfo = ref({})
function getTeamInfo() {
  _teamInfo().then(res => {
    teamInfo.value = res
    teamInfo.value.inviteUrl = `${window.location.origin}?inviteCode=${res.inviteCode}`
  })
}
onMounted(() => {
  getTeamInfo()
})
</script>


<style lang='scss' scoped>
.award {
  width: 100%;

  .list-con {
    margin-top: 0.16rem;
    border-radius: 0.2rem;
    padding: 0.24rem;
    box-sizing: border-box;
    background: var(--gg-card-bg);

    .tabs {
      margin-bottom: 0.16rem;
      display: flex;

      .tab {
        height: 0.36rem;
        margin-right: 0.16rem;
        border-radius: 0.08rem;
        font-family: 'PingFang SC';
        font-style: normal;
        font-weight: 400;
        font-size: 0.14rem;
        padding: 0 0.16rem;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        cursor: pointer;
        color: var(--gg-btn-text);
        border: 1px solid transparent;

        &:last-child {
          margin-right: 0;
        }


        &.on {
          font-weight: 600;
          background: var(--gg-tab-btn-bg);
          border-color: var(--gg-tab-btn-border);
          box-shadow: var(--gg-tab-btn-shadow);
          color: var(--gg-text);
        }

      }

    }
  }
}

@media (max-width:749px) {
  .award {
    height: 100%;
    padding-bottom: 0.4rem;
    overflow-y: auto;

    .list-con {
      padding: 0.16rem;
      border-radius: 0.12rem;

      .tabs {
        margin-bottom: 0.12rem;

        .tab {
          margin-right: 0.08rem;
          height: 0.32rem;
          font-size: 0.14rem;
          padding: 0 0.12rem;
        }
      }

    }
  }
}
</style>