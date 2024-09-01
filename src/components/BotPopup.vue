<template>
  <van-popup v-model:show="_show" position="bottom" class="popup-transparent">
    <div class="popup-con">
      <div class="popup-head">
        <div class="title">{{ title }}</div>
        <div class="cross" @click="_show = false">
          <van-icon name="cross" />
        </div>
      </div>
      <div class="popup-body">
        <slot />
      </div>
    </div>

  </van-popup>
</template>
<script setup>
import { computed } from 'vue'
const props = defineProps({
  title: String,
  show: Boolean,
  height: {
    type: String,
    default: '30%'
  }
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
</script>


<style lang='scss' scoped>
.popup-con {
  display: flex;
  flex-direction: column;
  padding: 0 0.15rem;
  border-top-left-radius: 0.2rem;
  border-top-right-radius: 0.2rem;
  background: var(--gg-card-bg);

  .popup-head {
    margin-bottom: 0.1rem;
    height: 0.6rem;
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    position: relative;

    .title {
      width: 100%;
      padding: 0 0.15rem;
      box-sizing: border-box;
      text-align: center;
      font-family: 'PingFang SC';
      font-style: normal;
      font-weight: 400;
      font-size: 0.14rem;
      line-height: 1.5em;
      color: var(--gg-text);
    }

    .cross {
      color: var(--gg-text);
      position: absolute;
      top: 0;
      right: 0;
      height: 0.4rem;
      display: flex;
      align-items: center;

      .van-icon {
        font-size: 0.16rem;
      }
    }
  }

  .popup-body {
    width: 100%;
    min-height: 20vh;
    max-height: 80vh;
    overflow-y: auto;
  }
}
</style>