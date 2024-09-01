<template>
  <com-popup class="transfer-popup" v-model:show="_show" :title="$t('common.desc113')">
    <div class="content">
      <div class="to-con">
        <div class="to-left btn">
          <span class="name">{{$t('common.desc138')}}：</span>
          <span class="val"> ${{decal(totalBalance,3)}}</span>
        </div>
        <img :src="require(`../assets/images/common/${theme}/icon_to.svg`)" />
        <com-select class="select" v-model:show="accountShow" v-model:val="account" :list="accountList"
          :custom-field-name="{id: 'code',text: 'name',}" placement="bottom-end" :width="`${transferInpDomW}px`">
          <div class="to-right btn" @click.stop="accountShow = !accountShow" ref="transferInpDom">
            <div class="val overflow1" :class="{plac:!accountInfo.name}">
              {{ accountInfo?.name? accountInfo.name:$t('common.desc57') }}
            </div>
            <van-icon name="arrow-down" />
          </div>
        </com-select>
      </div>
      <div class="amount-con">
        <div class="item" v-for="(item, index) of amountList" :key="item.id" @click="amount = item.value">
          {{item.value}}
        </div>
      </div>
      <div class="box">
        <div class="box-title">{{$t('common.desc137')}}</div>
        <div class="box-con">
          <div class="inp">
            <input v-limit-input-number-twodecimals type="text" :placeholder="$t('common.desc136')" v-model="amount">

            <span class="max" @click="amount = decal(totalBalance,2)">{{$t('common.desc135')}}</span>
          </div>
        </div>
      </div>
      <div class="sub-btn" @click="handleTransfer">
        {{ $t("common.desc134") }}
      </div>
    </div>
  </com-popup>
</template>
<script setup>
import { ref, computed, getCurrentInstance, watch, nextTick } from "vue";
import { _coinBalance } from '@/utils/api/money'
import { _getAllPlatformBalance } from '@/utils/api/game'
import { useStore } from 'vuex';
const { proxy } = getCurrentInstance();
const store = useStore()
const decal = proxy.$common.decal
let theme = computed(() => store.state.global.theme)
let totalBalance = computed(() => store.state.user.gameTotalBalance)
let accountList = computed(() => store.state.user.platformBalanceList)
const props = defineProps({
  show: Boolean,
});

const emit = defineEmits(["update:show"]);
const _show = computed({
  get: () => {
    return props.show;
  },
  set: (e) => {
    emit("update:show", e);
  },
});
const amountList = ref([
  {
    id: 1,
    value: 100
  },
  {
    id: 2,
    value: 200
  },
  {
    id: 3,
    value: 1000
  },
  {
    id: 4,
    value: 2000
  },
  {
    id: 5,
    value: 5000
  },
])
const amount = ref('')
const account = ref(null)
const accountInfo = computed(() => {
  if (account.value) {
    return accountList.value.find(item => item.code === account.value)
  } else {
    return {
      name: ''
    }
  }
})
const accountShow = ref(false)
const transferInpDom = ref(null)
const transferInpDomW = ref(0)
watch(() => _show.value, async (e) => {
  if (e && accountList.value.length === 0) {
    store.dispatch('getGameBalanceList')
  }
  if (e) {
    nextTick(() => {
      transferInpDomW.value = transferInpDom.value.clientWidth
    })
    account.value = accountList.value[0].code
  }
})


//划转
function handleTransfer() {
  const transferAmount = Math.floor(amount.value * 100) / 100
  if (!amount.value) {
    spop({
      template: proxy.$t('common.desc136'),
      style: 'warning',
      autoclose: 2000
    })
    return
  }
  if (totalBalance.value < 1) {
    spop({
      template: proxy.$t('common.desc112', { n: 1 }),
      style: 'warning',
      autoclose: 2000
    })
    return
  }
  store.dispatch('transfer', { transferAmount, toPlatform: account.value }).then(res => {
    if (res) {
      spop({
        template: proxy.$t('common.desc115'),
        style: 'success',
        autoclose: 2000
      })
      amount.value = ''
      getRefresh()
    }
  })
}
//刷新余额
async function getRefresh() {
  store.dispatch('getGameTotalBalance')
  store.dispatch('getGameBalanceList')
  store.dispatch('getTotalBalance')
}
</script>

<style lang="scss" scoped>
.content {
  .to-con {
    display: flex;
    justify-content: space-between;
    align-items: center;

    img {
      margin: 0 0.21rem;
      flex: 0 0 auto;
      width: 0.56rem;
      height: 0.56rem;
    }

    .btn {
      flex: 1;
      height: 0.56rem;
      box-shadow: var(--gg-inp-shadow);
      background: var(--gg-inp-bg);
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'PingFang SC';
      font-style: normal;
      font-weight: 400;
      font-size: 0.14rem;
      border-radius: 0.1rem;
      color: var(--gg-text);
      padding: 0 0.16rem;
      box-sizing: border-box;

    }

    .to-left {
      display: flex;
      flex-direction: column;
      align-items: flex-start;

      .name {
        font-size: 0.12rem;
        line-height: 0.17rem;
      }

      .val {
        font-weight: 500;
        font-size: 0.16rem;
        line-height: 0.22rem;
      }
    }

    .to-right {

      justify-content: space-between;

      .val {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .plac {

        color: var(--gg-inp-plac);
      }

      .van-icon {
        color: var(--gg-inp-plac);
      }
    }

    :deep {
      .van-popover__wrapper {
        flex: 1;
      }
    }
  }

  .amount-con {
    margin-top: 0.08rem;
    display: flex;
    justify-content: space-between;

    .item {
      margin-top: 0.12rem;
      margin-right: 0.12rem;
      flex: 1;
      height: 0.4rem;
      border-radius: 0.06rem;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'PingFang SC';
      font-style: normal;
      font-weight: 400;
      font-size: 0.16rem;
      cursor: pointer;
      color: var(--gg-transfer-color);
      border: 1px solid var(--gg-transfer-border);

      &:hover {
        background: var(--gg-btn-bg);
        color: var(--gg-btn-color);
        border-color: transparent;
      }

      &:last-child {
        margin-right: 0;
      }
    }
  }

  .box {
    margin-top: 0.2rem;

    &-title {
      margin-bottom: 0.08rem;
      font-family: 'PingFang SC';
      font-style: normal;
      font-weight: 400;
      font-size: 0.14rem;
      line-height: 1.5em;
      color: var(--gg-text);
    }

    &-con {
      display: flex;
      justify-content: space-between;

      .inp {
        flex: 1;
        height: 0.48rem;
        background: var(--gg-inp-bg);
        box-shadow: var(--gg-inp-shadow);
        color: var(--gg-text);
        border-radius: 0.1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 0.16rem;

        input {
          width: 0;
          height: 100%;
          flex: 1;

          &::placeholder {

            color: var(--gg-inp-plac);
          }
        }

        .max {
          margin-left: 0.16rem;
          flex: 0 0 auto;
          color: var(--theme);
          cursor: pointer;
        }
      }


    }
  }

  .sub-btn {
    margin-top: 0.32rem;
    width: 100%;
    height: 0.52rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0.1rem;
    font-family: 'PingFang SC';
    font-style: normal;
    font-weight: 400;
    font-size: 0.16rem;
    line-height: 1.4em;
    border: 1px solid var(--gg-btn-border);
    background: var(--gg-btn-bg);
    color: var(--gg-btn-color);
    cursor: pointer;
  }

}

@media (max-width: 749px) {
  .content {
    .to-con {
      flex-direction: column;

      .btn {
        flex: 0 0 auto;
        width: 100%;
        height: 0.44rem;
      }

      .to-left {
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
      }

      img {
        width: 0.4rem;
        height: 0.4rem;
        margin: 0.1rem 0;
        transform: rotate(90deg);
      }

      :deep {
        .van-popover__wrapper {
          width: 100%;
        }
      }
    }

    .amount-con {
      .item {
        margin-right: 0.1rem;
        margin-top: 0.14rem;
      }
    }

    .sub-btn {
      height: 0.4rem;
    }
  }
}
</style>
<style>
.transfer-popup {
  width: 5rem;
}
</style>
