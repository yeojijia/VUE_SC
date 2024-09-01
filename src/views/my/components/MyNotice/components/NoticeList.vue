<template>
  <div class="list">
    <com-list v-model:loading="loading" :finished="finished" @load="handleLoad" v-if="list.length">
      <div class="item" v-for="(item, index) of list" :key="index" @click="emit('detail',item.id)">
        <div class="item-top">
          <div class="title">{{item.title}}</div>
          <div class="date">{{item.createTime}}</div>
        </div>
        <div class="item-bot">
          <div class="desc overflow2" v-html="item.content">
          </div>
        </div>
      </div>
    </com-list>
    <no-data v-if="list.length===0 && !isLoading" />
  </div>
</template>
<script setup>
import { _getByPageAndLikeAndOrder, _message } from '@/utils/api/common'
import { ref, onMounted, watch, getCurrentInstance } from 'vue'
const props = defineProps({
  code: String
})
const { proxy } = getCurrentInstance()
const emit = defineEmits(['detail'])

let list = ref([]);
let page = ref(0)
let pageSize = ref(10)
let loading = ref(false)
let finished = ref(false)
let isLoading = ref(false)

watch(
  () => props.code,
  async (e) => {
    if (!e) return;
    list.value = [];
    page.value = 0
    finished.value = false
    isLoading.value = false

    proxy.$toast.loading({
      duration: 0,
      forbidClick: true,
    });
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
  if (props.code === 'SYSTEM_BULLETIN') {
    _message().then(res => {
      list.value = res
    }).finally(() => {
      isLoading.value = false
      proxy.$toast.clear()
      finished.value = true
    })

  } else {
    _getByPageAndLikeAndOrder({
      current: page.value,
      size: pageSize.value,
      isOrder: true,
      orderBy: "id",
      orderType: "desc",
    }, {
      type: props.code,
    }).then(res => {
      list.value = list.value.concat(res.records)
      isLoading.value = false
      if (list.value.length >= res.total) {
        finished.value = true
      }
    }).finally(() => {
      proxy.$toast.clear()
    })
  }

}

onMounted(() => {
  handleLoad()
})
</script>


<style lang='scss' scoped>
.list {
  height: 60vh;
  position: relative;

  .item {
    margin-bottom: 0.04rem;
    cursor: pointer;
    padding: 0.16rem;
    box-sizing: border-box;
    transition: all 0.3s linear;
    border-bottom: 1px solid var(--gg-line);

    &:last-child {
      margin-bottom: 0;
      border-bottom: none;
    }

    &:hover,
    &.on {
      background: var(--gg-box-bg);
    }

    .title {
      font-family: 'PingFang SC';
      font-style: normal;
      font-weight: 400;
      font-size: 0.16rem;
      line-height: 1.4em;
      color: var(--gg-text);
    }

    .item-top {
      margin-bottom: 0.08rem;
      display: flex;
      align-items: baseline;
    }

    .item-bot {
      display: flex;
      justify-content: space-between;
      font-family: 'PingFang SC';
      font-style: normal;
      font-weight: 400;
      font-size: 0.14rem;
      line-height: 1.5em;
    }

    .desc {
      width: 100%;
      color: var(--gg-notice-text-color);

      :deep {
        p {

          color: var(--gg-notice-text-color);
        }
      }

    }

    .date {
      margin-left: 0.06rem;
      flex: 0 0 auto;
      color: var(--gg-subtitle);
      font-size: 0.12rem;
      line-height: 0.17rem;

      p {
        font-family: 'PingFang SC';
        font-style: normal;
        font-weight: 400;
        font-size: 0.12rem;
        line-height: 0.17rem;
        color: var(--gg-text);

      }

    }
  }
}

@media (max-width:749px) {
  .list {
    .item {
      margin-bottom: 0.1rem;
      padding: 0.14rem 0.12rem;
      background: var(--gg-card-bg);
      border-radius: 0.1rem;
      border-bottom: none;

      .item-top {
        justify-content: space-between;

        .title {
          width: 0;
          flex: 1;
        }
      }
    }
  }
}
</style>