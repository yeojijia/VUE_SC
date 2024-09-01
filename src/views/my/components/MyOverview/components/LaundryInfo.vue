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
      <div class="min-right">
        <span class="levelName">{{info.levelName}}</span>
        <div class="item">
          <div class="name">{{$t('invite.desc6')}}：</div>
          <div class="val">{{info.totalRechargeAmount}}/{{info.nextLevelDeposit}}</div>
        </div>
      </div>
    </div>
    <div class="info-right">
      <div class="list list-top">
        <div class="item">
          <div class="name">{{$t('invite.desc6')}}：</div>
          <div class="val">{{info.totalRechargeAmount}}/{{info.nextLevelDeposit}}</div>
        </div>
      </div>
      <div class="list-bot">
        <div class="rate">
          <div class="name">{{$t('invite.desc9')}}：</div>
          <div class="val">{{info.nextLevelWashRate?`${decal(getValueMultip(info.nextLevelWashRate,100),4)}%`:''}}</div>
        </div>
        <div class="rate min-rate">
          <div class="name">{{$t('invite.desc4')}}</div>
          <div class="val">{{info.washRate?`${decal(getValueMultip(info.washRate,100) ,4)}%`:'0%'}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, getCurrentInstance } from "vue";
import { _washInfo, _backwaterDraw } from '@/utils/api/invite'
let info = ref({})
const { proxy } = getCurrentInstance()
const getValueMultip = proxy.$common.getValueMultip
const decal = proxy.$common.decal
function getWashInfo() {
  _washInfo().then(res => {
    info.value = res
  })
}
onMounted(() => {
  getWashInfo()
})
</script>


<style lang='scss' scoped>
.info {
  flex: 4;
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

    .min-right {
      display: none;
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
    width: 0;
    flex: 1 1 auto;
    margin-left: 0.2rem;
    display: flex;
    flex-direction: column;



    .list-top {
      flex: 1;
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

    .list-bot {
      border-top: 1px solid var(--gg-line);
      flex: 1;

    }



    .rate {
      height: 100%;
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

    .min-rate {
      display: none;
    }
  }
}

@media (max-width:992px) {
  .info {
    width: 100%;
    max-width: 100%;
  }
}


@media (max-width:749px) {
  .info {
    min-width: auto;
    padding: 0.16rem;
    border-radius: 0.12rem;
    flex-direction: column;

    &-left {
      flex-direction: row;
      padding-bottom: 0.16rem;
      align-items: center;

      .level {
        margin-right: 0.12rem;

        .img-con {
          width: 0.64rem;
          height: 0.64rem;

          span {
            display: none;
          }
        }
      }

      .min-right {
        width: 0;
        flex: 1;
        display: flex;
        flex-direction: column;

        .levelName {
          margin-bottom: 0.06rem;
          font-family: 'PingFang SC';
          font-style: normal;
          font-weight: 600;
          font-size: 0.16rem;
          line-height: 0.22rem;
        }

        .item {
          display: flex;
          justify-content: space-between;
          font-size: 0.14rem;
          line-height: 0.16rem;

          .name {
            color: var(--gg-subtitle);
          }
        }
      }



      .rate {
        display: none;
      }
    }

    &-right {
      margin-left: 0;
      width: 100%;

      .list-top {
        display: none;
      }

      .rate {
        .name {
          font-size: 0.14rem;
        }

        .val {
          font-size: 0.14rem;
        }
      }

      .list-bot {

        padding-top: 0.16rem;

        .min-rate {
          display: flex;
        }
      }
    }
  }
}
</style>