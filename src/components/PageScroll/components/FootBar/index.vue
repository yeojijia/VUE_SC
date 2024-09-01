<template>
  <div class="foot-bar ">
    <div class="foot-bar-bg">
      <div class="item"></div>
      <div class="item"></div>
      <div class="item casino">
        <span></span>
      </div>
      <div class="item"></div>
      <div class="item"></div>
    </div>
    <div class="foot-bar-con">
      <div class="item" :class="{on:navUnfold}" @click="store.commit('SET_NAV_UNFOLD')">
        <img class="img" :src="require(`../../../../assets/images/foottar/icon_menu.svg`)" />
        <img class="img-on" :src="require(`../../../../assets/images/foottar/icon_menu_on.svg`)" />
        <div class="name">{{$t('nav.desc10')}}</div>
      </div>
      <div class="item" :class="{on:curNav==='/activity'}" @click="router.push('/activity')">
        <img class="img" :src="require(`../../../../assets/images/foottar/icon_activity.svg`)" />
        <img class="img-on" :src="require(`../../../../assets/images/foottar/icon_activity_on.svg`)" />
        <div class="name">{{$t('activity.desc3')}}</div>
      </div>
      <div class="item casino" :class="{on:curNav==='/games/0'}" @click="router.push('/games/0')">
        <div class="casino-img">
          <img class="img" :src="require(`../../../../assets/images/foottar/icon_casino_active.svg`)" />
        </div>
        <!-- <img class="img" :src="require(`../../../../assets/images/foottar/icon_casino.svg`)" />
      <img class="img-on" :src="require(`../../../../assets/images/foottar/icon_casino_on.svg`)" /> -->
        <div class="name">{{$t('nav.desc11')}}</div>
      </div>
      <div class="item" :class="{on:curNav==='/lottery'}" @click="router.push('/lottery')">
        <img class="img" :src="require(`../../../../assets/images/foottar/icon_lottery_myself.svg`)" />
        <img class="img-on" :src="require(`../../../../assets/images/foottar/icon_lottery_myself_on.svg`)" />
        <div class="name">{{$t('lottery.desc0')}}</div>
      </div>
      <div class="item" :class="{on:curNav==='/my/min'}" @click="handlePath('/my/min')">
        <img class="img" :src="require(`../../../../assets/images/foottar/icon_my.svg`)" />
        <img class="img-on" :src="require(`../../../../assets/images/foottar/icon_my_on.svg`)" />
        <div class="name">{{$t('nav.desc13')}}</div>
      </div>

    </div>

  </div>
</template>
<script setup>
import { ref, computed, watch, getCurrentInstance } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router';
const store = useStore()
const router = useRouter()
const { proxy } = getCurrentInstance()
const navUnfold = computed(() => store.state.global.navUnfold)
let theme = computed(() => store.state.global.theme)
const isLogin = computed(() => store.state.user.isLogin)
const curNav = ref(null)
watch(() => {
  return {
    path: router.currentRoute.value.fullPath,
  }
}, ({ path }) => {

  curNav.value = path
},
  { immediate: true }
)
function handlePath(path) {
  if (!isLogin.value) {
    spop({
      template: proxy.$t('common.desc4'),
      style: 'info',
      group: 'login-prompt',
      autoclose: 2000
    })
    return
  }
  router.push(path)
}
</script>


<style lang='scss' scoped>
.foot-bar {
  position: fixed;
  left: 0;
  bottom: 0;
  flex: 0 0 auto;
  width: 100%;
  height: 0.52rem;
  // align-items: center;
  background: var(--card-bg);
  box-shadow: var(--shadow);
  display: none;
  // z-index: 98;
  z-index: 1000;

  .foot-bar-bg {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;

    .item {
      flex: 1;

      &.casino {
        // width: 0.8rem;
        position: relative;

        &::before {
          content: '';
          position: absolute;
          bottom: 15%;
          width: 100%;
          height: 0;
          padding-bottom: 90%;
          background: var(--card-bg);
          box-shadow: var(--shadow);
          border-radius: 50%;

        }

        &::after {
          content: '';
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          top: -20%;
          width: 150%;
          height: 0;
          padding-bottom: 80%;
          background: var(--card-bg);
          box-shadow: var(--shadow);
          border-radius: 50%;
        }

        span {
          position: absolute;
          z-index: 2;
          bottom: 15%;
          width: 100%;
          height: 0;
          padding-bottom: 90%;
          background: var(--card-bg);
          border-radius: 50%;

        }

        .casino-img-bg {
          background: var(--card-bg);
          // box-shadow: var(--shadow);

        }
      }
    }


  }

  .foot-bar-con {
    position: relative;
    z-index: 2;
    width: 100%;
    height: 100%;
    display: flex;
    padding-bottom: 0.06rem;
    justify-content: space-between;
    align-items: flex-end;
    background: var(--card-bg);

    .item {
      flex: 1;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      align-items: center;

      &.casino {
        // width: 0.8rem;
        position: relative;

        .casino-img {
          width: 0.44rem;
          height: 0.44rem;
          background: rgba(54, 175, 81, 0.2);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;

          img {
            display: block;
            width: 0.26rem;
            height: 0.26rem;
          }
        }
      }

      &.on {
        .img {
          display: none;
        }

        .img-on {
          display: block;
        }

        .name {
          color: var(--theme);
        }
      }

      img {
        flex: 0 0 auto;
        width: 0.2rem;
        // height: 0.2rem;
        // object-fit: cover;
      }

      .img {
        display: block;
      }

      .img-on {
        display: none;
      }

      .name {
        font-family: 'PingFang SC';
        font-style: normal;
        font-weight: 400;
        font-size: 0.12rem;
        line-height: 1.4em;
        color: var(--nav-btn-text);

      }
    }
  }


}

@media (max-width:749px) {
  .foot-bar {
    display: flex;
  }
}
</style>