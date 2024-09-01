<template>
  <van-popup v-model:show="_show" :position="isMobile?'bottom':'right'" class="popup-transparent">
    <div class="popup-con">
      <div class="con-top">
        <div class="title">{{info.title}}</div>
        <div class="cross" @click="_show = false">
          <van-icon name="cross" />
        </div>
      </div>
      <div class="con-desc">
        <div class="scroll" v-html="info.content">
        </div>
      </div>
    </div>
  </van-popup>
</template>
<script setup>
import { ref, computed, watch } from 'vue'
import { _articlesDetail } from '@/utils/api/common'
import { useStore } from 'vuex';
const store = useStore()
const isMobile = computed(() => store.state.global.isMobile)
const props = defineProps({
  show: Boolean
})

const emit = defineEmits(["update:show"])
const _show = computed({
  get: () => {
    return props.show;
  },
  set: (e) => {
    emit("update:show", e);
  },
});
watch(() => _show.value, (e) => {
  if (e) {
    getRule()
  }
})

const info = ref(null)
function getRule() {
  _articlesDetail(40).then(res => {
    info.value = res
  })
}

</script>


<style lang='scss' scoped>
.popup-con {
  width: 5rem;
  height: 100vh;
  background: var(--gg-card-bg);
  overflow: hidden;
  padding: 0.24rem 0.4rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  .con-top {
    flex: 0 0 auto;
    margin-bottom: 0.2rem;
    display: flex;
    justify-content: space-between;
    padding: 0.24rem 0;
    box-sizing: border-box;
    border-bottom: 1px solid;
    border-color: var(--gg-line);

    .title {
      font-family: 'Venryn Sans';
      font-weight: 900;
      text-transform: uppercase;
      font-size: 0.2rem;
      line-height: 1.4em;
      color: var(--gg-text);
    }

    .cross {
      cursor: pointer;

      .van-icon {
        font-size: 0.16rem;
        line-height: 0.28rem;
        color: var(--gg-text);
      }
    }
  }

  .con-desc {
    flex: 1 1 auto;
    position: relative;
  }

  .scroll {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow-y: auto;

  }

  .con-desc {
    font-family: 'PingFang SC';
    font-style: normal;
    line-height: 1.5em;

    :deep {
      h3 {
        margin-top: 0.15rem;
        margin-bottom: 0.1rem;
        font-size: 0.16rem;
        line-height: 1.5em;
        font-weight: 500;
        color: var(--gg-text);
      }

      p {
        margin-bottom: 0.1rem;
        font-family: 'PingFang SC';
        font-style: normal;
        font-weight: 400;
        font-size: 0.14rem;
        line-height: 1.5em;
        color: var(--gg-subtitle);
      }
    }
  }


}



@media (max-width: 749px) {
  .popup-con {
    width: 100vw;
    height: 90vh;
    border-radius: 0.2rem 0.2rem 0 0;
    padding: 0.24rem 0.28rem;

    .con-top {
      padding: 0 0 0.2rem;
      margin-bottom: 0.1rem;

      .title {
        font-size: 0.18rem;
        line-height: 0.25rem;
      }
    }



  }
}
</style>