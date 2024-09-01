<template>
  <div class="min-my">
    <div class="com-container">
      <div class="info">
        <div class="info-left">
          <div class="avatar">
            <com-image class="img" :src="info.avatar" />
            <div class="upload">
              <van-uploader :after-read="handleAfterRead" ref="uploaderDom" />
              <img class="upload-img" src="../../assets/images/common/icon_upload.svg" @click="hadnleChooseFile" />
            </div>
          </div>
          <div class="nickname-vip">
            <div class="nickname">{{info.nickName}}</div>
            <div class="vip">
              {{info.levelName}}
            </div>
          </div>
        </div>
        <div class="info-right">
          <div class="recharge-btn" @click="store.dispatch('setMoneyPopupShow',{show:true,type:'recharge'})">
            {{$t('common.desc1')}}
          </div>
        </div>
      </div>
      <div class="assets">
        <div class="item">
          <div class="name">{{ $t('common.desc97') }}</div>
          <div class="val">${{ decal(assetInfo?.Digital,3) }}</div>
        </div>
        <div class="item">
          <div class="name">{{ $t('common.desc98') }}</div>
          <div class="val">${{ decal(assetInfo?.Legal,3) }}</div>
        </div>
        <div class="item">
          <div class="name">{{ $t('common.desc99') }}</div>
          <div class="val">${{ decal(assetInfo?.Platform,3) }}</div>
        </div>
      </div>
      <div class="box">
        <div class="item" @click="handlePath('/my/1')">
          <div class="left">
            <img class="img" src="../../assets/images/nav/icon_nav_my.png" />
            <div class="name">{{$t('nav.desc8')}}</div>
          </div>
          <div class="right"><van-icon name="arrow" /></div>
        </div>
        <div class="item" @click="handlePath('/my/2')">
          <div class="left">
            <img class="img" src="../../assets/images/nav/icon_nav_trade.png" />
            <div class="name">{{$t('my.desc2')}}</div>
          </div>
          <div class="right"><van-icon name="arrow" /></div>
        </div>
        <div class="item" @click="handlePath('/my/3')">
          <div class="left">
            <img class="img" src="../../assets/images/nav/icon_nav_game3.png" />
            <div class="name">{{$t('my.desc3')}}</div>
          </div>
          <div class="right"><van-icon name="arrow" /></div>
        </div>
        <div class="item" @click="handlePath('/my/4')">
          <div class="left">
            <img class="img" src="../../assets/images/nav/icon_nav_notice.png" />
            <div class="name">{{$t('my.desc4')}}</div>
          </div>
          <div class="right"><van-icon name="arrow" /></div>
        </div>
      </div>
      <div class="box">
        <div class="item" @click="handlePath('/my/5')">
          <div class="left">
            <img class="img" src="../../assets/images/nav/icon_nav_laundry.png" />
            <div class="name">{{$t('invite.desc1')}}</div>
          </div>
          <div class="right"><van-icon name="arrow" /></div>
        </div>
        <div class="item" @click="handlePath('/my/6')">
          <div class="left">
            <img class="img" src="../../assets/images/nav/icon_nav_invite.png" />
            <div class="name">{{$t('invite.desc2')}}</div>
          </div>
          <div class="right"><van-icon name="arrow" /></div>
        </div>
        <div class="item" @click="handlePath('/my/7')">
          <div class="left">
            <img class="img" src="../../assets/images/nav/icon_nav_member.png" />
            <div class="name">{{$t('invite.desc3')}}</div>
          </div>
          <div class="right"><van-icon name="arrow" /></div>
        </div>
        <div class="item" @click="handlePath('/my/8')">
          <div class="left">
            <img class="img" src="../../assets/images/nav/icon_nav_winnings.png" />
            <div class="name">{{$t('my.desc105')}}</div>
          </div>
          <div class="right"><van-icon name="arrow" /></div>
        </div>
      </div>
      <div class="box">
        <div class="item" @click="handlePath('/my/9')">
          <div class="left">
            <img class="img" src="../../assets/images/nav/icon_nav_setting.png" />
            <div class="name">{{$t('my.desc104')}}</div>
          </div>
          <div class="right"><van-icon name="arrow" /></div>
        </div>
        <div class="item" @click="handlePath('/help')">
          <div class="left">
            <img class="img" src="../../assets/images/nav/icon_nav_help.png" />
            <div class="name">{{$t('nav.desc6')}}</div>
          </div>
          <div class="right"><van-icon name="arrow" /></div>
        </div>
        <div class="item" @click="handleUrl(serviceUrl)">
          <div class="left">
            <img class="img" src="../../assets/images/nav/icon_nav_services.png" />
            <div class="name">{{$t('nav.desc24')}}</div>
          </div>
          <div class="right"><van-icon name="arrow" /></div>
        </div>
      </div>
      <div class="log-out" @click.stop="handleLogout">{{ $t('user.desc2') }}</div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, getCurrentInstance, onActivated } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex';
import { _uploadFile, _updateAvatar } from '@/utils/api/user'
import { _asset, _totalBalance } from '@/utils/api/money'
const store = useStore()
const router = useRouter()
const { proxy } = getCurrentInstance()
const decal = proxy.$common.decal
const isMobile = computed(() => store.state.global.isMobile)
const info = computed(() => store.state.user.userInfo)
const uploaderDom = ref(null)

const serviceUrl = computed(() => {
  return store.state.global.serviceUrl
})

function hadnleChooseFile() {
  uploaderDom.value.chooseFile()
}

function handleAfterRead(file) {
  let loadingToast = proxy.$toast.loading({
    duration: 0,
    forbidClick: true,
  });
  _uploadFile(file).then(res => {
    return _updateAvatar({
      profilePath: res
    })
  }, () => {
    spop({
      template: proxy.$t('user.desc109'),
      style: 'error',
      autoclose: 2000
    })
    loadingToast.clear()
  }).then(res => {
    store.dispatch('getUserInfo')
  }, () => {
    // spop({
    //   template: proxy.$t('user.desc108'),
    //   style: 'error',
    //   autoclose: 2000
    // })
  }).finally(() => {
    loadingToast.clear()
  })

}
function handlePath(path) {
  router.push(path)
}
function handleUrl(url) {
  window.open(url)
}

function handleLogout() {
  store.dispatch('logOut')
}
const assetInfo = ref({
  Digital: 0,
  Legal: 0,
  Platform: 0
})
function getAsset() {
  const Digital = _asset({ type: 1 })
  const Legal = _asset({ type: 2 })
  const Platform = _totalBalance()
  Promise.all([Digital, Legal, Platform]).then(res => {
    assetInfo.value = {
      Digital: res[0].totalBalance,
      Legal: res[1].totalBalance,
      Platform: res[2]
    }
    console.log({ assetInfo: assetInfo.value })
  })
}
onActivated(() => {
  if (isMobile.value) {
    getAsset()
  } else {
    router.push('/my/1')
  }
})
</script>


<style lang='scss' scoped>
.min-my {
  .info {
    padding: 0.2rem 0;
    display: flex;
    justify-content: space-between;
    align-items: center;

    &-left {
      display: flex;
      align-items: center;

      .avatar {
        flex: 0 0 auto;
        margin-right: 0.12rem;
        width: 0.64rem;
        height: 0.64rem;
        position: relative;

        .img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          overflow: hidden;
        }

        .upload {
          position: absolute;
          right: 0;
          bottom: 0;
          width: 0.2rem;
          height: 0.2rem;

          .upload-img {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            cursor: pointer;
          }

          :deep {
            .van-uploader {
              width: 100%;
              height: 100%;
              position: absolute;
              opacity: 0;
            }
          }
        }
      }

      .nickname-vip {
        display: flex;
        flex-direction: column;
        justify-content: center;

        .nickname {
          font-family: 'PingFang SC';
          font-style: normal;
          font-weight: 500;
          font-size: 0.18rem;
          line-height: 0.25rem;
          color: var(--gg-text);
        }

        .vip {
          margin-top: 0.08rem;
          font-family: 'PingFang SC';
          font-style: normal;
          font-weight: 400;
          font-size: 0.14rem;
          line-height: 0.16rem;
          color: var(--gg-subtitle);
        }
      }
    }

    &-right {
      .recharge-btn {
        background: var(--gg-btn-bg);
        border: 1px solid var(--gg-btn-border);
        color: var(--gg-btn-color);
        height: 0.32rem;
        padding: 0 0.18rem;
        border-radius: 0.08rem;
        font-size: 0.14rem;
        line-height: 1.4em;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }

  .assets {
    background: var(--gg-card-bg);
    border-radius: 0.12rem;
    padding: 0.14rem;

    .item {
      margin-bottom: 0.08rem;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .name {
        margin-right: 0.2rem;
        flex: 0 0 auto;
        font-family: 'PingFang SC';
        font-style: normal;
        font-weight: 400;
        font-size: 0.15rem;
        line-height: 1.4em;
        text-transform: uppercase;
        color: var(--gg-subtitle);
      }

      .val {
        width: 0;
        flex: 1;
        font-family: 'PingFang SC';
        font-style: normal;
        font-weight: 500;
        font-size: 0.15rem;
        line-height: 1.4em;
        text-align: right;
        text-transform: uppercase;
        color: var(--gg-text);
      }

      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  .box {
    margin-top: 0.12rem;
    background: var(--gg-card-bg);
    border-radius: 0.12rem;
    padding: 0 0.14rem;

    .item {
      padding: 0.14rem 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid var(--gg-line);

      &:last-child {
        border-bottom: none;
      }

      .left {
        display: flex;
        align-items: center;

        .img {
          margin-right: 0.08rem;
          flex: 0 0 auto;
          width: 0.24rem;
          height: 0.24rem;
          object-fit: contain;
        }

        .name {
          font-size: 0.15rem;
          line-height: 0.21rem;
          color: var(--gg-text);
        }
      }

      .right {
        flex: 0 0 auto;
        margin-left: 0.2rem;

        .van-icon {
          font-weight: 500;
          font-size: 0.14rem;
          color: #68707B;
        }
      }
    }
  }

  .log-out {
    margin-top: 0.16rem;
    background: var(--gg-card-bg);
    border-radius: 0.12rem;
    padding: 0.15rem 0.14rem;
    font-family: 'PingFang SC';
    font-style: normal;
    font-weight: 400;
    font-size: 0.16rem;
    line-height: 0.19rem;
    text-align: center;
    color: #F95657;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>