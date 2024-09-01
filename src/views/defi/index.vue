<template>
  <div class="defi">
    <div class="com-container">
      <defi-total :info="statisticsInfo" :isLogin="isLogin" />
      <div class="defi-box">
        <div class="box-top">
          <div class="left">
            <div class="title-con">
              <div class="title">{{$t('defi.desc6')}}</div>
              <div class="right-title">
                <span>{{$t('defi.desc7')}}</span>
                <van-switch v-model="isPledge" active-color="#5CD51D" />
              </div>
            </div>
            <van-tabs class="tabs" v-model:active="tabActive" shrink>
              <van-tab :name="item.day" v-for="item of tabs" :key="item.day">
                <template #title>
                  <div class="tab">{{item.name}}</div>
                </template>
              </van-tab>
            </van-tabs>
          </div>
          <div class="right right-title">
            <span>{{$t('defi.desc7')}}</span>
            <van-switch v-model="isPledge" active-color="#36AF51" />
          </div>
        </div>
        <defi-list :list="list" :loading="listIsLoading" :isLogin="isLogin" @pledge="handlePledge" @ransom="handleRansom"
          @cash="handleCash" />
      </div>
      <div class="fixed-con">
        <toast-box-loading :loading="!pledgeShow && itemInfo.pledgeloading && handleType === 1"
          :text="$t('defi.desc20')" />
        <toast-box-loading :loading="!pledgeShow && itemInfo.ransomloading && handleType === 2"
          :text="$t('defi.desc27')" />
        <toast-box-loading :loading="!cashShow && cashInfo.cashloading" :text="$t('defi.desc32')" />
      </div>
    </div>
  </div>
  <defi-pledge-popup v-model:show="pledgeShow" v-model:amount="pledgeAmount" :info="itemInfo"
    @confirm="handlePledgeConfirm" />
  <defi-ransom-popup v-model:show="ransomShow" v-model:amount="ransomAmount" :info="itemInfo"
    @confirm="handleRansomConfirm" />
  <defi-cash-popup v-model:show="cashShow" :info="cashInfo" @confirm="handleCashConfirm" />
</template>
<script setup>
import DefiTotal from "./components/DefiTotal";
import DefiList from './components/DefiList'
import DefiPledgePopup from "./components/DefiPledgePopup";
import DefiRansomPopup from './components/DefiRansomPopup'
import DefiCashPopup from "./components/DefiCashPopup";
import ToastBoxLoading from './components/ToastBoxLoading'
import { onMounted, ref, getCurrentInstance, watch, computed } from "vue";
import { useStore } from "vuex";
import { _type, _page, _deposit, _receive, _redemption, _statistics, } from '@/utils/api/defi'

import { _ads, _articlesPage } from '@/utils/api/common'
import { _coinBalance } from '@/utils/api/money'

const { proxy } = getCurrentInstance();
const store = useStore();

const isLogin = computed(() => store.getters.isLogin)




//统计
const statisticsInfo = ref({})

function getStatistics() {
  _statistics().then(res => {
    statisticsInfo.value = res
  })
}

const isPledge = ref(false)
const tabActive = ref(null)
//分类
let tabs = ref([])
function getTypeList() {
  _type().then(res => {
    tabs.value = res
    tabActive.value = res[0].day
  })
}
watch(() => {
  return {
    tabActive: tabActive.value,
    isPledge: isPledge.value
  }
}, () => {
  getPage()
})
//列表
let list = ref([]);
let listIsLoading = ref(false)
function getPage() {
  const data = {
    lockTimes: tabActive.value,
    isPledge: isPledge.value,
    page: 1,
    pageSize: 100
  }
  if (listIsLoading.value) return
  list.value = []
  listIsLoading.value = true
  _page(data).then(res => {
    list.value = res.list
  }).finally(() => {
    listIsLoading.value = false
  })
}


//pledge&ransom
let pledgeShow = ref(false);
let handleType = ref(1); //1：质押 2：解押
let pledgeAmount = ref("");
let itemIndex = ref(null);
let itemInfo = ref({});
async function handlePledge(item, index) {
  if (!isLogin.value) {
    spop({
      template: proxy.$t('common.desc4'),
      style: 'info',
      group: 'login-prompt',
      autoclose: 2000
    })
    return
  }
  itemInfo.value = item;
  itemIndex.value = index;
  pledgeShow.value = true;
  handleType.value = 1;
  itemInfo.value.pledgeloading = false;
  _coinBalance(item.pledgeCoin.id).then(res => {
    itemInfo.value.balance = res
  })
}
async function handlePledgeConfirm() {
  // 发起质押
  if (itemInfo.value.pledgeloading) return;
  itemInfo.value.pledgeloading = true;
  _deposit({
    amount: Number(pledgeAmount.value),
    pledgeProductId: itemInfo.value.id
  }).then(res => {
    if (res === 'success') {
      spop({
        template: proxy.$t('defi.desc33'),
        style: 'success',
        autoclose: 2000
      })
      pledgeShow.value = false;
      getPage()
      store.dispatch('getTotalBalance')
    }
  }).finally(() => {
    itemInfo.value.pledgeloading = false
  })
}


//赎回解押
const ransomShow = ref(false)
const ransomAmount = ref('')
function handleRansom(item, index) {
  if (!isLogin.value) {
    spop({
      template: proxy.$t('common.desc4'),
      style: 'info',
      group: 'login-prompt',
      autoclose: 2000
    })
    return
  }
  ransomShow.value = true;
  itemInfo.value = item;
  itemIndex.value = index;
  itemInfo.value.ransomloading = false;
  _coinBalance(item.pledgeCoin.id).then(res => {
    itemInfo.value.balance = res
  })
}
async function handleRansomConfirm() {
  if (itemInfo.value.ransomloading) return;
  itemInfo.value.ransomloading = true;
  _redemption({
    amount: Number(ransomAmount.value),
    pledgeProductId: itemInfo.value.id
  }).then(res => {
    if (res === 'success') {
      spop({
        template: proxy.$t('defi.desc34'),
        style: 'success',
        autoclose: 2000
      })
      ransomShow.value = false;
      getPage()
      store.dispatch('getTotalBalance')
    }
  }).finally(() => {
    itemInfo.value.ransomloading = false
  })
}


//领取
//Receive
let cashShow = ref(false);
let cashIndex = ref(null);
let cashInfo = ref({});
function handleCash(item, index) {
  if (!isLogin.value) {
    spop({
      template: proxy.$t('common.desc4'),
      style: 'info',
      group: 'login-prompt',
      autoclose: 2000
    })
    return
  }
  cashInfo.value = item;
  cashIndex.value = index;
  cashShow.value = true;
  cashInfo.value.cashloading = false;
}
function handleCashConfirm() {
  if (cashInfo.value.cashloading) return;
  cashInfo.value.cashloading = true;

  _receive({
    amount: Number(cashInfo.value.userPendingAmount),
    pledgeProductId: cashInfo.value.id
  }).then(res => {
    if (res === 'success') {
      spop({
        template: proxy.$t('defi.desc35'),
        style: 'success',
        autoclose: 2000
      })
      cashShow.value = false;
      getPage()
      store.dispatch('getTotalBalance')
    }
  }).finally(() => {
    cashInfo.value.cashloading = false
  })

}





onMounted(async () => {
  getTypeList()
  getStatistics()
});
</script>

<style lang="scss" scoped>
.fixed-con {
  position: fixed;
  top: 10vh;
  right: 0.3rem;
  z-index: 2;
}

.defi-box {
  width: 100%;
  padding-top: 0.36rem;

  .box-top {
    margin-bottom: 0.02rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .left {
      padding-right: 0.2rem;
      display: flex;
      flex-direction: column;

      .title-con {
        .right-title {
          display: none;
        }
      }

      .title {
        font-family: 'Venryn Sans';
        font-weight: 900;
        font-style: normal;
        font-weight: 400;
        font-size: 0.2rem;
        line-height: 1.4em;
        color: var(--gg-text);
        text-transform: uppercase
      }

      .tabs {
        margin-top: 0.12rem;

        .tab {
          min-width: 1.2rem;
          height: 0.4rem;
          border-radius: 0.1rem;
          padding: 0 0.3rem;
          box-sizing: border-box;
          font-family: 'PingFang SC';
          font-style: normal;
          font-weight: 400;
          font-size: 0.14rem;
          line-height: 1.5em;
          border: 1px solid;
          display: flex;
          align-items: center;
          justify-content: center;
          white-space: nowrap;
          color: var(--gg-btn-text);
          border: 1px solid transparent;

          &:hover {}
        }

        :deep {
          .van-tabs__nav {
            padding-left: 0;
            background-color: transparent;
            padding-bottom: 0;
          }

          .van-tabs__line {
            display: none;
          }

          .van-tabs__wrap {
            height: auto;
          }

          .van-tab--shrink {
            padding: 0;

            &:first-child {
              padding-left: 0;
            }
          }

          .van-tab--active {
            .tab {
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

    .right-title {
      margin-left: 0.2rem;
      align-self: flex-end;
      margin-left: 0.15rem;
      display: flex;

      span {
        margin-right: 1em;
        font-family: 'PingFang SC';
        font-style: normal;
        font-weight: 400;
        font-size: 0.16rem;
        line-height: 0.22rem;
        color: var(--gg-btn-text);

      }

      :deep {
        .van-switch {
          flex: 0 0 auto;
          font-size: 0.22rem;
        }
      }
    }
  }
}

@media screen and (max-width: 768px) {
  .defi-box {
    padding-top: 0.12rem;

    .box-top {


      .left {
        padding-right: 0;
        width: 100%;

        .title {
          font-size: 0.16rem;
        }

        .title-con {
          display: flex;
          justify-content: space-between;

          .right-title {
            display: flex;

            span {
              margin-right: 0.08rem;
              font-size: 0.12rem;
              line-height: 0.17rem;
            }

            :deep {
              .van-switch {
                font-size: 0.16rem;
              }
            }
          }
        }



        .tabs {

          .tab {
            min-width: 0.88rem;
            padding: 0 0.16rem;
          }
        }


      }

      .right {
        display: none;
      }
    }
  }
}
</style>
<style>
.a-popup {
  max-width: 50vw;
}
</style>
