<template>
  <div class="invite-info">
    <div class="info-top">
      <div class="invite-title">{{$t('my.desc7')}}
      </div>
      <div class="statistics">
        <div class="item">
          <div class="val">{{info.teamNum}}</div>
          <div class="name">{{ $t('invite.desc71') }} </div>
        </div>
        <div class="item">
          <div class="val">${{decal(info.totalEarnings,2) }}</div>
          <div class="name">{{ $t('invite.desc72') }} </div>
        </div>
      </div>
      <div class="msg">
        <div class="item">
          <div class="item-left">
            <div class="title">{{$t('my.desc9')}}：</div>
            <div class="val">
              {{info.pendingBackWater?decal(info.pendingBackWater,2):0}} USDT
            </div>
          </div>
          <span>({{$t('my.desc12')}}：{{info.levelName}})</span>
        </div>
      </div>
    </div>
    <div class="info-bot">
      <div class="code">
        <div class="qrcode">
          <div ref="inviteCodeUrl" id="inviteCode"></div>
        </div>
      </div>
    </div>

    <div class="btn-con">
      <div class="btn link-copy" :data-clipboard-text="info.inviteUrl" @click="handleCopy('.link-copy')">
        {{$t('my.desc14')}}
      </div>
      <div class="btn code-copy" :data-clipboard-text="info.inviteCode" @click="handleCopy('.code-copy')">
        {{$t('my.desc15')}}</div>
    </div>
    <invite-code-bind v-model:show="inviteCodeShow" v-if="!info.parentInviteCode" />
  </div>
</template>
<script setup>
import InviteCodeBind from './InviteCodeBind'
import Clipboard from "clipboard";
import QRCode from 'qrcodejs2';
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { ref, watch, getCurrentInstance, nextTick, onMounted, computed } from "vue";
const { proxy } = getCurrentInstance()
const decal = proxy.$common.decal
const router = useRouter()
const store = useStore()
// const props = defineProps({
//   info: Object
// })
const info = computed(() => store.state.user.inviteInfo)
const inviteCodeShow = ref(false)

const inviteCodeUrl = ref(null)
function handleCreatQrCode(text) {
  inviteCodeUrl.value.innerHTML = ''
  new QRCode(inviteCodeUrl.value, {
    text, // 需要转换为二维码的内容
    width: 175,
    height: 175,
    correctLevel: QRCode.CorrectLevel.H,
  })
}

watch(() => info.value, (e) => {
  if (e) {
    nextTick(() => {
      handleCreatQrCode(e.inviteUrl)
    })
  }
},
  { immediate: true })

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

function handleRuleClick() {
  router.push('/invite')
  store.commit('SET_INVITE_COM', 'Member')
  store.commit('SET_LEVEL_TYPE', 'agent')
}

onMounted(() => {
  store.dispatch('getUserInviteInfo')
})
</script>


<style lang='scss' scoped>
.invite-info {
  margin-left: 0.16rem;
  // flex: 1 1 auto;
  flex: 0 0 auto;
  width: 32.58%;
  min-width: 4rem;
  background: var(--gg-card-bg);
  border-radius: 0.08rem;
  padding: 0.24rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  // justify-content: space-between;

  .invite-title {
    margin-bottom: 0.12rem;
    margin-right: 2.2em;
    font-size: 0.18rem;
    line-height: 1.4em;
    display: flex;
    align-items: baseline;
    color: var(--gg-text);

  }

  .info-top {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .statistics {
      display: flex;
      background: var(--gg-box-bg);
      border-radius: 0.12rem;
      box-sizing: border-box;
      padding: 0.2rem 0;

      .item {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 0 0.1rem;

        .name {
          font-family: 'PingFang SC';
          font-style: normal;
          font-weight: 400;
          font-size: 0.14rem;
          line-height: 1.4em;
          color: var(--gg-subtitle);
        }

        .val {
          font-family: 'PingFang SC';
          font-style: normal;
          font-weight: 600;
          font-size: 0.28rem;
          line-height: 1.4em;
          color: var(--gg-text);
        }
      }
    }

    .msg {
      display: flex;
      flex-direction: column;

      .item {
        width: 100%;
        margin-top: 0.2rem;
        display: flex;
        justify-content: space-between;
        font-family: 'PingFang SC';
        font-style: normal;
        font-weight: 400;
        font-size: 0.14rem;
        line-height: 1.5em;

        &:last-child {
          margin-bottom: 0;
        }

        .item-left {
          margin-right: 0.15rem;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          font-family: 'PingFang SC';
          font-style: normal;
          font-weight: 400;
          font-size: 0.16rem;
          line-height: 1.4em;
          color: var(--gg-text);

          .val {
            font-weight: 500;
          }
        }

        span {
          font-family: 'PingFang SC';
          font-style: normal;
          font-weight: 400;
          font-size: 0.14rem;
          line-height: 1.5em;
          color: var(--gg-subtitle);
          white-space: nowrap;

        }
      }
    }
  }

  .info-bot {
    margin: 0.24rem 0;
    display: flex;
    justify-content: center;

    .code {
      flex: 0 0 auto;

      .qrcode {
        flex: 0 0 auto;
        padding: 0.125rem;
        box-sizing: border-box;
        background: var(--gg-qrcode-bg);
        border: 1px solid var(--gg-qrcode-border);
        border-radius: 0.2rem;

      }
    }
  }

  .btn-con {
    flex: 0 0 auto;
    display: flex;
    // flex-direction: column;
    align-items: center;
    justify-content: center;

    .btn {
      margin-left: 0.16rem;
      min-width: 1.58rem;
      // height: 0.4rem;
      padding: 0.1rem;
      border-radius: 0.08rem;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'PingFang SC';
      font-style: normal;
      text-align: center;
      font-weight: 600;
      font-size: 0.14rem;
      line-height: 1.5em;
      cursor: pointer;
      border: 1px solid var(--theme);
      color: var(--theme);

      &:first-child {
        margin-left: 0;
        color: var(--gg-btn-color);
        background: var(--gg-btn-bg);

      }

    }
  }
}

@media (max-width:992px) {
  .invite-info {
    margin-left: 0;
    margin-top: 0.2rem;
    width: 100%;
  }

}

@media (max-width:749px) {
  .invite-info {
    margin-top: 0.16rem;
    min-width: 100%;
    padding: 0.16rem;
    border-radius: 0.12rem;

    .invite-title {
      font-size: 0.16rem;
      line-height: 0.2rem;
    }

    .info-top {
      .statistics {
        padding: 0.16rem 0;
        border-radius: 0.1rem;

        .item {
          .val {
            font-size: 0.24rem;
          }
        }
      }

      .msg {
        .item {
          margin-top: 0.12rem;

          .item-left {
            font-size: 0.14rem;
          }

          span {
            font-size: 0.12rem;
          }
        }
      }
    }

    .info-bot {
      margin: 0.2rem 0;
    }

    .btn-con {
      width: 100%;
      box-sizing: border-box;

      .btn {
        margin-left: 0.12rem;
        flex: 1;
        min-width: 1rem;
      }
    }

  }
}
</style>