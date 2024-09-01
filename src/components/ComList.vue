<template>
  <van-list v-model:loading="_loading" class="list" :offset="10" :finished="finished" :finished-text="$t('common.desc55')"
    :loading-text="$t('common.desc56')" @load="emit('load')">
    <slot />
  </van-list>
</template>
<script setup>
import { computed } from "vue";

const props = defineProps({
  loading: Boolean,
  finished: Boolean,
});

const emit = defineEmits(["update:loading", "load"]);

const _loading = computed({
  get() {
    return props.loading;
  },
  set(e) {
    emit("update:loading", e);
  },
});
</script>

<style lang="scss" scoped>
.list {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  overflow-y: scroll;

  :deep {
    .van-list__finished-text {
      margin-bottom: 0.2rem;
    }
  }
}
</style>
