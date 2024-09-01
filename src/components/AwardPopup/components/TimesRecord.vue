<template>
  <div class="content">
    <div class="content-top">
      <van-icon name="arrow-left" @click="emit('change','Roulette')" />
      <div class="title">{{$t('award.desc13')}}</div>
    </div>
    <div class="content-table">
      <div class="table-head">
        <div class="tr">
          <div class="td">{{$t('award.desc14')}}</div>
          <div class="td">{{$t('award.desc15')}}</div>
          <div class="td">{{$t('award.desc16')}}</div>
        </div>
      </div>
      <div class="table-body" v-if="list.length">
        <div class="tr" v-for="(item) of list" :key="item.id">
          <div class="td wrap">{{toTimeZone(item.createTime) }}</div>
          <div class="td wrap">
            {{item.conditionTitle}}
          </div>
          <div class="td">
            {{item.bonusTimes}}
          </div>
        </div>
      </div>

      <loading-nodata :loading="isLoading&&!list.length" :nodata="!list.length" :size="2.4" />
    </div>
    <div class="more" @click="emit('toActivity')">{{ $t('common.desc146') }}</div>
  </div>
</template>
<script setup>
import { ref, onMounted, getCurrentInstance } from 'vue';
import { _turntableTimes } from '@/utils/api/user'
const emit = defineEmits(['change', 'hide', 'toActivity'])
const { proxy } = getCurrentInstance()
const toTimeZone = proxy.$common.toTimeZone
const list = ref([])
const isLoading = ref(false)
onMounted(() => {
  if (isLoading.value) return
  isLoading.value = true
  _turntableTimes()
    .then(res => {
      list.value = res
    }).finally(() => {
      isLoading.value = false
    })
})
</script>


<style lang='scss' scoped>
.content {
  width: 4.6rem;
  max-width: 90vw;
  height: 7.66rem;
  max-height: 80vh;
  padding: 0.2rem;
  box-sizing: border-box;
  background: var(--gg-card-bg);
  border-radius: 0.16rem;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  &-top {
    margin-bottom: 0.2rem;
    flex: 0 0 auto;
    width: 100%;
    display: flex;
    // flex-direction: column;
    position: relative;



    .van-icon {
      color: var(--gg-text);
      font-size: 0.2rem;
      cursor: pointer;
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
    }

    .title {
      width: 100%;
      font-family: 'PingFang SC';
      font-style: normal;
      font-weight: 500;
      font-size: 0.16rem;
      line-height: 0.22rem;
      color: var(--gg-text);
      text-align: center;
    }
  }

  &-table {
    width: 100%;
    height: 0;
    flex: 1;
    display: flex;
    flex-direction: column;
    background: var(--gg-box-bg);
    padding: 0.14rem;
    box-sizing: border-box;

    .table-head {
      flex: 0 0 auto;

      .tr {
        padding-top: 0;

        .td {
          font-size: 0.14rem;
          color: var(--gg-subtitle);
        }
      }
    }

    .table-body {
      flex: 1;
      overflow-y: auto;

      &::-webkit-scrollbar {
        width: 0;
      }

    }

    .tr {
      padding: 0.1rem 0;
      display: flex;
      justify-content: space-between;

      .td {
        font-family: 'PingFang SC';
        font-style: normal;
        font-weight: 400;
        font-size: 0.13rem;
        line-height: 0.2rem;
        text-align: center;
        color: var(--gg-text);
        flex: 1;

        &:first-child {
          flex: 2;
          text-align: left;
        }

        &:last-child {
          text-align: right;
        }

      }

      .amount {
        color: var(--theme);
      }
    }
  }

  .more {
    margin-top: 0.2rem;
    text-align: center;
    font-size: 0.16rem;
    line-height: 1.4em;
    color: var(--theme);
    cursor: pointer;
  }
}

@media only screen and (min-width: 320px) and (max-width: 750px) {
  .content {
    padding: 0.16rem;

    &-top {
      margin-bottom: 0.13rem;

      .title {

        font-size: 0.15rem;
        line-height: 0.21rem;
      }
    }

    &-table {
      padding: 0.12rem;

      .table-head {
        .tr {

          .td {
            font-size: 0.12rem;
            line-height: 0.17rem;
          }
        }
      }

      .tr {
        padding: 0.04rem 0;

        .td {
          font-size: 0.12rem;
          line-height: 0.17rem;

          &:first-child {
            flex: 1;
          }
        }
      }
    }
  }
}
</style>