<template>
  <div class="total-handle">
    <div class="total">
      {{$t('my.desc20')}}：<span class="wrap">${{decal(totalBalance,3)}}
        <img @click="getRefresh" :src="require(`../../../../../../../assets/images/common/${theme}/icon_refresh.svg`)" />
      </span>

    </div>
    <div class="handle">
      <div class="btn" @click="handlleAllBalanceToOffice">{{$t('my.desc21')}}</div>
      <div class="btn" @click="handleMoneyShow('flash')">{{$t('my.desc75')}}</div>
      <div class="btn" @click="store.commit('SET_TRANSFER_SHOW',true)">{{$t('common.desc113')}}
      </div>
      <van-popover v-model:show="btnShow" placement="bottom-end">
        <template #reference>
          <img :src="require(`../../../../../../../assets/images/common/${theme}/icon_select_btn.svg`)" />
        </template>
        <div class="options">
          <div class="item" @click="handlleAllBalanceToOffice">{{$t('my.desc21')}}</div>
          <div class="item" @click="handleMoneyShow('flash')">{{$t('my.desc75')}}</div>
          <div class="item" @click="store.commit('SET_TRANSFER_SHOW',true)">{{$t('common.desc113')}}
          </div>
        </div>
      </van-popover>
    </div>
  </div>
  <div class="info-con">
    <div class="srcoll">
      <div class="list">
        <div class="item-con" v-for="(item,index) of list" :key="index">
          <div class="item">
            <img class="bg" src="../../../../../../../assets/images/my/asset_bg.png" />
            <div class="name">{{item.name }}</div>
            <div class="val wrap">{{item.balance}}</div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
<script setup>
import { ref, getCurrentInstance, onMounted, computed } from 'vue'
import { useStore } from 'vuex';
import { _allBalanceToOffice, _getAllPlatformBalance, _getAllPlatformInfo, _transferBalance } from '@/utils/api/game'
const { proxy } = getCurrentInstance()
const decal = proxy.$common.decal
const store = useStore()
let theme = computed(() => store.state.global.theme)
let list = computed(() => store.state.user.platformBalanceList)
let totalBalance = computed(() => store.state.user.gameTotalBalance)

const btnShow = ref(false)
function handleMoneyShow(type) {
  btnShow.value = false
  store.commit('SET_COIN_TYPE', 'digital')
  store.dispatch('setMoneyPopupShow', {
    show: true,
    type
  })
}


function handlleAllBalanceToOffice() {
  btnShow.value = false
  _allBalanceToOffice().then(res => {
    if (res === 'ok') {
      spop({
        template: proxy.$t('user.desc54'),
        style: 'success',
        autoclose: 2000
      })
      getRefresh()
    }
  })
}


//刷新余额
async function getRefresh() {
  btnShow.value = false
  let loadingToast = proxy.$toast.loading({
    duration: 0,
    forbidClick: true,
  });
  Promise.all([store.dispatch('getGameBalanceList'), store.dispatch('getGameTotalBalance'), store.dispatch('getTotalBalance')]).then(res => {

  }).finally(() => {
    loadingToast.clear()
  })

}
onMounted(() => {
  store.dispatch('getGameBalanceList')
  store.dispatch('getGameTotalBalance')
  store.dispatch('getTotalBalance')
})
</script>


<style lang='scss' scoped>
.total-handle {
  margin-top: 0.1rem;
  margin-bottom: 0.15rem;
  display: flex;
  justify-content: space-between;

  .total {
    margin-top: 0.05rem;
    min-height: 0.4rem;
    margin-right: 0.15rem;
    font-family: 'PingFang SC';
    font-style: normal;
    font-weight: 500;
    font-size: 0.18rem;
    line-height: 1.4em;
    color: var(--gg-text);
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    white-space: nowrap;

    span {
      font-family: 'Venryn Sans';
      font-weight: 900;
      font-size: 0.2rem;
      line-height: 1.4em;
      background: var(--gg-btn-bg);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-fill-color: transparent;
    }

    img {
      width: 0.16rem;
      height: 0.16rem;
      object-fit: cover;
      margin-left: 0.15rem;
      cursor: pointer;
    }
  }

  .handle {
    display: flex;


    .btn {
      margin-left: 0.12rem;
      margin-top: 0.05rem;
      cursor: pointer;
      height: 0.36rem;
      min-width: 0.9rem;
      border-radius: 0.08rem;
      padding: 0 0.13rem;
      font-family: 'PingFang SC';
      font-style: normal;
      font-weight: 600;
      font-size: 0.14rem;
      background: var(--gg-btn-bg-common);
      border: 1px solid var(--gg-btn-border-common);
      color: var(--gg-btn-color-common);
      display: flex;
      justify-content: center;
      align-items: center;

      &:first-child {
        margin-left: 0;
      }
    }

    :deep {
      .van-popover__wrapper {
        display: none;
      }
    }

  }
}




.info-con {
  .srcoll {
    height: 4.5rem;
    overflow-y: auto;
  }

  .list {
    display: flex;
    flex-wrap: wrap;
    width: calc(100% + 0.16rem);
    margin-left: -0.08rem;

  }

  .item-con {
    margin-top: 0.16rem;
    width: 25%;
    padding: 0 0.08rem;
    box-sizing: border-box;
  }

  .item {
    height: 100%;
    cursor: pointer;
    padding: 0.16rem;
    box-sizing: border-box;
    // background: url('../../../../../../../assets/images/my/asset_bg.png') no-repeat center;
    background-size: 100% 100%;
    border-radius: 0.08rem;
    display: flex;
    flex-direction: column;
    background: var(--asset-bg);
    box-shadow: var(--asset-shadow);
    border: 1px solid var(--asset-border);
    position: relative;

    .bg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .name {
      font-family: 'PingFang SC';
      font-style: normal;
      font-weight: 400;
      font-size: 0.14rem;
      line-height: 1.5em;
      text-align: center;
      color: var(--gg-text);
    }

    .val {
      text-align: center;
      margin-top: 0.15rem;
      font-family: 'Montserrat';
      font-style: normal;
      font-weight: 800;
      font-size: 0.32rem;
      line-height: 1.2em;
      background: var(--rate-text);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-fill-color: transparent;
    }
  }

}

@media (max-width:1536px) {
  .info {

    &-con {
      .item-con {
        width: 33.33%;
      }
    }
  }
}


@media (max-width:749px) {

  .options {
    border-radius: 0.08rem;
    overflow: hidden;
    background: var(--gg-inp-bg);
    min-height: 0.54rem;
    min-width: 0.75rem;

    .item {
      padding: 0.04rem 0.1rem;
      box-sizing: border-box;
      font-family: 'PingFang SC';
      font-style: normal;
      font-weight: 400;
      font-size: 0.12rem;
      line-height: 0.17rem;
      color: var(--gg-text);

      &:hover {
        background: var(--theme);
      }
    }
  }

  .total-handle {
    align-items: center;

    .total {
      min-height: 0.22rem;
      margin-top: 0;
      font-size: 0.14rem;

      span {
        font-size: 0.16rem;
        line-height: 0.22rem;
      }

      img {
        margin-left: 0.08rem;
        width: 0.12rem;
        height: 0.12rem;
      }
    }

    .handle {

      .btn {
        display: none;
        min-width: 0;
        margin-right: 0.08rem;
        font-size: 0.14rem;
      }

      img {
        width: 0.14rem;
        height: 0.14rem;
        object-fit: cover;
      }



      :deep {
        .van-popover__wrapper {
          display: block;
        }
      }

    }
  }


  .info {

    &-con {
      .list {
        width: calc(100% + 0.14rem);
        margin-left: -0.07rem;
      }

      .item-con {
        margin-top: 0;
        margin-bottom: 0.14rem;
        width: 50%;
        padding: 0 0.07rem;
      }

      .item {
        padding: 0.1rem;

        .name {
          font-size: 0.13rem;
        }

        .val {
          margin-top: 0.1rem;
          font-size: 0.24rem;
        }
      }
    }
  }

}
</style>