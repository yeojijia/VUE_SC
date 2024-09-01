<template>
  <page-scroll v-if="isRouterAlive">
    <router-view v-slot="{ Component }">
      <KeepAlive>
        <component :is="Component" />
      </KeepAlive>
    </router-view>
  </page-scroll>
</template>
<script setup>
import PageScroll from './components/PageScroll'
import { ref, computed, provide, nextTick, onMounted, watch } from "vue";
import { useStore } from 'vuex'
const store = useStore()
let isRouterAlive = ref(true)
function reload() {
  isRouterAlive.value = false
  nextTick(function () {
    isRouterAlive.value = true
  })
}
const logoInfo = computed(() => {
  return store.state.global.logoInfo
})
const titleImg = computed(() => {
  return logoInfo.value.site_ico
})
watch(() => {
  return {
    logoInfo: store.state.global.logoInfo,
  }
}, ({ logoInfo }) => {
  let link = document.querySelector("link[rel*='icon']") || document.createElement('link')
    link.type = 'image/x-icon'
    link.rel = 'shortcut icon'
    link.href = logoInfo.site_ico
    document.getElementsByTagName('head')[0].appendChild(link)
    document.title = logoInfo.site_name || 'Global Game' + ': 加密赌场游戏和 赌场老虎机游戏 - 加密博彩'
},
  { immediate: true }
)


provide('reload', reload)
onMounted(() => {
  store.dispatch('getlogoInfo')
  store.dispatch('getServiceUrl')
})

</script>
<style lang="scss">
#app {
  width: 100%;
  height: 100%;
}
</style>
