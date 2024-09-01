<template>
  <div class="collection-con">
    <div class="from">
      <div class="back" @click="emit('saveAdd')">
        <van-icon name="arrow-left" />
        {{$t('common.desc85')}}
      </div>
      <div class="box">
        <div class="title">{{$t('common.desc11')}}：</div>
        <div class="tabs">
          <div class="tab" :class="{on:tabId===item.id}" v-for="item of tabs" :key="item.id"
            @click="handlleMainNetworkTab(item.id)">{{item.name}}</div>
        </div>
      </div>
      <div class="box">
        <div class="title">
          {{$t('common.desc15')}}：
        </div>
        <div class="inp-con">
          <input type="text" class="select-name" :placeholder="$t('common.desc49')" v-model="address" />
        </div>
      </div>
      <div class="box">
        <div class="title">
          {{$t('common.desc77')}}：
        </div>
        <div class="inp-con">
          <div class="textarea-con">
            <textarea class="textarea wrap" :placeholder="$t('common.desc78')" v-model="mark" />
          </div>
        </div>
      </div>
    </div>
    <div class="btn" @click="handleCollectionSub">
      {{ $t("common.desc48") }}
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, getCurrentInstance, computed } from 'vue'
import { useStore } from 'vuex';
import { _withDrawAddressAdd } from '@/utils/api/money'
const { proxy } = getCurrentInstance()
const store = useStore()

const emit = defineEmits(['saveAdd'])
const tabId = ref(0)
const tabs = computed(() => store.state.global.chainList)
const chainId = computed(() => {
  return tabs.value.find(item => item.id === tabId.value).value
})
function handlleMainNetworkTab(id) {
  tabId.value = id
}
const address = ref('')
const mark = ref('')
function handleCollectionSub() {
  if (!address.value || !mark.value) {
    spop({
      template: proxy.$t('user.desc47'),
      style: 'warning',
      autoclose: 2000
    })
    return
  }
  proxy.$toast.loading({
    duration: 0,
    forbidClick: true,
  });
  _withDrawAddressAdd({
    address: address.value,
    chainId: chainId.value,
    mark: mark.value
  }).then(res => {
    if (res === 'success') {
      address.value = ''
      mark.value = ''
      spop({
        template: proxy.$t('common.desc79'),
        style: 'success',
        autoclose: 2000
      })
      emit('saveAdd')
    }
  }).finally(() => {
    proxy.$toast.clear()
  })
}

onMounted(() => {
})

</script>


<style lang='scss' scoped>
.collection-con {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .box {
    margin-bottom: 0.16rem;
    display: flex;
    flex-direction: column;

    .title {
      margin-bottom: 0.08rem;
      font-family: 'PingFang SC';
      font-style: normal;
      font-weight: 400;
      font-size: 0.14rem;
      line-height: 1.5em;
      color: var(--gg-text);
    }

    .tabs {
      width: 100%;
      display: flex;
      flex-wrap: wrap;

      .tab {
        height: 0.36rem;
        margin-right: 0.1rem;
        border-radius: 0.08rem;
        font-family: 'PingFang SC';
        font-style: normal;
        font-weight: 400;
        font-size: 0.14rem;
        padding: 0 0.17rem;
        cursor: pointer;
        display: flex;
        align-items: center;
        color: var(--gg-btn-text);
        border: 1px solid transparent;
        display: flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;

        &:last-child {
          margin-right: 0;
        }


        &.on {
          font-weight: 600;
          background: var(--gg-tab-btn-bg);
          border-color: var(--gg-tab-btn-border);
          box-shadow: var(--gg-tab-btn-shadow);
          color: var(--gg-text);
        }
      }
    }


    .inp-con {
      width: 100%;
    }

    :deep .van-popover__wrapper {
      width: 100%;
    }

    .select-name {
      width: 100%;
      height: 0.48rem;
      border-radius: 0.1rem;
      font-family: 'PingFang SC';
      font-style: normal;
      font-weight: 400;
      font-size: 0.16rem;
      line-height: 1.4em;
      color: var(--gg-text);
      box-shadow: var(--gg-inp-shadow);
      background: var(--gg-inp-bg);
      transition: all 0.3s linear;
      padding: 0 0.16rem;
      box-sizing: border-box;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: space-between;


      .max {
        flex: 0 0 auto;
        margin-left: 0.16rem;
        color: var(--theme);
      }

      .val {
        flex: 1 1 auto;

        &.place {
          color: var(--gg-inp-plac);
        }
      }

      .eye {
        margin-left: 0.16rem;
        flex: 0 0 auto;
        width: 0.22rem;
      }
    }

    input {
      &::placeholder {
        color: var(--gg-subtitle);
      }
    }




    .textarea-con {
      width: 100%;
      padding: 0 0.05rem;
      color: var(--gg-text);
      box-shadow: var(--gg-inp-shadow);
      background: var(--gg-inp-bg);
      border-radius: 0.1rem;
      box-sizing: border-box;
      padding: 0.13rem 0.16rem;
    }

    .textarea {
      width: 100%;
      height: 1rem;
      overflow-y: auto;
      resize: none;
      font-family: 'PingFang SC';
      font-style: normal;
      font-weight: 400;
      font-size: 0.16rem;
      line-height: 1.5em;
      color: var(--gg-text);

      &::placeholder {
        color: var(--gg-inp-plac);

      }
    }



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

  .back {
    margin-bottom: 0.2rem;
    font-family: 'PingFang SC';
    font-style: normal;
    font-weight: 400;
    font-size: 0.14rem;
    line-height: 1.4em;
    color: var(--theme);
    cursor: pointer;

    .van-icon {
      font-size: 0.16rem;
      margin-right: 0.02rem;
    }
  }
}

@media (max-width: 749px) {
  .collection-con {
    .back {
      font-size: 0.14rem;
    }

    .box {
      margin-bottom: 0.12rem;



      .tabs {
        .tab {
          margin-right: 0.12rem;
          height: 0.32rem;
          font-size: 0.14rem;
          line-height: 0.2rem;
          padding: 0 0.17rem;
          border-radius: 0.08rem;
        }
      }

      .select-name {
        height: 0.4rem;
        padding: 0 0.12rem;
        font-size: 0.14rem;

      }

      .textarea-con {
        padding: 0.1rem 0.12rem;
        font-size: 0.14rem;

      }

      .textarea {
        font-size: 0.14rem;
      }
    }

    .code-con {
      padding: 0.15rem 0;
    }

    .btn {
      margin-bottom: 0.12rem;
      height: 0.44rem;
      font-size: 0.14rem;
      border-radius: 0.08rem;
    }
  }
}
</style>