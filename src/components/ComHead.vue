<template>
  <div class="com-head">
    <div class="back" @click="emit('back')"> <van-icon name="arrow-left" /></div>
    <div class="title">{{title}}</div>
  </div>
</template>
<script setup>
defineProps({
  title: String
})
const emit = defineEmits('back')
</script>


<style lang='scss' scoped>
.com-head {
  width: 100%;
  padding: 0 0.15rem;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  height: 0.44rem;
  background: var(--gg-head-bg);

  .back {
    height: 100%;
    font-size: 0.16rem;
    color: var(--gg-text);
    display: flex;
    align-items: center;
  }

  .title {
    padding-right: 0.16rem;
    flex: 1 1 auto;
    text-align: center;
    font-family: 'PingFang SC';
    font-style: normal;
    font-weight: 400;
    font-size: 0.14rem;
    line-height: 1.5em;
    color: var(--gg-text);
  }

}
</style>