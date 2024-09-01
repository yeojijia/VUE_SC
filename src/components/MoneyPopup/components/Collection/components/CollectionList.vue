<template>
  <div class="content">
    <div class="list">
      <div class="item" :class="{default: index===0}" v-for="(item, index) of list" :key="index">
        <van-icon class="cross" name="delete-o" @click="handleDel(item.id)" />
        <div class="tr">
          <div class="title">{{$t('common.desc11')}}：</div>
          <div class="val">{{item.chainName}}</div>
        </div>
        <div class="tr">
          <div class="title">{{$t('common.desc15')}}：</div>
          <div class="val wrap">{{item.address}}
          </div>
        </div>
        <div class="tr">
          <div class="title">{{$t('common.desc77')}}：</div>
          <div class="val wrap">{{item.mark}}
          </div>
        </div>
      </div>

      <no-data v-if="list.length===0&&!loading" />
    </div>
    <div class="btn" @click="emit('tab',2)">{{$t('common.desc46')}}</div>
  </div>
</template>
<script setup>
import { getCurrentInstance } from 'vue'
import { _delWithDrawType } from '@/utils/api/money'
const { proxy } = getCurrentInstance()
const props = defineProps({
  list: Array,
  loading: Boolean
})
const emit = defineEmits(['updateList', 'tab'])

function handleDel(id) {
  proxy.$dialog.confirm({
    title: proxy.$t('common.desc82'),
  })
    .then(() => {
      _delWithDrawType(id).then(res => {
        if (res === 'success') {
          spop({
            template: proxy.$t('common.desc83'),
            style: 'success',
            autoclose: 2000
          })
          emit('updateList')
        } else {
          spop({
            template: proxy.$t('common.desc84'),
            style: 'error',
            autoclose: 2000
          })
        }
      })
    })
}


</script>


<style lang='scss' scoped>
.content {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.list {
  flex: 1;
  overflow-y: auto;

  .item {
    width: 100%;
    margin-bottom: 0.12rem;
    border-radius: 0.1rem;
    padding: 0.16rem;
    box-sizing: border-box;
    position: relative;
    overflow: hidden;
    background: var(--gg-collection-card-bg);
    box-shadow: var(--gg-collection-card-shadow);
    border: 1px solid var(--gg-collection-card-border);

    &:hover {
      background: var(--gg-collection-card-bg-on);
      border-color: var(--gg-collection-card-border-on);

      .cross {
        visibility: visible;
      }

    }

    .cross {
      color: var(--gg-text);
      position: absolute;
      right: 0;
      top: 0;
      font-size: 0.18rem;
      padding: 0.16rem;
      cursor: pointer;
      z-index: 2;
      visibility: hidden;
    }

    .default-text {
      position: absolute;
      top: 0;
      right: 0;
      width: 1rem;
      height: 0.8rem;
      background: var(--theme);
      transform: translate(50%, -50%) rotate(45deg);
      text-align: center;
      display: none;
      justify-content: center;
      align-items: flex-end;
      color: var(--gg-text);
      padding: 0.08rem 0;
    }

    &.default {
      .default-text {
        display: flex;
      }
    }



    .tr {
      margin-bottom: 0.08rem;
      display: flex;
      font-family: 'PingFang SC';
      font-style: normal;
      font-weight: 400;
      font-size: 0.16rem;
      line-height: 1.5em;

      &:last-child {
        margin-bottom: 0;
      }

      .title {
        flex: 0 0 auto;
        color: var(--gg-subtitle);
      }

      .val {
        width: 0;
        flex: 1 1 auto;
        color: var(--gg-text);

      }
    }
  }
}

.btn {
  flex: 0 0 auto;
  margin-top: 0.32rem;
  margin-bottom: 10vh;
  width: 100%;
  height: 0.52rem;
  background: var(--gg-btn-bg);
  border: 1px solid var(--gg-btn-border);
  color: var(--gg-btn-color);
  font-weight: 500;
  border-radius: 0.12rem;
  font-size: 0.16rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

}

@media (max-width:749px) {
  .list {
    .item {
      padding: 0.12rem;
      border-radius: 0.1rem;

      .tr {
        margin-bottom: 0.04rem;
        font-size: 0.14rem;
      }
    }
  }

  .btn {
    margin-top: 0.24rem;
    margin-bottom: 0.24rem;
    height: 0.44rem;
    border-radius: 0.08rem;
    font-size: 0.14rem;
  }
}
</style>