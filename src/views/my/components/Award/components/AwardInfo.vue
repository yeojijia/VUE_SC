<template>
  <div class="info">
    <div class="info-left">
      <div class="sum-code">
        <div class="sum">
          <div class="title">{{$t('invite.desc61')}}</div>
          <div class="sum-msg">
            <div class="name">{{$t('invite.desc36')}}</div>
            <div class="val wrap">$ {{info.totalRebate?info.totalRebate:0}}</div>
          </div>
        </div>
        <div class="code" v-if="isMobile">
          <div class="qrcode">
            <div ref="inviteCodeDom"></div>
          </div>
        </div>
      </div>
      <div class="invite">
        <div class="code" v-if="!isMobile">
          <div class="qrcode">
            <div ref="inviteCodeDom"></div>
          </div>
        </div>
        <div class="invite-msg">
          <div class="msg-item">
            <div class="name">{{$t('invite.desc62')}}</div>
            <div class="inp-con">
              <input readonly type="text" :value="info.inviteCode">
              <img class="code-copy" src="../../../../../assets/images/common/icon_copy.svg"
                :data-clipboard-text="info.inviteCode" @click="handleCopy('.code-copy')" />
            </div>
          </div>
          <div class="msg-item">
            <div class="name">{{$t('invite.desc63')}}</div>
            <div class="inp-con">
              <input readonly type="text" :value="info.inviteUrl">
              <img class="link-copy" src="../../../../../assets/images/common/icon_copy.svg"
                :data-clipboard-text="info.inviteUrl" @click="handleCopy('.link-copy')" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="info-right">
      <div class="title">{{$t('invite.desc64')}}</div>
      <div class="desc" v-html="$t('invite.desc70')">

      </div>
    </div>
  </div>
</template>
<script setup>
import QRCode from 'qrcodejs2';
import Clipboard from "clipboard";
import { ref, computed, getCurrentInstance, watch, nextTick } from "vue";
import { useStore } from "vuex";
const { proxy } = getCurrentInstance()
const store = useStore()
const isMobile = computed(() => store.state.global.isMobile)
// const info = computed(() => store.state.user.inviteInfo)
const props = defineProps({
  info: Object
})
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

const inviteCodeDom = ref(null)
function handleCreatQrCode(text) {
  inviteCodeDom.value.innerHTML = ''
  new QRCode(inviteCodeDom.value, {
    text, // 需要转换为二维码的内容
    width: isMobile.value ? 80 : 140,
    height: isMobile.value ? 80 : 140,
    correctLevel: QRCode.CorrectLevel.H,
  })
}
watch(() => props.info, (e) => {
  if (e) {
    nextTick(() => {
      handleCreatQrCode(e.inviteUrl)
    })
  }
},
  { immediate: true })
</script>


<style lang='scss' scoped>
.info {
  border-radius: 0.2rem;
  padding: 0.24rem;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  background: var(--gg-card-bg);

  .title {
    font-family: 'PingFang SC';
    font-style: normal;
    font-weight: 400;
    font-size: 0.18rem;
    line-height: 1.4em;
    color: var(--gg-text);
  }

  &-left {
    flex: 1 1 auto;
    display: flex;
    justify-content: space-between;

    .sum-code {
      flex: 0 0 auto;
      min-height: 100%;

      .code {
        display: none;
      }
    }

    .sum {
      min-height: 100%;
      flex: 0 0 auto;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .name {
        margin-top: 0.35rem;
        font-family: 'PingFang SC';
        font-style: normal;
        font-weight: 400;
        font-size: 0.14rem;
        line-height: 1.5em;
        color: var(--gg-subtitle);
      }

      .val {
        max-width: 2rem;
        margin-top: 0.04rem;
        font-weight: 800;
        font-family: 'Venryn Sans';
        font-weight: 900;
        font-style: normal;
        font-size: 0.32rem;
        line-height: 1.2em;
        color: var(--theme);
      }
    }

    .code {
      flex: 0 0 auto;
      box-sizing: border-box;
      background: var(--gg-qrcode-bg);
      border: 1px solid var(--gg-qrcode-border);
      border-radius: 0.16rem;

      .qrcode {
        flex: 0 0 auto;
        padding: 0.1rem;
        box-sizing: border-box;

      }
    }

    .invite {
      margin-left: 8%;
      margin-right: 8%;
      padding-right: 8%;
      border-right: 1px solid var(--gg-line);
      flex: 1 1 auto;
      display: flex;
      align-items: center;
      box-sizing: border-box;



      &-msg {
        flex: 1 1 auto;
        margin-left: 0.24rem;

        .msg-item {
          margin-bottom: 0.28rem;

          &:last-child {
            margin-bottom: 0;
          }

          .name {
            margin-bottom: 0.06rem;
            font-family: 'PingFang SC';
            font-style: normal;
            font-weight: 400;
            font-size: 0.14rem;
            line-height: 1.5em;
            color: var(--gg-subtitle);
          }

          .inp-con {
            height: 0.4rem;
            background: var(--gg-box-bg);
            border: 1px solid var(--gg-box-border);
            border-radius: 0.08rem;
            display: flex;
            align-items: center;
            padding: 0 0.1rem;
            box-sizing: border-box;

            input {
              width: 0;
              flex: 1 1 auto;
              font-family: 'PingFang SC';
              font-style: normal;
              font-weight: 400;
              font-size: 0.14rem;
              line-height: 0.4rem;
              color: var(--gg-text);
            }

            img {
              flex: 0 0 auto;
              margin-left: 0.1rem;
              width: 0.12rem;
              cursor: pointer;
            }
          }
        }
      }
    }
  }

  &-right {
    width: 32%;

    .desc {
      margin-top: 0.08rem;
      font-family: 'PingFang SC';
      font-style: normal;
      font-weight: 400;
      font-size: 0.14rem;
      line-height: 1.5em;
      color: var(--gg-subtitle);

      p {
        margin-bottom: 0.08rem;

        &:last-child {
          margin-bottom: 0;
        }
      }

    }

  }
}

@media (max-width:1536px) {
  .info {
    &-left {
      .sum {
        .val {
          max-width: 1.4rem;
          font-size: 0.28rem;
        }
      }

      .invite {
        margin-left: 5%;
        margin-right: 5%;
        padding-right: 5%;
      }
    }
  }
}

@media (max-width:992px) {
  .info {
    flex-direction: column;

    &-left {
      .sum {
        .val {
          max-width: 2rem;
        }
      }

      .invite {
        margin-left: 5%;
        margin-right: 0;
        padding-right: 0;
        border-right: none;

        &-msg {
          .msg-item .inp-con input {
            font-size: 0.14rem;
          }
        }
      }
    }

    &-right {
      border-top: 1px solid var(--gg-line);
      margin-top: 0.24rem;
      padding-top: 0.24rem;
      width: 100%;
    }
  }
}

@media (max-width:749px) {
  .info {
    margin-top: 0.16rem;
    min-width: auto;
    padding: 0.16rem;
    border-radius: 0.12rem;

    .title {
      font-size: 0.16rem;
      line-height: 0.22rem;
    }

    &-left {
      flex-direction: column;

      .sum-code {
        display: flex;
        justify-content: space-between;

        .code {
          display: flex;
        }
      }

      .code {
        border-radius: 0.08rem;

        .qrcode {

          padding: 0.06rem;
        }

      }

      .sum {
        justify-content: start;

        .name {
          margin-top: 0.12rem;
        }

        .val {
          margin-top: 0;
          font-size: 0.2rem;
          line-height: 1.4em;
        }
      }

      .invite {
        margin-top: 0.2rem;
        margin-left: 0;
        flex-direction: column;

        .code {
          display: none;
        }

        &-msg {
          width: 100%;
          margin-left: 0;

          .msg-item {
            margin-bottom: 0.12rem;

            .inp-con input {
              font-size: 0.14rem;
            }
          }
        }

      }

    }

    &-right {
      margin-top: 0.2rem;
      padding-top: 0.2rem;
    }
  }
}
</style>