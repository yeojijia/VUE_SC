<template>
  <div class="detail">
    <div class="head">
      <div class="back-btn" @click="emit('back')">
        <van-icon name="arrow-left" />
        {{$t('my.desc73')}}
      </div>
    </div>
    <div class="min-head">
      <com-head @back="emit('back')" :title="title" />
    </div>
    <div class="scroll">
      <div class="title">{{detail.title}}</div>
      <div class="date">{{detail.createTime}}
      </div>
      <div class="desc" v-html="detail.content" />
    </div>
  </div>
</template>
<script setup>
import { ref, onActivated, getCurrentInstance } from 'vue'
import { _bulletin, _messageDetail } from '@/utils/api/common'
const props = defineProps({
  id: [Number, String],
  title: String,
  code: String
})
const { proxy } = getCurrentInstance()
const emit = defineEmits(['back'])
let detail = ref({})
function getDetail(id) {
  detail.value = ref({})
  proxy.$toast.loading({
    duration: 0,
    forbidClick: true,
  });
  if (props.code === 'SYSTEM_BULLETIN') {
    _messageDetail(id).then(res => {
      detail.value = res
    }).finally(() => {
      proxy.$toast.clear()
    })

  } else {
    _bulletin(id).then(res => {
      detail.value = res
    }).finally(() => {
      proxy.$toast.clear()
    })
  }
}

onActivated(() => {
  getDetail(props.id);
});
</script>


<style lang='scss' scoped>
.detail {
  .min-head {
    display: none;
  }

  .head {
    margin-bottom: 0.1rem;
    padding-bottom: 0.15rem;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid var(--gg-line);



    .back-btn {
      white-space: nowrap;
      cursor: pointer;
      font-family: 'PingFang SC';
      font-style: normal;
      font-weight: 400;
      font-size: 0.14rem;
      line-height: 0.22rem;
      text-align: right;
      color: var(--gg-text);

    }
  }

  .title {
    font-family: 'PingFang SC';
    font-style: normal;
    font-weight: 400;
    font-size: 0.16rem;
    line-height: 0.22rem;
    color: var(--gg-text);
  }

  .date {
    margin-top: 0.04rem;
    margin-bottom: 0.18rem;
    font-family: 'PingFang SC';
    font-style: normal;
    font-weight: 400;
    font-size: 0.12rem;
    line-height: 0.17rem;
    color: var(--gg-subtitle);
  }

  .scroll {
    width: 100%;
    height: 60vh;
    overflow-y: auto;

    &::-webkit-scrollbar {
      width: 4px;
    }
  }

  .desc {
    font-family: 'PingFang SC';
    font-style: normal;
    font-weight: 400;
    font-size: 0.14rem;
    line-height: 0.2rem;
    color: var(--gg-notice-text-color);

    :deep {
      p {
        margin-bottom: 0.1rem;
        font-family: 'PingFang SC';
        font-style: normal;
        font-weight: 400;
        font-size: 0.14rem;
        line-height: 0.2rem;
        color: var(--gg-notice-text-color);

      }
    }

  }
}

@media (max-width:749px) {
  .detail {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    z-index: 99999;

    .head {
      display: none;
    }

    .min-head {
      flex: 0 0 auto;
      display: block;
    }

    .scroll {
      flex: 1 1 auto;
      height: auto;
      padding: 0.12rem 0.15rem;
      background: var(--gg-page-bg);

      .title {
        margin-top: 0.14rem;
        text-align: center;
        font-size: 0.2rem;
      }

      .date {
        margin-top: 0.08rem;
        margin-bottom: 0.2rem;
        text-align: center;
      }
    }

  }
}
</style>