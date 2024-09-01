<template>
  <bind-google :googleInfo="googleInfo" v-if="isBind" />
  <update-google v-else />
</template>
<script setup>
import BindGoogle from './components/BindGoogle'
import UpdateGoogle from './components/UpdateGoogle'
import { _googleQr, _googleBind } from '@/utils/api/user'
import { ref, computed, watch } from 'vue'
import { useStore } from 'vuex';
const store = useStore()
const info = computed(() => {
  return store.state.user.userInfo
})
const isBind = ref(true)
watch(() => info.value.googleSecret, (e) => {
  if (e) {
    isBind.value = false
  }
  if (e === '') {
    getGoogleQr()
  }
}, {
  immediate: true
})
const googleInfo = ref({})
function getGoogleQr() {
  _googleQr().then(res => {
    googleInfo.value = res
  })
}
function handleReset(info) {
  googleInfo.value = info
  isBind.value = true
}
</script>


<style lang='scss' scoped>

</style>