<template>
  <van-popup v-model:show="_show" :position="isMobile?'bottom':'right'" class="popup-transparent">
    <div class="popup-con">
      <div class="con-top">
        <div class="title-cross">
          <div class="title">{{$t('user.desc15')}}</div>
          <div class="cross" @click="_show = false">
            <van-icon name="cross" />
          </div>
        </div>
      </div>
      <div class="con-bot">
        <div class="from-wrap">
          <div class="inp-con">
            <div class="name">{{ $t('user.desc100') }}</div>
            <div class="inp">
              <input type="text" :placeholder="$t('user.desc16')" v-model="username" />
            </div>
          </div>
          <div class="inp-con">
            <div class="name">{{ $t('user.desc101') }}</div>
            <div class="inp">
              <input :type="eyeShow?'password':'text'" :placeholder="$t('user.desc18')" v-model="password" />
              <img class="eye show" :src="require(`../assets/images/common/${theme}/icon_eye.svg`)" v-if="eyeShow"
                @click="eyeShow = !eyeShow" />
              <img class="eye hide" :src="require(`../assets/images/common/${theme}/icon_eye_hide.svg`)" v-else
                @click="eyeShow = !eyeShow" />
            </div>
          </div>
          <div class="inp-con">
            <div class="name">{{ $t('user.desc102') }}</div>
            <div class="inp">
              <input type="text" :placeholder="$t('user.desc17')" v-model="verifyCode" />
              <captch-code />
            </div>
          </div>
          <div class="inp-con">
            <div class="name">{{ $t('user.desc103') }}</div>
            <div class="inp">
              <input type="text" :placeholder="$t('user.desc19')" v-model="inviteCode" />
            </div>
          </div>
          <div class="checkbox">
            <van-checkbox v-model="protocolChecked" shape="square" checked-color="#8E66FB">
              <template #icon="props">
                <div class="icon-con">
                  <van-icon name="success" color="#fff" v-if="props.checked" />
                </div>
              </template>
              <template #default="props">
                <p>{{$t('user.desc20')}}
                  <span @click.stop="rulePopupShow=!rulePopupShow">《
                    {{$t('user.desc21')}}》</span>
                </p>
              </template>
            </van-checkbox>
          </div>
          <div class="sub-btn" @click="handleSubClick">{{$t('user.desc22')}}</div>
          <div class="box">
            <div class="box-left">
              {{$t('user.desc12')}}
              <span @click="handleToLogin">{{$t('user.desc23')}}</span>
            </div>

          </div>
        </div>
      </div>
      <div class="con-service" @click="handleUrl">
        <img src="../assets/images/nav/icon_nav_services.png" alt="">
        <span>{{$t('nav.desc24')}}</span>
      </div>
    </div>
  </van-popup>

  <rule-popup v-model:show="rulePopupShow" />
</template>
<script setup>
import { ref, computed, getCurrentInstance, inject, onMounted, watch } from 'vue'
import { useStore } from 'vuex';
import { _register } from '../utils/api/user'
const store = useStore()
const { proxy } = getCurrentInstance()
const reload = inject('reload')
const isMobile = computed(() => store.state.global.isMobile)
let theme = computed(() => store.state.global.theme)
const captchaKey = computed(() => store.state.user.captcha.key)
const props = defineProps({
  show: Boolean
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
watch(() => _show.value, (e) => {
  if (e) {
    store.dispatch('getCode')
  }
}, {
  immediate: true
})

const rulePopupShow = ref(false)
const eyeShow = ref(true)

//跳转登录
function handleToLogin() {
  store.commit('SET_LOGIN_POPUP_SHOW', true)
  store.commit('SET_REGISTER_POPUP_SHOW', false)
}

function handleUrl() {
  window.open(store.state.global.serviceUrl)
}

//提交
const verifyCode = ref('')
const username = ref('')
const password = ref('')
const inviteCode = ref('')  // 邀请码
const phone = ref(null)        // 手机号码
const code = ref(null)         // 验证码
const registerCode = ref(null) // 注册码
const protocolChecked = ref(true) //协议

function handleSubClick() {
  if (!username.value || username.value.length < 6 || username.value.length > 18) {
    spop({
      template: proxy.$t('common.desc108'),
      style: 'warning',
      autoclose: 2000
    })
    return
  }
  if (!password.value || password.value.length < 6 || password.value.length > 18) {
    spop({
      template: proxy.$t('user.desc18'),
      style: 'warning',
      autoclose: 2000
    })
    return
  }
  if (!protocolChecked.value) {
    spop({
      template: proxy.$t('user.desc107'),
      style: 'warning',
      autoclose: 2000
    })
    return
  }
  if (!verifyCode.value) {
    spop({
      template: proxy.$t('user.desc17'),
      style: 'warning',
      autoclose: 2000
    })
    return
  }
  let loadingToast = proxy.$toast.loading({
    duration: 0,
    forbidClick: true,
  });
  _register({
    query: {
      code: code.value,
      inviteCode: inviteCode.value,
      registerCode: registerCode.value,
      phone: phone.value,
      verifyCode: String(verifyCode.value),
      captchaKey: captchaKey.value
    },
    data: {
      username: username.value,
      password: proxy.$common.encrypt(password.value),
    }
  }).then(() => {
    handleToLogin()
    spop({
      template: proxy.$t('user.desc99'),
      style: 'success',
      autoclose: 2000
    })
  }, () => {
    store.dispatch('getCode')
  }).finally(() => {
    loadingToast.clear()
  })
}
onMounted(() => {
  const href = window.location.href
  const hasIndex = href.indexOf('inviteCode')
  if (hasIndex > -1) {
    inviteCode.value = href.substring(hasIndex + 11)
    store.commit('SET_REGISTER_POPUP_SHOW', true)
  }
})
</script>


<style lang='scss' scoped>
.popup-con {
  width: 5rem;
  height: 100vh;
  background: var(--gg-card-bg);
  overflow: hidden;
  padding: 0.24rem 0.4rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  position: relative;
  .con-top {
    margin-bottom: 0.08rem;
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

  .con-bot {
    min-height: 0;
    flex: 1 1 auto;
    min-height: 2rem;
    overflow-y: auto;
  }
  .con-service {
    position: absolute;
    left: 50%;
    bottom: 0.48rem;
    transform: translateX(-50%);
    cursor: pointer;
    img {
      display: block;
      margin: 0 auto 0.08rem;
      width: 0.4rem;
      height: 0.4rem;
    }
    span {
      width: 100%;
      display: block;
      font-family: 'PingFang SC';
      font-style: normal;
      font-weight: 400;
      font-size: 0.16rem;
      line-height: 0.22rem;
      text-align: center;
      color: #5F6975;
    }
  }

  .from-wrap {
    .inp-con {
      margin-top: 0.16rem;
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
        padding: 0 0.16rem;
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

    }

    .checkbox {
      margin-top: 0.12rem;



      .icon-con {
        cursor: pointer;
        width: 0.16rem;
        height: 0.16rem;
        border-radius: 0.04rem;
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      p {
        font-family: 'PingFang SC';
        font-style: normal;
        font-weight: 400;
        font-size: 0.12rem;
        line-height: 0.16rem;
        color: var(--gg-text);

        span {
          cursor: pointer;
          color: var(--theme);
        }
      }

      :deep {
        .van-checkbox {
          display: flex;
        }

        .van-checkbox__icon {
          height: auto;
        }



        .van-checkbox__icon--checked {
          .icon-con {
            border: none;
            background: var(--theme);
          }

          .van-icon {
            border: none;
            background-color: transparent;
          }
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
    }

    .box {
      margin-top: 0.12rem;
      margin-bottom: 0.2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      font-family: 'PingFang SC';
      font-style: normal;
      font-weight: 400;
      font-size: 0.14rem;
      line-height: 1.5em;

      &-left {
        color: var(--gg-subtitle);

        span {
          color: var(--theme);
          cursor: pointer;
          white-space: nowrap;
        }
      }

      &-right {
        margin-left: 0.1rem;
        color: var(--theme);
        cursor: pointer;
        text-align: right;

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
      margin-bottom: 0.04rem;

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