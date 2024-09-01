<template>
  <div class="list">
    <div class="list-head">
      <div class="td">{{$t('my.desc67')}}</div>
      <div class="td">{{$t('my.desc68')}}</div>
      <div class="td">{{$t('my.desc69')}}</div>
    </div>
    <div class="list-body">
      <div class="scroll">
        <com-list v-model:loading="_loading" :finished="finished" @load="emit('load')">
          <div class="tr" :class="{show:showIndex===index}" v-for="(item, index) of 12" :key="index">
            <div class="tr-top">
              <div class="td">
                <div class="name">{{$t('my.desc67')}}：</div>
                <div class="val">这是活动名称</div>
              </div>
              <div class="td">
                <div class="name">{{$t('my.desc68')}}：</div>
                <div class="val">2022/08/07 12:07:26</div>
              </div>
              <div class="td">
                <div class="name">{{$t('my.desc69')}}：</div>
                <div class="val highlight">{{$t('my.desc70')}}</div>
              </div>
            </div>
          </div>
        </com-list>
      </div>
    </div>
  </div>
</template>
<script setup>
import Clipboard from "clipboard";
import { ref, getCurrentInstance, computed } from 'vue'

const props = defineProps({
  loading: Boolean,
  finished: Boolean,
  list: Array
});

const emit = defineEmits(["update:loading", "load"]);

const _loading = computed({
  get() {
    return props.loading;
  },
  set(e) {
    emit("update:loading", e);
  },
});

const { proxy } = getCurrentInstance()
function handleCopy(className) {
  var clipboard = new Clipboard(className);
  clipboard.on("success", () => {
    spop({
      template: proxy.$t('common.desc5'),
      style: 'success',
      autoclose: 2000
    })
    clipboard.destroy();
  });
  clipboard.on("error", () => {
    clipboard.destroy();
  });
}

let showIndex = ref(1)


</script>


<style lang='scss' scoped>
.scroll {
  height: 50vh;
  position: relative;
}

.list {
  box-sizing: border-box;
  width: 100%;
  background: #22242D;
  border-radius: 0.1rem;
  padding: 0.2rem 0;

  .list-head {
    margin-bottom: 0.1rem;
    display: flex;
    padding: 0 0.2rem;
    box-sizing: border-box;

    .td {
      font-weight: 400;
      color: rgba(255, 255, 255, 0.75);
    }
  }

  .list-body {
    padding: 0 0.2rem;
  }

  .tr {
    display: flex;
    flex-direction: column;
    padding: 0.1rem 0;
    border-bottom: 1px solid #373A47;
    box-sizing: border-box;

    &:last-child {
      border-color: transparent;
    }


    .tr-top {
      display: flex;
      justify-content: space-between;
    }

    .tr-bot {
      height: 0;
      background: #1B1C23;
      border-radius: 0.08rem;
      box-sizing: border-box;
      overflow: hidden;
      transition: all .3s linear;
      will-change: height;
      display: flex;
      align-items: center;
      opacity: 0;

      .bot-td {
        flex: 1;

        .td-item {
          font-family: 'PingFang SC';
          font-style: normal;
          font-weight: 400;
          font-size: 0.14rem;
          line-height: 1.5em;
          display: flex;

          .name {
            white-space: nowrap;
            color: #969BA2;
          }

          .val {
            color: #FFFFFF;
          }
        }

      }
    }
  }

  .td {
    flex: 1;
    font-family: 'PingFang SC';
    font-style: normal;
    font-weight: 400;
    font-size: 0.16rem;
    line-height: 1.4em;
    padding-right: 0.05rem;
    box-sizing: border-box;

    .name {
      white-space: nowrap;
      display: none;
      font-weight: 400;
      color: rgba(255, 255, 255, 0.75);
    }

    .profit {
      color: #00BF79;
    }

    .loss {
      color: #FF0056;
    }

    .van-icon {
      // font-weight: bold;
      font-size: 0.18rem;
      cursor: pointer;
      transition: all 0.3s linear;
    }

    .copy-btn {
      margin-left: 0.05rem;
      width: 0.11rem;
      height: 0.11rem;
      object-fit: cover;
      cursor: pointer;
    }

    &:last-child {
      width: 1.2rem;
      flex: 0 0 auto;
    }

  }

  .highlight {
    color: #A989FF !important;
  }
}

@media (max-width:1536px) {
  .list {
    .td {

      &:first-child,
      &:nth-child(2),
      &:last-child {
        width: 1rem;
      }

    }
  }
}

@media (max-width:992px) {
  .list {
    padding: 0.1rem 0;

    .list-head {
      display: none;
    }

    .tr {
      .tr-top {
        flex-wrap: wrap;
      }

      .tr-bot {
        flex-wrap: wrap;

        .bot-td {
          flex: 0 0 auto;
          width: 100%;

          .td-item {
            padding: 0.05rem 0;
            display: flex;
            justify-content: space-between;
          }
        }
      }
    }

    .td {
      flex: 0 0 auto;
      width: 100%;
      display: flex;
      padding: 0.05rem 0;
      justify-content: space-between;


      &:first-child,
      &:nth-child(2),
      &:last-child {
        width: 100%;
      }

      .name {
        display: block;
      }
    }
  }
}

@media (max-width:749px) {
  .list {

    .td {
      font-size: 0.14rem;
    }
  }
}
</style>