<template>
  <div class="game-list">
    <div class="list-head">
      <div class="td">{{$t('my.desc59')}}</div>
      <div class="td">{{$t('my.desc60')}}</div>
      <div class="td">{{$t('my.desc61')}}</div>
      <div class="td">{{$t('my.desc62')}}</div>
      <div class="td">{{$t('my.desc63')}}</div>
      <div class="td">{{$t('my.desc64')}}</div>
      <div class="td">{{$t('my.desc65')}}</div>
      <div class="td">{{$t('my.desc66')}}</div>
      <div class="td">{{$t('common.desc92')}}</div>
      <div class="td">{{$t('my.desc50')}}</div>
    </div>
    <div class="list-body">
      <div class="scroll">
        <com-list v-model:loading="_loading" :finished="finished" @load="emit('load')" v-if="list.length">
          <div class="tr" :class="{show:showIndex===index}" v-for="(item, index) of list" :key="index">
            <div class="tr-top">
              <div class="td">
                <div class="name">{{$t('my.desc59')}}：</div>
                <div class="val">{{item.createTime}}</div>
              </div>
              <div class="td">
                <div class="name">{{$t('my.desc60')}}：</div>
                <div class="val">{{item.insertTime}}</div>
              </div>
              <div class="td">
                <div class="name">{{$t('my.desc61')}}：</div>
                <div class="val">{{item.thirdpartyModule?.name }}</div>
              </div>
              <div class="td">
                <div class="name">{{$t('my.desc62')}}：</div>
                <div class="val">{{item.gameName}}</div>
              </div>
              <div class="td">
                <div class="name">{{$t('my.desc63')}}：</div>
                <div class="val">$ {{(item.betAmount)}}</div>
              </div>
              <div class="td">
                <div class="name">{{$t('my.desc64')}}：</div>
                <div class="val">$ {{(item.validBetAmount)}}</div>
              </div>
              <div class="td">
                <div class="name">{{$t('my.desc65')}}：</div>
                <div class="val">$ {{item.isSettle?(item.settleAmount):'--'}}</div>
              </div>
              <div class="td">
                <div class="name">{{$t('my.desc66')}}：</div>
                <div class="val ">

                  <span class="profit"
                    v-if="(Number(item.paymentAmount)>0&&item.isSettle)">${{(item.paymentAmount)}}</span>
                  <span class="loss" v-else-if="(Number(item.paymentAmount) <0 &item.isSettle)">${{(item.paymentAmount)}}
                  </span>
                  <span v-else>$--</span>
                </div>
              </div>
              <div class="td">
                <div class="name">{{$t('common.desc92')}}：</div>
                <div class="val highlight">
                  <template v-if="item.isSettle">
                    {{$t('my.desc94')}}
                  </template>
                  <template v-else>
                    {{$t('my.desc93')}}
                  </template>
                </div>
              </div>
              <div class="td">
                <div class="name">{{$t('my.desc50')}}：</div>
                <div class="val "><span class="overflow1">{{item.thirdpartyId}}</span>
                  <img class="copy-btn order-copy" src="../../../../../assets/images/common/icon_copy.svg"
                    :data-clipboard-text="item.thirdpartyId" @click="handleCopy('.order-copy')" />
                </div>
              </div>
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
import { ref, getCurrentInstance, computed } from 'vue'
import { useStore } from 'vuex';
const store = useStore()
const { proxy } = getCurrentInstance()

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

let showIndex = ref(1)

const gamePlatformList = computed(() => {
  let platformList = store.state.user.gamePlatformList
  if (platformList.length === 0) {
    store.dispatch('getAllPlatformInfo')
  }
  return platformList
})

function getPlatformName(code) {
  try {
    return gamePlatformList.value.find(item => item.code === code).friendlyName
  } catch (error) {
    return code
  }
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
</script>


<style lang='scss' scoped>
.scroll {
  padding: 0 0.15rem;
  box-sizing: border-box;
  height: 60vh;
  position: relative;


}

.game-list {
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



    &:last-child {
      padding-right: 0;
      flex: 0 0 auto;

      // width: 0.18rem;
      .val {
        display: flex;
        align-items: center;

      }
    }
  }

  .highlight {
    color: var(--theme) !important;
  }
}

@media (max-width:1536px) {
  .game-list {
    .td {

      &:first-child,
      &:nth-child(2),
      &:last-child {
        width: 1rem;
      }

    }
  }
}

@media (max-width:992px) {
  .game-list {
    padding: 0.1rem 0;

    .list-head {
      display: none;
    }

    .tr {
      &:first-child {
        padding-top: 0;
      }

      .tr-top {
        flex-wrap: wrap;
      }

      .tr-bot {
        flex-wrap: wrap;

        .bot-td {
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
      &:nth-child(2),
      &:last-child {
        width: 100%;
      }

      .name {
        display: block;
        color: var(--gg-subtitle);
      }
    }
  }
}

@media (max-width:749px) {

  .scroll {
    height: 100%;
  }

  .game-list {
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

      &:nth-last-child(2) {
        width: 100%;
      }

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

      &:first-child {
        padding-top: 0.07rem;
      }
    }
  }
}
</style>