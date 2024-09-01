<template>
  <div class="table">
    <div class="table-head">
      <div class="tr">
        <div class="td">{{$t('invite.desc44')}}</div>
        <div class="td">{{$t('invite.desc45')}}</div>
        <div class="td">{{$t('invite.desc25')}}</div>
        <div class="td">{{$t('invite.desc43')}}</div>
        <div class="td">{{$t('invite.desc46')}}</div>
        <div class="td">{{$t('common.desc47')}}</div>
      </div>
    </div>
    <div class="table-body">
      <div class="tr" v-for="(item, index) of teamList" :key="index">

        <div class="td">
          <div class="name">{{$t('invite.desc44')}}</div>
          <div class="val">{{item.userName}}</div>
        </div>
        <div class="td">
          <div class="name">{{$t('invite.desc45')}}</div>
          <div class="val">{{item.teamNum}}</div>
        </div>
        <div class="td">
          <div class="name">{{$t('invite.desc25')}}</div>
          <div class="val">{{item.rebateRate}}%</div>
        </div>
        <div class="td">
          <div class="name">{{$t('invite.desc4')}}</div>
          <div class="val">${{item.validBet}}</div>
        </div>
        <div class="td">
          <div class="name">{{$t('invite.desc22')}}</div>
          <div class="val price">${{item.totalContributeEarnings}}</div>
        </div>
        <div class="td">
          <div class="name">{{$t('common.desc93')}}</div>
          <div class="val">{{item.registerDate}}</div>
        </div>
      </div>
      <no-data v-if="(teamList?.length===0||teamList===null)" />
    </div>
  </div>
</template>
<script setup>
defineProps({
  teamList: Array
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

      &:nth-last-child(1) {
        flex: 0 0 auto;
        width: 1.8rem;
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

        &:nth-last-child(1) {
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