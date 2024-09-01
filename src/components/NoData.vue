<template>
  <div class="nodata">
    <img :src="require(`../assets/images/common/${theme}/nodata.png`)" />
    <p>{{ text?text:$t('common.desc76') }}</p>
  </div>
</template>
<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
const theme = computed(() => store.state.global.theme)
defineProps({
  text: String
});
</script>

<style lang="scss" scoped>
.nodata {
  width: 100%;
  padding: 0.4rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    margin-bottom: 0.12rem;
    width: 2.2rem;
    max-width: 50%;
  }

  p {
    max-width: 80%;
    font-family: 'PingFang SC';
    font-style: normal;
    font-weight: 400;
    font-size: 0.14rem;
    line-height: 1.5em;
    text-align: center;
    color: var(--gg-subtitle);
  }

}
</style>
