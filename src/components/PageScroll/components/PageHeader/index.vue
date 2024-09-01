<template>
  <div class="page-header">
    <div class="com-container header-content">
      <div class="left">
        <div class="logo-con" @click="router.push('/home')">
          <img class="logo" :src="logoImgH5" v-if="isMobile" />
          <img class="logo" :src="logoImg" v-else />
        </div>
        <div class="game-search-con">
          <header-game-search />
        </div>

      </div>
      <div class="right">
        <div class="btn-con lang-con">
          <com-select v-model:val="langId" class="select" :list="langList" :custom-field-name="{id: 'code',text: 'name',}"
            v-model:show="langShow">
            <div class="btn" @click.stop="langShow = !langShow">
              <div class="val">
                {{ langInfo?.name }}
              </div>
              <van-icon name="arrow-down" />
            </div>
          </com-select>
        </div>
        <div class="btn-con price-con" v-if="isLogin">
          <div class="btn">
            <img src="../../../../assets/images/common/icon_price.svg" />
            <div class="val">
              ${{decal(totalBalance, 3) }}
            </div>
          </div>
        </div>
        <div class="btn-con recharge-con" v-if="isLogin">
          <div class="btn bg-h" @click="store.dispatch('setMoneyPopupShow',{show:true,type:'recharge'})">
            {{$t('common.desc1')}}
          </div>
        </div>
        <div class="btn-con" v-if="!isLogin" @click="store.commit('SET_LOGIN_POPUP_SHOW',true)">
          <div class="btn  user-btn">
            {{$t('user.desc3')}}
          </div>
        </div>
        <div class="btn-con" v-if="!isLogin" @click="handleToRegister">
          <div class="btn  bg-h">
            {{$t('user.desc4')}}
          </div>
        </div>

        <div class="username-msg" v-if="isLogin">
          <com-image class="img avatar" :src="userInfo.avatar" />
          <div class="name-vip">
            <div class="name">
              {{usernameSlice(userInfo.username)}}</div>
            <div class="vip">
              {{ userInfo.levelName }}
              <!-- VIP <span>0</span> -->
            </div>
          </div>
        </div>
        <login-info :userInfo="userInfo" v-if="isLogin" />

      </div>
    </div>
  </div>
</template>
<script setup>
import HeaderGameSearch from './components/GameSearch'
import LoginInfo from './components/LoginInfo'
// import NavBtn from './NavBtn';
import { ref, computed, getCurrentInstance, inject, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
const { proxy } = getCurrentInstance()
const decal = proxy.$common.decal
const store = useStore()
const router = useRouter()
const reload = inject('reload')
let theme = computed(() => store.state.global.theme)
const isMobile = computed(() => store.state.global.isMobile)
const navUnfold = computed(() => store.state.global.navUnfold)


const userInfo = computed(() => {
  return store.state.user.userInfo
})

const logoInfo = computed(() => {
  return store.state.global.logoInfo
})
const logoImg = computed(() => {
  return theme.value == 'night' ? logoInfo.value.logo_image_night : logoInfo.value.logo_image_day
})
const logoImgH5 = computed(() => {
  return theme.value == 'night' ? logoInfo.value.logo_image_night_h5 : logoInfo.value.logo_image_day_h5
})

const isLogin = computed(() => store.getters.isLogin)
const totalBalance = computed(() => store.getters.totalBalance)
let langList = computed(() => {
  return store.state.global.langList
})
let langId = computed({
  get() {
    return store.getters.lang
  },
  set(lang) {
    store.commit('SET_LANG', { lang, $i18n: proxy.$i18n })
    reload()
  }
})
const langInfo = computed(() => {
  return langList.value.find(item => item.code === langId.value)
})
const langShow = ref(false)
const userShow = ref(false)



function usernameSlice(usernameStr) {
  return usernameStr && usernameStr.length > 6 ? `${usernameStr.substr(0, 3)}...${usernameStr.substr(-3, 3)}` : usernameStr

}
//跳转注册
function handleToRegister() {
  store.commit('SET_LOGIN_POPUP_SHOW', false)
  store.commit('SET_REGISTER_POPUP_SHOW', true)
}

function handleLogout() {
  userShow.value = !userShow.value
  store.dispatch('logOut')
}

function handleRecharge() {
  store.commit('SET_COIN_TYPE', 'digital')
  store.dispatch('setMoneyPopupShow', {
    show: true,
    type: 'recharge'
  })
}

function handlePath(path) {
  router.push(path)
  userShow.value = !userShow.value

}



onMounted(() => {
  if (isLogin.value) {
    store.dispatch('getUserInfo')
    store.dispatch('getTotalBalance')
  }
})
</script>


<style lang='scss' scoped>
.page-header {
  width: 100%;
  height: 0.64rem;
  background: var(--gg-head-bg);
  box-shadow: var(--gg-head-shadow);
  position: relative;
  z-index: 9;



  .header-content {
    height: 100%;
    display: flex;
    // justify-content: flex-end;
    justify-content: space-between;


    .nav-btn {
      position: absolute;
      top: 0;
      left: 0;
      transform: translate(-50%, 50%);

      &.unfold {
        opacity: 0;
      }
    }

    .left {
      flex: 0 0 auto;
      min-width: 2rem;
      width: 28.57%;
      display: flex;
      align-items: center;

      .game-search-con {
        width: 100%;

      }

      .logo-con {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        display: none;

        .logo {
          height: 0.18rem;
        }

      }


    }

    .right {
      height: 100%;
      display: flex;
      align-items: center;

    }


  }




}

.btn-con {
  margin-left: 0.08rem;

  &.lang-con {
    margin-right: 0.12rem;

    .btn {
      min-width: 1.2rem;
      justify-content: space-between;
      color: var(--gg-text);
      background: var(--gg-inp-bg);
      border-radius: 0.08rem;
    }
  }

  &.user-con {
    height: 100%;
    position: relative;

    :deep .van-popover__wrapper {
      height: 100%;
    }
  }

  &.price-con {
    margin-right: 0.12rem;

    .btn {
      border-radius: 0.08rem;
      background: linear-gradient(180deg, #0BB4F8 0%, #098FF1 100%);
      color: #fff;
      border: 1px solid rgba(255, 255, 255, 0.4);
    }
  }
}

.btn {
  // min-width: 0.8rem;
  cursor: pointer;
  height: 0.36rem;
  font-weight: 600;
  border-radius: 0.1rem;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 0.16rem;
  font-size: 0.14rem;
  line-height: 1.375em;
  white-space: nowrap;
  color: var(--gg-text);

  &.user-btn {
    transition: all 0.3s linear;

    &:hover {
      color: var(--theme);
    }
  }



  img {
    margin-right: 0.04rem;
    width: 0.2rem;
    height: 0.2rem;
    object-fit: cover;
  }

  .van-icon {
    margin-left: 0.05rem;
  }

  &.bg-h {
    background: var(--gg-btn-bg);
    border: 1px solid var(--gg-btn-border);
    color: var(--gg-btn-color);

    img {
      width: 0.2rem;
      height: auto;
    }
  }

}

.username-msg {
  margin-left: 0.16rem;
  display: flex;
  align-items: center;

  .name {
    max-width: 0.75rem;
    font-size: 0.14rem;
    line-height: 1.4em;
    color: var(--gg-text);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .vip {
    margin-top: 0.02rem;
    font-size: 0.12rem;
    line-height: 1.4em;
    color: var(--gg-subtitle);

    span {
      color: var(--gg-text);

    }
  }
}

.avatar {
  margin-right: 0.06rem;
  border-radius: 50%;
  overflow: hidden;
  width: 0.36rem;
  height: 0.36rem;
}

.menu-con {
  margin-left: 0.1rem;
  height: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.menu {
  width: 0.28rem;
  height: 0.36rem;

}

.user-info {
  min-width: 1.5rem;
  width: 4.32rem;
  padding: 0.2rem;
  box-sizing: border-box;
  border-radius: 0.2rem;
  z-index: 99;
  overflow: hidden;
  background: var(--gg-user-popup-bg);
  box-shadow: var(--gg-user-popup-shadow);
  box-shadow: none;

  .info-top {
    .username {
      display: flex;
      align-items: center;

      .avatar {
        flex: 0 0 auto;
        margin-right: 0.08rem;
        width: 0.42rem;
        height: 0.42rem;
        border-radius: 50%;
      }

      .val {
        width: 0;
        flex: 1;
        font-size: 0.18rem;
        line-height: 1.5em;
        color: var(--gg-text);

      }
    }

    .progress {
      margin-top: 0.12rem;

      .progress-top {
        margin-bottom: 0.02rem;
        padding: 0 0.24rem;
        display: flex;
        justify-content: space-between;
        color: var(--gg-text);
        font-size: 0.14rem;
        line-height: 1.5em;
      }
    }

    .progress-con {
      width: 100%;
      padding: 0.08rem 0.24rem;
      background: var(--gg-user-popup-progress-con-bg);
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-radius: 0.06rem;

      .progress-bar-con {
        width: 0;
        flex: 1;
        height: 0.08rem;
        background: var(--gg-user-popup-progress-bar-bg);
        border-radius: 0.04rem;

        .progress-bar {
          height: 100%;
          background: var(--theme);
          border-radius: 0.04rem;
        }

      }

      span {
        margin-left: 0.2rem;
        flex: 0 0 auto;
        color: var(--gg-user-popup-progress-bar-color);
        font-size: 0.14rem;
        line-height: 1.5em;
      }
    }
  }

  .info-bot {
    display: flex;
    flex-wrap: wrap;
    background: var(--gg-user-popup-info-bot-bg);
    border-radius: 0.06rem;
    padding: 0.08rem 0.04rem 0.12rem 0.12rem;

    .item-con {
      width: 50%;
      padding-top: 0.04rem;
      padding-right: 0.08rem;
    }

    .item {
      width: 100%;
      padding: 0.04rem 0.12rem;
      border-radius: 0.08rem;
      display: flex;
      align-items: center;
      border: 1px solid transparent;

      img {
        margin-right: 0.08rem;
        width: 0.32rem;
        height: 0.32rem;
        flex: 0 0 auto;
      }

      .val {
        flex: 1;
        width: 0;
        font-family: 'PingFang SC';
        font-style: normal;
        font-weight: 400;
        font-size: 0.16rem;
        line-height: 0.22rem;
        color: var(--gg-subtitle);

      }

      &:hover {
        background: var(--gg-nav-bg-active);
        color: var(--gg-nav-color-active);
        border-color: var(--gg-nav-border-active);
      }
    }
  }

  .item {
    cursor: pointer;
    padding: 0.1rem;
    width: 100%;
    font-size: 0.14rem;
    font-weight: 300;
    text-align: left;
    line-height: 1.2em;
    box-sizing: border-box;
    // transition: all 0.3s linear;
    border-radius: 0.05rem;
    white-space: normal;
    overflow: hidden;
    display: flex;
    align-items: center;
    color: var(--nav-btn-text);


    .img {
      flex: 0 0 auto;
      margin-right: 0.15rem;
      width: 0.24rem;
      height: 0.24rem;
      object-fit: cover;
      border-radius: 50%;
      overflow: hidden;
    }

    .val {
      min-width: 0;
      flex: 1;
    }


    &.username {
      background: var(--btn-bg-4);
      color: var(--btn-text-4);
      filter: var(--btn-filter-4);
    }
  }

  .price-item {
    display: none;
    margin: 0.1rem 0 0.05rem;
    align-items: flex-start;
  }

  .recharge-item {
    display: none;
  }

  .info-top {
    margin-bottom: 0.14rem;
    padding-bottom: 0.14rem;
    border-bottom: 1px solid;
    border-color: var(--line-form);


  }

  .log-out {
    margin-top: 0.18rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    img {
      margin-right: 0.08rem;
      flex: 0 0 auto;
      width: 0.2rem;
      height: 0.2rem;
      object-fit: contain;
    }

    .val {
      font-family: 'PingFang SC';
      font-style: normal;
      font-weight: 400;
      font-size: 0.16rem;
      line-height: 0.22rem;
      color: var(--gg-subtitle);
    }


  }
}

@media (max-width: 992px) {
  .page-header {
    z-index: 3;

    .header-content {

      .nav-btn {
        display: none;
      }

      .left {
        flex: 0 0 auto;
        min-width: auto;
        width: auto;



        .game-search-con {
          display: none;
        }
      }
    }
  }
}

@media (max-width: 749px) {
  .page-header {
    z-index: 99;
    height: 0.44rem;

    .header-content {

      .nav-btn {
        display: none;
      }

      .left {
        flex: 1;
        min-width: auto;
        width: auto;

        .logo-con {
          display: flex;

          .logo {
            height: auto;
            max-height: 0.28rem;
            max-width: 100%;
          }
        }

        .game-search-con {
          display: none;
        }
      }
    }


  }

  .btn-con {
    margin-left: 0.12rem;

    &.price-con {
      margin-right: 0;
    }


  }

  .btn {
    min-width: auto;
    padding: 0 0.12rem;
    height: 0.32rem;
    font-size: 0.14rem;
    border-radius: 0.08rem;

    img {
      margin-right: 0.05rem;
      width: 0.2rem;
      height: 0.2rem;
    }

    &.user-btn {
      min-width: auto;
    }
  }

  .lang-con {
    display: none;
  }



  .user-con {
    // display: none;

    .btn {
      img {
        width: 0.18rem;
      }
    }
  }



  .chain-con {
    .btn {
      img {
        margin-right: 0;
      }
    }

    .val {
      display: none;
    }
  }

  .options {
    .price-item {
      display: flex;
    }

    .recharge-item {
      display: flex;
    }
  }

  .username-msg {
    display: none;
  }
}
</style>