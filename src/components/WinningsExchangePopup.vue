<template>
  <van-popup v-model:show="_show" :position="isMobile?'bottom':'right'" class="popup-transparent">
    <div class="popup-con">
      <div class="con-top">
        <div class="title">{{$t('my.desc109')}}</div>
        <div class="cross" @click="_show = false">
          <van-icon name="cross" />
        </div>
      </div>
      <div class="content">
        <div class="inp-con">
          <input type="text" :placeholder="$t('my.desc115')" v-model="code">
        </div>
        <div class="btn" @click="handleConfirm">{{$t('my.desc114')}}</div>
      </div>
    </div>
  </van-popup>
</template>
<script setup>
import { _exchangeWinnings } from '@/utils/api/common'
import { ref, computed, getCurrentInstance } from 'vue'
import { useStore } from 'vuex';
const store = useStore()
const isMobile = computed(() => store.state.global.isMobile)
const { proxy } = getCurrentInstance()
const props = defineProps({
  show: Boolean,
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
const code = ref('')
function handleConfirm() {
  if (code.value === '') {
    spop({
      template: proxy.$t('my.desc115'),
      style: 'warning',
      autoclose: 2000
    })
    return
  }
  let loadingToast = proxy.$toast.loading({
    duration: 0,
    forbidClick: true,
  });
  _exchangeWinnings({
    code: code.value
  }).then(() => {
    spop({
      template: proxy.$t('my.desc116'),
      style: 'success',
      autoclose: 2000
    })
  }).finally(() => {
    loadingToast.clear()
  })
}

</script>


<style lang='scss' scoped>
.popup-con {
  width: 4.4rem;
  height: 100vh;
  background: var(--gg-card-bg);
  overflow: hidden;
  padding: 0.24rem 0.4rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  .con-top {
    flex: 0 0 auto;
    margin-bottom: 0.32rem;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    border-bottom: 1px solid var(--gg-line);
    padding: 0.24rem 0;

    .title {
      font-family: 'Venryn Sans';
      font-style: normal;
      font-weight: 900;
      font-size: 0.2rem;
      line-height: 1.5em;
      color: var(--gg-text);
    }

    .cross {
      color: var(--gg-text);
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

  .content {
    height: 0;
    flex: 1;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .inp-con {
      height: 0.52rem;
      display: flex;
      justify-content: space-between;
      background: var(--gg-inp-bg);
      box-shadow: var(--gg-inp-shadow);
      border-radius: 0.12rem;
      font-size: 0.14rem;

      input {
        padding: 0 0.16rem;
        box-sizing: border-box;
        width: 0;
        flex: 1;
        height: 100%;
        color: var(--gg-text);
        font-size: 0.16rem;

        &::placeholder {
          color: var(--gg-inp-plac);
        }
      }
    }


    .btn {
      margin-top: 0.32rem;
      margin-bottom: 10vh;
      width: 100%;
      height: 0.52rem;
      background: var(--gg-btn-bg);
      border: 1px solid var(--gg-btn-border);
      color: var(--gg-btn-color);
      border-radius: 0.12rem;
      font-weight: 500;
      font-size: 0.16rem;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }
  }
}



@media (max-width: 749px) {
  .popup-con {
    width: 100vw;
    height: 40vh;
    padding: 0.16rem 0.2rem;
    border-radius: 0.2rem 0.2rem 0 0;

    .con-top {
      margin-bottom: 0.2rem;
      padding: 0;
      border-bottom: none;

      .title {
        font-size: 0.18rem;
        line-height: 0.25rem;
      }

      .cross {
        height: auto;
      }
    }

    .content {
      justify-content: start;

      .inp-con {
        height: 0.44rem;
        border-radius: 0.08rem;
      }

      .btn {
        margin-bottom: 0.2rem;
        height: 0.44rem;
        margin-top: 0.2rem;
        border-radius: 0.08rem;
        font-size: 0.14rem;
      }
    }




  }
}
</style>