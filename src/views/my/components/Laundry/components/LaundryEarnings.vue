<template>
  <div class="earnings">
    <div class="earnings-left">
      <div class="title">
        {{$t('invite.desc10')}}
      </div>

      <div class="info">
        <div class="info-left">
          <div class="name">{{$t('invite.desc11')}}：</div>
          <div class="val wrap">$ {{info.pendingAmount}}</div>
        </div>
        <div class="btn" @click="emit('draw',info.pendingAmount)">{{$t('invite.desc12')}}</div>
      </div>
      <div class="btn" @click="emit('draw',info.pendingAmount)">{{$t('invite.desc12')}}</div>
    </div>
    <div class="earnings-right">
      <div class="item-con">
        <div class="item">
          <div class="name">{{$t('invite.desc15')}}</div>
          <div class="val wrap">$ {{info.pendingMonth}}</div>
        </div>
      </div>
      <div class="item-con">
        <div class="item">
          <div class="name">{{$t('invite.desc16')}}</div>
          <div class="val wrap">$ {{info.totalPending}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { _backwaterDraw } from '@/utils/api/invite'
import { getCurrentInstance } from 'vue'
const props = defineProps({
  info: Object
})
const emit = defineEmits(['draw'])

</script>


<style lang='scss' scoped>
.earnings {
  flex: 4;
  border-radius: 0.2rem;
  padding: 0.24rem;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  background: var(--gg-card-bg);


  &-left {
    flex: 0 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-right: 0.3rem;
    box-sizing: border-box;

    .title {
      margin-bottom: 0.12rem;
      font-family: 'PingFang SC';
      font-style: normal;
      font-weight: 400;
      font-size: 0.2rem;
      line-height: 1.4em;
      color: var(--gg-text);
    }

    .info {
      display: flex;
      flex-direction: column;

      .info-left {
        display: flex;
        flex-direction: column;

      }

      .btn {
        display: none;
      }

      .name {
        font-family: 'PingFang SC';
        font-style: normal;
        font-weight: 400;
        font-size: 0.14rem;
        line-height: 1.5em;
        color: var(--gg-subtitle);
      }

      .val {
        max-width: 2.2rem;
        font-family: 'Venryn Sans';
        font-weight: 900;
        font-size: 0.32rem;
        line-height: 1.45em;
        color: var(--gg-text);
      }
    }

    .btn {
      margin-top: 0.11rem;
      align-self: start;
      height: 0.34rem;
      min-width: 1rem;
      padding: 0 0.1rem;
      box-sizing: border-box;
      font-family: 'PingFang SC';
      font-style: normal;
      font-weight: 400;
      font-size: 0.12rem;
      line-height: 0.16rem;
      text-align: right;
      color: var(--gg-btn-color);
      background: var(--gg-btn-bg);
      border: 1px solid var(--gg-btn-border);
      border-radius: 0.06rem;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }

  }

  &-right {
    flex: 1 1 auto;
    margin-right: -0.07rem;
    margin-left: 4%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 0.2rem 0;

    .item-con {
      height: auto;
      padding: 0 0.07rem;
      box-sizing: border-box;
      width: 50%;
      display: flex;
    }

    .item {
      width: 100%;
      background: var(--gg-box-bg);
      padding: 0.1rem;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      position: relative;
      border-radius: 0.12rem;

      &::after {
        content: '';
        width: 100%;
        height: 3px;
        position: absolute;
        top: 0;
        left: 0;
      }

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
        margin-top: 0.08rem;
        font-family: 'PingFang SC';
        font-style: normal;
        font-weight: 600;
        font-size: 0.24rem;
        line-height: 1.4em;
        text-align: center;
        color: var(--gg-text);
      }
    }
  }
}

@media (max-width:992px) {
  .earnings {
    width: 100%;
  }
}

@media (max-width:749px) {
  .earnings {
    flex-direction: column;
    padding: 0.16rem;

    &-left {
      border-right: none;
      padding-right: 0;
      padding-bottom: 0.16rem;

      .title {
        font-size: 0.16rem;
      }

      .btn {
        display: none;
      }

      .info {
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

        .val {
          font-size: 0.2rem;
          line-height: 1.4em;
        }

        .btn {
          margin-top: 0;
          display: flex;
        }
      }
    }

    &-right {
      padding: 0;
      margin-top: 0;
      width: calc(100% + 0.14rem);
      margin-left: -0.07rem;

      .item {
        border-radius: 0.08rem;

        .val {
          margin-top: 0.04rem;
          font-size: 0.18rem;
        }
      }
    }
  }
}
</style>