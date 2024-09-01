<template>
  <update-fun v-if="info.isSetFundPassword" />
  <bind-fun v-else />
</template>
<script setup>
import BindFun from './components/BindFun'
import UpdateFun from './components/UpdateFun'
import { computed } from 'vue'
import { useStore } from 'vuex';
const store = useStore()
const info = computed(() => {
  return store.state.user.userInfo
})
</script>


<style lang='scss' scoped>

</style>