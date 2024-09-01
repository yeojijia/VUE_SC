<template>
  <van-popup v-model:show="_show" class="popup-transparent ">
    <van-loading :size="`0.72rem`" v-if="isLoading" />
    <component :is="curCom" @hide="_show = false" v-model:ribbon="ribbonShow" :show="_show" :info="info"
      :winnings="winnings" @succ="getTurntableInfo" @change="handleComChange" @toActivity="handleToActivity" v-else />
    <!-- <roulette /> -->
  </van-popup>

  <img class="ribbon" src="../../assets/images/award/ribbon.gif" v-show="ribbonShow" />
</template>
<script setup>
import Roulette from './components/Roulette'
import DeawRecord from './components/DeawRecord'
import TimesRecord from './components/TimesRecord'
import { ref, computed, markRaw, watch } from "vue";
import { _turntableInfo, _turntableRecordAll } from '@/utils/api/user'
import { useRouter } from "vue-router";
const router = useRouter()
const props = defineProps({
  show: Boolean,
});
const emit = defineEmits(["update:show", "confirm"]);
const _show = computed({
  get: () => {
    return props.show;
  },
  set: (e) => {
    emit("update:show", e);
  },
});
let curComType = ref('Roulette')
const curCom = computed(() => {
  switch (curComType.value) {
    case 'Roulette':
      return markRaw(Roulette)
    case 'DeawRecord':
      return markRaw(DeawRecord)
    case 'TimesRecord':
      return markRaw(TimesRecord)
  }
})
const ribbonShow = ref(false)
let isLoading = ref(false)
watch(() => props.show, (e) => {
  if (e) {
    if (isLoading.value) return
    isLoading.value = true
    getTurntableInfo()
  }
}, {
  immediate: true
})
const info = ref({})
const winnings = ref([])
function getTurntableInfo() {
  // if (info.value && Object.keys(info.value).length) {
  //   return
  // }
  _turntableInfo().then(res => {
    info.value = res
  }).catch(() => {
    _show.value = false
  }).finally(() => {
    isLoading.value = false
  })

  _turntableRecordAll().then(res => {
    winnings.value = res
  })

}
function handleComChange(type) {
  curComType.value = type
}

function handleToActivity() {
  _show.value = false
  router.push('activity?id=4')
}
</script>

<style lang="scss" scoped>
.ribbon {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 100%;
  height: 100%;
  z-index: 100000;
}
</style>

