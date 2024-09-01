<template>
  <van-popup v-model:show="_show" :position="isMobile?'bottom':'right'" class="popup-transparent">
    <div class="popup-con">
      <div class="con-top">
        <div class="title-cross">
          <div class="title">{{ $t('user.desc3') }}</div>
          <div class="cross" @click="_show = false">
            <van-icon name="cross" />
          </div>
        </div>
        <div class="tabs">
          <div class="item" :class="{on:tab===item.id}" v-for="item of tabs" :key="item.id" @click="tab=item.id">
            {{item.name}}</div>
        </div>
      </div>
      <div class="con-bot">
        <div class="from-wrap" v-show="tab==='account'">
          <div class="inp-con">
            <div class="name">{{ $t('user.desc100') }}</div>
            <div class="inp">
              <input type="text" :placeholder="$t('user.desc8')" v-model="username" />
            </div>
          </div>
          <div class="inp-con">
            <div class="name">{{ $t('user.desc101') }}</div>
            <div class="inp">
              <input :type="eyeShow?'password':'text'" :placeholder="$t('user.desc9')" v-model="password" />
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
          <div class="box-rest">
            <div class="box-btn" @click.stop="handleToRest">{{$t('user.desc14')}}</div>
          </div>

          <div class="sub-btn" @click="handleSubClick">{{$t('user.desc11')}}</div>
          <div class="box-register">
            <div class="box-btn">
              {{$t('user.desc12')}}
              <span @click="handleToRegister">{{$t('user.desc13')}}</span>
            </div>
          </div>
        </div>
        <div class="from-wrap wallet-list" v-show="tab==='wallet'">
          <div class="wallet-item" @click.stop="handleWalletLogin">
            <img :src="require(`../assets/images/user/${theme}/icon_MATEMASK.png`)" />
          </div>
        </div>
      </div>
      <div class="con-service" @click="handleUrl">
        <img src="../assets/images/nav/icon_nav_services.png" alt="">
        <span>{{$t('nav.desc24')}}</span>
      </div>
    </div>
  </van-popup>
</template>
<script setup>
import { ref, computed, inject, getCurrentInstance, watch } from 'vue'
import { useStore } from 'vuex';
const reload = inject('reload')
const store = useStore()
const { proxy } = getCurrentInstance()
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
const tab = ref('account')
const tabs = ref([
  {
    id: 'account',
    name: proxy.$t('user.desc6')
  },
  {
    id: 'wallet',
    name: proxy.$t('user.desc7')
  },
])
const eyeShow = ref(true)

//保留登录状态
const saveLoginChecked = ref(false)


const verifyCode = ref(null)
const username = ref('')
const password = ref('')

function handleUrl() {
  window.open(store.state.global.serviceUrl)
}

//跳转注册
function handleToRegister() {
  store.commit('SET_LOGIN_POPUP_SHOW', false)
  store.commit('SET_REGISTER_POPUP_SHOW', true)
}
//跳转重置密码
function handleToRest() {
  store.commit('SET_LOGIN_POPUP_SHOW', false)
  store.commit('SET_RESET_PASSWORD_POPUP_SHOW', true)
  store.commit('SET_USER_INFO', {
    username: username.value
  })

}
//登录提交
function handleSubClick() {
  if (!username.value) {
    spop({
      template: proxy.$t('user.desc8'),
      style: 'warning',
      autoclose: 2000
    })
    return
  }
  if (!password.value) {
    spop({
      template: proxy.$t('user.desc9'),
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
  store.dispatch('login', {
    username: username.value,
    password: proxy.$common.encrypt(password.value),
    verifyCode: String(verifyCode.value),
    captchaKey: captchaKey.value,
  }).then(() => {
    store.commit('SET_LOGIN_POPUP_SHOW', false)
    reload()
    password.value = ''
    proxy.$toast.clear()
  }).catch(() => {
    store.dispatch('getCode')
    loadingToast.clear()
  }).finally(() => {
    loadingToast.clear()
  })

}

//钱包登录
function handleWalletLogin() {
  store.commit('SET_LOGIN_POPUP_SHOW', false)
  store.dispatch('walletLogin').then(() => {
    reload()
  }).finally(() => {
  })
}

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


  .con-top {
    margin-bottom: 0.08rem;
    flex: 0 0 auto;
    padding-top: 0.24rem;

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

    .tabs {
      margin-top: 0.16rem;
      border-bottom: 1px solid;
      border-color: var(--gg-line);
      display: flex;

      .item {
        margin-right: 0.4rem;
        padding: 0.16rem 0;
        font-family: 'PingFang SC';
        font-style: normal;
        font-weight: 500;
        font-size: 0.16rem;
        line-height: 1.4em;
        color: var(--gg-subtitle);
        cursor: pointer;
        transition: all 0.3s linear;

        &.on {
          color: var(--theme);
          position: relative;

          &::after {
            content: "";
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 1px;
            background: var(--theme);
          }
        }

        &:last-child {
          margin-right: 0;
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
      display: flex;
      justify-content: space-between;
      align-items: center;



    }

    .box-rest {
      margin-top: 0.12rem;
      display: flex;
      font-family: 'PingFang SC';
      font-style: normal;
      font-weight: 400;
      font-size: 0.14rem;
      line-height: 1.5em;
      color: var(--gg-subtitle);
      cursor: pointer;
      justify-content: flex-end;

    }

    .box-register {
      margin-top: 0.12rem;
      display: flex;
      justify-content: center;
      font-family: 'PingFang SC';
      font-style: normal;
      font-weight: 400;
      font-size: 0.14rem;
      line-height: 1.5em;
      color: var(--gg-subtitle);

      span {
        color: var(--theme);
        cursor: pointer;
        white-space: nowrap;
      }

    }

    .wallet-item {
      margin-top: 0.32rem;
      width: 1.9rem;
      border: 1.5px solid;
      border-color: var(--theme);
      border-radius: 0.08rem;
      cursor: pointer;

      img {
        width: 100%;
      }
    }
  }

  .wallet-list {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
}


@media (max-width: 749px) {
  .popup-con {
    width: 100vw;
    height: 90vh;
    border-radius: 0.2rem 0.2rem 0 0;
    padding: 0.24rem 0.28rem;

    .con-top {
      padding-top: 0;
      margin-bottom: 0.04rem;

      .title-cross {
        padding-bottom: 0;
        border-bottom: none;

        .title {
          opacity: 0;
          font-size: 0.16rem;
          line-height: 1.4em;
        }

      }

      .tabs {
        margin-top: 0;

        .item {
          padding: 0.1rem 0;
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

      .wallet-item {
        margin-top: 0.2rem;
        width: 1.54rem;
        height: 0.76rem;
      }
    }

  }
}
</style>