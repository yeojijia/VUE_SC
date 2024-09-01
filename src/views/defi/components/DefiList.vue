<template>
  <div class="list">
    <div class="item" v-for="(item,index) of list" :key="item.id">
      <div class="item-top">
        <div class="box">
          <div class="title-apr">
            <div class="title wrap" v-html="item.name"></div>
            <div class="apr">
              <div class="val wrap">{{item.apr?decal(item.apr, 2):0 }}%</div> <span>APR</span>
            </div>
          </div>
          <div class="stake-lock">
            <div class="stake">
              <div class="name">{{$t('defi.desc8')}}：</div>
              <span>{{ item.userPledgeAmount? decal(item.userPledgeAmount, 3) : 0 }} {{
                item.pledgeCoin?.symbol }}</span>
            </div>
            <div class="lock" v-html="$t('defi.desc9',{n:`<span> ${lockTimeToDay(item.lockTimes)}</span>`})">
            </div>
          </div>
        </div>
      </div>
      <div class="item-bot">
        <div class="row">
          <div class="row-left">
            <div class="name">{{$t('defi.desc10')}}：</div>
            <div class="val">{{ decal(item.userLockedAmount, 3) }} {{ item.pledgeCoin?.symbol }}</div>
          </div>
          <loading-btn class="btn" @click="handlePledgeClick(item, index)">
            {{$t('defi.desc11')}}
          </loading-btn>
        </div>
        <div class="row">
          <div class="row-left">
            <div class="name">{{$t('defi.desc12')}}：</div>
            <div class="val">{{ decal(item.userCanRedemptionAmount, 3) }} {{
              item.pledgeCoin?.symbol }}</div>
          </div>
          <loading-btn :disabled="Number(item.userCanRedemptionAmount) === 0" :loading="item.ransomLoading" class="btn"
            @click="handleRansomClick(item, index)">
            {{$t('defi.desc13')}}
          </loading-btn>
        </div>
        <div class="row">
          <div class="row-left">
            <div class="name">{{$t('defi.desc14')}}：</div>
            <div class="val">{{ decal(item.userPendingAmount, 3) }} {{ item.rewardCoin?.symbol
              }}</div>
          </div>
          <loading-btn :disabled="Number(item.userPendingAmount) === 0" class="btn" @click="handleCashClick(item, index)">
            {{$t('defi.desc15')}}
          </loading-btn>
        </div>
      </div>
    </div>
  </div>
  <div class="loading-nodata" v-show="loading||!list.length">
    <loading-nodata :loading="loading" :nodata="!list.length" :size="2.4" />
  </div>
</template>
<script setup>

</script>
<script setup>
import { ref, getCurrentInstance } from "vue";
import { useStore } from 'vuex'
const store = useStore()
const { proxy } = getCurrentInstance()
const decal = proxy.$common.decal
const props = defineProps({
  list: Array,
  loading: Boolean,
  finished: Boolean,
  isLogin: Boolean
});

const emit = defineEmits(["pledge", "exchange", "allowed", "ransom", "cash", "itemRefresh"]);
const show = ref(null);
function handleShowClick(index) {
  if (show.value === index) {
    show.value = null;
  } else {
    emit("itemRefresh", index);
    show.value = index;
  }
}

//质押
function handlePledgeClick(item, index) {
  if (!props.isLogin) {
    store.commit('SET_LOGIN_POPUP_SHOW',true)
    return
  }
  emit("pledge", item, index);
}
//赎回
function handleRansomClick(item, index) {
  emit("ransom", item, index);
}
//领取
function handleCashClick(item, index) {
  emit("cash", item, index);
}

//锁仓时间换上成天数
function lockTimeToDay(s) {
  const day = Math.floor(s/(24 * 60 * 60));
  if (day > 0) {
    return day
  } else {
    return `${s}`
  }
}

</script>


<style lang='scss' scoped>
.loading-nodata {
  height: 40vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.list {
  margin-top: 0.2rem;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 0.16rem 0.16rem;

  .item {
    width: 100%;
    height: 100%;
    padding: 0.24rem;
    box-sizing: border-box;
    background: var(--gg-card-bg);
    border-radius: 0.2rem;

    &-top {

      .box {

        border-bottom: 1px dashed var(--gg-line);
      }

      .title-apr {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .title {
          font-family: 'PingFang SC';
          font-style: normal;
          font-weight: 600;
          font-size: 0.2rem;
          line-height: 1.4em;
          color: var(--gg-text);
        }

        .apr {
          max-width: 80%;
          margin-left: 0.15rem;
          font-family: 'DIN Alternate';
          font-style: normal;
          font-weight: 700;
          font-size: 0.28rem;
          line-height: 1.4em;
          display: flex;
          align-items: baseline;
          color: var(--theme);

          .val {
            flex: 1;
          }

          span {
            align-self: flex-end;
            margin-left: 0.03rem;
            font-size: 0.14rem;
            line-height: 1.5em;
          }
        }
      }

      .stake-lock {
        margin-top: 0.12rem;
        margin-bottom: 0.16rem;
        display: flex;
        justify-content: space-between;

        .stake {

          display: flex;

          .name {
            max-width: 0.95rem;
            font-family: 'PingFang SC';
            font-style: normal;
            font-weight: 400;
            font-size: 0.14rem;
            line-height: 0.16rem;
            color: var(--gg-subtitle);
          }

          span {
            margin-left: 0.04rem;
            font-family: 'PingFang SC';
            font-style: normal;
            font-weight: 500;
            font-size: 0.16rem;
            line-height: 0.16rem;
            color: var(--gg-text);
          }
        }

        .lock {
          margin-left: 0.15rem;
          font-family: 'PingFang SC';
          font-style: normal;
          font-weight: 400;
          font-size: 0.16rem;
          line-height: 1.5em;
          color: var(--gg-text);
          display: flex;
          align-items: baseline;
          white-space: nowrap;

          :deep {
            span {
              padding: 0 0.03rem;
              font-family: 'DIN Alternate';
              font-style: normal;
              // font-weight: 700;
              font-size: 0.16rem;
              line-height: 1.17em;
              color: var(--theme);
            }
          }


        }

      }
    }

    &-bot {
      .row {
        margin-top: 0.2rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        cursor: pointer;


        &:first-child {
          margin-top: 0.16rem;
        }

        &-left {
          display: flex;
          flex-direction: column;

          .name {
            font-family: 'PingFang SC';
            font-style: normal;
            font-weight: 400;
            font-size: 0.14rem;
            line-height: 1.5em;
            color: var(--gg-subtitle);
          }

          .val {
            margin-top: 0.04rem;
            font-family: 'PingFang SC';
            font-style: normal;
            font-weight: 500;
            font-size: 0.16rem;
            line-height: 1.5em;
            color: var(--gg-text);
          }
        }

        .btn {
          margin-left: 0.15rem;
          min-width: 1.08rem;
          height: 0.4rem;
          padding: 0 0.16rem;
          border-radius: 0.1rem;
          font-family: 'PingFang SC';
          font-style: normal;
          font-weight: 400;
          font-size: 0.14rem;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          background: var(--gg-btn-bg);
          border: 1px solid var(--gg-btn-borde);
          color: var(--gg-btn-color);

          &.van-button--disabled {
            background: var(--gg-btn-bg-disable);
            color: var(--gg-btn-color-disable);
            border-color: transparent;
            opacity: 1;
          }

        }

      }
    }
  }
}

@media (max-width:1536px) {
  .list {
    grid-template-columns: 1fr 1fr;

  }
}

@media (max-width:749px) {
  .list {
    margin-top: 0.12rem;
    grid-template-columns: 1fr;
    grid-gap: 0.12rem 0;

    .item {
      border-radius: 0.12rem;
      padding: 0.16rem;

      &-top {

        .title-apr {
          .apr {
            align-self: flex-end;
            font-size: 0.24rem;
          }
        }

        .stake-lock {

          .stake {
            flex-direction: column;


            span {
              margin-left: 0;
              margin-top: 0.08rem;
              font-size: 0.16rem;
            }
          }

          .lock {
            :depp {
              span {
                font-size: 0.24rem;
              }
            }
          }
        }

      }

      &-bot {

        .row {
          margin-top: 0.16rem;

          &:first-child {
            margin-top: 0.12rem;
          }

          &-left {
            .name {
              font-size: 0.14rem;
              line-height: 0.16rem;
            }

            .val {

              margin-top: 0.08rem;
              line-height: 1em;
            }
          }



          .btn {
            min-width: 0.88rem;
            padding: 0 0.15rem;
            height: 0.36rem;
            border-radius: 0.08rem;
          }
        }
      }
    }

  }
}
</style>