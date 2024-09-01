<template>
  <div class="list">
    <div class="title">{{$t('invite.desc21')}}</div>
    <div class="table">
      <div class="table-head">
        <div class="tr">
          <div class="td">{{$t('invite.desc23')}}</div>
          <div class="td">{{$t('invite.desc24')}}</div>
          <div class="td">{{$t('invite.desc22')}}</div>
          <div class="td">{{$t('invite.desc73')}}</div>
          <div class="td">{{$t('invite.desc25')}}</div>
          <div class="td">{{$t('common.desc93')}}</div>
          <div class="td">{{$t('common.desc92')}}</div>
        </div>
      </div>
      <div class="table-body">
        <div class="tr" v-for="item of list" :key="item.id">
          <div class="td">
            <div class="name">{{$t('invite.desc23')}}</div>
            <div class="val">{{item.gameType}}</div>
          </div>
          <div class="td">
            <div class="name">{{$t('invite.desc24')}}</div>
            <div class="val">{{item.gameName}}</div>
          </div>
          <div class="td">
            <div class="name">{{$t('invite.desc22')}}</div>
            <div class="val price">${{item.betAmount}}</div>
          </div>
          <div class="td">
            <div class="name">{{$t('invite.desc22')}}</div>
            <div class="val price">${{item.backAmount}}</div>
          </div>
          <div class="td">
            <div class="name">{{$t('invite.desc25')}}</div>
            <div class="val">{{item.rate}}%</div>
          </div>
          <div class="td">
            <div class="name">{{$t('common.desc93')}}</div>
            <div class="val">{{item.createTime}}</div>
          </div>
          <div class="td">
            <div class="name">{{$t('common.desc92')}}</div>
            <div class="val end" v-if="item.status===1">{{$t('invite.desc51')}}</div>
            <div class="val wait" v-else>{{$t('invite.desc50')}}</div>
          </div>
        </div>
        <no-data v-if="(list?.length === 0)" />
      </div>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  list: Array
})
</script>


<style lang='scss' scoped>
.list {
  margin-top: 0.16rem;
  border-radius: 0.2rem;
  padding: 0.24rem;
  box-sizing: border-box;
  background: var(--gg-card-bg);

  .title {
    margin-bottom: 0.12rem;
    font-family: 'PingFang SC';
    font-style: normal;
    font-weight: 400;
    font-size: 0.2rem;
    line-height: 1.4em;
    color: var(--gg-text);
  }

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
}

@media (max-width:749px) {
  .list {
    margin-top: 0.16rem;
    padding: 0.16rem;
    border-radius: 0.12rem;

    .title {
      margin-bottom: 0.12rem;
      font-size: 0.16rem;
      line-height: 0.22rem;
    }

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
          padding-top: 0.02rem;
          padding-bottom: 0.02rem;
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
}
</style>