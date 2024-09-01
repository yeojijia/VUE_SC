<template>
  <con-scroll>
    <div class="content">
      <keep-alive>
        <component :is="curCom" :show="show" :tab="tab" />
      </keep-alive>
    </div>
  </con-scroll>
</template>
<script setup>
import DigitalRecharge from './components/DigitalRecharge'
import LegalRecharge from './components/LegalRecharge'
import ConScroll from '../ConScroll'
import { ref, getCurrentInstance, computed, markRaw } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
const { proxy } = getCurrentInstance()
const props = defineProps({
  show: Boolean,
  tab: String
})
const coinTypes = ref([
  {
    id: 'digital',
    name: proxy.$t('common.desc58'),
    com: markRaw(DigitalRecharge)
  },
  {
    id: 'legal',
    name: proxy.$t('common.desc59'),
    com: markRaw(LegalRecharge)
  },
])
const coinType = computed({
  get() {
    return store.state.money.coinType
  },
  set(e) {
    store.commit('SET_COIN_TYPE', e)
  }
})

const curCom = computed(() => {
  return coinTypes.value.find(item => item.id === coinType.value).com
})
</script>


<style lang='scss' scoped>
.content {
  position: relative;
}
</style>