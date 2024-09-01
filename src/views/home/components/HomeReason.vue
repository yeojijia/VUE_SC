<template>
  <home-box :title="title" :intr="intr" :total="list.length" :rightShow="false">
    <div class="list">
      <div class="item-con" v-for="item of list" :key="item.id">
        <div class="item">
          <div class="text">
            <div class="title">{{item.title}}</div>
            <p v-html="item.description" />
          </div>
          <div class="img-con">
            <com-image class="img" :src="item.imgUrl" />
          </div>
        </div>
      </div>
    </div>
  </home-box>
</template>
<script setup>
import HomeBox from './HomeBox'
import { ref, onMounted } from "vue";
import { _ads } from '@/utils/api/common'
const props = defineProps({
  title: String,
  intr: String
})

const list = ref([])

function getList() {
  _ads({ positionKey: 'INDEX_ADVANTAGE' }).then(res => {
    list.value = res
  })
}
onMounted(() => {
  getList()
})
</script>


<style lang='scss' scoped>
.list {
  padding: 0.1rem 0;
  position: relative;
  width: 100%;
  cursor: pointer;
  display: flex;
  justify-content: space-between;

  .item-con {
    flex: 1;
    margin-right: 0.16rem;
    border-radius: 0.2rem;
    overflow: hidden;

    &:last-child {
      margin-right: 0;
    }


  }


  .item {
    position: relative;
    width: 100%;
    min-height: 100%;
    position: relative;
    display: flex;
    align-items: center;
    background: var(--gg-intr-bg);
    box-shadow: var(--gg-intr-shadow);
    padding: 0.2rem 0.24rem;


    .img-con {
      flex: 0 0 auto;
      width: 39%;
      height: 0;
      padding-bottom: 39%;
      position: relative;

      .img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
    }



    .text {
      padding-right: 0.28rem;
      width: 0;
      flex: 1;
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      z-index: 2;

      .title {
        margin-top: 0.12rem;
        margin-bottom: 0.08rem;
        font-family: 'PingFang SC';
        font-style: normal;
        font-weight: 600;
        font-size: 0.22rem;
        line-height: 1.4em;
        color: var(--gg-text);
      }

      p {
        font-family: 'PingFang SC';
        font-style: normal;
        font-weight: 400;
        font-size: 0.16rem;
        line-height: 1.4em;
        color: var(--gg-subtitle);

      }
    }
  }
}

@media (max-width: 1200px) {
  .list {

    .item {
      flex-direction: column-reverse;
      align-items: flex-start;
      justify-content: start;


      .img-con {
        width: 100%;
        padding-bottom: 100%;
      }

      .text {
        padding-right: 0;
        flex: 0 0 auto;
        width: 100%;
      }

    }
  }
}

@media (max-width: 749px) {
  .list {
    flex-direction: column;
    padding-bottom: 0;

    .item-con {
      margin-right: 0;
      margin-bottom: 0.08rem;
      border-radius: 0.08rem;

    }

    .item {
      flex-direction: row;
      padding: 0.12rem 0.12rem;

      .img-con {
        width: 30%;
        padding-bottom: 30%;
      }

      .text {
        width: 0;
        flex: 1;
        padding-right: 0.2rem;

        .title {
          font-size: 0.14rem;
        }

        p {
          font-size: 0.12rem;
        }
      }
    }
  }
}
</style>