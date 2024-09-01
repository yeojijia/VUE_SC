<template>
  <update-email v-if="info.email" />
  <bind-email v-else />
</template>
<script setup>
import BindEmail from './components/BindEmail'
import UpdateEmail from './components/UpdateEmail'
import { ref, computed, getCurrentInstance } from 'vue'
import { useStore } from 'vuex';
const store = useStore()
const info = computed(() => {
  return store.state.user.userInfo
})
</script>


<style lang='scss' scoped>

</style>