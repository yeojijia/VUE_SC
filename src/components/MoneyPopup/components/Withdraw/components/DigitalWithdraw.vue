<template>
  <div class="withdraw-con">
    <div class="box">
      <div class="title">{{$t('common.desc11')}}</div>
      <div class="tabs">
        <div class="tab" :class="{on:tabId===item.id}" v-for="item of tabs" :key="item.id"
          @click="handlleMainNetworkTab(item.id)">{{item.name}}</div>
      </div>
    </div>
    <div class="box">
      <div class="title">{{ $t('common.desc7') }} </div>
      <div class="inp-con" ref="inpDom">
        <com-select class="select" v-model:show="typeShow" v-model:val="typeId" :list="types"
          :custom-field-name="{id: 'id',text: 'mark'}" placement="bottom-end" :width="`${inpDomW}px`"
          :place="$t('common.desc105')">
          <div class="select-name" @click.stop="typeShow = !typeShow">
            <div class="val overflow1" :class="{place:!typeInfo?.address}">
              {{ typeInfo?.address?typeInfo.address:$t('common.desc70') }}
            </div>
            <van-icon name="arrow-down" />
          </div>
        </com-select>
      </div>
    </div>
    <div class="box">
      <div class="title">{{ $t('common.desc33') }} </div>
      <div class="inp-con">
        <com-select class="select" v-model:show="coinShow" v-model:val="coinId" :list="coinList"
          :custom-field-name="{id: 'coinId',text: 'coinName'}" placement="bottom-end" :width="`${inpDomW}px`">
          <div class="select-name" @click.stop="coinShow = !coinShow">
            <div class="val" :class="{place:!coinInfo?.coinName}">
              {{ coinInfo?.coinName?coinInfo?.coinName:$t('common.desc80') }}
            </div>
            <van-icon name="arrow-down" />
          </div>
        </com-select>
      </div>
    </div>
    <div class="box">
      <div class="title">{{ $t('common.desc148') }} </div>
      <div class="inp-con">
        <div class="select-name">
          <input class="val" v-limit-input-number-twodecimals type="text" :placeholder="$t('common.desc38')"
            v-model.lazy="amount" />
          <span class="max" @click="(amount = coinBalance)">MAX</span>
        </div>
      </div>
    </div>
    <div class="box">
      <div class="title">{{ $t('common.desc36') }} </div>
      <div class="inp-con">
        <div class="select-name">
          <input class="val" :type="eyeShow?'password':'text'" :placeholder="$t('common.desc39')"
            v-model="fundPassWord" />
          <img class="eye show" :src="require(`../../../../../assets/images/common/${theme}/icon_eye.svg`)" v-if="eyeShow"
            @click="eyeShow = !eyeShow" />
          <img class="eye hide" :src="require(`../../../../../assets/images/common/${theme}/icon_eye_hide.svg`)" v-else
            @click="eyeShow = !eyeShow" />
        </div>
      </div>
    </div>
    <div class="msg">
      <div class="msg-item">
        <div class="name">{{$t('common.desc111')}}</div>
        <div class="val">{{decal(coinBalance,5)}} {{coinInfo?.coinName}}</div>
      </div>
      <div class="msg-item">
        <div class="name">{{$t('common.desc72')}}</div>
        <div class="val">{{withDrawInfo.realAmount?withDrawInfo.realAmount:0}} {{withDrawInfo.coinName}}</div>
      </div>
      <div class="msg-item">
        <div class="name">{{$t('common.desc63')}}</div>
        <div class="val">{{withDrawInfo.feeAmount?withDrawInfo.feeAmount:0}} {{withDrawInfo.coinName}}</div>
      </div>
    </div>
    <div class="sub-btn" @click="handleConfirm">
      {{ $t("common.desc71") }}
    </div>
    <div class="tips">
      <div class="title">
        <img src="../../../../../assets/images/common/icon_warn.svg" />{{$t('common.desc13')}}
      </div>

      <div class="desc" v-html="$t('common.desc73')" />
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, getCurrentInstance, computed, watch } from 'vue'
import { useStore } from 'vuex';
import { _withDrawAddressList, _coinWithDrawList, _coinWithDraw, _withDrawInfo, _coinBalance } from '@/utils/api/money'
const { proxy } = getCurrentInstance()
const decal = proxy.$common.decal
const store = useStore()
const props = defineProps({
  show: Boolean,
  tab: String
})

let theme = computed(() => store.state.global.theme)
let coinList = ref([])
let coinId = ref('')
let coinShow = ref(false)
const eyeShow = ref(true)

const coinInfo = computed(() => {
  try {
    return coinList.value.find(item => item.coinId === coinId.value)
  } catch (error) {
    return {}
  }
})
const types = ref([])

let typeId = ref('')
const typeInfo = computed(() => {
  try {
    return types.value.find(item => item.id === typeId.value)
  } catch (error) {
    return {}
  }
})
const typeShow = ref(false)

const tabs = computed(() => store.state.global.chainList)


const amount = ref('')
let fundPassWord = ref('')
const tabId = ref(0)
const chainId = computed(() => {
  return tabs.value.find(item => item.id === tabId.value).value
})
function handlleMainNetworkTab(id) {
  tabId.value = id
  typeId.value = ''
  coinId.value = ''

  getTypes()
  getCoinList()
}

function getTypes() {
  _withDrawAddressList({
    chainId: chainId.value
  }).then(res => {
    types.value = res
  })
}

function getCoinList() {
  _coinWithDrawList({
    chainId: chainId.value
  }).then(res => {
    console.log({ res })
    coinList.value = res
  })
}

watch(() => {
  return {
    amount: amount.value,
    typeId: typeId.value,
    coinId: coinId.value
  }
}, (data) => {
  const { amount, typeId, coinId } = data
  if (Number(amount) && typeId && coinId) {
    getWithDrawInfo()
  }
})
watch(() => coinId.value, (e) => {
  if (e) {
    handlePayCoinBalance(e)
  }
})
const coinBalance = ref(0)
function handlePayCoinBalance(id) {
  _coinBalance(id).then(res => {
    coinBalance.value = res
  })
}
const withDrawInfo = ref({})
function getWithDrawInfo() {
  _withDrawInfo({
    address: typeInfo.value.address,
    amount: Number(amount.value),
    chainId: chainId.value,
    coinId: coinId.value
  }).then(res => {
    withDrawInfo.value = res
  })
}
function handleConfirm() {
  if (!amount.value) {
    spop({
      template: proxy.$t('common.desc38'),
      style: 'warning',
      autoclose: 2000
    })
    return
  } else if (!typeId.value) {
    spop({
      template: proxy.$t('common.desc70'),
      style: 'warning',
      autoclose: 2000
    })
    return
  } else if (!coinId.value) {
    spop({
      template: proxy.$t('common.desc80'),
      style: 'warning',
      autoclose: 2000
    })
    return
  } else if (!fundPassWord.value) {
    spop({
      template: proxy.$t('common.desc39'),
      style: 'warning',
      autoclose: 2000
    })
    return
  }

  proxy.$toast.loading({
    duration: 0,
    forbidClick: true,
  });
  _coinWithDraw({
    address: typeInfo.value.address,
    amount: Number(amount.value),
    chainId: chainId.value,
    coinId: coinId.value,
    password: proxy.$common.encrypt(fundPassWord.value),
  }).then(res => {
    if (res === 'success') {
      store.dispatch('getDigitalAsset', 1)
      store.dispatch('getTotalBalance')
      spop({
        template: proxy.$t('common.desc102'),
        style: 'success',
        autoclose: 2000
      })
      proxy.$toast.clear()
      store.commit('SET_MONEY_POPUP_SHOW', false)
    }
  }).catch(() => {
    proxy.$toast.clear()

  }).finally(() => {
    proxy.$toast.clear()
  })
}


const inpDom = ref(null)
const inpDomW = ref(0)
onMounted(() => {
  inpDomW.value = inpDom.value.clientWidth
})
watch(() => {
  return {
    show: props.show,
    tab: props.tab
  }
}, ({ show, tab }) => {
  if (show && tab === 'withdraw') {
    if (types.value.length === 0) {
      getTypes()
    }
    if (coinList.value.length === 0) {
      getCoinList()
    }
  }
}, {
  immediate: true
})


</script>


<style lang='scss' scoped>
.withdraw-con {
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

    .tabs {
      width: 100%;
      display: flex;
      flex-wrap: wrap;

      .tab {
        height: 0.36rem;
        margin-right: 0.1rem;
        border-radius: 0.08rem;
        font-family: 'PingFang SC';
        font-style: normal;
        font-weight: 400;
        font-size: 0.14rem;
        padding: 0 0.17rem;
        cursor: pointer;
        display: flex;
        align-items: center;
        color: var(--gg-btn-text);
        border: 1px solid transparent;
        display: flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;

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

    .inp-con {
      width: 100%;
    }

    :deep .van-popover__wrapper {
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

      .eye {
        margin-left: 0.16rem;
        flex: 0 0 auto;
        width: 0.22rem;
      }
    }

    input {
      &::placeholder {
        color: var(--gg-inp-plac);
      }
    }

    .van-icon {
      color: var(--gg-subtitle);
    }


  }


  .tips {
    margin-bottom: 0.16rem;
    width: 100%;
    font-family: 'PingFang SC';
    font-style: normal;
    font-weight: 400;
    font-size: 0.12rem;
    line-height: 0.17rem;
    color: var(--gg-text);

    .title {
      margin-bottom: 0.08rem;
      font-size: 0.16rem;
      line-height: 1.4em;
      display: flex;
      align-items: center;

      img {
        margin-right: 0.08rem;
        width: 0.16rem;
        height: 0.16rem;
        object-fit: contain;

      }
    }

    .desc {
      font-size: 0.14rem;
      line-height: 1.5em;
      color: var(--gg-subtitle);
    }

  }

  .msg {
    border-radius: 0.04rem;
    box-sizing: border-box;
    font-family: 'PingFang SC';
    font-style: normal;
    font-weight: 400;
    font-size: 0.14rem;
    line-height: 1.5em;
    display: flex;
    flex-direction: column;

    &-item {
      margin-bottom: 0.08rem;
      display: flex;
      justify-content: space-between;

      .name {
        color: var(--gg-subtitle);
      }

      .val {
        color: var(--gg-text);
      }

      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  .sub-btn {
    flex: 0 0 auto;
    cursor: pointer;
    margin-top: 0.32rem;
    margin-bottom: 0.2rem;
    width: 100%;
    height: 0.52rem;
    background: var(--gg-btn-bg);
    border: 1px solid var(--gg-btn-border);
    color: var(--gg-btn-color);
    font-weight: 500;
    border-radius: 0.12rem;
    font-size: 0.16rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

}

@media (max-width: 749px) {
  .withdraw-con {
    .box {
      margin-bottom: 0.12rem;

      .tabs {
        .tab {
          margin: 0 0 0.12rem 0;
          margin-right: 0.12rem;
          height: 0.32rem;
          font-size: 0.14rem;
          line-height: 0.2rem;
          padding: 0 0.1rem;
          border-radius: 0.08rem;
        }
      }

      .select-name {
        height: 0.4rem;
        padding: 0 0.12rem;
        font-size: 0.14rem;

        .eye {
          margin-left: 0.12rem;
          width: 0.2rem;
        }
      }

    }

    .code-con {
      padding: 0.15rem 0;
    }

    .sub-btn {
      margin-bottom: 0.12rem;
      height: 0.44rem;
      font-size: 0.14rem;
      border-radius: 0.08rem;
    }

    .msg-item {
      margin-bottom: 0.04rem;
    }
  }
}
</style>