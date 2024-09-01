<template>
  <div class="com-container tabs-con">
    <van-tabs v-model:active="categoryId" shrink swipe-threshold v-if="categoryList.length">
      <van-tab v-for="item of categoryList" :key="item.id" :name="item.id">
        <template #title>
          {{item.name}}
        </template>
      </van-tab>
    </van-tabs>
  </div>
  <div class="com-container scroll">
    <div class="list-con">
      <com-list v-model:loading="loading" :finished="finished" @load="handleLoad">
        <div class="item" v-for="item of list" :key="item.id" @click="router.push(`/help/detail?id=${item.id}`)">
          <div class="name">{{item.title}}</div>
          <div class="desc overflow2" v-html="item.content"></div>
        </div>
      </com-list>
    </div>
  </div>
</template>
<script setup>
import { ref, watch, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { _articlesCategory, _articlesPage } from '@/utils/api/common'
const router = useRouter()
const route = useRoute()
let categoryId = ref(1)
let categoryList = ref([])
function getCategory() {
  categoryId.value = Number(route.query.id) || 1
  _articlesCategory('HELP').then(res => {
    categoryList.value = res
  })
}
let list = ref([]);
let page = ref(0)
let pageSize = ref(10)
let loading = ref(false)
let finished = ref(false)
let isLoading = ref(false)


watch(
  () => categoryId.value,
  async (id) => {
    if (!id) return;
    list.value = [];
    page.value = 0
    loading.value = false
    finished.value = false
    isLoading.value = false
    handleLoad()
  },
  { immediate: true }
);

function handleLoad() {
  if (isLoading.value) return
  isLoading.value = true
  page.value++
  getPage()
}
function getPage() {
  _articlesPage({
    categoryId: categoryId.value,
    page: page.value,
    pageSize: pageSize.value
  }).then(res => {
    list.value = list.value.concat(res.list)
    isLoading.value = false
    loading.value = false
    if (list.value.length >= res.page.count) {
      finished.value = true
    }
  })
}
watch(() => route.query.id, (e) => {
  if (e) {
    if (e) {
      categoryId.value = Number(e)
    }
  }
})

onMounted(() => {
  getCategory()
})



</script>


<style lang='scss' scoped>
.tabs-con {
  margin-top: 0.16rem;
  flex: 0 0 auto;
  margin-bottom: 0.12rem;

  :deep {
    .van-tabs {
      border-radius: 0.08rem;
      overflow: hidden;

    }

    .van-tabs__line {
      display: none;
    }

    .van-tabs__wrap {
      height: auto;
    }

    .van-tabs__nav {
      padding: 0;
      background: transparent;

    }

    .van-tab {
      padding: 0 0.06rem;

      &:first-child {
        padding-left: 0;


      }

      .van-tab__text {
        height: 0.36rem;
        padding: 0 0.14rem;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        border-radius: 0.08rem;
        font-family: 'PingFang SC';
        font-style: normal;
        font-weight: 400;
        font-size: 0.14rem;
        line-height: 1.5em;
        color: var(--gg-subtitle);
        border: 1px solid transparent;

        .default {
          display: block;
        }

        .on {
          display: none;
        }

      }
    }

    .van-tab--active {
      .van-tab__text {
        font-weight: 500;
        background: var(--gg-nav-bg-active);
        color: var(--gg-nav-color-active);
        box-shadow: var(--gg-nav-shadow-active);
        border-color: var(--gg-nav-border-active);

        .default {
          display: none;
        }

        .on {
          display: block;
        }

      }
    }
  }
}

.scroll {
  height: 0;
  flex: 1;
}

.list-con {
  height: 100%;
  position: relative;

  .item {
    cursor: pointer;
    margin-bottom: 0.1rem;
    width: 100%;
    background: var(--gg-card-bg);
    border-radius: 0.1rem;
    padding: 0.14rem 0.12rem;
    transition: all 0.3s linear;
    box-sizing: border-box;

    .name {
      font-family: 'PingFang SC';
      font-style: normal;
      font-weight: 400;
      font-size: 0.16rem;
      line-height: 1.4em;
      color: var(--gg-text);
    }

    .desc {
      width: 100%;
      max-height: 3em;
      margin-top: 0.5em;
      font-family: 'PingFang SC';
      font-style: normal;
      font-weight: 400;
      font-size: 0.14rem;
      line-height: 1.5em;
      color: var(--gg-subtitle);
      -webkit-backface-visibility: hidden;
      -webkit-transform: translate3d(0, 0, 0);

      :deep {
        img {
          display: none;
        }
      }

    }
  }
}
</style>