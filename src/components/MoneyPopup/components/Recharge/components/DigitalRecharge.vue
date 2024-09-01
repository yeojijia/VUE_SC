<template>
  <div class="recharge-con">
    <div class="box">
      <div class="title">{{$t('common.desc147')}}</div>
      <div class="inp-con" ref="inpDom">
        <com-select class="select" v-model:show="coinShow" v-model:val="coinId" :list="coinList"
          :custom-field-name="{id: 'coinName',text: 'coinName',}" placement="bottom-end" :width="`${inpDomW}px`">
          <div class="select-name" @click.stop="coinShow = !coinShow">
            <div class="val">
              {{ coinInfo?.coinName }}
            </div>
            <van-icon name="arrow-down" />
          </div>
        </com-select>
      </div>
    </div>
    <div class="box">
      <div class="title">{{$t('common.desc11')}}</div>
      <div class="tabs">
        <div class="tab" :class="{on:mainNetwork===item.chainName}" v-for="item of mainNetworks" :key="item.id"
          @click="handlleMainNetworkTab(item.chainName)">{{item.chainName}}</div>
      </div>
    </div>
    <div class="code-con">
      <div class="code">
        <div class="qrcode" ref="qrCodeUrl" id="qrcode"></div>
      </div>
    </div>
    <div class="tips">
      <div class="title">
        <img src="../../../../../assets/images/common/icon_warn.svg" />{{$t('common.desc13')}}
      </div>
      <div class="desc" v-html="$t('common.desc14')" />
    </div>
    <div class="box">
      <div class="title">
        {{$t('common.desc15')}}
      </div>
      <div class="inp-con">
        <div class="select-name address">
          <div class="val wrap "> {{address}}</div>
          <img class="copy-btn address-copy" src="../../../../../assets/images/common/icon_copy.svg"
            :data-clipboard-text="address" @click="handleCopy('.address-copy')" />
        </div>
      </div>
    </div>
    <div class="msg">
      <div class="msg-item">
        <div class="name">{{$t('common.desc16')}}</div>
        <div class="val">{{rechargeInfo?.minReChargeAmount}} {{coinInfo?.coinName}}</div>
      </div>
      <div class="msg-item">
        <div class="name">{{$t('common.desc17')}}</div>
        <div class="val">{{$t('common.desc19',{n1:rechargeInfo?.confirm})}}</div>
      </div>
      <!-- <div class="msg-item">
          <div class="name">{{$t('common.desc18')}}</div>
          <div class="val">{{$t('common.desc19',{n1:1})}}</div>
        </div> -->
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, getCurrentInstance, computed, watch, onActivated } from 'vue'
import { useStore } from 'vuex';
import Clipboard from "clipboard";
import QRCode from 'qrcodejs2'
import { _chargeInit, _chargeCoins } from '@/utils/api/money'
const { proxy } = getCurrentInstance()
const store = useStore()
const props = defineProps({
  show: Boolean,
  tab: String
})

let coinList = ref([])
let coinId = computed({
  get() {
    return store.state.money.moneyCoin
  }, set(e) {
    store.commit('SET_MONEY_COIN', e)
  }
})
const coinInfo = computed(() => {
  try {
    if (coinId.value) {
      return coinList.value.find(item => item.coinName === coinId.value)
    } else {
      coinId.value = coinList.value[0].coinName
      return coinList.value[0]
    }
  } catch (error) {
    return {}
  }
})
const mainNetworks = computed(() => {
  try {
    if (!mainNetwork.value && coinInfo.value) {
      mainNetwork.value = coinInfo?.value.voList[0].chainName
    }
    return coinInfo.value.voList
  } catch (error) {
    return []
  }
})
const mainNetwork = ref('')
function handlleMainNetworkTab(id) {
  mainNetwork.value = id
}

let address = computed(() => {
  try {
    return mainNetworks.value.find(item => {
      return item.chainName === mainNetwork.value
    }).rechargeAddress
  } catch (error) {
    return ''
  }
})

const rechargeInfo = computed(() => {
  try {
    return mainNetworks.value.find(item => {
      return item.chainName === mainNetwork.value
    })
  } catch (error) {
    return {}
  }
})

watch(() => address.value, (e) => {
  if (e) {
    handleCreatQrCode(e)
  }
})

const coinShow = ref(false)


const inpDom = ref(null)
const inpDomW = ref(0)

function getChargeInit() {
  _chargeInit().then(res => {
    if (res === 'success') {
      _chargeCoins().then(res => {
        coinList.value = res
      })
    }
  })

}
const qrCodeUrl = ref(null)
function handleCreatQrCode(text) {
  qrCodeUrl.value.innerHTML = ''
  new QRCode(qrCodeUrl.value, {
    text, // 需要转换为二维码的内容
    width: 150,
    height: 150,
    correctLevel: QRCode.CorrectLevel.H,
  })
}


function handleCopy(className) {
  var clipboard = new Clipboard(className);
  clipboard.on("success", () => {
    spop({
      template: proxy.$t('common.desc5'),
      style: 'success',
      autoclose: 2000
    })
    clipboard.destroy();
  });
  clipboard.on("error", () => {
    clipboard.destroy();
  });
}
function handleLoadingInit() {


}
onMounted(() => {
  inpDomW.value = inpDom.value.clientWidth
})
watch(() => {
  return {
    show: props.show,
    tab: props.tab
  }
}, ({ show, tab }) => {
  if (show && tab === 'recharge') {
    getChargeInit()
  }
}, {
  immediate: true
})

</script>


<style lang='scss' scoped>
.recharge-con {
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

      &.address {
        height: auto;
        min-height: 0.48rem;
      }

      .val {
        flex: 1 1 auto;


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

    .copy-btn {
      flex: 0 0 auto;
      margin-left: 0.16rem;
      width: 0.12rem;
      height: 0.12rem;
      object-fit: contain;
    }

  }

  .code-con {
    padding: 0.08rem 0 0.24rem;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    .code {
      padding: 0.14rem;
      box-sizing: border-box;
      border-radius: 0.16rem;
      background: var(--gg-qrcode-bg);
      border: 1px solid var(--gg-qrcode-border);

      .qrcode {
        width: 150px;
        height: 150px;
      }
    }

    .con {
      width: 1.3rem;
      height: 1.3rem;

      img {
        width: 100%;
      }
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
}

@media (max-width: 749px) {
  .recharge-con {
    .box {
      margin-bottom: 0.12rem;



      .tabs {
        .tab {
          margin: 0 0 0.12rem 0;
          margin-right: 0.12rem;
          height: 0.32rem;
          font-size: 0.14rem;
          line-height: 0.2rem;
          padding: 0 0.17rem;
          border-radius: 0.08rem;
        }
      }

      .select-name {
        height: 0.4rem;
        padding: 0 0.12rem;
        font-size: 0.14rem;

      }

    }

    .code-con {
      padding: 0 0.24rem 0.24rem;
    }
  }
}
</style>