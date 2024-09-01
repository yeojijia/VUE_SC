<template>
  <div class="laundry">
    <div class="info-earnings">
      <laundry-info :info="info" />
      <laundry-earnings :info="info" @draw="handleDrawClick" />
    </div>
    <laundry-explain />
    <laundry-list :list="info.recordList" />
  </div>
</template>
<script setup>
import LaundryInfo from './components/LaundryInfo'
import LaundryEarnings from './components/LaundryEarnings'
import LaundryExplain from './components/LaundryExplain'
import LaundryList from './components/LaundryList'
import { _washInfo, _backwaterDraw } from '@/utils/api/invite'
import { ref, onMounted, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()

const info = ref({})
function getWashInfo() {
  _washInfo().then(res => {
    info.value = res
  })
}
function handleDrawClick(amount) {
  _backwaterDraw(
    { amount }
  ).then(res => {
    if (res === 'success') {
      getWashInfo()
      spop({
        template: proxy.$t('common.desc107'),
        style: 'success',
        autoclose: 2000
      })
    }
  })
}
onMounted(() => {
  getWashInfo()
})
</script>


<style lang='scss' scoped>
.laundry {
  width: 100%;

  .info-earnings {
    width: 100%;
    display: flex;
    justify-content: space-between;

  }
}

@media (max-width:992px) {
  .laundry {
    height: 100%;
    padding-bottom: 0.4rem;
    overflow-y: auto;

    .info-earnings {
      flex-direction: column;
    }
  }
}
</style>