<template>
  <div class="user-info">
    <div class="user-top">
      <div class="avatar">
        <com-image class="img" :src="info.avatar" />
        <div class="upload">
          <van-uploader :after-read="handleAfterRead" ref="uploaderDom" />
          <img class="upload-img" src="../../../../../assets/images/common/icon_upload.svg" @click="hadnleChooseFile" />
        </div>
      </div>
      <div class="info">
        <div class="info-top">
          <div class="nickname">{{info.nickName}}
          </div>
          <div class="username">{{info.username}}</div>
          <van-icon name="setting-o" @click="router.push('/my/9')" />
        </div>
        <div class="info-bot level-con">
          <div class="item">
            <div class="title">{{$t('my.desc5')}}：</div>
            <div class="val">{{info.levelName}}</div>
          </div>
          <div class="item">
            <div class="title">{{$t('my.desc6')}}：</div>
            <div class="val">{{info.agencyLevelName}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="user-bot level-con">
      <div class="item">
        <div class="title">{{$t('my.desc5')}}：</div>
        <div class="val">{{info.levelName}}</div>
      </div>
      <div class="item">
        <div class="title">{{$t('my.desc6')}}：</div>
        <div class="val">{{info.agencyLevelName}}</div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex';
import { _uploadFile, _updateAvatar } from '@/utils/api/user'
const store = useStore()
const router = useRouter()
const { proxy } = getCurrentInstance()
defineProps({
  teamInfo: Object
})
const info = computed(() => store.state.user.userInfo)
const uploaderDom = ref(null)

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
</script>


<style lang='scss' scoped>
.user-info {
  flex: 3;
  margin-right: 0.16rem;
  // width: 40%;
  max-width: 6rem;
  border-radius: 0.2rem;
  padding: 2.5% 0.24rem;
  box-sizing: border-box;
  background: var(--gg-card-bg);
  display: flex;
  align-items: center;


  .user-top {
    width: 100%;
    display: flex;
    align-items: center;


    .avatar {
      width: 1.2rem;
      height: 1.2rem;
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
        width: 0.4rem;
        height: 0.4rem;

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

    .info {
      flex: 1 1 auto;
      margin-left: 0.24rem;
      display: flex;
      flex-direction: column;
      // justify-content: space-between;

      &-top {
        position: relative;
        padding-right: 0.3rem;

        .van-icon {
          position: absolute;
          top: 0;
          right: 0;
          font-size: 0.2rem;
          cursor: pointer;
        }

        .nickname {
          margin-bottom: 0.04rem;
          font-family: 'Venryn Sans';
          font-style: normal;
          font-weight: 900;
          font-size: 0.24rem;
          line-height: 1.4em;
          color: var(--gg-text);

          .icon {
            align-self: flex-end;
            font-size: 0.16rem;
            line-height: 1em;
            color: #ccc;
            cursor: pointer;
          }
        }

        .username {
          font-family: 'PingFang SC';
          font-style: normal;
          font-weight: 400;
          font-size: 0.14rem;
          line-height: 1.5em;
          color: var(--gg-subtitle);
        }
      }

      &-bot {
        margin-top: 0.25rem;


      }
    }
  }




  .level-con {
    display: flex;
    flex-direction: column;

    .item {
      margin-bottom: 0.04rem;
      font-family: 'PingFang SC';
      font-style: normal;
      font-weight: 400;
      font-size: 0.16rem;
      line-height: 1.5em;
      display: flex;
      flex-wrap: wrap;

      &:last-child {
        margin-bottom: 0;
      }

      .title {
        color: var(--gg-subtitle);
      }

      .val {
        color: var(--gg-text);
      }

    }
  }

  .user-bot {
    display: none;
  }
}

@media (max-width:992px) {
  .user-info {
    margin-right: 0;
    margin-bottom: 0.2rem;
    width: 100%;
    max-width: 100%;
  }
}

@media (max-width:749px) {
  .user-info {
    display: none;
    margin-bottom: 0.1rem;
    padding: 0.16rem;
    flex-direction: column;
    align-items: flex-start;
    border-radius: 0.12rem;

    .user-top {
      padding-bottom: 0.16rem;

      .avatar {
        width: 0.64rem;
        height: 0.64rem;

        .upload {
          width: 0.25rem;
          height: 0.25rem;
        }
      }



      .info {
        margin-left: 0.12rem;

        &-top {
          .nickname {
            font-weight: 600;
            margin-bottom: 0.06rem;
            font-size: 0.16rem;
            line-height: 0.22rem;
          }

          .username {
            line-height: 0.16rem;
          }
        }

        &-bot {
          display: none;
        }
      }
    }

    .level-con {
      border-top: 1px dashed var(--gg-line);
      width: 100%;
      padding-top: 0.16rem;

      .item {
        margin-bottom: 0.08rem;
        flex-wrap: nowrap;
        justify-content: space-between;
        line-height: 0.16rem;
      }
    }

    .user-bot {
      display: flex;
    }


  }
}
</style>