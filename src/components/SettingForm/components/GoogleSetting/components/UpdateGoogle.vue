<template>
  <div class="google">
    <div class="title">
      {{$t('user.desc83')}}
    </div>
    <div class="google-content">
      <div class="code">
        <img :src="googleInfo.qr" />
      </div>
    </div>
    <div class="form">
      <div class="form-content">
        <div class="inp-con">
          <span>{{$t('user.desc79')}}：</span>
          <div class="inp">
            <input readonly type="text" :placeholder="$t('user.desc80')" v-model="googleInfo.key">

          </div>
        </div>
        <div class="inp-con">
          <span>{{$t('user.desc65')}}：</span>
          <div class="inp"> <input type="text" :placeholder="$t('user.desc81')" v-model="code"></div>
        </div>
        <div class="inp-con">
          <span>{{$t('user.desc86')}}：</span>
          <div class="inp">
            <input readonly type="text" :placeholder="$t('user.desc88')" v-model="info.email">
          </div>
        </div>
        <div class="inp-con">
          <span>{{$t('user.desc34')}}：</span>
          <div class="inp">
            <input type="text" :placeholder="$t('user.desc89')" v-model="verifyCode">
            <div class="time">
              <span v-if="countDownStatus==='start'">
                <van-count-down millisecond :time="60000" :auto-start="true" format="ss"
                  @finish="countDownStatus = 'end'" />s
              </span>
              <p v-else @click="handleCountDownStart">{{$t('user.desc24')}}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="form-bot">
        <div class="btn" @click="handleUnboundGoogle">
          {{ $t('user.desc87') }}
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, getCurrentInstance, onMounted } from 'vue'
import { useStore } from 'vuex';
import { _googleQr, _googleReset, _sendEmailCode } from '@/utils/api/user'
const store = useStore()
const { proxy } = getCurrentInstance()
const emit = defineEmits(['reset'])
const isEmail = proxy.$common.isEmail
const info = computed(() => {
  return store.state.user.userInfo
})
//倒计时
const emailisLoading = ref(false)
const countDownStatus = ref('end')
function handleCountDownStart() {
  if (!info.value.email) {
    spop({
      template: proxy.$t('user.desc88'),
      style: 'warning',
      autoclose: 2000
    })
    return
  } else if (!isEmail(info.value.email)) {
    spop({
      template: proxy.$t('user.desc37'),
      style: 'warning',
      autoclose: 2000
    })
    return
  }
  if (emailisLoading.value) return
  emailisLoading.value = true

  countDownStatus.value = 'start'
  _sendEmailCode({
    type: 'google',
    email: info.value.email
  }).catch(() => {
    countDownStatus.value = 'end'
  }).finally(() => {
    emailisLoading.value = false
  })

}

const googleInfo = ref({})
function getGoogleQr() {
  _googleQr().then(res => {
    googleInfo.value = res
  })
}

const code = ref('')
let verifyCode = ref('')
function handleUnboundGoogle() {
  if (!info.value.email) {
    spop({
      template: proxy.$t('user.desc88'),
      style: 'warning',
      autoclose: 2000
    })
    return
  }
  else if (!code.value) {
    spop({
      template: proxy.$t('user.desc81'),
      style: 'warning',
      autoclose: 2000
    })
    return
  }
  else if (!verifyCode.value) {
    spop({
      template: proxy.$t('user.desc89'),
      style: 'warning',
      autoclose: 2000
    })
    return
  }
  proxy.$toast.loading({
    duration: 0,
    forbidClick: true,
  });
  _googleReset({
    emailCode: verifyCode.value,
    code: code.value,
    key: googleInfo.value.key
  }).then(() => {
    spop({
      template: proxy.$t('user.desc53'),
      style: 'success',
      autoclose: 2000
    })
    store.commit('SET_SETTING_FORM_SHOW', false)
    verifyCode.value = ''
    code.value = ''
  }).finally(() => {
    proxy.$toast.clear()
  })
}
onMounted(() => {
  getGoogleQr()
})

</script>


<style lang='scss' scoped>
.google {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .title {
    margin-bottom: 0.1rem;
    font-family: 'PingFang SC';
    font-style: normal;
    font-weight: 400;
    font-size: 0.16rem;
    line-height: 1.4em;
    color: var(--gg-text);
    text-align: left;
  }

  &-content {
    margin-bottom: 0.14rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .code {
      margin: 0.24rem auto;
      flex: 0 0 auto;
      width: 1.8rem;
      padding: 0.14rem;
      display: flex;
      align-items: center;
      border-radius: 0.2rem;
      background: var(--gg-qrcode-bg);
      border: 1px solid var(--gg-qrcode-border);

      img {
        width: 100%;
      }
    }
  }
}

.form {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .inp-con {
    margin-bottom: 0.16rem;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    box-sizing: border-box;

    &:last-child {
      margin-bottom: 0;
    }

    span {
      margin-bottom: 0.08rem;
      flex: 0 0 auto;
      display: flex;
      align-items: center;
      box-sizing: border-box;
      color: var(--gg-text);
      font-size: 0.14rem;
      line-height: 1.5em;
    }

    .inp {
      width: 100%;
      height: 0.48rem;
      border: 1px solid var(--gg-inp-border);
      background: var(--gg-inp-bg);
      border-radius: 0.1rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 0.16rem;
    }

    input {
      box-sizing: border-box;
      width: 0;
      flex: 1;
      height: 100%;
      color: var(--gg-text);
      font-size: 0.16rem;
      padding: 0;

      &::placeholder {
        color: var(--gg-inp-plac);
      }
    }

    .select-name {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: var(--gg-subtitle);
      font-size: 0.14rem;
      padding-right: 0.12rem;
      box-sizing: border-box;

      .val {
        height: 100%;
        display: flex;
        align-items: center;
      }
    }

    .eye {
      margin-left: 0.12rem;
      flex: 0 0 auto;
      cursor: pointer;
      width: 0.22rem;
    }


    :deep {
      .van-popover__wrapper {
        width: 0;
        flex: 1;
      }
    }
  }

  .time {
    margin-right: -0.08rem;
    margin-left: 0.12rem;
    min-width: 0.86rem;
    height: 0.3rem;
    font-family: 'PingFang SC';
    font-style: normal;
    font-weight: 400;
    font-size: 0.14rem;
    line-height: 1.4em;
    color: var(--theme);
    border-radius: 0.04rem;
    padding: 0 0.08rem;
    display: flex;
    align-items: center;

    span {
      margin-bottom: 0;
      width: 100%;
      height: 100%;
      white-space: nowrap;
      display: flex;
      justify-content: center;
      align-items: center;
      color: var(--theme);
    }

    p {

      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      white-space: nowrap;
      color: var(--theme);
    }

    :deep {
      .van-count-down {
        color: var(--theme);
      }
    }
  }

  .btn {
    flex: 0 0 auto;
    margin-top: 0.32rem;
    margin-bottom: 10vh;
    width: 100%;
    height: 0.52rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0.12rem;
    font-family: 'PingFang SC';
    font-style: normal;
    font-weight: 400;
    font-size: 0.16rem;
    border: 1px solid var(--gg-btn-border);
    background: var(--gg-btn-bg);
    color: var(--gg-btn-color);
    cursor: pointer;

  }
}

@media (max-width: 749px) {
  .google {
    .title {
      margin-bottom: 0;
      font-size: 0.14rem;
      line-height: 0.2rem;
    }
  }

  .google-content {
    margin-bottom: 0;

    .code {
      margin: 0.16rem auto;
      border-radius: 0.16rem;
    }

  }

  .form {
    position: relative;

    .inp-con {
      margin-bottom: 0.12rem;

      .inp {
        height: 0.4rem;
        padding: 0 0.12rem;
        border-radius: 0.1rem;
      }

      input {
        font-size: 0.14rem;
      }

      .eye {
        width: 0.2rem;
      }
    }

    .btn {
      margin-top: 0.24rem;
      margin-bottom: 0.24rem;
      height: 0.44rem;
      border-radius: 0.08rem;
      font-size: 0.14rem;
    }
  }
}
</style>