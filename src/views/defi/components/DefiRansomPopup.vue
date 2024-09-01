<template>
  <com-popup class="ransom-popup" v-model:show="_show" :title="$t('defi.desc13')">
    <div class="content">
      <div class="con-center">
        <div class="title" v-html="info.name"></div>
        <div class="box">
          <div class="name">{{$t('defi.desc23')}}：</div>
          <div class="val">{{ decal(info.userCanRedemptionAmount, 3) }} {{ info.pledgeCoin
            ?.symbol }}</div>
        </div>
        <div class="box">
          <div class="name">{{$t('defi.desc24')}}：</div>
          <div class="val">{{ info.userLockedAmount }} {{ info.pledgeCoin?.symbol }}</div>
        </div>
        <div class="inp-con">
          <input v-limit-input-number ref="pledgedInp" class="inp" type="text" :placeholder="$t('defi.desc25')"
            v-model="_amount" />
          <span @click="_amount = info.userCanRedemptionAmount">MAX</span>
        </div>
      </div>
      <div class="con-bot">
        <div class="btn-con" @click="handleConfirm">
          <loading-btn :loading="info.ransomloading" :loading-text="$t('defi.desc27')" class="btn">
            {{ $t("defi.desc26") }}
          </loading-btn>
        </div>
      </div>
    </div>
  </com-popup>
</template>
<script setup>
import { ref, computed, getCurrentInstance, watch, nextTick } from "vue";
import { _coinBalance } from '@/utils/api/money'
const { proxy } = getCurrentInstance();
const decal = proxy.$common.decal
const props = defineProps({
  show: Boolean,
  amount: [Number, String],
  info: Object,
});

const emit = defineEmits(["update:show", "confirm", "update:amount"]);
const _show = computed({
  get: () => {
    return props.show;
  },
  set: (e) => {
    emit("update:show", e);
  },
});



const _amount = computed({
  get() {
    return props.amount;
  },
  set(e) {
    emit("update:amount", e);
  },
});
let pledgedInp = ref(null)
watch(
  () => _show.value,
  (e) => {
    if (!e) {
      _amount.value = "";
    } else {
      nextTick(() => {
        pledgedInp.value.focus()
      })
    }
  }
);

function handleConfirm() {
  if (_amount.value > props.info.userCanRedemptionAmount) {
    spop({
      template: proxy.$t("defi.desc28"),
      style: 'warning',
      autoclose: 2000
    })
    return;
  }
  emit("confirm");
}

</script>

<style lang="scss" scoped>
.content {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;


  .title {
    padding-top: 0.12rem;
    padding-bottom: 0.1rem;
    font-family: 'PingFang SC';
    font-style: normal;
    font-weight: 400;
    font-size: 0.18rem;
    line-height: 1.4em;
    color: var(--gg-text);
  }

  .box {
    margin-top: 0.1rem;
    display: flex;
    justify-content: space-between;

    .name {
      width: 0;
      flex: 1;
      font-family: 'PingFang SC';
      font-style: normal;
      font-weight: 400;
      font-size: 0.16rem;
      line-height: 1.4em;
      color: var(--gg-subtitle);
    }

    .val {
      margin-left: 0.1rem;
      align-self: flex-end;
      flex: 0 0 auto;
      font-family: 'DIN Alternate';
      font-style: normal;
      font-weight: 500;
      font-size: 0.16rem;
      line-height: 1.4em;
      text-align: center;
      color: var(--theme);
    }
  }

  .inp-con {
    margin-top: 0.15rem;
    height: 0.48rem;
    color: var(--gg-text);
    box-shadow: var(--gg-inp-shadow);
    background: var(--gg-inp-bg);
    border-radius: 0.1rem;
    padding: 0 0.16rem;
    box-sizing: border-box;
    display: flex;
    align-items: center;

    input {
      height: 100%;
      width: 0;
      flex: 1 1 auto;
      color: var(--gg-text);
      font-family: 'PingFang SC';
      font-style: normal;
      font-weight: 400;
      font-size: 0.16rem;

      &::placeholder {
        color: var(--gg-inp-plac);
      }
    }

    span {
      height: 100%;
      margin-left: 0.16rem;
      color: var(--theme);
      font-size: 0.16rem;
      font-weight: bold;
      cursor: pointer;
      display: flex;
      align-items: center;
    }
  }



  .con-bot {

    .btn-con {
      width: 100%;
    }

    .btn {
      flex: 0 0 auto;
      margin-top: 0.32rem;
      margin-bottom: 10vh;
      width: 100%;
      height: 0.52rem;
      background: var(--gg-btn-bg);
      border: 1px solid var(--gg-btn-border);
      color: var(--gg-btn-color);
      font-weight: 500;
      border-radius: 0.12rem;
      font-size: 0.16rem;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }
  }
}

@media only screen and (min-width: 320px) and (max-width: 749px) {
  .content {
    .title {
      padding-top: 0;
      padding-bottom: 0.03rem;
      font-size: 0.16rem;
      line-height: 0.22rem;
    }

    .box {
      margin-top: 0.09rem;

      .name {
        font-size: 0.14rem;
      }

      .val {
        font-size: 0.14rem;
      }
    }

    .inp-con {
      margin-top: 0.2rem;
      height: 0.52rem;
      padding: 0 0.12rem;

      span {
        margin-left: 0.12rem;
      }
    }

    .con-bot {

      .btn-con {

        .btn {
          margin-bottom: 0.4rem;
          height: 0.48rem;
          border-radius: 0.1rem;
        }
      }
    }
  }
}
</style>
<style>
.ransom-popup {
  width: 4.5rem;
  max-width: 100%;
}

@media (max-width:749px) {
  .ransom-popup {
    border-radius: 0.2rem 0.2rem 0 0;
  }
}
</style>
