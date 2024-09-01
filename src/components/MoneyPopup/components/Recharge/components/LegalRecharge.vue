<template>
  <div class="recharge-con">
    <div class="from">
      <div class="box">
        <div class="inp-con" ref="inp2Dom">
          <com-select class="select" v-model:show="coinShow" v-model:val="coinId" :list="coinList" :custom-field-name="{
                id: 'id',
                text: 'name',
              }" placement="bottom-end" :width="`${inp2DomW}px`">
            <div class="select-name" @click.stop="coinShow = !coinShow">
              <div class="val">
                {{ coinInfo.name }}
              </div>
              <van-icon name="arrow-down" />
            </div>
          </com-select>
        </div>
      </div>
      <div class="box">
        <div class="inp-con">
          <input v-limit-input-number class="select-name" type="text" :placeholder="$t('common.desc75')" />
        </div>
      </div>
      <div class="box">
        <div class="inp-con">
          <div class="channel-list">
            <div class="channel-item">
              <div class="channel-btn">支付通道1</div>
            </div>
            <div class="channel-item">
              <div class="channel-btn">支付通道1</div>
            </div>
            <div class="channel-item">
              <div class="channel-btn">支付通道1</div>
            </div>
            <div class="channel-item">
              <div class="channel-btn">支付通道1</div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
<script setup>
import { ref, onMounted, getCurrentInstance, computed } from 'vue'
const { proxy } = getCurrentInstance()

const mainNetwork = ref(1)
function handlleMainNetworkTab(id) {
  mainNetwork.value = id
}

let coinList = ref([
  {
    id: 1,
    name: 'RMB'
  },
  {
    id: 2,
    name: 'BTC'
  }
])
let coinId = ref(1)
const coinInfo = computed(() => {
  return coinList.value.find(item => item.id === coinId.value)
})
const coinShow = ref(false)




function handleRechargeSub() { }

const inp2Dom = ref(null)
const inp2DomW = ref(0)
onMounted(() => {
  inp2DomW.value = inp2Dom.value.clientWidth
})

</script>


<style lang='scss' scoped>
.recharge-con {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .box {
    margin-bottom: 0.14rem;
    display: flex;
    align-items: center;

    .title {
      flex: 0 0 auto;
      height: 0.4rem;
      margin-right: 1em;
      white-space: nowrap;
      font-family: 'PingFang SC';
      font-style: normal;
      font-weight: 400;
      font-size: 0.14rem;
      color: #FFFFFF;
      display: flex;
      align-items: center;
    }

    .tabs {
      display: flex;
      flex-wrap: wrap;

      .tab {
        height: 0.4rem;
        margin-right: 0.2rem;
        border: 1px solid #5C5D68;
        border-radius: 0.06rem;
        font-family: 'PingFang SC';
        font-style: normal;
        font-weight: 400;
        font-size: 0.14rem;
        color: #D9DAE4;
        transition: all 0.3s linear;
        padding: 0 0.18rem;
        box-sizing: border-box;
        cursor: pointer;
        display: flex;
        align-items: center;

        &:last-child {
          margin-right: 0;
        }

        &:hover,
        &.on {
          color: #fff;
          background: conic-gradient(from 0deg at 50% 50%, #591FBF 0deg, #744BE7 0.01deg, #591FBF 360deg, #744BE7 360.01deg);
          border-color: transparent;
        }
      }
    }

    .inp-con {
      width: 0;
      flex: 1 1 auto;
    }

    :deep .van-popover__wrapper {
      width: 100%;
    }

    input {
      color: #fff !important;

      &::placeholder {
        color: #9EA0A4;
      }
    }

    .select-name {
      width: 100%;
      height: 0.4rem;
      border: 1px solid #5C5D68;
      border-radius: 0.06rem;
      font-family: 'PingFang SC';
      font-style: normal;
      font-weight: 400;
      font-size: 0.14rem;
      line-height: 0.17rem;
      color: #9EA0A4;
      transition: all 0.3s linear;
      padding: 0 0.18rem;
      box-sizing: border-box;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: space-between;



      &.address {
        height: auto;
        min-height: 0.4rem;
      }

      .val {
        padding: 0.1rem 0;
        flex: 1 1 auto;
        // white-space: nowrap;
      }
    }

    .copy-btn {
      flex: 0 0 auto;
      margin-left: 0.1rem;
      width: 0.12rem;
      height: 0.12rem;
      object-fit: cover;
    }

  }

  .code-con {
    padding: 0.2rem 0;
    width: 100%;
    display: flex;
    justify-content: center;

    .con {
      width: 1.3rem;
      height: 1.3rem;

      img {
        width: 100%;
      }
    }
  }

  .channel-list {
    margin-top: 0.06rem;
    width: calc(100% + 0.2rem);
    margin-left: -0.1rem;
    display: flex;
    flex-wrap: wrap;

    .channel-item {
      margin-bottom: 0.2rem;
      width: 50%;
      padding: 0 0.1rem;
      box-sizing: border-box;

      .channel-btn {
        cursor: pointer;
        width: 100%;
        height: 0.6rem;
        font-family: 'PingFang SC';
        font-style: normal;
        font-weight: 400;
        font-size: 0.2rem;
        line-height: 1.4em;
        color: #9399A0;
        display: flex;
        align-items: center;
        justify-content: center;
        background: conic-gradient(from 0deg at 50% 50%, #292B35 0deg, #353846 0.01deg, #292B35 360deg, #353846 360.01deg);
        border-radius: 0.06rem;
        transition: all 0.3s linear;

        &:hover {
          background: conic-gradient(from 0deg at 50% 50%, #591FBF 0deg, #744BE7 0.01deg, #591FBF 360deg, #744BE7 360.01deg);
          color: #fff;
        }

      }
    }
  }


}

@media (max-width: 749px) {
  .recharge-con {
    .box {
      margin-bottom: 0.08rem;

      .title {
        margin-right: 0.08rem;
      }

      .tabs {
        .tab {
          margin: 0.05rem 0;
          margin-right: 0.08rem;
          height: 0.36rem;
          font-size: 0.12rem;
          padding: 0 0.1rem;
        }
      }

      .select-name {
        height: 0.36rem;

        &.address {
          min-height: 0.36rem;
        }

        .val {
          padding: 0.08rem 0;
        }
      }


    }

    .code-con {
      padding: 0.15rem 0;
    }

    .btn {
      margin-top: 0.3rem;
      margin-bottom: 0.4rem;
      height: 0.36rem;
      font-size: 0.14rem;
    }

    .channel-list {
      width: calc(100% + 0.1rem);
      margin-left: -0.05rem;
      display: flex;
      flex-wrap: wrap;

      .channel-item {
        margin-bottom: 0.1rem;
        padding: 0 0.05rem;

        .channel-btn {
          height: 0.4rem;
          font-size: 0.14rem;
        }
      }
    }
  }


}
</style>