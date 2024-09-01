<template>
  <div class="level">
    <div class="level-item">
      <div class="item-left">
        <div class="img-con">
          <img :src="levelInfo.icon" />
        </div>
        <div class="text">
          <div class="name">{{levelInfo.name}}</div>
          <div class="rate">
            <div class="rate-name">{{$t('invite.desc4')}}：</div>
            <div class="rate-val">{{levelInfo.backRate}}%</div>
          </div>
        </div>
      </div>
      <div class="item-right">
        <div class="val">{{levelInfo.nextLevelBackRate}}%</div>
        <div class="name">{{$t('invite.desc9')}}：</div>
      </div>
    </div>
    <div class="level-item">
      <div class="item-left">
        <div class="img-con">
          <img :src="agencyInfo.icon" />
        </div>
        <div class="text">
          <div class="name">{{agencyInfo.name}} <span>{{$t('invite.desc57')}}</span></div>
          <div class="rate">
            <div class="rate-name">{{$t('invite.desc4')}}：</div>
            <div class="rate-val">{{agencyInfo.rebateRate}}%</div>
          </div>
        </div>
      </div>
      <div class="item-right">
        <div class="val">{{agencyInfo.nextLevelRebateRate}}%</div>
        <div class="name">{{$t('invite.desc9')}}：</div>
      </div>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  levelInfo: Object,
  agencyInfo: Object
})
</script>


<style lang='scss' scoped>
.level {
  display: flex;
  justify-content: space-between;

  &-item {
    flex: 1 1 auto;
    display: flex;
    justify-content: space-between;
    padding: 0.24rem 0;
    box-sizing: border-box;
    border-radius: 0.2rem;
    background: var(--gg-card-bg);


    .item-left {
      padding: 0 0.24rem;
      box-sizing: border-box;
      flex: 1 1 auto;
      display: flex;
      align-items: center;
      justify-content: center;

      .img-con {
        position: relative;
        width: 1.2rem;
        min-width: 0.7rem;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;

        &::before {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100%;
          height: 0;
          padding-bottom: 100%;
          border-radius: 50%;
          background: var(--gg-bot-card-bg);
        }

        img {
          width: 85%;
          z-index: 1;
        }
      }

      .text {
        height: 100%;
        margin-left: 0.15rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .name {
          padding: 0.4em 0;
          font-family: 'FZCuQian-M17S';
          font-style: normal;
          font-weight: 600;
          font-size: 0.24rem;
          line-height: 1.4em;
          text-align: center;
          color: var(--gg-text);
          display: flex;
          align-items: baseline;
          white-space: nowrap;

          span {
            font-size: 0.14rem;
          }
        }

        .rate {
          &-name {
            margin-top: 0.12rem;
            font-family: 'PingFang SC';
            font-style: normal;
            font-weight: 400;
            font-size: 0.14rem;
            line-height: 1.5em;
            text-align: center;
            color: var(--gg-subtitle);
          }

          &-val {
            margin-top: 0.04rem;
            font-family: 'Venryn Sans';
            font-weight: 900;
            font-size: 0.22rem;
            line-height: 1.4em;
            color: var(--gg-text);
          }
        }
      }
    }

    .item-right {
      padding: 0 0.24rem;
      box-sizing: border-box;
      border-left: 1px solid var(--gg-line);
      flex: 1 1 auto;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;

      .name {
        margin-top: 0.08rem;
        font-family: 'PingFang SC';
        font-style: normal;
        font-weight: 400;
        font-size: 0.14rem;
        line-height: 1.5em;
        color: var(--gg-subtitle);

      }

      .val {
        font-family: 'Venryn Sans';
        font-style: normal;
        font-weight: 900;
        font-size: 0.44rem;
        line-height: 1.45em;
        background: var(--theme);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        text-fill-color: transparent;
      }
    }

    &:first-child {
      margin-right: 0.24rem;
    }
  }
}

@media (max-width:1530px) {
  .level {
    margin-top: 0.16rem;

    &-item {

      .item {
        &-left {
          .img-con {
            width: 1rem;
            height: 1rem;
          }

          .text {
            .name {
              font-size: 0.26rem;
            }
          }
        }

        &-right {
          .val {
            font-size: 0.5rem;

          }
        }
      }
    }
  }
}

@media (max-width:992px) {
  .level {
    flex-direction: column;

    &-item {
      &:first-child {
        margin-bottom: 0.24rem;
        margin-right: 0;
      }
    }
  }
}

@media (max-width:749px) {
  .level {
    flex-direction: column;

    &-item {
      border-radius: 0.12rem;
      padding: 0 0.16rem;
      flex-direction: column;

      &:first-child {
        margin-bottom: 0.1rem;
        margin-right: 0;
      }

      .item {
        &-left {
          padding: 0.16rem 0;
          justify-content: flex-start;

          .img-con {
            width: 0.64rem;
            height: 0.64rem;
          }

          .text {
            width: 0;
            flex: 1;
            margin-left: 0.12rem;

            .name {
              padding: 0;
              margin-top: 0;
              margin-bottom: 0.06rem;
              font-size: 0.16rem;
              line-height: 0.22rem;
              text-align: left;
            }

            .rate {
              width: 100%;
              display: flex;
              align-items: center;
              justify-content: space-between;

              &-name {
                margin-top: 0;
                // margin-right: 0.08rem;
              }

              &-val {
                font-size: 0.14rem;
                margin-top: 0;
              }
            }
          }
        }

        &-right {
          padding: 0.16rem 0;
          flex-direction: row-reverse;
          align-items: center;
          justify-content: space-between;

          border-top: 1px solid var(--gg-line);
          border-left: none;

          .val {
            margin-left: 0.1rem;
            font-size: 0.14rem;
            line-height: 0.2rem;
          }

          .name {
            margin-top: 0;
          }
        }
      }
    }
  }
}
</style>