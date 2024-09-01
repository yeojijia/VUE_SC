<template>
  <div class="detail">
    <div class="min-head">
      <com-head @back="router.go(-1)" :title="$t('common.desc121')" />
    </div>
    <div class="wrap com-container">
      <div class="top">
        <div class="title">{{detail.title}}</div>
      </div>

      <div class="desc" v-html="detail.content" />

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, getCurrentInstance } from "vue";
import { useRoute, useRouter } from "vue-router";
import Clipboard from "clipboard";
import { _articlesDetail } from '@/utils/api/common'
const route = useRoute();
const router = useRouter()
const { proxy } = getCurrentInstance();


let detail = ref({})
function getDetail(id) {
  _articlesDetail(id).then(res => {
    detail.value = res
  })
}


let link = ref(null)
function handleCopy(className) {
  var clipboard = new Clipboard(className);
  clipboard.on("success", () => {
    spop({
      template: proxy.$t('common.desc8'),
      style: 'success',
      autoclose: 2000
    })
    clipboard.destroy();
  });
  clipboard.on("error", () => {
    clipboard.destroy();
  });
}

let loading = ref(false);
onMounted(() => {
  link.value = window.location.href
  getDetail(route.query.id);
});
</script>

<style scoped lang="scss">
.detail {
  padding-top: 0.34rem;
  padding-bottom: 0.5rem;
}

.min-head {
  display: none;
}

.wrap {
  margin: 0 auto;
  display: flex;
  flex-direction: column;

  .top {
    display: flex;
    justify-content: space-between;
    align-items: baseline;

    .title {
      flex: 1;
      font-family: 'PingFang SC';
      font-style: normal;
      font-weight: 400;
      font-size: 0.36rem;
      line-height: 1.2em;
      padding-bottom: 1em;
      color: var(--gg-text);
      border-bottom: 1px solid var(--gg-line);
    }

    .link {
      cursor: pointer;
      margin-left: 1.5em;
      padding-left: 1.5em;
      font-family: 'PingFang SC';
      font-style: normal;
      font-weight: 400;
      font-size: 0.14rem;
      line-height: 3.2em;
      color: var(--gg-text);
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-left: 1px solid rgba(255, 255, 255, 0.2);

      img {
        margin-right: 0.15rem;
        width: 0.2rem;
        height: 0.2rem;
        object-fit: cover;
      }

    }
  }

  .desc {
    margin-top: 2em;
    font-family: 'PingFang SC';
    font-style: normal;
    font-weight: 400;
    font-size: 0.16rem;
    line-height: 1.815em;
    color: var(--gg-text);

    :deep {
      img {
        max-width: 100%;
      }
    }
  }
}







@media (max-width: 749px) {
  .detail {
    position: fixed;
    top: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    z-index: 99999;
    padding: 0;
    background: var(--gg-page-bg);
  }

  .min-head {
    flex: 0 0 auto;
    display: block;
  }

  .wrap {
    flex: 1;
    overflow-y: auto;

    .top {
      padding-top: 0.22rem;
      padding-bottom: 0.2rem;
      flex-direction: column;

      .title {
        width: 100%;
        padding-bottom: 0;
        font-size: 0.22rem;
        line-height: 1.4em;
        border: none;
        text-align: center;
      }

      .link {
        padding-left: 0;
        margin-left: 0;
        align-self: flex-end;
        font-size: 0.12rem;
        line-height: 0.17rem;

        img {
          margin-right: 0.1rem;
          width: 0.16rem;
          height: 0.16rem;
        }
      }
    }

    .desc {
      margin-top: 0;
      margin-bottom: 0.1rem;
      font-family: "PingFang SC";
      font-style: normal;
      font-weight: 400;
      font-size: 0.14rem;
      line-height: 0.2rem;
      color: var(--gg-notice-text-color);
    }
  }
}
</style>
