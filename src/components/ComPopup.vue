<template>
  <van-popup v-model:show="_show" :position="isMobile?'bottom':'right'" class="popup-transparent common-popup">
    <div class="common-container">
      <div class="common-top">
        <div class="title wrap">
          {{ title ? title : "" }}
          <slot name="title" />
        </div>
        <van-icon name="cross" class="close" @click="_show = false" />
      </div>
      <div class="top" v-if="top">
        <slot name="top" />
      </div>
      <div class="scroll">
        <slot />
      </div>
      <div class="bot">
        <slot name="bot" />
      </div>
    </div>
  </van-popup>
</template>
<script setup>
import { computed } from "vue";
import { useStore } from 'vuex';
const store = useStore()
const isMobile = computed(() => store.state.global.isMobile)
const props = defineProps({
  show: Boolean,
  title: String,
  top: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:show"]);
const _show = computed({
  get: () => {
    return props.show;
  },
  set: (e) => {
    emit("update:show", e);
  },
});
</script>

<style lang="scss" scoped>
.common-container {
  padding: 0.24rem 0.4rem;
  box-sizing: border-box;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  color: var(--gg-text);
  background: var(--gg-card-bg);

  .common-top {
    flex: 0 0 auto;
    width: 100%;
    margin-bottom: 0.2rem;
    padding-bottom: 0.24rem;
    box-sizing: border-box;
    position: relative;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid var(--gg-line);

    .title {
      margin-right: 0.2rem;
      width: 0;
      flex: 1;
      font-family: 'Venryn Sans';
      font-weight: 900;
      text-align: left;
      font-size: 0.2rem;
      line-height: 0.28rem;
      color: var(--gg-text);
      text-transform: uppercase
    }

    .close {
      cursor: pointer;

      &.van-icon {
        font-size: 0.16rem;
        line-height: 0.28rem;
        color: var(--gg-text);
      }
    }
  }

  .scroll {
    box-sizing: border-box;
    flex: 1 1 auto;
    overflow-y: auto;
    overflow-x: hidden;
  }


}

@media only screen and (min-width: 320px) and (max-width: 750px) {
  .common-container {
    padding: 0.2rem;
    height: auto;
    border-radius: 0.2rem 0.2rem 0 0;

    .common-top {
      padding-bottom: 0.16rem;

      .title {
        font-size: 0.18rem;
        line-height: 0.26rem;
      }

      .close.van-icon {
        font-size: 0.16rem;
      }
    }
  }
}
</style>