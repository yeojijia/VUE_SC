<template>
  <div class="help">
    <div class="com-container">
      <div class="title">{{$t('nav.desc6')}}</div>
    </div>
    <template v-if="isMobile">
      <help-mobile />
    </template>
    <template v-else>
      <help-pc />
    </template>
  </div>
</template>

<script setup>
import HelpPc from './components/HelpPc'
import HelpMobile from "./components/HelpMobile";
import { computed } from "vue";
import { useStore } from "vuex";
import { _articlesCategory, _articlesPage } from '@/utils/api/common'
const store = useStore()
const isMobile = computed(() => store.state.global.isMobile)
</script>


<style scoped lang="scss">
.help {
  padding-top: 0.32rem;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}



.help-con {
  height: 0;
  flex: 1;
  padding-bottom: 0.8rem;

  .com-container {
    height: 100%;
    display: flex;
    justify-content: space-between;
  }

}

.wrap {
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
}

.title {
  flex: 0 0 auto;
  margin-bottom: 0.12rem;
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 500;
  font-size: 0.16rem;
  line-height: 1.4em;
  color: var(--gg-text);
}

.tabs-con {
  flex: 0 0 auto;
  margin-bottom: 0.24rem;

  :deep {
    .van-tabs {
      box-shadow: var(--shadow);
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
      padding: 0.12rem 0.2rem;
      background: var(--card-bg);
      box-sizing: border-box;

    }

    .van-tab {
      color: var(--btn-text-3);
      padding: 0;

      .van-tab__text {
        font-size: 0.14rem;
        height: 0.4rem;
        padding: 0 0.24rem;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        border-radius: 0.04rem;
        font-family: 'PingFang SC';
        font-style: normal;
        font-weight: 400;
        font-size: 0.16rem;
        color: var(--gg-subtitle);

      }
    }

    .van-tab--active {
      .van-tab__text {
        background: var(--btn-bg-active);
        color: var(--btn-text-active);

      }
    }
  }
}


.list-con {
  height: 100%;
  position: relative;

  .item {
    cursor: pointer;
    margin-bottom: 0.1rem;
    width: 100%;
    background: var(--card-bg);
    box-shadow: var(--shadow);
    border-radius: 0.08rem;
    padding: 0.3rem;
    transition: all 0.3s linear;
    box-sizing: border-box;

    &:hover {
      background: var(--btn-bg-4);
    }



    .name {
      font-family: 'PingFang SC';
      font-style: normal;
      font-weight: 400;
      font-size: 0.2rem;
      line-height: 1.5em;
      color: var(--gg-text);
    }

    .desc {
      width: 100%;
      max-height: 3em;
      margin-top: 0.5em;
      font-family: 'PingFang SC';
      font-style: normal;
      font-weight: 400;
      font-size: 0.16rem;
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





@media (max-width: 749px) {


  .help {
    padding-top: 0;
  }

  .title {
    font-size: 0.2rem;
    display: none;
  }



  .tabs-con {
    margin-bottom: 0.1rem;
    padding: 0;
    box-shadow: var(--shadow);

    :deep {
      .van-tabs {
        border-radius: 0;
      }

      .van-tabs__nav {
        border-radius: 0;
        padding: 0.12rem 0.15rem;
      }

      .van-tab {
        padding: 0 0.1rem;

        &:first-child {
          padding-left: 0;
        }

        .van-tab__text {
          font-size: 0.14rem;
          height: 0.2rem;
          padding: 0;
          border-radius: 0;
          border-bottom: 1px solid transparent;


        }
      }

      .van-tab--active {
        .van-tab__text {
          background: transparent;
          color: var(--theme);
          border-color: var(--theme);
        }
      }

    }


  }

  .list-con {


    .item {
      margin-bottom: 0.1rem;
      padding: 0.15rem;



      .name {
        font-size: 0.16rem;
      }

      .desc {
        font-size: 0.14rem;
      }
    }
  }
}
</style>
