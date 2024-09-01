<template>
  <van-popup v-model:show="_show" class="popup-transparent" :position="isMobile?'bottom':'right'">
    <div class="popup-con">
      <div class="con-top">
        <div class="title-cross">
          <div class="title">
            {{$t('user.desc25')}}
          </div>
          <div class="cross" @click="_show = false">
            <van-icon name="cross" />
          </div>
        </div>
      </div>
      <div class="path" v-if="stepActive!==3" @click="handleToLogin">
        <van-icon name="arrow-left" />
        {{$t('user.desc29')}}
      </div>
      <div class="steps-con">
        <div class="steps">
          <div class="steps-items">
            <div class="item on" :class="[stepActive===1?'start':'end']">
              <div class="circle">
                <span>1</span>
              </div>
              <div class="name">{{$t('user.desc26')}}</div>
            </div>
            <div class="line"></div>
            <div class="item" :class="{on:stepActive>=2}">
              <div class="circle">
                <span
                  :style="{
                                                                                                                                                                                    backgroundImage:`url(${require(`../assets/images/user/${theme}/steps_bg.svg`)})`
                                                                                                                                                                                  }">2</span>
              </div>
              <div class="name">{{$t('user.desc27')}}</div>
            </div>
            <div class="line"></div>
            <div class="item" :class="{on:stepActive>=3}">
              <div class="circle">
                <span
                  :style="{
                                                                                                                                                                                    backgroundImage:`url(${require(`../assets/images/user/${theme}/steps_bg.svg`)})`
                                                                                                                                                                                  }">3</span>
              </div>
              <div class="name">{{$t('user.desc28')}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="con-bot">
        <div class="from-wrap">
          <template v-if="stepActive===1">
            <div class="inp-con">
              <div class="name">{{ $t('user.desc104') }} </div>
              <div class="inp">
                <input type="text" v-model="email" :placeholder="$t('user.desc33')" />
              </div>
            </div>
            <div class="inp-con">
              <div class="name">{{ $t('user.desc102') }} </div>
              <div class="inp">
                <input type="text" v-model="code" :placeholder="$t('user.desc17')" />
                <div class="time">
                  <span v-if="countDownStatus==='start'">
                    <van-count-down millisecond :time="60000" :auto-start="true" format="ss"
                      @finish="countDownStatus = 'end'" />s
                  </span>
                  <p v-else @click="handleCountDownStart">{{$t('user.desc24')}}</p>
                </div>
              </div>
            </div>
          </template>

          <template v-else-if="stepActive===2">

            <div class="inp-con">
              <div class="name">{{ $t('user.desc105') }}</div>
              <div class="inp">
                <input :type="eyeShow1?'password':'text'" :placeholder="$t('user.desc32')" v-model="password1" />
                <img class="eye show" :src="require(`../assets/images/common/${theme}/icon_eye.svg`)" v-if="eyeShow1"
                  @click="eyeShow1 = !eyeShow1" />
                <img class="eye hide" :src="require(`../assets/images/common/${theme}/icon_eye_hide.svg`)" v-else
                  @click="eyeShow1 = !eyeShow1" />
              </div>
            </div>
            <div class="inp-con">
              <div class="name">{{ $t('user.desc106') }}</div>
              <div class="inp">
                <input :type="eyeShow2?'password':'text'" :placeholder="$t('user.desc31')" v-model="password2" />
                <img class="eye show" :src="require(`../assets/images/common/${theme}/icon_eye.svg`)" v-if="eyeShow2"
                  @click="eyeShow2 = !eyeShow2" />
                <img class="eye hide" :src="require(`../assets/images/common/${theme}/icon_eye_hide.svg`)" v-else
                  @click="eyeShow2 = !eyeShow2" />
              </div>
            </div>
          </template>
          <template v-else-if="stepActive===3">
            <div class="icon-succ">
              <img src="../assets/images/user/icon_reset_succ.svg" />
            </div>
          </template>
          <loading-btn :disabled="btnDisable" class="sub-btn" @click="handleSubClick">
            {{stepActive===3?$t('user.desc29'):$t('user.desc30')}}
          </loading-btn>
        </div>
      </div>
    </div>
  </van-popup>
</template>
<script setup>
import { ref, computed, getCurrentInstance } from 'vue'
import { useStore } from 'vuex';
import { _findPassword, _sendEmailCodeByAddress } from '@/utils/api/user'
const store = useStore()
const { proxy } = getCurrentInstance()
const isMobile = computed(() => store.state.global.isMobile)
const isEmail = proxy.$common.isEmail
const props = defineProps({
  show: Boolean
})
let theme = computed(() => store.state.global.theme)
const userInfo = computed(() => {
  return store.state.user.userInfo
})
const emit = defineEmits(["update:show"])
const _show = computed({
  get: () => {
    return props.show;
  },
  set: (e) => {
    emit("update:show", e);
  },
});

const eyeShow1 = ref(true)
const eyeShow2 = ref(true)

//保留登录状态
const saveLoginChecked = ref(false)



const password1 = ref('')
const password2 = ref('')


let email = ref('')
let code = ref('')
//倒计时
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
  countDownStatus.value = 'start'
  _sendEmailCodeByAddress({
    email: email.value
  }).catch(() => {
    countDownStatus.value = 'end'
  })

}


//跳转登录
function handleToLogin() {
  store.commit('SET_LOGIN_POPUP_SHOW', true)
  store.commit('SET_RESET_PASSWORD_POPUP_SHOW', false)
}

//步骤
const stepActive = ref(1)
//提交
let btnDisable = computed(() => {
  if (stepActive.value === 1) {
    if (email.value && code.value) {
      return false
    } else {
      return true
    }
  }
  if (stepActive.value === 2) {
    if (password1.value && password2.value) {
      return false
    } else {
      return true
    }
  }
  if (stepActive.value === 3) {
    if (password1.value && password2.value) {
      return false
    } else {
      return true
    }
  }
})
function handleSubClick() {

  if (stepActive.value === 1) {
    stepActive.value++
    return
  }

  if (stepActive.value === 2) {
    if (!password1.value || !password2.value || !code.value) {
      spop({
        template: proxy.$t('user.desc47'),
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
    _findPassword({
      email: email.value,
      code: code.value,
      password: proxy.$common.encrypt(password1.value),
    }).then(res => {
      if (res.code === 0) {
        spop({
          template: proxy.$t('user.desc45'),
          style: 'success',
          autoclose: 2000
        })
        stepActive.value++
      } else {
        spop({
          template: res.msg,
          style: 'error',
          autoclose: 2000
        })
      }
    })
    return
  }

  if (stepActive.value === 3) {
    handleToLogin()
    stepActive.value = 1
    return
  }


}
</script>


<style lang='scss' scoped>
.popup-con {
  width: 5rem;
  height: 100vh;
  background: var(--gg-card-bg);
  padding: 0.24rem 0.4rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  .con-top {
    margin-bottom: 0.24rem;
    flex: 0 0 auto;

    .title-cross {
      padding-bottom: 0.24rem;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid;
      border-color: var(--gg-line);

      .title {
        margin-right: 0.2rem;
        width: 0;
        flex: 1;
        font-family: 'Venryn Sans';
        font-weight: 900;
        text-align: left;
        font-size: 0.2rem;
        line-height: 1.4em;
        color: var(--gg-text);
        text-transform: uppercase
      }

      .cross {

        cursor: pointer;

        .van-icon {
          font-size: 0.16rem;
          line-height: 0.28rem;
          color: var(--gg-text);
        }
      }
    }


  }

  .steps-con {
    margin-bottom: 0.2rem;

    .steps {


      .steps-items {
        display: flex;
        justify-content: space-between;
        position: relative;

      }

      .line {
        flex: 1;
        height: 0.4rem;
        position: relative;

        &::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100%;
          height: 1px;
          background: var(--gg-line);
        }
      }

      .item {
        flex: 0 0 auto;
        width: 0.76rem;
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;

        &.on {
          .name {
            color: var(--gg-text);
          }

          .circle {
            span {
              background-image: url('../assets/images/user/steps_bg_on.svg') !important;
              color: #FFFFFF;

            }
          }
        }

        .name {
          margin-top: 0.1rem;
          font-family: 'PingFang SC';
          font-style: normal;
          font-weight: 400;
          font-size: 0.14rem;
          line-height: 1.4em;
          color: var(--gg-reset-text);
          text-align: center;
        }

        .circle {

          span {
            width: 0.4rem;
            height: 0.4rem;
            color: var(--gg-text);
            font-size: 0.16rem;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: 'Venryn Sans';
            font-weight: 900;
            font-size: 0.22rem;
            line-height: 0.32rem;
            text-transform: uppercase;
            color: #C9C9C9;
            background-size: contain;
            background-repeat: no-repeat;
            background-position: center center;

          }
        }

      }
    }


  }

  .con-bot {
    min-height: 0;
    flex: 1 1 auto;
    min-height: 2rem;
    overflow-y: auto;
    box-sizing: border-box;
  }

  .path {
    cursor: pointer;
    margin-bottom: 0.32rem;
    font-family: 'PingFang SC';
    font-style: normal;
    font-weight: 500;
    font-size: 0.16rem;
    line-height: 1.4em;
    color: var(--theme);

    :deep .van-icon {
      font-size: 0.16rem;
    }
  }

  .from-wrap {


    .icon-succ {
      margin: 0.55rem auto 0.653rem;
      display: flex;
      justify-content: center;

      img {
        width: 0.94rem;
        height: 0.94rem;
        object-fit: cover;
      }
    }

    .inp-con {
      margin-bottom: 0.16rem;
      display: flex;
      flex-direction: column;
      box-sizing: border-box;

      .name {
        margin-bottom: 0.08rem;
        font-size: 0.14rem;
        line-height: 1.5em;
        color: var(--gg-text);
      }

      .inp {
        width: 100%;
        height: 0.48rem;
        font-family: 'PingFang SC';
        font-style: normal;
        font-weight: 400;
        font-size: 0.16rem;
        line-height: 1.5em;
        background: var(--gg-inp-bg);
        color: var(--gg-text);
        border-radius: 0.1rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.1rem 0.16rem;
        box-sizing: border-box;

        input {
          width: 0;
          flex: 1;
          height: 100%;

          &::placeholder {
            color: var(--gg-inp-plac);
          }
        }

      }

      .eye {
        margin-left: 0.14rem;
        flex: 0 0 auto;
        cursor: pointer;
        width: 0.2rem;
      }

      .time {
        margin-left: 0.1rem;
        font-family: 'PingFang SC';
        font-style: normal;
        font-weight: 400;
        font-size: 0.14rem;
        line-height: 1.4em;
        color: var(--theme);

        span {
          min-width: 0.7rem;
          white-space: nowrap;
          display: flex;
          justify-content: center;
          align-items: center;
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

    }

    .checkbox {
      margin-top: 0.06rem;


      .icon-con {
        width: 0.16rem;
        height: 0.16rem;
        border: 1.5px solid #5C5D68;
        border-radius: 0.04rem;
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
      }

      p {
        font-family: 'PingFang SC';
        font-style: normal;
        font-weight: 400;
        font-size: 0.12rem;
        line-height: 0.16rem;
        color: #FFFFFF;

        span {

          color: #8E66FB;
        }
      }

      :deep {
        .van-checkbox__icon {
          height: auto;
        }



        .van-checkbox__icon--checked .van-icon {
          border: none;
          background-color: transparent;
        }
      }
    }

    .sub-btn {
      margin-top: 0.32rem;
      width: 100%;
      height: 0.52rem;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 0.1rem;
      font-family: 'PingFang SC';
      font-style: normal;
      font-weight: 400;
      font-size: 0.16rem;
      line-height: 1.4em;
      border: 1px solid var(--gg-btn-border);
      background: var(--gg-btn-bg);
      color: var(--gg-btn-color);
      cursor: pointer;
      transition: all 0.3s linear;

      &.van-button--disabled {
        background: var(--gg-btn-bg-disable);
        color: var(--gg-btn-color-disable);
        border-color: transparent;
      }
    }

    .box {
      margin-top: 0.06rem;
      display: flex;
      justify-content: center;
      align-items: center;
      font-family: 'PingFang SC';
      font-style: normal;
      font-weight: 400;
      font-size: 0.14rem;
      line-height: 1.5em;

      &-left {
        color: #FFFFFF;

        span {
          color: #8E66FB;
          cursor: pointer;
        }
      }

      &-right {
        color: #8E66FB;
        cursor: pointer;

      }
    }

    .wallet-item {
      margin-top: 0.32rem;
      width: 1.9rem;
      border: 1.5px solid #7045E1;
      border-radius: 0.08rem;

      img {
        width: 100%;
      }
    }
  }
}


@media (max-width: 749px) {
  .popup-con {
    width: 100vw;
    height: 90vh;
    border-radius: 0.2rem 0.2rem 0 0;
    padding: 0.24rem 0.28rem;

    .con-top {
      margin-bottom: 0.12rem;

      .title-cross {
        padding-bottom: 0.1rem;
        flex-direction: column-reverse;
        justify-content: flex-start;

        .title {
          padding-top: 0.1rem;
          margin-right: 0;
          width: 100%;
          font-size: 0.16rem;
          line-height: 1.4em;
        }

        .cross {
          align-self: flex-end;
        }
      }

      .tabs {
        margin-top: 0;

        .item {
          margin-right: 0.3rem;
        }
      }
    }

    .steps-con .steps {
      .line {
        height: 0.3rem;
      }

      .item {
        .circle span {
          width: 0.3rem;
          height: 0.3rem;
          font-size: 0.16rem;
        }

        .name {
          margin-top: 0.08rem;
        }
      }
    }

    .from-wrap {
      .inp-con {
        margin-top: 0.12rem;

        .name {
          margin-bottom: 0.06rem;
        }

        .inp {
          height: 0.4rem;
          font-size: 0.14rem;
        }
      }

      .box-rest {
        margin-top: 0.08rem;
      }

      .box-register {
        margin-top: 0.08rem;
      }

      .sub-btn {
        height: 0.4rem;
        font-size: 0.14rem;
        border-radius: 0.08rem;
      }


    }
  }
}
</style>