<template>
  <div class="form">
    <div class="form-content">
      <div class="inp-con">
        <span>{{$t('user.desc73')}}：</span>
        <input readonly type="text" :value="info.phone">
      </div>
      <div class="inp-con">
        <span>{{$t('user.desc34')}}：</span>
        <input type="text" :placeholder="$t('user.desc17')">
        <div class="time">
          <span v-if="countDownStatus==='start'">
            <van-count-down millisecond :time="60000" :auto-start="true" format="ss" @finish="handleCountDownFinish" />s
          </span>
          <p v-else @click="handleCountDownStart">{{$t('user.desc24')}}</p>
        </div>
      </div>
      <div class="inp-con">
        <span>{{$t('user.desc74')}}：</span>
        <input type="text" :placeholder="$t('user.desc75')">
      </div>

      <div class="inp-con">
        <span>{{$t('user.desc34')}}：</span>
        <input type="text" :placeholder="$t('user.desc17')">
        <div class="time">
          <span v-if="countDownStatus==='start'">
            <van-count-down millisecond :time="60000" :auto-start="true" format="ss" @finish="countDownStatus = 'end'" />s
          </span>
          <p v-else @click="handleCountDownStart">{{$t('user.desc24')}}</p>
        </div>
      </div>
    </div>
    <div class="form-bot">
      <div class="btn">
        {{ $t('user.desc62') }}
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, getCurrentInstance } from 'vue'
import { useStore } from 'vuex';
const store = useStore()
const { proxy } = getCurrentInstance()
const isEmail = proxy.$common.isEmail
const eyeShow1 = ref(true)
const eyeShow2 = ref(true)
const info = computed(() => {
  return store.state.user.userInfo
})
let email = ref('')
let code = ref('')
//倒计时
const emailisLoading = ref(false)
const countDownStatus = ref('end')
function handleCountDownStart() {
  if (!email.value) {
    spop({
      template: proxy.$t('user.desc38'),
      style: 'warning',
      autoclose: 2000
    })
    return
  } else if (!isEmail(email.value)) {
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
    type: 'email',
    email: email.value
  }).catch(() => {
    countDownStatus.value = 'end'
  }).finally(() => {
    emailisLoading.value = false
  })

}

</script>



<style lang='scss' scoped>
.form {
  min-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .inp-con {
    margin-bottom: 0.14rem;
    height: 0.4rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 1px solid var(--input-border);
    background: var(--input-bg);
    border-radius: 0.04rem;
    font-size: 0.14rem;
    overflow: hidden;
    padding: 0 0.12rem;
    box-sizing: border-box;

    &:last-child {
      margin-bottom: 0;
    }

    span {
      flex: 0 0 auto;
      display: flex;
      align-items: center;
      box-sizing: border-box;
      color: var(--gg-subtitle);
    }

    input {
      box-sizing: border-box;
      width: 0;
      flex: 1;
      height: 100%;
      color: var(--gg-subtitle);
      font-size: 0.14rem;
      padding: 0;

      &::placeholder {
        color: var(--gg-subtitle);
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
      width: 0.26rem;
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
      color: var(--nav-btn-text-active);
      background: var(--theme);
      border-radius: 0.04rem;
      padding: 0 0.08rem;
      display: flex;
      align-items: center;

      span {
        width: 100%;
        height: 100%;
        white-space: nowrap;
        display: flex;
        justify-content: center;
        align-items: center;
        color: var(--nav-btn-text-active);
      }

      p {

        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        white-space: nowrap;
        color: var(--nav-btn-text-active);
      }

      :deep {
        .van-count-down {
          color: var(--nav-btn-text-active);
        }
      }
    }

    :deep {
      .van-popover__wrapper {
        width: 0;
        flex: 1;
      }
    }
  }

  .btn {
    width: 100%;
    height: 0.4rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background: var(--btn-bg-active);
    border-radius: 0.06rem;
    font-family: 'PingFang SC';
    font-style: normal;
    font-weight: 400;
    font-size: 0.16rem;
    color: var(--btn-text-active);
    cursor: pointer;

  }
}
</style>