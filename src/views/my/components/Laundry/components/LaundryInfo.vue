<template>
  <div class="info">
    <div class="info-left">
      <div class="level">
        <div class="img-con">
          <img :src="info?.icon" />
          <span>{{info.levelName}}</span>
        </div>
      </div>
      <div class="rate">
        <div class="name">{{$t('invite.desc4')}}</div>
        <div class="val">{{info.washRate?`${decal(getValueMultip(info.washRate,100) ,4)}%`:'0%'}}</div>
      </div>
    </div>
    <div class="info-right">
      <div class="list">
        <div class="item">
          <div class="name">{{$t('invite.desc6')}}：</div>
          <div class="val">{{info.totalRechargeAmount}}/{{info.nextLevelDeposit}}</div>
        </div>
      </div>
      <div class="rate">
        <div class="name">{{$t('invite.desc9')}}：</div>
        <div class="val">{{info.nextLevelWashRate?`${decal(getValueMultip(info.nextLevelWashRate,100),4)}%`:''}}</div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, getCurrentInstance } from "vue";
const { proxy } = getCurrentInstance()
const decal = proxy.$common.decal
const getValueMultip = proxy.$common.getValueMultip
const props = defineProps({
  info: Object
})
</script>


<style lang='scss' scoped>
.info {
  flex: 3;
  margin-right: 0.16rem;
  min-width: 4.5rem;
  width: 6rem;
  border-radius: 0.2rem;
  padding: 0.24rem;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  background: var(--gg-card-bg);


  &-left {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .level {
      display: flex;
      flex-direction: column;
      align-items: center;

      .img-con {
        width: 1rem;
        height: 1rem;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        background: var(--gg-my-vip-img-bg);
        position: relative;
        overflow: hidden;

        img {
          width: 85%;
        }

        span {
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          height: 0.24rem;
          background: var(--gg-my-vip-bg);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.12rem;
          color: var(--gg-text);
        }
      }
    }

    .rate {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 0.12rem;

      .name {
        font-family: 'PingFang SC';
        font-style: normal;
        font-weight: 400;
        font-size: 0.14rem;
        line-height: 1.5em;
        text-align: center;
        color: var(--gg-subtitle);

      }

      .val {
        font-family: 'Venryn Sans';
        font-weight: 900;
        min-height: 0.29rem;
        font-size: 0.2rem;
        line-height: 1.4em;
        background: var(--gg-btn-bg);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        text-fill-color: transparent;
      }
    }

  }

  &-right {
    flex: 1 1 auto;
    margin-left: 0.2rem;
    display: flex;
    flex-direction: column;

    .list {
      border-bottom: 1px dashed var(--gg-line);
      flex: 1 1 auto;
      display: flex;
      flex-direction: column;
      justify-content: center;
      // padding-bottom: 0.12rem;

      .item {
        // margin-bottom: 0.08rem;
        display: flex;
        justify-content: space-between;
        font-family: 'PingFang SC';
        font-style: normal;
        font-size: 0.16rem;
        line-height: 1.5em;

        .name {
          margin-right: 0.1rem;
          font-weight: 400;
          color: var(--gg-subtitle);
        }

        .val {
          font-weight: 400;
          color: var(--gg-text);
          font-size: 0.18rem;
        }
      }
    }

    .rate {
      flex: 1 1 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .name {
        margin-right: 0.1rem;
        font-family: 'PingFang SC';
        font-style: normal;
        font-weight: 400;
        font-size: 0.16rem;
        line-height: 1.5em;
        color: var(--gg-subtitle);
      }

      .val {
        font-family: 'Venryn Sans';
        font-weight: 900;
        font-size: 0.32rem;
        line-height: 1.4em;
        background: var(--gg-btn-bg);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        text-fill-color: transparent;

      }
    }
  }
}

@media (max-width:992px) {
  .info {
    width: 100%;
    margin-bottom: 0.24rem;
  }
}

@media (max-width:749px) {
  .info {
    margin-top: 0.16rem;
    margin-bottom: 0.12rem;
    min-width: auto;
    padding: 0.16rem;
    border-radius: 0.12rem;
    flex-direction: column;

    &-left {
      padding-bottom: 0.16rem;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;

      .level {
        margin-right: 0.12rem;

        .img-con {
          width: 0.64rem;
          height: 0.64rem;
        }
      }

      .rate {
        margin-top: 0;
        align-items: flex-start;

        .name {
          font-weight: 600;
          color: var(--gg-text);
        }

        .val {
          margin-bottom: 0;
        }
      }
    }

    &-right {
      margin-left: 0;

      .list {
        padding-top: 0.16rem;
        border-top: 1px solid var(--gg-line);
        border-bottom: none;

        .item {
          font-size: 0.14rem;
          line-height: 0.16rem;
        }
      }

      .rate {
        margin-top: 0.08rem;

        .name {
          font-size: 0.14rem;
          line-height: 0.16rem;
          color: var(--gg-subtitle);
        }

        .val {
          font-size: 0.14rem;
          line-height: 0.16rem;
          color: var(--gg-text);
          background: var(--gg-text);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-fill-color: transparent;
        }
      }
    }
  }
}
</style>