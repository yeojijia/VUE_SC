<template>
  <van-popover class="calendar" v-model:show="_show" :show-arrow="true" :placement="placement"
    :close-on-click-outside="!isMobile">
    <van-calendar v-if="!isMobile" :class="{isNoMobile:!isMobile}" :row-height="50" v-model:show="_show" type="range"
      :show-title="false" :poppable="isMobile" color="#41d662" :min-date="minDate" :max-date="maxDate"
      @confirm="onConfirm" />
    <template #reference>
      <slot />
    </template>
  </van-popover>
  <template v-if="isMobile">
    <van-calendar :class="{isNoMobile:!isMobile}" :row-height="50" v-model:show="_show" type="range" :show-title="false"
      :poppable="isMobile" color="#41d662" :min-date="minDate" :max-date="maxDate" @confirm="onConfirm" />

  </template>
</template>
<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex';
const store = useStore()
const isMobile = computed(() => store.state.global.isMobile)
const props = defineProps({
  minDate: [String, Date],
  maxDate: [String, Date],
  show: Boolean,
  placement: {
    type: String,
    default: 'bottom'
  },
  type: {
    type: String,
    default: 'range '
  }
})
const emit = defineEmits(['confirm', "update:show"])

const _show = computed({
  get: () => {
    return props.show;
  },
  set: (e) => {
    emit("update:show", e);
  },
});


function onConfirm(values) {
  emit('confirm', values)
}
</script>


<style lang='scss' scoped></style>