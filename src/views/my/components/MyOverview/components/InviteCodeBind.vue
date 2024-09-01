<template>
  <van-popup v-model:show="_show" class="popup-transparent">
    <div class="popup-con">
      <div class="con-top">
        <div class="title">{{$t('invite.desc68')}}</div>
        <div class="cross" @click="_show = false">
          <van-icon name="cross" />
        </div>
      </div>
      <div class="con-form">
        <div class="inp-con">
          <input class="inp" type="text" :placeholder="$t('user.desc19')" v-model="inviteCode" />

        </div>
        <p class="tips">{{$t('invite.desc69')}}</p>
        <div class="sub-btn" @click="handleConfirm">{{$t('common.desc109')}}</div>
      </div>
    </div>
  </van-popup>
</template>
<script setup>
import { ref, computed, getCurrentInstance, onMounted } from 'vue'
import { useStore } from 'vuex';
import { _inviteCodeAdd } from '@/utils/api/invite'
const store = useStore()
const { proxy } = getCurrentInstance()
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
const inviteCode = ref('')
function handleConfirm() {
  if (!inviteCode.value) {
    spop({
      template: proxy.$t('user.desc19'),
      style: 'warning',
      autoclose: 2000
    })
    return
  }
  _inviteCodeAdd({
    inviteCode: inviteCode.value
  }).then(res => {
    if (res) {
      spop({
        template: proxy.$t('user.desc53'),
        style: 'success',
        autoclose: 2000
      })
      store.dispatch('getUserInviteInfo')
      _show.value = false
    }
  })
}
</script>


<style lang='scss' scoped>
.popup-con {
  width: 5.3rem;
  background: linear-gradient(180deg, #342D6A 0%, #22242D 18.97%);
  box-shadow: 0 0.04rem 0.04rem rgba(0, 0, 0, 0.25);
  border-radius: 0.16rem;
  overflow: hidden;
  padding: 0.24rem 0.2rem 0.3rem;
  box-sizing: border-box;

  .con-top {
    margin-bottom: 0.3rem;
    display: flex;
    justify-content: space-between;
    padding: 0 0.04rem;
    box-sizing: border-box;

    .title {
      font-family: 'PingFang SC';
      font-style: normal;
      font-weight: 400;
      font-size: 0.24rem;
      line-height: 1.5em;
      color: #FFFFFF;
    }

    .cross {
      color: var(--nav-btn-text);
      width: 0.32rem;
      height: 0.32rem;
      display: flex;
      justify-content: center;
      align-items: center;
      // transform: translateX(50%);
      cursor: pointer;

      .van-icon {
        font-size: 0.18rem;
      }
    }
  }

  .inp-con {
    margin-top: 0.12rem;
    height: 0.54rem;
    border: 1.5px solid #5C5D68;
    border-radius: 0.12rem;
    display: flex;
    align-items: center;
    padding: 0 0.2rem;
    box-sizing: border-box;
    font-family: 'PingFang SC';
    font-style: normal;
    font-weight: 400;
    font-size: 0.14rem;
    color: rgba(244, 246, 248, 0.605672);



    .name {
      flex: 0 0 auto;
    }

    input {
      width: 0;
      height: 100%;
      flex: 1 1 auto;

      &::placeholder {
        color: rgba(244, 246, 248, 0.605672);
      }
    }

    .time {
      margin-left: 0.1rem;
      font-family: 'PingFang SC';
      font-style: normal;
      font-weight: 400;
      font-size: 0.14rem;
      line-height: 1.4em;
      color: #F4F6F8;

      span {
        min-width: 0.7rem;
        height: 0.3rem;
        white-space: nowrap;
        background: rgba(142, 102, 251, 0.25);
        border-radius: 0.06rem;
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
        color: #8E66FB;
      }

      :deep {
        .van-count-down {
          color: #fff;
        }
      }
    }
  }

  .con-form {
    padding: 0 0.4rem;
    box-sizing: border-box;

    .tips {
      margin-top: 0.12rem;
      font-family: 'PingFang SC';
      font-style: normal;
      font-weight: 400;
      font-size: 0.12rem;
      line-height: 0.14rem;
      color: #CCD1E7;
      text-align: center;
    }

    .sub-btn {
      margin-top: 0.38rem;
      width: 100%;
      height: 0.44rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background: conic-gradient(from 0deg at 50% 50%, #591FBF 0deg, #744BE7 0.01deg, #591FBF 360deg, #744BE7 360.01deg);
      border-radius: 0.06rem;
      font-family: 'PingFang SC';
      font-style: normal;
      font-weight: 400;
      font-size: 0.16rem;
      color: #FFFFFF;
      cursor: pointer;
    }
  }

}



@media (max-width: 749px) {
  .popup-con {
    width: 100vw;
    height: 100vh;
    border-radius: 0;

    .con-top {
      margin-bottom: 0.15rem;

      .title {
        font-size: 0.2rem;
      }
    }

    .con-form {
      padding: 0;

      .inp-con {
        height: 0.44rem;
      }

      .sub-btn {
        height: 0.4rem;
        font-size: 0.14rem;
      }
    }


  }
}
</style>