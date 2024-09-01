<template>
  <con-scroll>
    <keep-alive>
      <component :is="curCom" :list="list" :loading="isLoading" @saveAdd="handleSaveAdd" @updateList="getList"
        @tab="handleTab" />
    </keep-alive>
  </con-scroll>
</template>
<script setup>
import CollectionList from './components/CollectionList'
import CollectionAdd from './components/CollectionAdd'
import ConScroll from '../ConScroll'
import { ref, getCurrentInstance, onMounted, markRaw, watch } from 'vue'
import { _withDrawAddressList } from '@/utils/api/money'
const { proxy } = getCurrentInstance()
const props = defineProps({
  show: Boolean,
  tab: String
})

const tabActive = ref(1)
const curCom = ref(markRaw(CollectionList))
function handleTab(tab) {
  tabActive.value = tab
  if (tab === 1) {
    curCom.value = markRaw(CollectionList)
  } else {
    curCom.value = markRaw(CollectionAdd)
  }
}
function handleSaveAdd() {
  handleTab(1)
  getList()
}

const list = ref([])
const isLoading = ref(false)
function getList() {
  if (isLoading.value) return
  isLoading.value = true
  _withDrawAddressList({}).then(res => {
    list.value = res
  }).finally(() => {
    isLoading.value = false
  })
}
onMounted(() => {
  getList()
})

</script>


<style lang='scss' scoped></style>