<template>
  <update-phone />
  <!-- <bind-phone v-else /> -->
</template>
<script setup>
import BindPhone from './components/BindPhone'
import UpdatePhone from './components/UpdatePhone'
import { ref, computed, getCurrentInstance } from 'vue'
import { useStore } from 'vuex';
const store = useStore()
const info = computed(() => {
  return store.state.user.userInfo
})
</script>


<style lang='scss' scoped>

</style>