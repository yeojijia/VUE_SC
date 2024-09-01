<template>
  <img class="code-img" :src="captcha.url" @click="handleGetCode" />
</template>
<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { _getCode } from '@/utils/api/common'
const store = useStore()
const captcha = computed(() => store.state.user.captcha)
function handleGetCode() {
  store.dispatch('getCode')
}
</script>


<style lang='scss' scoped>
.code-img {
  width: 0.6rem;
  cursor: pointer;
}
</style>