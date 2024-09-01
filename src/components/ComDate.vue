<template>
  <van-popover class="calendar" v-model:show="_show" :show-arrow="true" :placement="placement"
    :close-on-click-outside="!isMobile">
    <van-datetime-picker :style="{
            width:width
          }" v-if="!isMobile" :class="{isNoMobile:!isMobile}" type="date" v-model="_date" :title="title"
      :min-date="minDate" :max-date="maxDate" @confirm="onConfirm" @change="emit('change')" />
    <template #reference>
      <slot />
    </template>
  </van-popover>
  <template v-if="isMobile">
    <van-popup v-model:show="_show" position="bottom" class="popup-transparent">
      <van-datetime-picker type="date" :class="{isNoMobile:!isMobile}" v-model="_date" :title="title" :min-date="minDate"
        :max-date="maxDate">
        <template #default>
          <div class="popup-head">
            <div class="title">{{ title?title:$t('common.desc130') }}</div>
            <div class="cross" @click="_show = false">
              <van-icon name="cross" />
            </div>
          </div>
        </template>
      </van-datetime-picker>
    </van-popup>

  </template>
</template>
<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex';
const store = useStore()
const isMobile = computed(() => store.state.global.isMobile)
const props = defineProps({
  show: Boolean,
  width: {
    type: String,
    default: '2.8rem'
  },
  placement: {
    type: String,
    default: 'bottom'
  },
  type: {
    type: String,
    default: 'range '
  },
  title: String,
  date: [String, Array, Date, Object]

})
const emit = defineEmits(['confirm', "update:show", "update:date", "change"])

const _show = computed({
  get: () => {
    return props.show;
  },
  set: (e) => {
    emit("update:show", e);
  },
});
const _date = computed({
  get: () => {
    return props.date;
  },
  set: (e) => {
    emit("update:date", e);
  },
});
let minDate = new Date(1900, 1, 1),
  maxDate = new Date()

function onConfirm(values) {
  emit('confirm', values)
}
</script>


<style lang='scss' scoped>
.popup-head {
  width: 100%;
  margin-bottom: 0.1rem;
  height: 0.4rem;
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  position: relative;
  padding: 0 0.15rem;

  .title {
    width: 100%;
    box-sizing: border-box;
    text-align: center;
    font-family: 'PingFang SC';
    font-style: normal;
    font-weight: 400;
    font-size: 0.14rem;
    line-height: 1.5em;
    color: var(--gg-text);
  }

  .cross {
    color: var(--nav-btn-text);
    position: absolute;
    top: 0;
    right: 0.15rem;
    height: 0.4rem;
    display: flex;
    align-items: center;

    .van-icon {
      font-size: 0.16rem;
    }
  }
}
</style>