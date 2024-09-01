<template>
  <div class="form">
    <div class="form-content">
      <div class="inp-con">
        <span>{{$t('user.desc70')}}：</span>
        <div class="inp">
          <input readonly type="text" :value="info.email">
        </div>
      </div>
      <div class="inp-con">
        <span>{{$t('user.desc34')}}：</span>
        <div class="inp">
          <input type="text" :placeholder="$t('user.desc89')" v-model="oldCode">
          <div class="time">
            <span v-if="countDownStatus1==='start'">
              <van-count-down millisecond :time="60000" :auto-start="true" format="ss"
                @finish="countDownStatus1='end'" />s
            </span>
            <p v-else @click="handleCountDownStart1">{{$t('user.desc24')}}</p>
          </div>
        </div>
      </div>
      <div class="inp-con">
        <span>{{$t('user.desc71')}}：</span>
        <div class="inp">
          <input type="text" :placeholder="$t('user.desc72')" v-model="newEmailAddress" />
        </div>
      </div>

      <div class="inp-con">
        <span>{{$t('user.desc34')}}：</span>
        <div class="inp">
          <input type="text" :placeholder="$t('user.desc89')" v-model="newCode">
          <div class="time">
            <span v-if="countDownStatus2==='start'">
              <van-count-down millisecond :time="60000" :auto-start="true" format="ss"
                @finish="countDownStatus2='end'" />s
            </span>
            <p v-else @click="handleCountDownStart2">{{$t('user.desc24')}}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="form-bot">
      <div class="btn" @click="handleSubmit">
        {{ $t('user.desc62') }}
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, getCurrentInstance } from 'vue'
import { useStore } from 'vuex';
import { _sendEmailCode, _updateEmail } from '@/utils/api/user'
const store = useStore()
const { proxy } = getCurrentInstance()
const isEmail = proxy.$common.isEmail
const info = computed(() => {
  return store.state.user.userInfo
})
let oldCode = ref('')
let newCode = ref('')
let newEmailAddress = ref('')
//倒计时
const emailisLoading1 = ref(false)
const countDownStatus1 = ref('end')
function handleCountDownStart1() {
  if (!info.value.email) {
    spop({
      template: proxy.$t('user.desc38'),
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
  if (emailisLoading1.value) return
  emailisLoading1.value = true
  countDownStatus1.value = 'start'
  _sendEmailCode({
    type: 'emailUpdate',
  }).catch(() => {
    countDownStatus1.value = 'end'
  }).finally(() => {
    emailisLoading1.value = false
  })
}

const emailisLoading2 = ref(false)
const countDownStatus2 = ref('end')
function handleCountDownStart2() {
  if (!newEmailAddress.value) {
    spop({
      template: proxy.$t('user.desc38'),
      style: 'warning',
      autoclose: 2000
    })
    return
  } else if (!isEmail(newEmailAddress.value)) {
    spop({
      template: proxy.$t('user.desc37'),
      style: 'warning',
      autoclose: 2000
    })
    return
  }
  if (emailisLoading2.value) return
  emailisLoading2.value = true
  countDownStatus2.value = 'start'
  _sendEmailCode({
    type: 'email',
    email: newEmailAddress.value
  }).catch(() => {
    countDownStatus2.value = 'end'
  }).finally(() => {
    emailisLoading2.value = false
  })

}
function handleSubmit() {
  if (!oldCode.value || !newEmailAddress.value || !newCode.value) {
    spop({
      template: proxy.$t('user.desc47'),
      style: 'warning',
      autoclose: 2000
    })
    return
  }
  proxy.$toast.loading({
    duration: 0,
    forbidClick: true,
  });
  _updateEmail({
    oldCode: oldCode.value,
    newEmailAddress: newEmailAddress.value,
    newCode: newCode.value
  }).then(res => {
    if (res) {
      oldCode.value = ''
      newEmailAddress.value = ''
      newCode.value = ''
      store.dispatch('getUserInfo')
      spop({
        template: proxy.$t('user.desc45'),
        style: 'success',
        autoclose: 2000
      })
      store.dispatch('getUserInfo')
      store.commit('SET_SETTING_FORM_SHOW', false)
    }
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