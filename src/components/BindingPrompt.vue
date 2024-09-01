<template>
  <van-popup :overlay="true" close-on-click-overlay v-model:show="_show" class="popup-transparent">
    <div class="popup-con">
      <div class="scroll">

        <img src="../assets/images/common/icon_fail.svg" />
        <p>{{$t('user.desc35')}}</p>
        <div class="btn" @click="handleConfirm">
          {{$t('user.desc36')}}
        </div>
      </div>
    </div>
  </van-popup>
</template>
<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex';
const store = useStore()
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

function handleConfirm() {
  _show.value = false
  store.dispatch('setSettingFormShow', {
    show: true,
    type: "google"
  })
}

</script>


<style lang='scss' scoped>
.popup-con {
  width: 3.8rem;
  min-height: 2.8rem;
  max-height: 50vh;
  overflow: hidden;
  padding: 0.24rem;
  box-sizing: border-box;
  background: var(--gg-card-bg);
  border-radius: 0.2rem;

  .scroll {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    overflow-y: auto;
  }

  img {
    width: 0.6rem;
  }

  p {
    margin-top: 0.16rem;
    padding: 0 0.3rem;
    font-family: 'PingFang SC';
    font-style: normal;
    font-weight: 400;
    font-size: 0.18rem;
    line-height: 1.4em;
    text-align: center;
    color: var(--gg-text);
    box-sizing: border-box;
  }

  .btn {
    flex: 0 0 auto;
    cursor: pointer;
    margin-top: 0.36rem;
    width: 100%;
    height: 0.44rem;
    border-radius: 0.1rem;
    font-style: normal;
    font-weight: 400;
    font-size: 0.16rem;
    line-height: 1.4em;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--gg-btn-bg);
    border: 1px solid var(--gg-btn-border);
    color: var(--gg-btn-color);
  }

}



@media (max-width: 749px) {
  .popup-con {
    width: 90vw;
    border-radius: 0.2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;

    img {
      width: 0.5rem;
    }

    p {
      font-size: 0.16rem;
    }

    .btn {
      height: 0.4rem;
      font-size: 0.14rem;
    }


  }
}
</style>