<template>
  <div class="notice">
    <div class="head">
      <div class="head-left">
        <div class="tab" :class="{on:tabActive==='SYSTEM_BULLETIN'}" @click="handleTab('SYSTEM_BULLETIN')">
          <van-badge>
            {{$t('my.desc71')}}
          </van-badge>
        </div>
        <div class="tab" :class="{on:tabActive==='NEWS_TICKER'}" @click="handleTab('NEWS_TICKER')">
          <van-badge>
            {{$t('my.desc72')}}
          </van-badge>
        </div>
      </div>
      <!-- <div class="head-right">
        <div class="btn">
          {{$t('my.desc98')}}
        </div>
      </div> -->
    </div>
    <div class="body">
      <keep-alive>
        <component :is="curCom" :title="tabActive==='SYSTEM_BULLETIN'?$t('my.desc71'):$t('my.desc72')" :code="tabActive"
          :id="detailId" @detail="handleDetail" @back="curCom=NoticeList" />
      </keep-alive>
    </div>
  </div>
</template>
<script setup>
import NoticeList from './components/NoticeList'
import NoticeDetail from './components/NoticeDetail';
import { ref, markRaw, shallowRef } from 'vue'
import { _getBulletinType, _getByPageAndLikeAndOrder, } from '@/utils/api/common'
const tabActive = ref('SYSTEM_BULLETIN') //SYSTEM_BULLETIN  NEWS_TICKER
let curCom = shallowRef(NoticeList)

function handleTab(tab) {
  tabActive.value = tab
  curCom.value = NoticeList
}


const detailId = ref(null)
function handleDetail(id) {
  curCom.value = NoticeDetail
  detailId.value = id

}

</script>


<style lang='scss' scoped>
.notice {
  .head {
    margin-bottom: 0.2rem;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;

    &-left {
      display: flex;
    }

    .tab {
      margin-right: 0.12rem;
      height: 0.4rem;
      padding: 0 0.34rem;
      color: var(--gg-btn-text);
      display: flex;
      align-items: center;
      cursor: pointer;
      border-radius: 0.1rem;
      font-family: 'PingFang SC';
      font-style: normal;
      font-weight: 400;
      font-size: 0.14rem;
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

    .btn {
      height: 0.44rem;
      padding: 0 0.14rem;
      color: var(--btn-text-2);
      background: var(--btn-bg-2);
      display: flex;
      align-items: center;
      cursor: pointer;
      border-radius: 0.04rem;
      font-size: 0.16rem;

      &:hover {
        background: var(--btn-bg-active);
        color: var(--btn-text-active);
      }

    }
  }

  .body {
    border-radius: 0.2rem;
    box-sizing: border-box;
    padding: 0.24rem;
    background: var(--gg-card-bg);

  }
}

@media (max-width:749px) {
  .notice {
    .head {
      margin-top: 0.16rem;
      margin-bottom: 0.12rem;

      .tab {
        margin-right: 0;
        background: none;
        height: 0.32rem;
        font-size: 0.14rem;
        border-radius: 0.08rem;
        padding: 0 0.26rem;
      }

      .btn {
        background: none;
        height: 0.24rem;
        font-size: 0.14rem;
        padding: 0;
        border-radius: 0;

      }
    }

    .body {
      padding: 0;
      background: none;
      box-shadow: none;

    }
  }
}
</style>