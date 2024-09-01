<template>
  <div class="loading-nodata">
    <div class="loading" v-show="loading">
      <van-loading :size="`${size/3}rem`" />
      <p>{{ loadingText?loadingText:$t('common.desc56') }}</p>
    </div>
    <div class="nodata" v-show="nodata&&!loading">
      <img :src="require(`../assets/images/common/${theme}/nodata.png`)" :style="{
                width:`${size}rem`
              }" />
      <p>{{ nodataText?nodataText:$t('common.desc76') }}</p>
    </div>
  </div>
</template>
<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
const theme = computed(() => store.state.global.theme)
defineProps({
  loading: Boolean,
  loadingText: String,
  nodata: Boolean,
  nodataText: String,
  size: {
    type: Number,
    default: 1.2
  }
})
</script>


<style lang='scss' scoped>
.loading-nodata {
  margin: auto;
}

.loading {
  padding: 0.4rem 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.nodata {
  padding: 0.4rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 2.2rem;
    max-width: 50%;
  }

}

p {
  margin-top: 0.06rem;
  max-width: 80%;
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 400;
  font-size: 0.16rem;
  line-height: 1.4em;
  text-align: center;
  color: var(--gg-subtitle);
}
</style>