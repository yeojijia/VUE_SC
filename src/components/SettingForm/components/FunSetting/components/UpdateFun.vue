<template>
  <div class="form">
    <div class="form-content">
      <div class="inp-con">
        <span>{{$t('user.desc66')}}：</span>
        <div class="inp">
          <input :type="eyeShow1?'password':'text'" :placeholder="$t('user.desc27')" v-model="password1">
          <img class="eye show" :src="require(`../../../../../assets/images/common/${theme}/icon_eye.svg`)"
            v-if="eyeShow1" @click="eyeShow1 = !eyeShow1" />
          <img class="eye hide" :src="require(`../../../../../assets/images/common/${theme}/icon_eye_hide.svg`)" v-else
            @click="eyeShow1 = !eyeShow1" />
        </div>
      </div>
      <div class="inp-con">
        <span>{{$t('user.desc67')}}：</span>
        <div class="inp">
          <input :type="eyeShow2?'password':'text'" :placeholder="$t('user.desc31')" v-model="password2">
          <img class="eye show" :src="require(`../../../../../assets/images/common/${theme}/icon_eye.svg`)"
            v-if="eyeShow2" @click="eyeShow2 = !eyeShow2" />
          <img class="eye hide" :src="require(`../../../../../assets/images/common/${theme}/icon_eye_hide.svg`)" v-else
            @click="eyeShow2 = !eyeShow2" />
        </div>
      </div>
      <div class="inp-con">
        <span>{{$t('user.desc65')}}：</span>
        <div class="inp">
          <input :type="eyeShow3?'password':'text'" :placeholder="$t('user.desc61')" v-model="code">
          <img class="eye show" :src="require(`../../../../../assets/images/common/${theme}/icon_eye.svg`)"
            v-if="eyeShow3" @click="eyeShow3 = !eyeShow3" />
          <img class="eye hide" :src="require(`../../../../../assets/images/common/${theme}/icon_eye_hide.svg`)" v-else
            @click="eyeShow3 = !eyeShow3" />
        </div>
      </div>
      <div class="inp-con">
        <span>{{$t('user.desc86')}}：</span>
        <div class="inp">
          <input readonly type="text" :placeholder="$t('user.desc88')" :value="info.email">
        </div>
      </div>
      <div class="inp-con">
        <span>{{$t('user.desc34')}}：</span>
        <div class="inp">
          <input type="text" :placeholder="$t('user.desc89')" v-model="verifyCode">
          <div class="time">
            <span v-if="countDownStatus==='start'">
              <van-count-down millisecond :time="60000" :auto-start="true" format="ss" @finish="countDownStatus='end'" />s
            </span>
            <p v-else @click="handleCountDownStart">{{$t('user.desc24')}}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="form-bot">
      <div class="btn" @click="handleConfirm">
        {{ $t('user.desc62') }}
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, getCurrentInstance, computed } from 'vue'
import { _updateFundPassword, _sendEmailCode } from '@/utils/api/user'
import { useStore } from 'vuex';
const store = useStore()
const { proxy } = getCurrentInstance()
let theme = computed(() => store.state.global.theme)
const info = computed(() => {
  return store.state.user.userInfo
})
const isEmail = proxy.$common.isEmail
const eyeShow1 = ref(true)
const eyeShow2 = ref(true)
const eyeShow3 = ref(true)

const password1 = ref('')
const password2 = ref('')
const code = ref('')
const verifyCode = ref('')
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
    type: 'tradePassword',
  }).catch(() => {
    countDownStatus.value = 'end'
  }).finally(() => {
    emailisLoading.value = false
  })

}

function handleConfirm() {
  if (!password1.value) {
    spop({
      template: proxy.$t('user.desc50'),
      style: 'warning',
      autoclose: 2000
    })
    return
  } else if (password1.value !== password2.value) {
    spop({
      template: proxy.$t('user.desc44'),
      style: 'warning',
      autoclose: 2000
    })
    return
  }
  proxy.$toast.loading({
    duration: 0,
    forbidClick: true,
  });
  _updateFundPassword({
    emailCode: verifyCode.value,
    code: code.value,
    password: proxy.$common.encrypt(password1.value)
  }).then(() => {
    password1.value = ''
    password2.value = ''
    code.value = ''
    verifyCode.value = ''
    spop({
      template: proxy.$t('user.desc98'),
      style: 'success',
      autoclose: 2000
    })
    store.dispatch('logOut')
    store.commit('SET_SETTING_FORM_SHOW', false)
  }).finally(() => {
    proxy.$toast.clear()
  })
}



</script>


<style lang='scss' scoped>
.form {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100%;
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