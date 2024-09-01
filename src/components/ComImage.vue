<template>
  <div class="my-image">
    <van-image class="image" :fit="fit" :src="src">
      <template #loading>
        <img class="error" :src="require(`../assets/images/common/${theme}/img_error.svg`)" />
      </template>
      <template #error>
        <img class="error" :src="require(`../assets/images/common/${theme}/img_error.svg`)" />
      </template>
    </van-image>
  </div>
</template>
<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
defineProps({
  src: String,
  fit: {
    type: String,
    default: 'cover'
  }
})
let theme = computed(() => store.state.global.theme)

</script>

<style lang="scss" scoped>
.my-image {
  position: relative;

  // width: 100%;
  // height: 100%;
  .image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}

:deep {

  .van-image__error,
  .van-image__loading {
    background: var(--default-bg);

    img {
      width: 100%;
    }


  }
}
</style>
