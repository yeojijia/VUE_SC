<template>
  <div class="earnings">
    <div class="title">
      {{$t('invite.desc42')}}
    </div>
    <div class="list">
      <div class="item-con">
        <div class="item">
          <div class="name">{{$t('invite.desc28')}}：</div>
          <div class="val wrap">{{info.addNum7Day}}</div>
        </div>
      </div>
      <div class="item-con">
        <div class="item">
          <div class="name">{{$t('invite.desc29')}}：</div>
          <div class="val wrap">{{info.addNum30Day}}</div>
        </div>
      </div>
      <div class="item-con">
        <div class="item">
          <div class="name">{{$t('invite.desc30')}}：</div>
          <div class="val wrap">{{info.totalTeamNum}}</div>
        </div>
      </div>
      <div class="item-con">
        <div class="item">
          <div class="name">{{$t('invite.desc31')}}：</div>
          <div class="val wrap">{{info.totalDirectNum}}</div>
        </div>
      </div>
      <div class="item-con">
        <div class="item">
          <div class="name">{{$t('invite.desc32')}}：</div>
          <div class="val wrap">{{info.totalIndirectNum}}</div>
        </div>
      </div>
      <div class="item-con">
        <div class="item">
          <div class="name">{{$t('invite.desc33')}}：</div>
          <div class="val wrap">{{info.validRate}}%</div>
        </div>
      </div>
      <div class="item-con">
        <div class="item">
          <div class="name">{{$t('invite.desc34')}}：</div>
          <div class="val wrap">${{info.rebate7Day}}</div>
        </div>
      </div>
      <div class="item-con">
        <div class="item">
          <div class="name">{{$t('invite.desc35')}}：</div>
          <div class="val wrap">${{info.rebate30Day}}</div>
        </div>
      </div>
      <div class="item-con">
        <div class="item">
          <div class="name">{{$t('invite.desc36')}}：</div>
          <div class="val wrap">${{info.totalRebate}}</div>
        </div>
      </div>
      <div class="item-con">
        <div class="item">
          <div class="name">{{$t('invite.desc37')}}：</div>
          <div class="val wrap">{{info.validBet7Day}}</div>
        </div>
      </div>
      <div class="item-con">
        <div class="item">
          <div class="name">{{$t('invite.desc38')}}：</div>
          <div class="val wrap">{{info.validBet30Day}}</div>
        </div>
      </div>
      <div class="item-con">
        <div class="item">
          <div class="name">{{$t('invite.desc39')}}：</div>
          <div class="val wrap">{{info.totalValidBet}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  info: Object
})
</script>


<style lang='scss' scoped>
.earnings {
  margin-top: 0.16rem;
  border-radius: 0.2rem;
  padding: 0.24rem;
  box-sizing: border-box;
  background: var(--gg-card-bg);

  .title {
    font-family: 'PingFang SC';
    font-style: normal;
    font-weight: 400;
    font-size: 0.18rem;
    line-height: 1.4em;
    color: var(--gg-text);
  }

  .list {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    width: calc(100% + 0.14rem);
    margin-left: -0.07rem;

    .item-con {
      margin-top: 0.12rem;
      flex: 0 0 auto;
      width: 16.66%;
      padding: 0 0.06rem;
      box-sizing: border-box;
    }

    .item {
      width: 100%;
      min-height: 100%;
      background: var(--gg-box-bg);
      padding: 0.12rem;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      // justify-content: center;
      align-items: center;
      position: relative;
      border-radius: 0.08rem;

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
        margin-top: 0.04rem;
        font-family: 'PingFang SC';
        font-style: normal;
        font-weight: 400;
        font-size: 0.2rem;
        line-height: 1.4em;
        text-align: center;
        color: var(--gg-text);
      }
    }

  }


}

@media (max-width:1280px) {
  .earnings {
    .list {
      .item-con {
        width: 25%;
      }
    }
  }
}

@media (max-width:992px) {
  .earnings {
    .list {
      .item-con {
        width: 33.33%;
      }
    }
  }
}

@media (max-width:749px) {
  .earnings {
    padding: 0.16rem;
    border-radius: 0.12rem;

    .title {
      font-size: 0.16rem;
      line-height: 0.22rem;
    }

    .list {
      width: calc(100% + 0.1rem);
      margin-left: -0.05rem;

      .item-con {
        margin-top: 0.1rem;
        width: 50%;
        padding: 0 0.05rem;
      }

      .item {
        border-radius: 0.1rem;

        .val {
          margin-top: 0;
          font-size: 0.18rem;
        }
      }
    }
  }
}
</style>