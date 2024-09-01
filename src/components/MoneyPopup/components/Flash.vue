<template>
  <con-scroll>
    <div class="content">
      <div class="from">
        <div class="box">
          <div class="title">{{ $t('common.desc147') }}</div>
          <div class="coin" ref="coinDom">
            <com-select class="select" v-model:show="coin1Show" v-model:val="coinId1" :list="payCoinList"
              :custom-field-name="{id: 'coinId',text: 'coinName' }" placement="bottom-end" :width="`${coinDomW}px`">
              <div class="select-name" @click.stop="coin1Show = !coin1Show">
                <div class="val overflow1" :class="{place:!coin1Info?.coinName}">
                  {{ coin1Info?.coinName? coin1Info.coinName:$t('common.desc66') }}
                </div>
                <van-icon name="arrow-down" />
              </div>
            </com-select>
          </div>
          <div class="balance">
            <div class="name">{{ $t("common.desc151") }}：</div>
            <div class="val">{{exchangeInfo.allowExchangeAmount? decal(exchangeInfo.allowExchangeAmount, 5):0 }} {{
              coin1Info?.coinName
              }}</div>
          </div>
        </div>
        <div class="box">
          <div class="title">{{ $t('common.desc149') }}</div>
          <div class="coin">
            <div class="select-name">
              <input class="val" v-limit-input-number type="text" :placeholder="$t('common.desc67')" v-model="amount" />
              <span class="max" @click="(amount=payCoinBalance)">MAX</span>
            </div>
          </div>
        </div>
        <div class="box">
          <img class="swap-icon" src="../../../assets/images/common/icon_swap.svg" />
        </div>
        <div class="box">
          <div class="title">{{ $t('common.desc147') }}</div>
          <div class="coin" ref="flashInpDom">
            <com-select class="select" v-model:show="coin2Show" v-model:val="coinId2" :list="returnCoinList"
              :custom-field-name="{id: 'coinId',text: 'coinName'}" placement="bottom-end" :width="`${flashInpDomW}px`">
              <div class="select-name" @click.stop="coin2Show = !coin2Show">
                <div class="val overflow1" :class="{place:!coin2Info?.coinName}">
                  {{ coin2Info?.coinName? coin2Info.coinName:$t('common.desc66') }}
                </div>
                <van-icon name="arrow-down" />
              </div>
            </com-select>
          </div>
          <div class="balance">
            <div class="name">{{ $t("common.desc40") }}：</div>
            <div class="val">{{ decal(returnCoinBalance, 5) }} {{ coin2Info.coinName? coin2Info.coinName:'' }}</div>
          </div>
        </div>
        <div class="msg">
          <div class="msg-item">
            <div class="name">{{$t('common.desc61')}}：</div>
            <div class="val">
              {{exchangeInfo?.deductCoinAmount?exchangeInfo.deductCoinAmount:0}} {{exchangeInfo.deductCoinName}}</div>
          </div>
          <div class="msg-item">
            <div class="name">{{$t('common.desc62')}}：</div>
            <div class="val">
              {{exchangeInfo?.addCoinAmount ?exchangeInfo.addCoinAmount :0}} {{exchangeInfo.addCoinName}}</div>
          </div>
          <div class="msg-item">
            <div class="name">{{$t('common.desc63')}}：</div>
            <div class="val">
              {{exchangeInfo?.feeCoinAmount ?exchangeInfo.feeCoinAmount :0}} {{exchangeInfo.feeCoinName}}</div>
          </div>
        </div>
      </div>
      <div class="btn-con">
        <div class="btn reset" @click.stop="handleReset">{{$t('common.desc89')}}</div>
        <div class=" btn sub" :loading-text="$t('common.desc64')" @click.stop="handleConfirm">
          {{ $t("common.desc64") }}
        </div>
      </div>
    </div>


  </con-scroll>
</template>
<script setup>
import ConScroll from './ConScroll'
import { ref, getCurrentInstance, computed, onMounted, watch, nextTick } from 'vue'
import { useStore } from 'vuex'
import { _exchangePayCoinList, _exchangeReturnCoinList, _exchangeInfo, _exchange, _coinBalance } from '@/utils/api/money'
const { proxy } = getCurrentInstance()
const store = useStore()
const decal = proxy.$common.decal
const props = defineProps({
  show: Boolean,
  tab: String
})

let amount = ref(null)
const payCoinList = ref([])
let payCoinBalance = ref('')
function handlePayCoinBalance(id) {
  _coinBalance(id).then(res => {
    payCoinBalance.value = res
  })
}
let coinId1 = ref('')
watch(() => coinId1.value, (e) => {
  if (e) {
    handlePayCoinBalance(e)
    coinId2.value = ''
    getReturnCoinList()
  }
})
const coin1Info = computed(() => {
  if (coinId1.value) {
    return payCoinList.value.find(item => item.coinId === coinId1.value)
  } else {
    return {
      name: proxy.$t('common.desc57')
    }
  }
})
const coin1Show = ref(false)
//获取支付币种列表
function getPayCoinList() {
  _exchangePayCoinList({
    returnCoinId: coinId2.value
  }).then(res => {
    payCoinList.value = res
  })
}
let returnCoinList = ref([])
let coinId2 = ref('')
const coin2Info = computed(() => {
  if (coinId2.value) {
    return returnCoinList.value.find(item => item.coinId === coinId2.value)
  } else {
    return {
      name: proxy.$t('common.desc57')
    }
  }
})
const coin2Show = ref(false)
let returnCoinBalance = ref(0)
watch(() => coinId2.value, (e) => {
  if (e) {
    handleReturnCoinBalance(e)
    if (!coinId1.value) {
      getPayCoinList()
    }
  }
})

function handleReturnCoinBalance(id) {
  _coinBalance(id).then(res => {
    returnCoinBalance.value = res
  })
}
//获取返回币种列表
function getReturnCoinList() {
  _exchangeReturnCoinList({
    payCoinId: coinId1.value
  }).then(res => {
    returnCoinList.value = res
  })
}

watch(() => {
  return {
    amount: amount.value,
    coinId1: coinId1.value,
    coinId2: coinId2.value
  }
}, () => {
  getExchangeInfo()

})

//获取闪兑信息
let exchangeInfo = ref({})
let timer = null
function getExchangeInfo() {
  if (timer) {
    clearTimeout(timer)
  }
  if (!Boolean(amount.value && coinId1.value && coinId2.value)) {
    clearTimeout(timer)
    return
  }
  timer = setTimeout(() => {
    exchangeInfo.value = {}
    _exchangeInfo({
      amount: amount.value,
      payCoinId: coinId1.value,
      returnCoinId: coinId2.value
    }).then(res => {
      exchangeInfo.value = res
    })
  }, 200)
}
function handleConfirm() {
  if (!amount.value) {
    spop({
      template: proxy.$t('common.desc67'),
      style: 'warning',
      autoclose: 2000
    })
    return
  }
  if (!coinId1.value || !coinId2.value) {
    spop({
      template: proxy.$t('common.desc66'),
      style: 'warning',
      autoclose: 2000
    })
    return
  }
  if (amount.value > payCoinBalance.value) {
    spop({
      template: proxy.$t('common.desc69'),
      style: 'warning',
      autoclose: 2000
    })
    return
  }
  if (amount.value > exchangeInfo.value.maxChangeAmount) {
    spop({
      template: proxy.$t('common.desc116', { n: exchangeInfo.value.maxChangeAmount }),
      style: 'warning',
      autoclose: 2000
    })
    return
  }
  if (amount.value < exchangeInfo.value.minChangeAmount) {
    spop({
      template: proxy.$t('common.desc116', { n: exchangeInfo.value.minChangeAmount }),
      style: 'warning',
      autoclose: 2000
    })
    return
  }
  let loadingToast = proxy.$toast.loading({
    duration: 0,
    forbidClick: true,
  });
  _exchange({
    amount: amount.value,
    payCoinId: coinId1.value,
    returnCoinId: coinId2.value
  }).then(res => {
    if (res === 'success') {
      spop({
        template: proxy.$t('common.desc68'),
        style: 'success',
        autoclose: 2000
      })
      store.dispatch('getTotalBalance')
      handlePayCoinBalance(coinId1.value)
      handleReturnCoinBalance(coinId2.value)
      store.dispatch('getGameTotalBalance')
      handleReset()
    }

  }).finally(() => {
    loadingToast.clear()
  })
}
function handleReset() {
  coinId1.value = ''
  coinId2.value = ''
  payCoinBalance.value = 0
  returnCoinBalance.value = 0
  amount.value = ''
  exchangeInfo.value = {}
  getPayCoinList()
  getReturnCoinList()

}
const coinDom = ref(null)
const coinDomW = ref(0)
const flashInpDom = ref(null)
const flashInpDomW = ref(0)
onMounted(() => {
  nextTick(() => {
    coinDomW.value = coinDom.value.clientWidth
    flashInpDomW.value = flashInpDom.value.clientWidth
  })
})

watch(() => {
  return {
    show: props.show,
    tab: props.tab
  }
}, ({ show, tab }) => {
  if (show && tab === 'flash') {
    getPayCoinList()
    getReturnCoinList()
  }
}, {
  immediate: true
})
</script>


<style lang='scss' scoped>
.content {
  min-height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}



.box {
  margin-bottom: 0.16rem;
  display: flex;
  flex-direction: column;

  .title {
    margin-bottom: 0.08rem;
    font-family: 'PingFang SC';
    font-style: normal;
    font-weight: 400;
    font-size: 0.14rem;
    line-height: 1.5em;
    color: var(--gg-text);
  }

  .balance {
    margin-top: 0.08rem;
    font-size: 0.14rem;
    line-height: 1.5em;
    font-family: 'PingFang SC';
    font-weight: 400;
    text-align: left;
    color: var(--gg-text);
    line-height: 0.2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .name {
      color: var(--gg-subtitle);
    }

    .val {
      color: var(--theme);
    }


  }

  &.password {
    margin-top: 0.3rem;
  }

  .coin {
    width: 100%;
  }

  .select-name {
    width: 100%;
    height: 0.48rem;
    border-radius: 0.1rem;
    font-family: 'PingFang SC';
    font-style: normal;
    font-weight: 400;
    font-size: 0.16rem;
    line-height: 1.4em;
    color: var(--gg-text);
    box-shadow: var(--gg-inp-shadow);
    background: var(--gg-inp-bg);
    transition: all 0.3s linear;
    padding: 0 0.16rem;
    box-sizing: border-box;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .max {
      flex: 0 0 auto;
      margin-left: 0.16rem;
      color: var(--theme);
    }

    .val {
      flex: 1 1 auto;

      &.place {
        color: var(--gg-inp-plac);
      }
    }

  }

  input {
    &::placeholder {
      color: var(--gg-subtitle);
    }
  }

  .swap-icon {
    width: 0.48rem;
    height: 0.48rem;
    margin: 0.08rem auto;
  }

  .inp-con {
    width: 0;
    flex: 1 1 auto;
    display: flex;
    justify-content: center;
  }



  :deep .van-popover__wrapper {
    width: 100%;
  }


}

.msg {
  border-radius: 0.04rem;
  padding: 0.08rem 0;
  box-sizing: border-box;

  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 400;
  font-size: 0.12rem;
  line-height: 0.17rem;
  color: var(--decorate-text);

  display: flex;
  flex-direction: column;

  &-item {
    margin-bottom: 0.1rem;
    display: flex;
    justify-content: space-between;

    &:last-child {
      margin-bottom: 0;
    }
  }
}

.btn-con {
  margin-top: 0.32rem;
  margin-bottom: 10vh;
  display: flex;
  justify-content: space-between;

  .reset {
    margin-right: 0.2rem;
  }

  .btn {
    flex: 0 0 auto;
    cursor: pointer;
    flex: 1;
    height: 0.52rem;
    font-weight: 500;
    border-radius: 0.12rem;
    font-size: 0.16rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    &.reset {
      border: 1px solid var(--theme);
      color: var(--theme);
    }

    &.sub {
      background: var(--gg-btn-bg);
      border: 1px solid var(--gg-btn-border);
      color: var(--gg-btn-color);

    }
  }
}


@media (max-width: 749px) {
  .box {
    margin-bottom: 0.12rem;

    .select-name {
      height: 0.4rem;
      padding: 0 0.12rem;
      font-size: 0.14rem;

    }

  }

  .msg-item {
    margin-bottom: 0.04rem;
  }

  .btn-con {
    margin-top: 0.24rem;
    margin-bottom: 0.24rem;

    .btn {
      height: 0.44rem;
      font-size: 0.14rem;
      border-radius: 0.08rem;
    }

    .reset {
      margin-right: 0.12rem;
    }
  }
}
</style>