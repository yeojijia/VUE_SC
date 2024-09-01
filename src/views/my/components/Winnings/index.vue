<template>
  <div class="winnings">
    <div class="head">
      <div class="head-left">
        <div class="tabs-con">
          <van-tabs v-model:active="status" shrink swipe-threshold>
            <van-tab :title="item.name" :name="item.id" v-for="item of statusList" :key="item.id" />
          </van-tabs>
        </div>
      </div>
      <div class="head-right handle">
        <div class="btn exchange" @click="store.commit('SET_WINNINGS_EXCHANGE_SHOW', true)">{{ $t('my.desc109') }}</div>
        <div class="btn all" @click="handleAllRewardsDraw">{{ $t('my.desc110') }}</div>
      </div>
    </div>
    <div class="list">
      <div class="item-con" v-for="(item) of list" :key="item.id">
        <div class="item">
          <div class="amount">
            <div class="val">
              <span>$</span>{{item.amount}}
            </div>
          </div>
          <div class="content-box">
            <div class="content">
              <div class="text">
                <div class="title">{{item.name}}</div>
                <div class="time">
                  <div class="time-name">{{$t('my.desc112')}}</div>
                  <div class="time-val">{{ toTimeZone(item.validTime,'YYYY-MM-DD HH:mm:ss') }}</div>
                </div>
              </div>
              <div class="btn-con">
                <div class="btn pointer" @click="handleRewardsDraw([item.id])" v-if="item.status===0">{{ $t('my.desc111')
                  }}
                </div>
                <div class="btn disable" v-else-if="item.status===2">{{ $t('my.desc107') }}</div>
                <div class="btn disable" v-else>{{ $t('my.desc108') }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <loading-nodata :loading="isLoading&&!list.length" :nodata="!list.length" :size="2.4" />
    </div>
    <div class="head-bot handle">
      <div class="btn on" @click="store.commit('SET_WINNINGS_EXCHANGE_SHOW', true)">{{ $t('my.desc109') }}</div>
      <div class="btn" @click="handleAllRewardsDraw">{{ $t('my.desc110') }}</div>
    </div>
  </div>
</template>
<script setup>
import { ref, getCurrentInstance, watch } from 'vue'
import { _rewardsList, _rewardsDraw } from '@/utils/api/common'
import { useStore } from 'vuex';
const { proxy } = getCurrentInstance()
const store = useStore()
const toTimeZone = proxy.$common.toTimeZone
const status = ref('')
const statusList = ref([
  {
    id: '',
    name: proxy.$t('common.desc0')
  },
  {
    id: 0,
    name: proxy.$t('my.desc106')
  },
  {
    id: 2,
    name: proxy.$t('my.desc107')
  },
  {
    id: 3,
    name: proxy.$t('my.desc108')
  }
])
const list = ref([])
const isLoading = ref(false)
function getrewardsList() {
  if (isLoading.value) return
  isLoading.value = true
  list.value = []
  _rewardsList({
    status: status.value
  }).then(res => {
    list.value = res
  }).finally(() => {
    isLoading.value = false
  })
}
function handleRewardsDraw(ids) {
  _rewardsDraw({ ids }).then(res => {
    getrewardsList()
    spop({
      template: proxy.$t('my.desc113'),
      style: 'success',
      autoclose: 2000
    })
  })
}

function handleAllRewardsDraw() {
  const ids = list.value.filter(item => {
    return item.status === 0
  }).map(item => {
    return item.id
  })
  if (ids.length === 0) {
    spop({
      template: proxy.$t('my.desc117'),
      style: 'warning',
      autoclose: 2000
    })
    return
  }
  handleRewardsDraw(ids)

}
watch(() => status.value, () => {
  getrewardsList()
}, {
  immediate: true
})

</script>


<style lang='scss' scoped>
.winnings {
  background: var(--gg-card-bg);
  border-radius: 0.2rem;
  padding: 0.24rem;

  .handle {
    display: flex;
    align-items: center;

    .btn {
      margin-left: 0.12rem;
      font-size: 0.14rem;
      height: 0.36rem;
      min-width: 0.8rem;
      padding: 0 0.12rem;
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 0.08rem;
      font-family: 'PingFang SC';
      font-style: normal;
      font-weight: 400;
      font-size: 0.14rem;
      text-align: center;
      cursor: pointer;
      transition: all 0.2s linear;
      color: var(--gg-btn-text);
      border: 1px solid transparent;

      &:first-child {
        margin-left: 0;
      }

      &.exchange {
        border: 1px solid var(--theme);
        color: var(--theme);
      }

      &.all {
        background: var(--gg-btn-bg);
        border: 1px solid var(--gg-btn-border);
        color: var(--gg-btn-color);
      }


    }
  }

  .head {
    margin-bottom: 0.2rem;
    display: flex;
    justify-content: space-between;

    &-left {
      display: flex;
      align-items: center;

    }

    &-bot {
      display: none;
    }



  }

  .nodata {
    width: 100%;
    justify-content: center;
  }

  .tabs-con {
    :deep {
      .van-tabs {
        // box-shadow: var(--shadow);
        // border-radius: 0.08rem;
        overflow: hidden;

      }

      .van-tabs__line {
        display: none;
      }

      .van-tabs__wrap {
        height: auto;
      }

      .van-tabs__nav {
        padding: 0;
        background: transparent;

      }

      .van-tab {
        color: var(--btn-text-3);
        // padding: 0 0.05rem;
        padding-left: 0.1rem;
        padding-right: 0;

        &:first-child {
          padding-left: 0;
        }

        &:last-child {
          padding-right: 0;
        }

        .van-tab__text {
          font-size: 0.14rem;
          height: 0.36rem;
          min-width: 0.8rem;
          padding: 0 0.2rem;
          box-sizing: border-box;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 0.08rem;
          font-family: 'PingFang SC';
          font-style: normal;
          font-weight: 400;
          font-size: 0.14rem;
          text-align: center;
          color: var(--gg-btn-text);
          border: 1px solid transparent;

        }
      }

      .van-tab--active {
        .van-tab__text {
          font-weight: 600;
          background: var(--gg-tab-btn-bg);
          border-color: var(--gg-tab-btn-border);
          box-shadow: var(--gg-tab-btn-shadow);
          color: var(--gg-text);

        }
      }
    }
  }

  .rule-btn {
    flex: 0 0 auto;
    margin-left: 0.2rem;

    img {
      width: 0.24rem;
      height: 0.24rem;
      cursor: pointer;
    }
  }

  .list {
    display: flex;
    width: calc(100% + 0.2rem);
    margin-left: -0.08rem;
    flex-wrap: wrap;

    .item-con {
      width: 25%;
      padding: 0 0.1rem;
      box-sizing: border-box;
      margin-bottom: 0.2rem;

      .item {
        position: relative;
        width: 100%;
        height: 1.24rem;
        background: linear-gradient(90deg, #14862D 0%, #7CCA8F 100%);
        border-radius: 0.12rem;

        .amount {
          width: 34.73%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          background: url('../../../../assets/images/winnings/amount_bg.png') no-repeat center;
          background-size: 100% 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding-right: 6%;
          box-sizing: border-box;



          .val {
            display: flex;
            align-items: baseline;
            font-family: 'PingFang SC';
            font-style: normal;
            font-weight: 700;
            font-size: 0.28rem;
            line-height: 1.2em;
            text-align: center;
            color: #FFFFFF;
          }

          span {
            margin-right: 0.02rem;
            font-family: 'PingFang SC';
            font-style: normal;
            font-weight: 600;
            font-size: 0.12rem;
            line-height: 0.17rem;
            color: #FFFFFF;

          }
        }


        .content-box {
          padding-top: 0.04rem;
          padding-bottom: 0.04rem;
          height: 100%;

        }

        .content {
          height: 100%;
          background: url('../../../../assets/images/winnings/item_content_bg.png') no-repeat center;
          background-size: 100% 100%;
          padding-left: 33%;
          display: flex;
          justify-content: space-between;
          padding-top: 0.07rem;
          padding-bottom: 0.07rem;


          .text {
            padding-top: 0.06rem;
            padding-bottom: 0.06rem;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            box-sizing: border-box;

            .title {
              font-family: 'PingFang SC';
              font-style: normal;
              font-weight: 500;
              font-size: 0.16rem;
              line-height: 1.4em;
              color: #0E121A;
            }

            .time {
              font-family: 'PingFang SC';
              font-style: normal;
              font-weight: 400;
              font-size: 0.12rem;
              line-height: 0.14rem;
              // text-align: center;
              color: var(--gg-subtitle);

              &-name {
                margin-bottom: 0.04rem;
                color: #0E121A;
              }
            }
          }

          .btn-con {
            flex: 0 0 auto;
            width: 37%;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0.07rem;
            box-sizing: border-box;
            border-left: 1px dashed #D3DAD4;

            .btn {
              width: 100%;
              background: var(--gg-btn-bg);
              border: 1px solid var(--gg-btn-border);
              color: var(--gg-btn-color);
              border-radius: 0.06rem;

              font-family: 'PingFang SC';
              font-style: normal;
              font-weight: 400;
              font-size: 0.14rem;
              line-height: 1.56em;
              text-align: center;
              padding: 0.04rem;

              &.pointer {
                cursor: pointer;

              }

              &.disable {
                color: #A9AEB7;
                background: #ECEEF2;
                box-shadow: inset 0 0.02rem 0.04rem rgba(0, 0, 0, 0.05);
              }
            }
          }
        }
      }
    }
  }
}

// @media (max-width:1700px) {
//   .winnings {
//     .list {
//       .item-con {
//         .item {
//           .amount {
//             .val {
//               font-size: 0.24rem;
//             }
//           }


//         }
//       }
//     }
//   }
// }

@media (max-width:1536px) {
  .winnings {
    .list {
      .item-con {
        .item {
          .amount {
            .val {
              font-size: 0.22rem;
            }
          }

          .content {
            .btn-con {
              .btn {}
            }
          }
        }
      }
    }
  }
}

@media (max-width:1500px) {
  .winnings {
    .list {
      .item-con {
        width: 33.33%;
      }
    }
  }
}

@media (max-width:992px) {
  .winnings {
    .list {
      .item-con {
        width: 50%;
      }
    }
  }
}

@media (max-width:749px) {
  .winnings {
    // margin-top: 0;
    // position: absolute;
    // top: 0;
    // left: 0;
    // width: 100%;
    // height: 100%;
    display: flex;
    flex-direction: column;
    background: transparent;
    box-shadow: none;
    border-radius: 0;
    padding: 0;
    height: 100%;
    padding-bottom: 0.3rem;
    // overflow-y: auto;

    .handle {

      .btn {
        flex: 1;
        min-width: 1rem;
        height: 0.44rem;
        font-weight: 600;
        font-size: 0.14rem;
        border-radius: 0.08rem;
        border: 1px solid var(--theme);
        color: var(--theme);

        &:first-child {
          margin-left: 0;
          background: var(--gg-btn-bg);
          border: 1px solid var(--gg-btn-border);
          color: var(--gg-btn-color);
        }

      }
    }

    .head {
      margin-bottom: 0;

      &-left {
        padding: 0 0 0.12rem;
        width: 100%;
        display: flex;
        justify-content: space-between;
        // box-shadow: var(--shadow);
      }

      &-right {
        display: none;
      }

      &-bot {
        padding: 0.12rem 0.15rem;
        display: flex;
        background-color: var(--gg-card-bg);
        box-shadow: var(--shadow);
        justify-content: flex-end;
        border-radius: 0.04rem;
      }
    }

    .rule-btn {
      img {
        width: 0.2rem;
        height: 0.2rem;
      }
    }

    .tabs-con {
      margin-top: 0.16rem;
      width: 100%;

      :deep {
        .van-tab {
          padding-left: 0.08rem;

          .van-tab__text {
            min-width: 0.68rem;
            padding: 0 0.2rem;
            height: 0.32rem;
            border-radius: 0.08rem;
          }
        }
      }

    }

    .list {
      flex: 1;
      overflow-y: auto;
      width: 100%;
      margin: 0;
      padding: 0;
      flex-direction: column;
      box-sizing: border-box;

      .item-con {
        padding: 0;
        width: 100%;
        margin-bottom: 0.1rem;

        .item {
          height: 1.24rem;



          .content {
            .text {
              .title {
                font-size: 0.14rem;
              }

              .time {}
            }

            .btn-con .btn {
              font-size: 0.14rem;
            }
          }
        }
      }
    }
  }
}
</style>