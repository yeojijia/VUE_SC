<template>
  <van-button class="van-btn" :loading="loading" :loading-text="loadingText" :disabled="disabled">
    <slot />
  </van-button>
</template>
<script setup>
defineProps({
  loading: Boolean,
  disabled: {
    type: Boolean,
    default: false,
  },
  loadingText: {
    type: String,
    default: "loading...",
  },
});
</script>

<style lang="scss" scoped>
.van-btn {
  // width: 100%;
  // height: 100%;
  // position: absolute;
  // top: 0;
  // left: 0;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  background-color: transparent;
}
</style>
