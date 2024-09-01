<template>
  <div class="explain">
    <div class="explain-left">
      <div class="title">{{$t('invite.desc19')}}</div>
      <div class="box">
        <div class="box-top">
          <div class="img-con one">
            <img src="../../../../../assets/images/member/explain01.svg" />
          </div>
          <div class="text">
            <span>{{$t('invite.desc17')}}</span>
          </div>
        </div>
        <div class="box-desc">{{$t('invite.desc18')}}</div>
      </div>
    </div>
    <div class="explain-right">
      <div class="title">{{$t('invite.desc20')}}</div>
      <div class="box-list">
        <div class="box">
          <div class="box-top">
            <div class="img-con two">
              <img src="../../../../../assets/images/member/explain02.svg" />
            </div>
            <div class="text">
              <h4>01</h4>
              <span>{{$t('invite.desc17')}}</span>
            </div>
          </div>
          <div class="box-desc">{{$t('invite.desc18')}}</div>
        </div>
        <div class="box">
          <div class="box-top">
            <div class="img-con three">
              <img src="../../../../../assets/images/member/explain03.svg" />
            </div>
            <div class="text">
              <h4>02</h4>
              <span>{{$t('invite.desc17')}}</span>
            </div>
          </div>
          <div class="box-desc">{{$t('invite.desc18')}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
</script>


<style lang='scss' scoped>
.explain {
  margin-top: 0.16rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  border-radius: 0.2rem;
  padding: 0.24rem;
  box-sizing: border-box;
  background: var(--gg-card-bg);

  .title {
    margin-bottom: 0.1rem;
    font-family: 'PingFang SC';
    font-style: normal;
    font-weight: 400;
    font-size: 0.18rem;
    line-height: 1.4em;
    color: var(--gg-text);
  }

  .box {
    min-width: 2.5rem;
    background: var(--gg-box-bg);
    // backdrop-filter: blur(0.02rem);
    border-radius: 0.12rem;
    padding: 0.2rem;
    box-sizing: border-box;


    &-top {
      display: flex;
      align-items: center;

      .img-con {
        position: relative;


      }

      img {
        margin-right: 0.13rem;
        height: 0.48rem;
        width: 0.48rem;
        object-fit: cover;
      }

      .text {

        h4 {
          font-family: 'DIN Alternate';
          font-style: normal;
          font-weight: 700;
          font-size: 0.24rem;
          line-height: 1.4em;
          color: var(--gg-text);
        }

        span {
          font-family: 'PingFang SC';
          font-style: normal;
          font-weight: 400;
          font-size: 0.14rem;
          line-height: 1.4em;
          color: var(--gg-text);
        }
      }

    }

    &-desc {
      margin-top: 0.12rem;
      font-family: 'PingFang SC';
      font-style: normal;
      font-weight: 400;
      font-size: 0.14rem;
      line-height: 1.5em;
      color: var(--gg-subtitle);
    }
  }

  &-left {
    flex: 1 1 auto;
    margin-right: 5.5%;
    width: 30%;

    .box {
      flex: 1 1 auto;
    }
  }

  &-right {
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .box-list {
      flex: 1 1 auto;
      display: flex;

      .box {
        &:first-child {
          margin-right: 0.2rem;
        }
      }

    }
  }
}

@media (max-width:992px) {
  .explain {
    flex-direction: column;

    &-left {
      width: 100%;
      margin-right: 0;
      margin-bottom: 0.24rem;
    }
  }
}

@media (max-width:749px) {
  .explain {
    padding: 0.16rem;
    margin-top: 0.16rem;
    border-radius: 0.12rem;

    .title {
      margin-bottom: 0.08rem;
      font-size: 0.16rem;
      line-height: 0.22rem;
    }

    .box {
      padding: 0.14rem;
      border-radius: 0.1rem;

      &-top {
        img {
          margin-right: 0.08rem;
          width: 0.4rem;
          height: 0.4rem;
        }

        .text {
          h4 {
            font-size: 0.2rem;
          }

          span {
            margin-top: 0;
          }
        }
      }

    }

    &-left {

      margin-bottom: 0.16rem;
    }

    &-right {
      .box-list {
        flex-direction: column;

        .box {

          &:first-child {
            margin-right: 0;
            margin-bottom: 0.1rem;
          }
        }
      }
    }
  }
}
</style>