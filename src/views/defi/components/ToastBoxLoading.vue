<template>
  <div class="box-loading" v-if="loading">
    <van-loading color="#ffffff" size="0.2rem">{{ text }}</van-loading>
  </div>
</template>
<script setup>
defineProps({
  loading: Boolean,
  text: String,
});
</script>

<style lang="scss" scoped>
.box-loading {
  margin-bottom: 0.2rem;
  color: #fff;
  // background: linear-gradient(180deg, #114b3d 0%, #161f2c 18.97%);
  padding: 0.08rem 0.1rem;
  border-radius: 0.05rem;
  background-color: rgba(0, 0, 0, 0.7);
}
</style>
