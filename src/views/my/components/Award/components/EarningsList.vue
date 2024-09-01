<template>
  <div class="table">
    <div class="table-head">
      <div class="tr">
        <div class="td">{{$t('common.desc90')}}</div>
        <div class="td">{{$t('invite.desc43')}}</div>
        <div class="td">{{$t('invite.desc25')}}</div>
        <div class="td">{{$t('common.desc91')}}</div>
        <div class="td">{{$t('common.desc92')}}</div>
      </div>
    </div>
    <div class="table-body">
      <div class="tr" v-for="(item, index) of rebateVoList" :key="index">
        <div class="td">
          <div class="name">{{$t('common.desc90')}}</div>
          <div class="val">{{item.date}}</div>
        </div>
        <div class="td">
          <div class="name">{{$t('invite.desc43')}}</div>
          <div class="val">${{item.validBet}}</div>
        </div>
        <div class="td">
          <div class="name">{{$t('invite.desc25')}}</div>
          <div class="val">{{item.rebateRate}}%</div>
        </div>
        <div class="td">
          <div class="name">{{$t('common.desc91')}}</div>
          <div class="val price">${{item.rebate}}</div>
        </div>

        <div class="td">
          <div class="name">{{$t('common.desc92')}}</div>
          <div class="val end" v-if="item.status===1">{{$t('invite.desc51')}}</div>
          <div class="val wait" v-else>{{$t('invite.desc50')}}</div>
        </div>
      </div>
      <no-data v-if="(rebateVoList?.length===0||rebateVoList===null)" />
    </div>
  </div>
</template>
<script setup>
defineProps({
  rebateVoList: Array
})
</script>


<style lang='scss' scoped>
.table {
  &-head {
    background: var(--gg-box-bg);
    border-radius: 0.08rem 0.08rem 0 0;

    .tr {
      color: var(--gg-subtitle);
      font-size: 0.14rem;
      line-height: 1.5em;

      .td {
        padding: 0.1rem 0;
      }
    }
  }

  &-body {
    min-height: 20vh;
    max-height: 50vh;
    overflow-y: auto;

    .tr {
      padding-top: 0.16rem;
      padding-bottom: 0.16rem;
      color: var(--gg-text);
      border-bottom: 1px solid var(--gg-line);

      &:last-child {
        border-bottom: none;
      }

      .price {
        color: var(--theme);
      }

      .wait {
        color: var(--theme);
      }

      .end {
        color: var(--gg-subtitle);
      }
    }
  }

  .tr {
    font-family: 'PingFang SC';
    font-style: normal;
    font-weight: 400;
    font-size: 0.14rem;
    display: flex;
    justify-content: space-between;
    padding-left: 0.2rem;
    padding-right: 0.2rem;

    .td {
      flex: 1;
      padding-right: 0.1rem;
      box-sizing: border-box;

      &:nth-last-child(2) {
        flex: 0 0 auto;
        width: 1.8rem;
      }

      &:nth-last-child(1) {
        padding-right: 0;
        flex: 0 0 auto;
        width: .8rem;
      }

      .name {
        display: none;
      }
    }
  }
}

@media (max-width:749px) {
  .table {
    &-head {
      display: none;
    }

    .tr {
      flex-direction: column;
      padding: 0.12rem 0;
      line-height: 0.2rem;

      &:first-child {
        padding-top: 0;
      }

      .td {
        padding-right: 0;
        padding-top: 0.04rem;
        padding-bottom: 0.04rem;
        width: 100%;
        display: flex;
        justify-content: space-between;


        &:nth-last-child(1),
        &:nth-last-child(2) {
          width: 100%;
        }

        .name {
          display: block;
          color: var(--gg-subtitle);
        }
      }
    }
  }
}
</style>