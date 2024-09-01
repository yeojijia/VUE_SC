<template>
  <div class="asset">
    <div class="tabs-con">
      <van-tabs v-model:active="tabActive" shrink swipe-threshold v-if="tabs.length">
        <van-tab v-for="item of tabs" :key="item.id" :name="item.id">
          <template #title>
            {{item.title}}
          </template>
        </van-tab>
      </van-tabs>
      <!-- <div class="tabs-srcoll">
            <div class="tabs">
              <div class="item" :class="{on:tabActive===item.id}" v-for="item of tabs" :key="item.id"
                @click="tabActive=item.id">
                {{item.title}}</div>
            </div>
          </div> -->
    </div>
    <component :is="curCom" />
  </div>
</template>
<script setup>
import Digital from './components/Digital';
import Legal from './components/Legal'
import Platform from './components/Platform'
import { ref, getCurrentInstance, computed, markRaw } from 'vue'
import { _asset } from '@/utils/api/money'
const { proxy } = getCurrentInstance()

const tabs = ref([
  {
    id: 1,
    title: proxy.$t('my.desc17'),
    com: markRaw(Digital)
  },
  {
    id: 2,
    title: proxy.$t('my.desc18'),
    com: markRaw(Legal)
  },
  {
    id: 3,
    title: proxy.$t('my.desc19'),
    com: markRaw(Platform)
  }
])
const tabActive = ref(1)

const curCom = computed(() => {
  return tabs.value.find(item => item.id === tabActive.value).com
})



</script>


<style lang='scss' scoped>
.asset {
  flex: 1 1 auto;
  border-radius: 0.2rem;
  padding: 0.2rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  background: var(--gg-card-bg);

  .tabs-con {
    width: 100%;

    :deep {
      .van-tabs__line {
        display: none;
      }

      .van-tabs__wrap {
        height: auto;
      }

      .van-tabs__nav {
        padding: 0;
        background: transparent;
        border-radius: 0;
        box-sizing: border-box;
        overflow: hidden;

      }

      .van-tab {
        color: var(--btn-text-3);
        padding: 0 0.06rem;

        &:first-child {
          padding-left: 0;
        }

        .van-tab__text {
          height: 0.36rem;
          border-radius: 0.08rem;
          padding: 0 0.12rem;
          font-family: 'PingFang SC';
          font-style: normal;
          font-weight: 400;
          font-size: 0.14rem;
          color: var(--gg-btn-text);
          border: 1px solid transparent;
          background: transparent;
          box-sizing: border-box;
          display: flex;
          align-items: center;

        }
      }

      .van-tab--active {
        .van-tab__text {
          font-weight: 600;
          background: var(--gg-btn-bg-common);
          border-color: var(--gg-btn-border-common);
          color: var(--gg-btn-color-common);

        }
      }
    }
  }
}



@media (max-width:749px) {
  .asset {
    padding: 0.12rem 0.16rem 0.16rem;

    .tabs-con {
      padding: 0;

      :deep {
        .van-tabs__nav {
          border-radius: 0;
          padding: 0 0 0.14rem;
          border-bottom: 1px solid;
          border-color: var(--gg-line);

        }

        .van-tab {
          padding: 0 0.06rem;

          &:first-child {
            padding-left: 0;
          }

          .van-tab__text {
            height: 0.32rem;
          }
        }

      }


    }
  }
}
</style>