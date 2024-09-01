<template>
  <div class="detail">
    <div class="min-head" :class="{show:showPopover}">
      <div class="head-row">
        <div class="left">
          <div class="btn" @click="handleBackClick">
            <div class="icon">
              <van-icon name="cross" />
            </div>
            <span>{{ $t('common.desc88') }}</span>
          </div>
        </div>
        <div class="right">
          <div class="btn-con">
            <div class="btn" @click="handleTransferBalance">
              <!-- 划转 -->
              {{$t('common.desc123')}}
            </div>
            <img class="refresh" :class="{loading:refreshLoding}"
              :src="require(`../../assets/images/game/${theme}/icon_refresh.svg`)" @click="getWalletBalance" />
          </div>
        </div>
      </div>
      <div class="head-row">
        <div class="left">
          <div class="balance-con">
            <img :src="require(`../../assets/images/game/${theme}/icon_price.svg`)" />
            <span>BGM： ${{totalBalance}}</span>
          </div>
        </div>
        <div class="right">
          <img class="hide-btn" @click="showPopover = false" src="../../assets/images/game/FloatBtn_hide.svg" />
        </div>
      </div>
    </div>
    <div class="float-btn">
      <Vue3DraggableResizable :initW="110" :initH="120" v-model:x="x" v-model:y="y" v-model:active="active"
        :draggable="true" :resizable="false">
        <img class="btn" :class="{hide:showPopover}" src="../../assets/images/game/FloatBtn.svg"
          @click="showPopover = true" />
      </Vue3DraggableResizable>
    </div>
    <div class="com-container">
      <div class="iframe-con" :class="{full:fullShow}">
        <div class="iframe-head">
          <div class="head-left">
            <div class="back-btn btn" @click="handleBackClick">
              <div class="icon">
                <van-icon name="arrow-left" />
              </div>
              <span>{{ $t('common.desc86') }}</span>
            </div>
            <div class="full-btn btn" @click="fullShow = !fullShow" v-if="!fullShow">
              <div class="icon">
                <img :src="require(`../../assets/images/game/icon_full.svg`)" />
              </div>
              <span>{{ $t('common.desc87') }}</span>
            </div>
            <div class="full-btn btn" @click="fullShow = !fullShow" v-else>
              <div class="icon">
                <van-icon name="cross" />
              </div>
              <span>{{ $t('common.desc88') }}</span>
            </div>
          </div>
          <div class="head-right">
            <div class="btn-con">
              <div class="btn" @click="handleTransferBalance">
                <!-- 划转 -->
                {{$t('common.desc123')}}
              </div>
              <img class="refresh" :class="{loading:refreshLoding}"
                :src="require(`../../assets/images/game/${theme}/icon_refresh.svg`)" @click="getWalletBalance" />
            </div>
            <div class="balance-con">
              <img :src="require(`../../assets/images/game/${theme}/icon_price.svg`)" />
              <span>BGM： ${{totalBalance}}</span>
            </div>
          </div>
        </div>
        <iframe :src="gamesUrl" name="refresh_name" id="iframeId" class="iframe-content" ref="webIframe" scrolling="auto"
          width="100%" height="100%" frameborder="0"
          sandbox="allow-top-navigation allow-same-origin allow-forms allow-scripts">
        </iframe>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, getCurrentInstance, onActivated, watch, computed, nextTick } from 'vue'
import { _gameUrl } from '@/utils/api/game'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { _asset } from '@/utils/api/money'
import { _allBalanceToOffice } from '@/utils/api/game'
const { proxy } = getCurrentInstance()
const store = useStore()
const router = useRouter()
const isMobile = computed(() => store.state.global.isMobile)
let theme = computed(() => store.state.global.theme)
const gameUrlParams = computed(() => store.state.global.gameUrlParams)
let totalBalance = computed(() => store.state.user.gameTotalBalance)
let x = ref(0)
let y = ref(0)
let active = ref(false)
const showPopover = ref(false)


let fullShow = ref(false)
watch(() => isMobile.value, () => {
  getGameUrl()
})
let gamesUrl = ref('')

const toPlatform = ref('')
function getGameUrl() {
  const { handler, code, thirdpartyPlatformCode, id } = gameUrlParams.value
  toPlatform.value = thirdpartyPlatformCode
  proxy.$toast.loading({
    duration: 0,
  });
  _gameUrl({ handler, code, gameId: id }).then(res => {
    const lastRouter = router.currentRoute.value
      .meta.lastRouter
    if (res === 'GameType Error') {
      spop({
        template: proxy.$t("game.desc3"),
        style: 'error',
        autoclose: 2000
      })
      router.push(lastRouter)
      return
    } else if (res === 'IP is not accepted..') {
      spop({
        template: proxy.$t("game.desc4"),
        style: 'error',
        autoclose: 2000
      })
      router.push(lastRouter)
      return
    }
    gamesUrl.value = res
    webIframeLoad()
  }).finally(() => {
    proxy.$toast.clear()
  })
}
const webIframe = ref(null)
function webIframeLoad() {
  nextTick(() => {
    let iframe = webIframe.value
    if (iframe.attachEvent) {
      iframe.attachEvent("onload", function () {
        proxy.$toast.clear()
        getWalletBalance()
      });
    } else {
      iframe.onload = function () {
        proxy.$toast.clear()
        getWalletBalance()
      };
    }
  })
}

//获取游戏资产余额
const refreshLoding = ref(false)
async function getWalletBalance() {
  if (refreshLoding.value) return
  refreshLoding.value = true
  store.dispatch('getTotalBalance')
  await store.dispatch('getGameTotalBalance')
  refreshLoding.value = false
}
//划转
function handleTransferBalance() {
  const transferAmount = Math.floor(totalBalance.value * 100) / 100
  if (transferAmount < 1) {
    spop({
      template: proxy.$t('common.desc112', { n: 1 }),
      style: 'warning',
      autoclose: 2000
    })
    return
  }
  store.dispatch('transfer', { transferAmount, toPlatform: toPlatform.value }).then(res => {
    if (res) {
      spop({
        template: proxy.$t('common.desc115'),
        style: 'success',
        autoclose: 2000
      })
      getWalletBalance()
    }
  })
}
//一键归集
function handlleAllBalanceToOffice() {
  _allBalanceToOffice().then(res => {
    if (res === 'ok') {
      spop({
        template: proxy.$t('user.desc54'),
        style: 'success',
        autoclose: 2000
      })
      getWalletBalance()
    }
  })
}

// //返回
function handleBackClick() {
  const lastRouter = router.currentRoute.value
    .meta.lastRouter
  router.push(lastRouter)
  showPopover.value = false
  gamesUrl.value = ''
  store.commit('SET_GAME_URL_PARAMS', null)
  return false;
}
const btnShow = ref(false)

const iframeH = ref(0)
onActivated(() => {
  const height = document.body.clientHeight
  iframeH.value = height - 124
  getGameUrl()
  getWalletBalance()
})
</script>


<style lang='scss' scoped>
.detail {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding-top: 0.4rem;
  padding-bottom: 0.4rem;

  .float-btn {
    display: none;
    width: 0.4rem;
    height: 0.4rem;
    position: fixed;
    top: 0.2rem;
    left: 0.2rem;
    user-select: none;
    z-index: 999;

    .btn {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;

      &.hide {
        opacity: 0;
      }
    }

    :deep {
      .vdr-container {
        width: 100% !important;
        height: 100% !important;
        border: none;
      }
    }

    .min-head {
      background: rgba(0, 0, 0, 0.6);
      backdrop-filter: blur(7px);
      /* Note: backdrop-filter has minimal browser support */

      border-radius: 10px;
    }
  }

  .min-head {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    padding: 0.12rem 0.16rem 0.16rem;
    box-sizing: border-box;
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(0.07rem);
    z-index: 999999;
    border-radius: 0 0 0.1rem 0.1rem;
    transition: all 0.3s linear;
    transform: translateY(-100%);

    &.show {
      transform: none;

    }

    .head-row {
      margin-bottom: 0.14rem;
      display: flex;
      justify-content: space-between;
      align-items: center;

      &:last-child {
        margin-bottom: 0;
      }
    }

    .van-icon {
      font-size: 0.14rem;
      line-height: 0.2rem;
      font-weight: 600;
      color: var(--gg-text);
    }

    .btn {
      cursor: pointer;
      margin-right: 0.4rem;
      display: flex;

      // flex-direction: column;
      align-items: center;

      &:last-right {
        margin-right: 0;
      }

      &.back-btn {

        span {
          color: var(--gg-text);
        }

        .van-icon {
          color: var(--gg-text);

        }
      }

      img {
        width: 0.16rem;
        height: 0.16rem;
        object-fit: contain;
      }

      span {
        margin-left: 0.04rem;
        font-family: 'PingFang SC';
        font-style: normal;
        font-weight: 400;
        font-size: 0.14rem;
        line-height: 0.2rem;
        color: var(--gg-text);
      }
    }

    .refresh {
      width: 0.14rem;
      height: 0.14rem;
      object-fit: cover;
      cursor: pointer;

      &.loading {
        animation: loading 1s linear;
      }
    }

    .balance-con {
      display: flex;
      align-items: center;

      img {
        margin-right: 0.08rem;
        width: 0.2rem;
        height: 0.2rem;
        object-fit: cover;
      }

      span {
        font-family: 'PingFang SC';
        font-style: normal;
        font-weight: 500;
        font-size: 0.16rem;
        line-height: 0.22rem;
        color: var(--gg-text);
      }
    }

    .btn-con {
      display: flex;
      align-items: center;

      .btn {
        margin-right: 0.08rem;
        cursor: pointer;
        height: 0.28rem;
        min-width: 0.8rem;
        border-radius: 0.08rem;
        padding: 0 0.12rem;
        font-family: "PingFang SC";
        font-style: normal;
        font-weight: 400;
        font-size: 0.14rem;
        display: flex;
        justify-content: center;
        align-items: center;
        background: var(--gg-btn-bg-active);
        border: 1px solid var(--gg-btn-border-active);
        color: var(--gg-btn-color-active);
      }
    }

    .hide-btn {
      width: 0.16rem;
      height: 0.16rem;
    }
  }

  .com-container {
    height: 100%;
  }
}

.iframe-con {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  &.full {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
    padding: 0;
    background: var(--page-bg);
  }


}


.iframe-head {
  margin-bottom: 0.2rem;
  flex: 0 0 auto;
  width: 100%;
  display: flex;
  justify-content: space-between;
  border-radius: 0.12rem;
  padding: 0.13rem 0.16rem;
  box-sizing: border-box;
  background: var(--gg-head-bg);
  box-shadow: var(--gg-foot-msg-shadow);

  .head-left {
    display: flex;
    align-items: center;

    .min-show {
      display: none;
    }



    .van-icon {
      font-size: 0.14rem;
      line-height: 0.2rem;
      font-weight: 600;
      color: var(--gg-subtitle);
    }

    .btn {
      cursor: pointer;
      margin-right: 0.4rem;
      display: flex;

      // flex-direction: column;
      align-items: center;

      &:last-right {
        margin-right: 0;
      }

      &.back-btn {

        span {
          color: var(--gg-text);
        }

        .van-icon {
          color: var(--gg-text);

        }
      }

      img {
        width: 0.16rem;
        height: 0.16rem;
        object-fit: contain;
      }

      span {
        margin-left: 0.04rem;
        font-family: 'PingFang SC';
        font-style: normal;
        font-weight: 400;
        font-size: 0.14rem;
        line-height: 0.2rem;
        color: var(--gg-subtitle);
      }
    }

  }

  .head-right {
    display: flex;
    justify-content: space-between;
    align-items: center;


    .refresh {
      margin-right: 0.32rem;
      width: 0.14rem;
      height: 0.14rem;
      object-fit: cover;
      cursor: pointer;

      &.loading {
        animation: loading 1s linear;
      }
    }

    .balance-con {
      height: 0.36rem;
      display: flex;
      align-items: center;

      img {
        margin-right: 0.08rem;
        width: 0.2rem;
        height: 0.2rem;
        object-fit: cover;
      }

      span {
        font-family: 'PingFang SC';
        font-style: normal;
        font-weight: 500;
        font-size: 0.14rem;
        color: var(--theme);
      }
    }

    .btn-con {
      display: flex;
      align-items: center;

      .btn {
        margin-right: 0.12rem;
        cursor: pointer;
        height: 0.32rem;
        min-width: 0.88rem;
        border-radius: 0.08rem;
        padding: 0 0.16rem;
        font-family: "PingFang SC";
        font-style: normal;
        font-weight: 400;
        font-size: 0.14rem;
        display: flex;
        justify-content: center;
        align-items: center;
        background: var(--gg-btn-bg-active);
        border: 1px solid var(--gg-btn-border-active);
        color: var(--gg-btn-color-active);
      }
    }
  }
}

iframe {
  flex: 1 1 auto;
  width: 100% !important;
  background: var(--gg-card-bg);
}

@media (max-width:749px) {
  .detail {
    .float-btn {
      display: block;

    }
  }

  .iframe-con {
    padding: 0;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 99;
    padding: 0;

    &.full {
      iframe {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;

      }

      .min-iframe-btn {
        top: 0.3rem;
        left: auto;
        right: 0;

        .show-btn {
          width: 0.2rem;
          height: 0.3rem;
          border-top-right-radius: 0;
          border-bottom-right-radius: 0;

          border-top-left-radius: 0.2rem;
          border-bottom-left-radius: 0.2rem;

          img {
            transform: rotate(90deg);
          }
        }

        .btn-con {
          padding: 0.08rem 0.04rem;
          flex-direction: row-reverse;
          border-top-right-radius: 0;
          border-bottom-right-radius: 0;
          border-top-left-radius: 0.08rem;
          border-bottom-left-radius: 0.08rem;

          .btn {
            margin-bottom: 0;
            margin-right: 0.08rem;

            &:first-child {
              margin-right: 0;
            }
          }

          img {
            transform: rotate(90deg);
          }
        }
      }
    }
  }

  .min-iframe-btn {
    display: block;
    position: absolute;
    top: 0.7rem;
    left: 0;
    z-index: 100;


    &.show {
      .show-btn {
        transform: translateX(-100%);
      }

      .btn-con {
        transform: none;
      }
    }

    .show-btn {
      position: absolute;
      top: 0;
      left: 0;
      transition: all 0.3s linear;
      background: rgba(0, 0, 0, 0.5);
      width: 0.3rem;
      height: 0.2rem;
      display: flex;
      align-items: center;
      justify-content: center;
      border-top-right-radius: 0.2rem;
      border-bottom-right-radius: 0.2rem;

    }

    .btn-con {
      position: absolute;
      top: 0;
      left: 0;
      padding: 0.04rem 0.08rem;
      box-sizing: border-box;
      border-top-right-radius: 0.08rem;
      border-bottom-right-radius: 0.08rem;
      transition: all 0.3s linear;
      transform: translateX(-100%);
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      flex-direction: column;


      .btn {
        margin-bottom: 0.08rem;
        display: flex;
        flex-direction: column;
        align-items: center;

        &:last-child {
          margin-bottom: 0;
        }

        span {
          font-family: 'PingFang SC';
          font-style: normal;
          font-weight: 400;
          margin-top: 0.04rem;
          font-size: 0.12rem;
          line-height: 1.2em;
          color: #fff;
        }
      }
    }

    img {
      width: 0.14rem;
      height: 0.14rem;
      object-fit: cover;
    }



  }

  .iframe-head {
    padding: 0 0.15rem;
    border-radius: 0;
    height: 0.44rem;
    margin-bottom: 0;
    display: none;

    .head-left {
      .min-show {
        display: block;

        font-size: 0.16rem;
        color: var(--gg-text);
      }

      .btn {
        margin-right: 0;
        padding-right: 0.14rem;

        span {
          display: none;
        }

        &.full-btn {
          display: none;
        }

        img {
          display: none;
        }
      }
    }

    .head-right {

      .balance-con {
        height: 0.3rem;

        img {
          width: 0.22rem;
          height: 0.22rem;
        }

        span {

          font-size: 0.14rem;
        }
      }

      .btn-con {
        .btn {
          margin-right: 0.1rem;
          padding: 0 0.12rem;
          height: 0.3rem;
          min-width: auto;
          white-space: nowrap;
          font-size: 0.12rem;
          border-radius: 0.15rem;
        }

        .refresh {
          margin-right: 0.2rem;
          width: 0.15rem;
          height: 0.15rem;
        }
      }
    }
  }

  iframe {
    // transform: rotate(90deg);

  }


}

@keyframes loading {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>