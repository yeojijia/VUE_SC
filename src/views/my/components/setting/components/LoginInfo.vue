<template>
  <div class="login-con">
    <div class="title">{{$t('my.desc103')}}</div>
    <div class="table">
      <div class="table-head">
        <div class="tr">
          <div class="td">{{$t('user.desc76')}}</div>
          <div class="td">{{$t('user.desc77')}}</div>
          <div class="td">{{$t('user.desc78')}}</div>
        </div>
      </div>
      <div class="table-body">
        <div class="tr" v-for="(item, index) of list" :key="item.id">
          <div class="td">
            <div class="name">{{$t('user.desc76')}}</div>
            <div class="val">{{item.createTime}}</div>
          </div>
          <div class="td">
            <div class="name">{{$t('user.desc77')}}</div>
            <div class="val">{{item.loginIp}}</div>
          </div>
          <div class="td">
            <div class="name">{{$t('user.desc78')}}</div>
            <div class="val">{{ item.deviceType }}</div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { _loginLog } from '@/utils/api/user'

const list = ref([])
function getLog() {
  _loginLog().then(res => {
    list.value = res
  })
}
onMounted(() => {
  getLog()
})
</script>


<style lang='scss' scoped>
.login-con {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: var(--gg-card-bg);
  border-radius: 0.2rem;
  padding: 0.24rem;
  box-sizing: border-box;

  .title {
    flex: 0 0 auto;
    margin-bottom: 0.16rem;
    font-family: 'PingFang SC';
    font-style: normal;
    font-weight: 400;
    font-size: 0.2rem;
    line-height: 2em;
    color: var(--gg-text);
  }

  .table {
    flex: 1;
    display: flex;
    flex-direction: column;
    font-family: 'PingFang SC';
    font-style: normal;
    font-weight: 400;
    font-size: 0.16rem;
    line-height: 1.4em;
    color: var(--gg-text);

    &-head {
      flex: 0 0 auto;
      background: var(--gg-box-bg);
      border-radius: 0.08rem 0.08rem 0 0;
      color: var(--gg-subtitle);
      font-size: 0.14rem;
      line-height: 1.5em;


    }

    &-body {
      // height: 30vh;
      max-height: 3.4rem;
      flex: 1;
      overflow-y: auto;

      .tr {
        padding-top: 0.16rem;
        padding-bottom: 0.16rem;

        .td {
          .name {
            display: none;
          }
        }
      }
    }

    .tr {
      display: flex;
      justify-content: space-between;
      padding: 0.1rem 0.2rem;
      border-bottom: 1px solid var(--gg-line);
      font-size: 0.14rem;
      line-height: 1.5em;

      &:last-child {
        border: none;
      }

      .td {
        padding-right: 0.1rem;
        flex: 2;
        // display: flex;
        // justify-content: center;
        box-sizing: border-box;

        &:first-child {}

        &:last-child {
          flex: 1;
          padding-right: 0;
          text-align: right;
        }
      }
    }
  }
}

@media (max-width:749px) {
  .login-con {
    width: 100%;
    padding: 0.16rem;
    border-radius: 0.12rem;

    .title {
      margin-bottom: 0.12rem;
      font-size: 0.16rem;
      line-height: 0.22rem;
    }

    .table {
      font-size: 0.14rem;

      &-head {
        display: none;
      }

      &-body {
        .tr {
          .td {
            .name {
              display: block;
              color: var(--gg-subtitle);
            }
          }
        }
      }

      .tr {
        flex-direction: column;
        margin-bottom: 0.12rem;
        padding: 0;
        border-bottom: 1px dashed var(--gg-line);

        &:last-child {
          margin-bottom: 0;

          .td {
            &:last-child {
              margin-bottom: 0;
            }
          }
        }

        .td {
          padding-right: 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.14rem;
          line-height: 1.5em;
          margin-bottom: 0.04rem;

          &:last-child {
            margin-bottom: 0.12rem;
          }
        }
      }
    }
  }
}
</style>