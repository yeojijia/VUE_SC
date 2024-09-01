<template>
  <div class="rule">
    <div class="table-con">
      <div class="table-title">{{$t('invite.desc65')}}</div>
      <div class="table-scroll">
        <div class="table">
          <div class="table-head">
            <div class="tr">
              <div class="td wrap">{{$t('invite.desc54')}}</div>
              <div class="td wrap">{{$t('invite.desc6')}}</div>
              <div class="td wrap">{{$t('nav.desc14')}}</div>
              <div class="td wrap">{{$t('nav.desc15')}}</div>
              <div class="td wrap">{{$t('nav.desc16')}}</div>
              <div class="td wrap">{{$t('nav.desc17')}}</div>
              <div class="td wrap">{{$t('nav.desc18')}}</div>
              <div class="td wrap">{{$t('nav.desc19')}}</div>
              <div class="td wrap">{{$t('nav.desc3')}}</div>
            </div>
          </div>
          <div class="table-body">
            <div class="tr" v-for="(item,index) of levelRule" :key="index">
              <div class="td wrap">
                <img class="vip-img" :src="item.icon" />
                {{item.name}}
              </div>
              <div class="td wrap">{{item.deposit}}</div>
              <div class="td wrap">{{item.qiPai}}%</div>
              <div class="td wrap">{{item.shiXun}}%</div>
              <div class="td wrap">{{item.dianZi}}%</div>
              <div class="td wrap">{{item.buYu}}%</div>
              <div class="td wrap">{{item.dianJing}}%</div>
              <div class="td wrap">{{item.lottery}}%</div>
              <div class="td wrap">{{item.tiYu}}%</div>
            </div>
          </div>
        </div>

      </div>
    </div>
    <div class="tips">
      <div class="tips-title">
        <img src="../../../../../assets/images/common/icon_warn.svg" />
        {{$t('invite.desc55')}}
      </div>
      <div class="desc">
        <p>{{$t('invite.desc43')}}：{{$t('invite.desc67')}}</p>
        <p>{{$t('invite.desc6')}}：{{$t('invite.desc56')}}</p>
      </div>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  levelRule: Array
})
</script>


<style lang='scss' scoped>
.table-con {
  margin-top: 0.16rem;
  border: 1px solid var(--gg-line);
  border-radius: 0.08rem 0.08rem 0 0;
  overflow: hidden;
}

.table-scroll {
  width: 100%;
  overflow-x: auto;

  &::-webkit-scrollbar {
    width: 4px;
    height: 4px;
  }

}

.table {
  // min-width: 10rem;

  &-title {
    font-family: 'PingFang SC';
    font-style: normal;
    font-weight: 500;
    font-size: 0.14rem;
    line-height: 1.4em;
    text-align: center;
    color: var(--theme);
    padding: 0.1rem;
    background: var(--gg-box-bg);
  }

  .table-head {
    .tr {
      .td {
        color: var(--gg-text);
        font-size: 0.14rem;
      }
    }
  }

  .table-body {
    max-height: 50vh;
    overflow-y: auto;

    .tr {
      .td {

        .vip-img {
          margin-right: 0.04rem;
          height: 0.22rem;
        }

        &:first-child {
          font-weight: 500;
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: center;

        }
      }
    }
  }

  .tr {
    border-top: 1px solid var(--gg-line);
    display: flex;

    .td {
      flex: 1;
      padding: 0.1rem 0.2rem;
      border-right: 1px solid var(--gg-line);
      font-family: 'PingFang SC';
      font-style: normal;
      font-weight: 400;
      font-size: 0.14rem;
      line-height: 1.4em;
      text-align: center;
      color: var(--gg-text);
      box-sizing: border-box;

      &:first-child {
        flex: 0 0 auto;
        width: 1.2rem;
      }



      &:last-child {
        border-right: none;
      }
    }
  }
}

.tips {
  margin-top: 0.2rem;

  &-title {
    font-family: 'PingFang SC';
    font-style: normal;
    font-weight: 400;
    font-size: 0.14rem;
    line-height: 1.5em;
    color: var(--gg-text);
    display: flex;
    align-items: center;

    img {
      margin-right: 0.04rem;
      width: 0.16rem;
    }

  }

  .desc {
    margin-top: 0.12rem;
    font-family: 'PingFang SC';
    font-style: normal;
    font-weight: 400;
    font-size: 0.14rem;
    line-height: 1.5em;
    color: var(--gg-subtitle);

  }
}

@media (max-width:992px) {
  .table {

    .table-body {
      .tr {
        .td {
          .vip-img {
            height: 0.18rem;
          }

          &:first-child {
            font-size: 0.14rem;
          }
        }
      }
    }

    .tr {
      .td {
        padding: 0.08rem;

        &:first-child {
          width: 1rem;
        }
      }

    }
  }
}

@media (max-width:749px) {
  .table {
    min-width: 7rem;

  }

  .tips {
    margin-top: 0.14rem;

    .title {
      font-size: 0.16rem;
    }

    .desc {
      margin-top: 0.08rem;
    }
  }
}
</style>