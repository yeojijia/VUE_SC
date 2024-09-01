<template>
  <div class="btn-con user-con" v-if="isMobile">
    <com-select class="header-user-popup" v-model:show="userShow" :option="true" placement="bottom-end">
      <div class="menu-con">
        <com-image class="img menu" :src="require(`../../../../../assets/images/common/${theme}/icon_my_menu_mobile.svg`)"
          @click.stop="userShow = !userShow" />
      </div>
      <template #option>
        <div class="user-info">
          <div class="info-top">
            <div class="username">
              <com-image class="avatar" :src="userInfo.avatar" />
              <div class="val overflow1" :title="userInfo.nickName">Hello {{userInfo.nickName}}</div>
            </div>
            <div class="progress">
              <div class="progress-top">
                <span>{{userInfo.levelName}}</span>
                <span>{{userInfo.nextLevelName}}</span>
              </div>
              <div class="progress-con">
                <div class="progress-bar-con">
                  <div class="progress-bar" :style="{ width:`${getValueMinus(100,Number(userInfo.upDepositRate))}%`}">
                  </div>
                </div>
                <span>
                  {{decal(getValueMinus(100,Number(userInfo.upDepositRate)) ,2)}}%
                </span>
              </div>
            </div>
          </div>
          <div class="info-bot">
            <div class="item-con">
              <div class="item " @click="handlePath('/my/1')">
                <img class="img" src="../../../../../assets/images/nav/icon_nav_my.png" />
                <div class="val">{{$t('nav.desc8')}}</div>
              </div>
            </div>
            <div class="item-con">
              <div class="item " @click="handlePath('/my/2')">
                <img class="img" src="../../../../../assets/images/nav/icon_nav_trade.png" />
                <div class="val">{{$t('my.desc2')}}</div>
              </div>
            </div>
            <div class="item-con">
              <div class="item " @click="handlePath('/my/3')">
                <img class="img" src="../../../../../assets/images/nav/icon_nav_game3.png" />
                <div class="val">{{$t('my.desc3')}}</div>
              </div>
            </div>
            <div class="item-con">
              <div class="item " @click="handlePath('/my/4')">
                <img class="img" src="../../../../../assets/images/nav/icon_nav_notice.png" />
                <div class="val">{{$t('my.desc4')}}</div>
              </div>
            </div>
            <div class="item-con">
              <div class="item " @click="handlePath('/my/5')">
                <img class="img" src="../../../../../assets/images/nav/icon_nav_laundry.png" />
                <div class="val">{{$t('invite.desc1')}}</div>
              </div>
            </div>
            <div class="item-con">
              <div class="item " @click="handlePath('/my/6')">
                <img class="img" src="../../../../../assets/images/nav/icon_nav_invite.png" />
                <div class="val">{{$t('invite.desc2')}}</div>
              </div>
            </div>
            <div class="item-con">
              <div class="item " @click="handlePath('/my/7')">
                <img class="img" src="../../../../../assets/images/nav/icon_nav_member.png" />
                <div class="val">{{$t('invite.desc3')}}</div>
              </div>
            </div>
            <div class="item-con">
              <div class="item " @click="handlePath('/my/8')">
                <img class="img" src="../../../../../assets/images/nav/icon_nav_winnings.png" />
                <div class="val">{{$t('my.desc105')}}</div>
              </div>
            </div>
            <div class="item-con">
              <div class="item " @click="handlePath('/my/9')">
                <img class="img" src="../../../../../assets/images/nav/icon_nav_setting.png" />
                <div class="val">{{$t('my.desc104')}}</div>
              </div>
            </div>
            <div class="item-con">
              <div class="item " @click="handlePath('/help')">
                <img class="img" src="../../../../../assets/images/nav/icon_nav_help.png" />
                <div class="val">{{$t('nav.desc6')}}</div>
              </div>
            </div>
          </div>
          <div class="log-out" @click.stop="handleLogout">
            <img src="../../../../../assets/images/common/out.png" />
            <div class="val"> {{$t('user.desc2')}}</div>
          </div>
        </div>
      </template>
    </com-select>

  </div>
  <div class="btn-con user-con" v-else>
    <div class="menu-con">
      <com-image class="img menu" :src="require(`../../../../../assets/images/common/${theme}/icon_my_menu.svg`)" />
    </div>
    <div class="user-info-con">
      <div class="user-info">
        <div class="info-top">
          <div class="username">
            <com-image class="avatar" :src="userInfo.avatar" />
            <div class="val overflow1" :title="userInfo.nickName">Hello {{userInfo.nickName}}</div>
          </div>
          <div class="progress">
            <div class="progress-top">
              <span>{{userInfo.levelName}}</span>
              <span>{{userInfo.nextLevelName}}</span>
            </div>
            <div class="progress-con">
              <div class="progress-bar-con">
                <div class="progress-bar" :style="{ width:`${getValueMinus(100,Number(userInfo.upDepositRate))}%`}"></div>
              </div>
              <span>
                {{decal(getValueMinus(100,Number(userInfo.upDepositRate)) ,2)}}%
              </span>
            </div>
          </div>
        </div>
        <div class="info-bot">
          <div class="item-con">
            <div class="item " @click="handlePath('/my/1')">
              <img class="img" src="../../../../../assets/images/nav/icon_nav_my.png" />
              <div class="val">{{$t('nav.desc8')}}</div>
            </div>
          </div>
          <div class="item-con">
            <div class="item " @click="handlePath('/my/2')">
              <img class="img" src="../../../../../assets/images/nav/icon_nav_trade.png" />
              <div class="val">{{$t('my.desc2')}}</div>
            </div>
          </div>
          <div class="item-con">
            <div class="item " @click="handlePath('/my/3')">
              <img class="img" src="../../../../../assets/images/nav/icon_nav_game3.png" />
              <div class="val">{{$t('my.desc3')}}</div>
            </div>
          </div>
          <div class="item-con">
            <div class="item " @click="handlePath('/my/4')">
              <img class="img" src="../../../../../assets/images/nav/icon_nav_notice.png" />
              <div class="val">{{$t('my.desc4')}}</div>
            </div>
          </div>
          <div class="item-con">
            <div class="item " @click="handlePath('/my/5')">
              <img class="img" src="../../../../../assets/images/nav/icon_nav_laundry.png" />
              <div class="val">{{$t('invite.desc1')}}</div>
            </div>
          </div>
          <div class="item-con">
            <div class="item " @click="handlePath('/my/6')">
              <img class="img" src="../../../../../assets/images/nav/icon_nav_invite.png" />
              <div class="val">{{$t('invite.desc2')}}</div>
            </div>
          </div>
          <div class="item-con">
            <div class="item " @click="handlePath('/my/7')">
              <img class="img" src="../../../../../assets/images/nav/icon_nav_member.png" />
              <div class="val">{{$t('invite.desc3')}}</div>
            </div>
          </div>
          <div class="item-con">
            <div class="item " @click="handlePath('/my/8')">
              <img class="img" src="../../../../../assets/images/nav/icon_nav_winnings.png" />
              <div class="val">{{$t('my.desc105')}}</div>
            </div>
          </div>
          <div class="item-con">
            <div class="item " @click="handlePath('/my/9')">
              <img class="img" src="../../../../../assets/images/nav/icon_nav_setting.png" />
              <div class="val">{{$t('my.desc104')}}</div>
            </div>
          </div>
          <div class="item-con">
            <div class="item " @click="handlePath('/help')">
              <img class="img" src="../../../../../assets/images/nav/icon_nav_help.png" />
              <div class="val">{{$t('nav.desc6')}}</div>
            </div>
          </div>
          <div class="item-con">
            <div class="item " @click="handleUrl(serviceUrl)">
              <img class="img" src="../../../../../assets/images/nav/icon_nav_services.png" />
              <div class="val">{{$t('nav.desc24')}}</div>
            </div>
          </div>
        </div>
        <div class="log-out" @click.stop="handleLogout">
          <img src="../../../../../assets/images/common/out.png" />
          <div class="val"> {{$t('user.desc2')}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, inject, getCurrentInstance, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router';
const { proxy } = getCurrentInstance()
const store = useStore()
const reload = inject('reload')
const router = useRouter()
let theme = computed(() => store.state.global.theme)
const isMobile = computed(() => store.state.global.isMobile)
const decal = proxy.$common.decal
const getValueMinus = proxy.$common.getValueMinus
const props = defineProps({
  userInfo: Object,
  // show: Boolean
})
// const emit = defineEmits(['update:show'])
const userShow = ref(false)
const serviceUrl = computed(() => {
  return store.state.global.serviceUrl
})
function handleLogout() {
  userShow.value = !userShow.value
  store.dispatch('logOut')
}
function handlePath(path) {
  router.push(path)
}
function handleUrl(url) {
  window.open(url)
}
</script>


<style lang='scss' scoped>
.btn-con {
  margin-left: 0.08rem;

  &.user-con {
    position: relative;

    &:hover {
      .user-info-con {
        visibility: visible;
        opacity: 1;
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
}

.menu-con {
  height: 100%;
  display: flex;
  align-items: center;
}

.menu {
  margin-left: 0.1rem;
  width: 0.28rem;
  height: 0.36rem;
  cursor: pointer;

}

.user-info-con {
  position: absolute;
  top: 0.64rem;
  right: -0.15rem;
  padding-top: 0.12rem;
  visibility: hidden;
  opacity: 0;
  transition: all 0.3s linear;

}

.user-info {
  position: relative;
  min-width: 1.5rem;
  width: 4.32rem;
  padding: 0.2rem;
  box-sizing: border-box;
  border-radius: 0.2rem;
  z-index: 99;
  // overflow: hidden;
  background: var(--gg-user-popup-bg);
  box-shadow: var(--gg-user-popup-shadow);

  &::before {
    content: '';
    position: absolute;
    top: -12px;
    right: 0.2rem;
    width: 0;
    height: 0;
    border-color: transparent;
    border-style: solid;
    border-bottom-color: currentColor;
    border-width: 6px;
    color: var(--gg-user-popup-bg);
  }


  .info-top {
    margin-bottom: 0.14rem;
    padding-bottom: 0.14rem;
    border-bottom: 1px solid;
    border-color: var(--line-form);

    .username {
      display: flex;
      align-items: center;

      .avatar {
        flex: 0 0 auto;
        margin-right: 0.08rem;
        width: 0.42rem;
        height: 0.42rem;
        border-radius: 50%;
        overflow: hidden;
      }

      .val {
        width: 0;
        flex: 1;
        font-weight: 600;
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
      cursor: pointer;

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
        border-color: var(--gg-nav-border-active);

        .val {
          color: var(--gg-nav-color-active);

        }
      }
    }
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

@media (max-width: 749px) {

  .btn-con.user-con {
    display: none;
  }

  .user-info-con {
    top: 0.44rem;
    padding-top: 0;
    width: 100vw;
    height: calc(100vh - 0.44rem);
    background: rgba(0, 0, 0, 0.7);
  }

  .user-info {
    width: 100vw;
    border-radius: 0;
    padding: 0.16rem;

    .info-top {
      margin-bottom: 0;
      padding-bottom: 0.12rem;
      border-bottom: none;

      .username {
        .avatar {
          width: 0.36rem;
          height: 0.36rem;
        }

        .val {
          font-size: 0.16rem;
        }
      }

      .progress .progress-top {
        padding: 0 0.16rem;
        font-size: 0.12rem;
      }

      .progress-con {
        padding: 0.06rem 0.16rem;
        border-radius: 0.08rem;

        span {
          margin-left: 0.12rem;
        }
      }
    }

    .info-bot {
      padding: 0.08rem 0 0.08rem 0.08rem;
      border-radius: 0.08rem;

      .item {
        padding: 0.06rem 0.12rem;

        img {
          margin-right: 0.04rem;
          width: 0.24rem;
          height: 0.24rem;
        }

        .val {
          font-size: 0.14rem;
          line-height: 0.2rem;
        }
      }
    }

    .log-out {
      margin-top: 0.12rem;

      img {
        margin-right: 0.04rem;
        width: 0.14rem;
        height: 0.14rem;
      }

      .val {
        font-size: 0.14rem;
      }
    }
  }

  .menu {
    margin-left: 0;
    width: 0.32rem;
    height: 0.32rem;
  }
}
</style>
<style>
.header-user-popup {
  top: 0.44rem !important;
  left: 0 !important;
}

.header-user-popup .van-popover__content {
  border-radius: 0;
}
</style>