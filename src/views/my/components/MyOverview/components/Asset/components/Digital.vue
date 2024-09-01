<template>
  <div class="total-handle">
    <div class="total">
      {{$t('my.desc76')}}：<span>${{decal(totalBalance,3)}}</span>
    </div>
    <div class="handle">
      <div class="btn" @click="handleMoneyShow('flash')">{{$t('my.desc75')}}</div>

      <van-popover v-model:show="btnShow" placement="bottom-end">
        <template #reference>
          <img :src="require(`../../../../../../../assets/images/common/${theme}/icon_select_btn.svg`)" />
        </template>
        <div class="options">
          <div class="item" @click="handleMoneyShow('flash')">{{$t('my.desc75')}}</div>
        </div>
      </van-popover>
    </div>
  </div>
  <div class="info-con">
    <div class="asset-head tr">
      <div class="td">{{$t('common.desc52')}}</div>
      <div class="td">{{$t('common.desc20')}}</div>
      <div class="td">{{$t('common.desc53')}}</div>
      <div class="td">{{$t('common.desc54')}}</div>
    </div>
    <div class="body-srcoll">
      <div class="asset-body">
        <div class="tr" v-for="(item, index) of list" :key="index">
          <div class="td">
            <div class="name">
              {{$t('common.desc52')}}
            </div>
            <div class="val">
              <com-image class="img" :src="item.coinIcon" />
              {{item.coinName}}
            </div>
          </div>
          <div class="td">
            <div class="name">
              {{$t('common.desc20')}}
            </div>
            <div class="val">{{item.amount}}</div>
          </div>
          <div class="td">
            <div class="name">
              {{$t('common.desc53')}}
            </div>
            <div class="val">{{(item.usdtPrice*item.amount)}}</div>
          </div>
          <div class="td">
            <div class="name"></div>
            <div class="val">
              <div class="btn recharge" @click="handleRechargeShow(item.coinName)">
                <!-- recharge -->
                {{$t('my.desc22')}}
              </div>
              <div class="btn withdraw" @click="handleMoneyShow('withdraw')">
                <!-- withdraw -->
                {{$t('my.desc23')}}
              </div>

            </div>
          </div>
        </div>
        <no-data v-if="list.length===0" />
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, getCurrentInstance, onMounted, computed } from 'vue'
import { useStore } from 'vuex';
import { _asset } from '@/utils/api/money'
const { proxy } = getCurrentInstance()
const decal = proxy.$common.decal
const store = useStore()
const theme = computed(() => store.state.global.theme)
const btnShow = ref(false)

function handleRechargeShow(coin) {
  store.commit('SET_MONEY_COIN', coin)
  handleMoneyShow('recharge')
}

function handleMoneyShow(type) {
  btnShow.value = false
  store.commit('SET_COIN_TYPE', 'digital')
  store.dispatch('setMoneyPopupShow', {
    show: true,
    type
  })
}

const totalBalance = computed(() => store.state.money.digitalBalance)
const list = computed(() => store.state.money.digitalList)

onMounted(() => {
  store.dispatch('getDigitalAsset', 1)
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
  }

  .handle {
    display: flex;


    .btn {
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
    }

    :deep {
      .van-popover__wrapper {
        display: none;
      }
    }

  }
}

.info-con {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;

  .asset-head {
    flex: 0 0 auto;
    background: var(--gg-box-bg);
    border-radius: 0.08rem 0.08rem 0 0;

    .tr {
      padding: 0.1rem 0.2rem;
    }

    .td {
      white-space: nowrap;
      color: var(--gg-subtitle);
      font-size: 0.14rem;
      line-height: 1.5em;
    }
  }

  .body-srcoll {
    height: 4rem;
    overflow-y: auto;
  }

  .asset-body {
    height: 100%;
    color: var(--gg-text);

    .tr {
      &:hover {
        cursor: pointer;
        background: var(--gg-box-bg);
      }
    }
  }

  .tr {
    padding: 0.12rem 0.2rem;
    box-sizing: border-box;
    display: flex;

    .td {
      font-size: 0.16rem;
      flex: 1;
      display: flex;
      align-items: center;
      padding-right: 0.1rem;
      box-sizing: border-box;

      .name {
        display: none;
      }

      .val {
        display: flex;
        align-items: center;
      }

      &:last-child {
        padding-right: 0;
        flex: 0 0 auto;
        width: 1.86rem;
        display: flex;
        justify-content: flex-end;
      }

      .img {
        margin-right: 0.08rem;
        width: 0.28rem;
        height: 0.28rem;
        border-radius: 50%;
        overflow: hidden;
      }

      .btn {
        width: 0.88rem;
        height: 0.36rem;
        margin-left: 0.06rem;
        border-radius: 0.08rem;
        font-family: 'PingFang SC';
        font-style: normal;
        font-weight: 600;
        font-size: 0.14rem;
        line-height: 1.4em;
        padding: 0 0.12rem;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;

        &.recharge {
          color: var(--gg-btn-color);
          background: var(--gg-btn-bg);
        }

        &.withdraw {
          border: 1px solid var(--theme);
          color: var(--theme);
        }

        &:first-child {
          margin-left: 0;
        }
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
    margin-top: 0.12rem;
    margin-bottom: .12rem;

    .total {
      min-height: 0.22rem;
      margin-top: 0;
      font-size: 0.14rem;

      span {
        font-size: 0.16rem;
        line-height: 0.22rem;
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

  .info-con {
    .asset-head {
      display: none;
    }

    .tr {
      margin-bottom: 0.08rem;
      background: var(--gg-box-bg);
      flex-direction: column;
      padding: 0.1rem 0.14rem 0.14rem;
      border-radius: 0.1rem;

      .td {
        font-size: 0.14rem;
        line-height: 0.2rem;
        padding: 0.04rem 0;
        width: 100%;
        flex: 0 0 auto;
        justify-content: space-between;

        &:last-child {
          width: 100%;

        }


        .name {
          display: block;
          color: var(--gg-subtitle);
        }

        .val {
          flex: 1;
          justify-content: flex-end;
        }

        .img {
          margin-right: 0.04rem;
          width: 0.2rem;
          height: 0.2rem;
        }

        .btn {
          margin-top: 0.12rem;
          width: 1rem;
          flex: 1;
          font-size: 0.14rem;
          height: 0.32rem;
        }
      }
    }
  }
}
</style>