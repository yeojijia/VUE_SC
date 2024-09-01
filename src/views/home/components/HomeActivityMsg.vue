<template>
  <div class="home-activity-msg">
    <van-notice-bar :left-icon="require(`../../../assets/images/common/${theme}/icon_notice.svg`)">
      <!-- <img class="icon" slot="left-icon" :src="require(`../../../assets/images/common/${theme}/icon_notice.svg`)" /> -->

      <!-- {{ text }} -->
      <div class="text-con" v-html="text" />
    </van-notice-bar>
  </div>
</template>
<script setup>
import { ref, getCurrentInstance, onMounted, computed } from 'vue'
import { useStore } from 'vuex'
const { proxy } = getCurrentInstance()
const store = useStore()
const theme = computed(() => store.state.global.theme)
const turntableRecord = computed(() => store.state.global.turntableRecord)
const text = computed(() => {
  if (turntableRecord.value.length === 0) {
    return ''
  }
  return turntableRecord.value.reduce((prev, cur) => {
    return prev + `<i>${proxy.$t('award.desc20', { n1: cur.userName, n2: cur.amount })}</i>`
  }, '')
})
onMounted(() => {
  store.dispatch('getTurntable')
})
</script>


<style lang='scss' scoped>
.home-activity-msg {
  position: relative;
  z-index: 2;

  .icon {
    width: 0.2rem;
    height: 0.2rem;
    flex: 0 0 auto;
  }

  .text-con {
    color: var(--gg-text);
    font-size: 0.14rem;
    line-height: 1.5em;

    :deep {
      i {
        border-right: 1px solid var(--gg-notice-border);
        padding-right: 0.2rem;
        margin-right: 0.2rem;
        font-style: normal;

        &:last-child {
          border-right: none;
          padding-right: 0;
          margin-right: 0;
        }
      }

      .text {
        color: var(--theme);
      }
    }
  }

  :deep {
    .van-notice-bar {
      height: 0.48rem;
      border-bottom-left-radius: 0.12rem;
      border-bottom-right-radius: 0.12rem;
      background: var(--gg-notice-bg);
      padding: 0 0.16rem;

    }

    .van-notice-bar__left-icon {
      color: #fff;
    }

    .van-notice-bar__content.van-ellipsis {
      height: 100%;
    }


  }

}

@media (max-width: 749px) {
  .home-activity-msg {
    .text-con {
      font-size: 0.12rem;
    }

    :deep {
      .van-notice-bar {
        height: 0.36rem;
        padding: 0 0.12rem;
        border-bottom-left-radius: 0.08rem;
        border-bottom-right-radius: 0.08rem;
      }
    }
  }
}
</style>