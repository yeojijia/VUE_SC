<template>
  <img class="nav-show-btn" :src="require(`../../../assets/images/common/${theme}/nav_btn.svg`)"
    @click="store.commit('SET_NAV_UNFOLD')" />
</template>
<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
let theme = computed(() => store.state.global.theme)

</script>


<style lang='scss' scoped>
.nav-show-btn {
  width: 0.36rem;
  height: 0.36rem;
  object-fit: cover;
  z-index: 3;
  cursor: pointer;
}
</style>