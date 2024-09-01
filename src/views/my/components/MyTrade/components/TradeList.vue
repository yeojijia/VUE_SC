<template>
  <div class="trade-list">
    <div class="list-head">
      <div class="td">{{$t('common.desc93')}}</div>
      <div class="td">{{$t('common.desc110')}}</div>
      <div class="td">{{$t('common.desc12')}}</div>
      <div class="td">{{$t('my.desc46')}}</div>
      <div class="td">{{$t('my.desc47')}}</div>
      <div class="td">{{$t('my.desc48')}}</div>
      <div class="td">{{$t('my.desc50')}}</div>
      <div class="td"></div>
    </div>
    <div class="list-body">
      <div class="scroll">
        <com-list v-model:loading="_loading" :finished="finished" @load="emit('load')" v-if="list.length">
          <div class="tr" :class="{show:showIndex===index}" v-for="(item, index) of list" :key="item.id">
            <div class="tr-top">
              <div class="td">
                <div class="name">{{$t('common.desc93')}}：</div>
                <div class="val">{{$common.moment(new Date(item.createTime)).format('YYYY-MM-DD hh:mm:ss') }}</div>
              </div>
              <div class="td">
                <div class="name">{{$t('common.desc110')}}：</div>
                <div class="val">
                  <template v-if="(item.coinType===1)"> {{$t('common.desc97')}}</template>
                  <template v-else-if="(item.coinType===2)"> {{$t('common.desc98')}}</template>
                  <template v-else-if="(item.coinType===3)"> {{$t('common.desc99')}}</template>
                </div>
              </div>
              <div class="td">
                <div class="name">{{$t('common.desc12')}}：</div>
                <div class="val">{{item.coinName}}</div>
              </div>
              <div class="td">
                <div class="name">{{$t('my.desc46')}}：</div>
                <div class="val">{{item.bizType?.name}}</div>
              </div>
              <div class="td">
                <div class="name">{{$t('my.desc47')}}：</div>
                <div class="val">{{item.inOutType==='IN'?$t('common.desc100'):$t('common.desc101')}}</div>
              </div>
              <div class="td">
                <div class="name">{{$t('my.desc48')}}：</div>
                <div class="val highlight wrap">{{item.amount}}</div>
              </div>

              <div class="td">
                <div class="name">{{$t('my.desc50')}}：</div>
                <div class="val wrap"><span>{{item.id}}</span>
                  <img class="copy-btn order-copy" src="../../../../../assets/images/common/icon_copy.svg"
                    :data-clipboard-text="item.id" @click="handleCopy('.order-copy')" />
                </div>
              </div>
              <div class="td">
                <div class="name"></div>
                <div class="val">
                  <van-icon
                    v-if="item.bizType.code==='RECHARGE'||item.bizType.code==='EXPENSES'||item.bizType.code==='EXCHANGE'||item.bizType.code==='DISTRAIN'||item.bizType.code==='REJECTION'"
                    name="arrow-down" @click="handleDetailShow(index,item.bizType.code,item.betId)" />
                </div>
              </div>
            </div>
            <div class="tr-bot">
              <template v-if="detailLoading">
                <div class="loading-con">
                  <van-loading />
                </div>
              </template>
              <template
                v-else-if="curCode==='RECHARGE'||curCode==='EXPENSES'||curCode==='DISTRAIN'||curCode==='REJECTION'">
                <div class="bot-td">
                  <div class="td-item">
                    <div class="name">{{$t('my.desc56')}}：</div>
                    <div class="val highlight">{{chainName(detailInfo.chainId)}}</div>
                  </div>
                  <div class="td-item">
                    <div class="name">{{$t('my.desc53')}}：</div>
                    <div class="val highlight wrap">{{strSubstr(detailInfo.txHash) }}</div>
                  </div>
                </div>
                <div class="bot-td">
                  <div class="td-item">
                    <div class="name">{{$t('my.desc54')}}：</div>
                    <div class="val wrap">{{strSubstr(detailInfo.toAddress) }}</div>
                  </div>
                  <div class="td-item">
                    <div class="name">{{$t('my.desc55')}}：</div>
                    <div class="val wrap">{{strSubstr(detailInfo.fromAddress) }}</div>
                  </div>

                </div>
                <div class="bot-td">
                  <div class="td-item">
                    <div class="name">{{$t('common.desc92')}}：</div>
                    <div class="val" v-if="detailInfo.status===0">{{ $t('common.desc139') }}</div>
                    <div class="val" v-else-if="detailInfo.status===1">{{ $t('common.desc140') }}</div>
                    <div class="val" v-else-if="detailInfo.status===2">{{ $t('common.desc141') }}</div>
                    <div class="val" v-else-if="detailInfo.status===3">{{ $t('common.desc142') }}</div>
                    <div class="val" v-else-if="detailInfo.status===4">{{ $t('common.desc143') }}</div>
                    <div class="val" v-else-if="detailInfo.status===5">{{ $t('common.desc144') }}</div>

                  </div>
                  <div class="td-item" v-if="detailInfo.msg">
                    <div class="name">{{$t('common.desc145')}}：</div>
                    <div class="val fail">{{detailInfo?.msg}}</div>
                  </div>
                </div>
              </template>

              <template v-else-if="curCode==='EXCHANGE'">
                <div class="bot-td">
                  <div class="td-item">
                    <div class="name">{{$t('my.desc86')}}：</div>
                    <div class="val highlight wrap">{{decal(detailInfo.frontCoinAmount,6) }}
                      {{detailInfo.frontCoinName}}
                    </div>
                  </div>
                </div>
                <div class="bot-td">

                  <div class="td-item">
                    <div class="name">{{$t('my.desc87')}}：</div>
                    <div class="val highlight wrap">{{decal(detailInfo.behindCoinAmount,6) }}
                      {{detailInfo.behindCoinName}}</div>
                  </div>

                </div>
                <div class="bot-td">
                  <div class="td-item">
                    <div class="name">{{$t('common.desc41')}}：</div>
                    <div class="val highlight">{{decal(detailInfo.feeCoinAmount,6)}} {{detailInfo.feeCoinName}}</div>
                  </div>
                </div>
              </template>
              <template v-else-if="curCode==='DEFI_SHARE'">
                <div class="bot-td">
                  <div class="td-item">
                    <!-- <div class="name">{{$t('my.desc86')}}：</div> -->
                    <div class="val highlight wrap">{{decal(detailInfo.frontCoinAmount,6) }}
                      {{detailInfo.pledgeProductName}}
                    </div>
                  </div>
                </div>
                <div class="bot-td">

                  <div class="td-item">
                    <div class="name">{{$t('my.desc90')}}：</div>
                    <div class="val highlight wrap">{{detailInfo.config.shareType===1?$t('my.desc91'):$t('my.desc92') }}
                    </div>
                  </div>

                </div>
                <div class="bot-td">
                  <div class="td-item">
                    <div class="name">{{detailInfo.config.shareType===1?$t('my.desc89'):$t('my.desc88')}}：</div>
                    <div class="val highlight">
                      <template v-if="(detailInfo.config.shareType===1)">
                        {{detailInfo.config.rateTotal}} {{detailInfo.recordCoin.symbol}}
                      </template>
                      <template v-else>
                        {{detailInfo.config.aprRate}}%
                      </template>
                    </div>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </com-list>

        <no-data v-if="(list.length===0 && !isLoading)" />
      </div>
    </div>
  </div>
</template>
<script setup>
import Clipboard from "clipboard";
import { ref, getCurrentInstance, computed, watch } from 'vue'
import { _exchangeRecord, _rechargeRecord, _withdrawRecord, _backwaterRecord, _pledgeShareRecord } from '@/utils/api/user'
import { useStore } from "vuex";
const { proxy } = getCurrentInstance()
const decal = proxy.$common.decal
const store = useStore()

const chainList = computed(() => store.state.global.chainList)

const props = defineProps({
  loading: Boolean,
  finished: Boolean,
  list: Array,
  isLoading: Boolean
});

const emit = defineEmits(["update:loading", "load"]);

const _loading = computed({
  get() {
    return props.loading;
  },
  set(e) {
    emit("update:loading", e);
  },
});

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

let showIndex = ref(null)
watch(() => props.list.length, () => {
  showIndex.value = null
})
function handleDetailShow(index, code, id) {
  if (showIndex.value === index) {
    showIndex.value = null
    return
  }
  showIndex.value = index
  getDetail(code, id)
}
const detailLoading = ref(false)
const curCode = ref(null)
const detailInfo = ref(null)
function getDetail(code, id) {
  detailLoading.value = true
  curCode.value = code
  switch (code) {
    case 'EXCHANGE':
      _exchangeRecord(id).then(res => {
        if (res) {
          detailInfo.value = res
        } else {
          showIndex.value = null
        }
      }).finally(() => {
        detailLoading.value = false
      })
      break;
    case 'RECHARGE':
      _rechargeRecord(id).then(res => {
        if (res) {
          detailInfo.value = res
        } else {
          showIndex.value = null
        }
      }).finally(() => {
        detailLoading.value = false
      })
      break;
    case 'EXPENSES':
      _withdrawRecord(id).then(res => {
        if (res) {
          detailInfo.value = res
        } else {
          showIndex.value = null
        }
      }).finally(() => {
        detailLoading.value = false
      })
      break;
    case 'DISTRAIN':
      _withdrawRecord(id).then(res => {
        if (res) {
          detailInfo.value = res
        } else {
          showIndex.value = null
        }
      }).finally(() => {
        detailLoading.value = false
      })
      break;
    case 'REJECTION':
      _withdrawRecord(id).then(res => {
        if (res) {
          detailInfo.value = res
        } else {
          showIndex.value = null
        }
      }).finally(() => {
        detailLoading.value = false
      })
      break;

    case 'DEFI_SHARE':
      _pledgeShareRecord(id).then(res => {
        if (res) {
          detailInfo.value = res
        } else {
          showIndex.value = null
        }
      }).finally(() => {
        detailLoading.value = false
      })
      break;

    default:
      break;
  }
}

function strSubstr(str) {
  return `${str.substr(0, 6)}****${str.substr(-6, 6)}`
}
function chainName(id) {
  return chainList.value.find(item => item.id === id).name
}
</script>


<style lang='scss' scoped>
.scroll {
  height: 60vh;
  position: relative;
}

.trade-list {
  width: 100%;
  border-radius: 0.2rem;
  padding: 0.24rem;
  background: var(--gg-card-bg);

  .list-head {
    flex: 0 0 auto;
    padding: 0.1rem 0.2rem;
    box-sizing: border-box;
    display: flex;
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

  .list-body {

    .tr {
      padding: 0.16rem 0.2rem;

      &:hover {

        background: var(--gg-box-bg);
      }
    }
  }

  .tr {
    display: flex;
    flex-direction: column;
    padding: 0.16rem 0;
    border-bottom: 1px solid var(--gg-line);
    box-sizing: border-box;

    &:last-child {
      border-color: transparent;
    }

    &.show {
      .tr-bot {
        margin-top: 0.08rem;
        padding: 0.12rem 0.24rem;
        height: auto;
        opacity: 1;

      }

      .td {
        .van-icon {
          transform: rotate(-180deg);
          color: var(--theme);
        }
      }
    }

    .tr-top {
      display: flex;
      justify-content: space-between;
    }

    .tr-bot {
      height: 0;
      background: var(--gg-box-bg);
      border-radius: 0.06rem;
      box-sizing: border-box;
      overflow: hidden;
      transition: all .3s linear;
      will-change: height;
      display: flex;
      align-items: center;
      opacity: 0;



      .bot-td {
        flex: 1;
        padding-right: 0.5rem;
        box-sizing: border-box;

        &:last-child {
          padding-right: 0;
        }


        &:last-child {
          flex: 0 0 auto;
        }

        .td-item {
          font-family: 'PingFang SC';
          font-style: normal;
          font-weight: 400;
          font-size: 0.14rem;
          line-height: 1.5em;
          display: flex;

          .name {
            white-space: nowrap;
            color: var(--gg-subtitle);
          }

          .val {
            color: var(--gg-text);
          }
        }

      }
    }
  }

  .td {
    flex: 1;
    font-family: 'PingFang SC';
    font-style: normal;
    font-weight: 400;
    font-size: 0.14rem;
    line-height: 1.4em;
    padding-right: 0.05rem;
    box-sizing: border-box;

    .name {
      white-space: nowrap;
      display: none;
      font-weight: 400;
      color: var(--gg-text);
    }

    .van-icon {
      font-size: 0.18rem;
      cursor: pointer;
      transition: all 0.3s linear;
    }

    .copy-btn {
      margin-left: 0.05rem;
      width: 0.11rem;
      height: 0.11rem;
      object-fit: cover;
      cursor: pointer;
    }

    &:first-child,
    &:nth-last-child(2) {
      flex: 0 0 auto;
      width: 2rem;
    }

    &:last-child {
      padding-right: 0;
      flex: 0 0 auto;
      width: 0.18rem;
    }
  }

  .highlight {
    color: var(--theme) !important;
  }

  .fail {
    color: var(--system-1) !important;
  }

  .loading-con {

    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

@media (max-width:992px) {
  .trade-list {
    padding: 0.1rem 0;

    .list-head {
      display: none;
    }

    .tr {
      .tr-top {
        flex-wrap: wrap;
      }

      .tr-bot {
        flex-wrap: wrap;

        .bot-td {
          padding-right: 0;
          flex: 0 0 auto;
          width: 100%;

          .td-item {
            padding: 0.05rem 0;
            display: flex;
            justify-content: space-between;
          }
        }
      }
    }

    .td {
      flex: 0 0 auto;
      width: 100%;
      display: flex;
      padding: 0.05rem 0;
      justify-content: space-between;

      &:first-child,
      &:nth-last-child(2),
      &:last-child {
        width: 100%;
      }


      .name {
        display: block;
      }
    }
  }
}

@media (max-width:749px) {
  .scroll {
    height: 100%;
  }

  .trade-list {
    flex: 1;
    background: none;
    box-shadow: none;
    padding: 0;

    .list-body {
      height: 100%;
      padding: 0;

      .tr {
        padding: 0.12rem 0.16rem;
        border-radius: 0.12rem;
      }
    }

    .td {
      padding: 0.04rem 0;
      font-size: 0.14rem;

      .name {
        color: var(--gg-subtitle);
      }

      .van-icon {
        font-size: 0.14rem;
      }
    }

    .tr {
      border-radius: 0.06rem;
      margin-bottom: 0.1rem;
      background: var(--gg-card-bg);
      border-bottom: none;

      &.show {
        .tr-bot {
          padding: 0.1rem 0.15rem;

          .td-item {
            padding: 0.04rem 0;
            font-size: 0.12rem;
          }
        }
      }
    }
  }
}
</style>