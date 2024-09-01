<template>
  <div class="trade" :class="{isNoMobile:!isMobile}">
    <div class="head">
      <div class="head-left">
        <div class="left-name" @click.stop="accountBotShow = true">
          {{ accountInfo?.name? accountInfo.name:$t('common.desc124') }}
          <van-icon name="arrow-down" />
        </div>
        <com-select v-model:val="accountId" class="select" :list="accountList" :custom-field-name="{
                                                                                          id: 'id',
                                                                                          text: 'name',
                                                                                        }" :custom="true"
          v-model:show="accountShow" placement="bottom-end">
          <div class="select-name" @click.stop="accountShow = !accountShow">
            <div class="val overflow1">
              {{ accountInfo?.name? accountInfo.name:$t('common.desc124') }}
            </div>
            <van-icon name="arrow-down" />
          </div>
        </com-select>
        <com-select v-model:val="typeId" class="select" :list="typeList" :custom-field-name="{
                                                                                          id: 'code',
                                                                                          text: 'name',
                                                                                        }" :custom="true"
          v-model:show="typeShow" placement="bottom-end">
          <div class="select-name" @click.stop="typeShow = !typeShow">
            <div class="val overflow1">
              {{ typeInfo?.name? typeInfo.name:$t('common.desc125') }}
            </div>
            <van-icon name="arrow-down" />
          </div>
        </com-select>
        <com-calendar placement="bottom-end" v-model:show="dateShow" :min-date="getMonth(-3)" :max-date="getMonth(1)"
          @confirm="handleDateConFirm">
          <div class="select-name select_date" @click.stop="dateShow = !dateShow">
            <div class="val overflow1">
              {{ date?date:$t('my.desc43') }}
            </div>
            <van-icon name="arrow-down" />
          </div>
        </com-calendar>
      </div>
      <div class="head-right">
        <div class="btn search" @click="handleSearch">{{$t('my.desc51')}}</div>
        <div class="btn reset" @click="handleReset">{{$t('common.desc89')}}</div>
        <div class="filter-btn" @click="filterShow = true">
          {{ $t('common.desc126') }}
          <img :src="require(`../../../../assets/images/common/${theme}/icon_filter.svg`) " />
        </div>
      </div>
    </div>
    <trade-list :finished="finished" :loading="loading" :isLoading="isLoading" :list="list" @load="handleLoad" />
    <bot-popup v-model:show="accountBotShow" :title="$t('common.desc124')">
      <div class="box">
        <div class="list">
          <div class="item" :class="{on:accountId===item.id}" v-for="item of accountList" :key="item.id"
            @click="accountId = item.id">
            {{ item.name }}</div>
        </div>
      </div>

    </bot-popup>
    <bot-popup v-model:show="filterShow" :title="$t('common.desc126')">
      <div class="box">
        <div class="title">{{ $t('common.desc125') }}</div>
        <div class="list">
          <div class="item" :class="{on:typeId === item.code}" v-for="item of typeList" :key="item.code"
            @click="typeId = item.code">
            {{ item.name }}</div>
        </div>
      </div>
      <div class="box">
        <div class="title">{{ $t('common.desc93') }}</div>
        <div class="list date-list">
          <div class="item" @click="dateShow = true">{{ startTime?startTime:$t('common.desc127') }}</div> <span>_</span>
          <div class="item" @click="dateShow = true">{{ endTime?endTime:$t('common.desc128') }}</div>
        </div>
      </div>
      <div class="btn-con">
        <div class="btn" @click="handleReset">{{$t('common.desc89')}}</div>
        <div class="btn" @click="handleSearch">{{$t('my.desc51')}}</div>
      </div>

    </bot-popup>
  </div>
</template>
<script setup>
import TradeList from './components/TradeList'
import { ref, computed, getCurrentInstance, onMounted, onUnmounted } from 'vue'
import { useStore } from 'vuex'
import { _getBillType, _getBillPage } from '@/utils/api/user'
const { proxy } = getCurrentInstance()
const store = useStore()
const isMobile = computed(() => store.state.global.isMobile)
let theme = computed(() => store.state.global.theme)
const getMonth = proxy.$common.getMonth
const filterShow = ref(false)

let accountId = ref(0)
const accountList = ref([
  {
    id: 0,
    name: proxy.$t('common.desc0'),
  },
  {
    id: 1,
    name: proxy.$t('common.desc97')
  },
  // {
  //   id: 2,
  //   name: proxy.$t('common.desc98')
  // },
  {
    id: 3,
    name: proxy.$t('common.desc99')
  },
])
const accountBotShow = ref(false)
const accountShow = ref(false)
const accountInfo = computed(() => {
  return accountList.value.find(item => item.id === accountId.value)
})


let typeId = ref(0)
const typeList = ref([{ name: proxy.$t('common.desc0'), code: 0 }])
const typeShow = ref(false)
const typeInfo = computed(() => {
  return typeList.value.find(item => item.code === typeId.value)
})

function getBillType() {
  _getBillType().then(res => {
    typeList.value = typeList.value.concat(res)
    handleLoad()
  })
}


const nowDate = new Date()
const dateShow = ref(false);
const startTime = ref(proxy.$common.moment(new Date(nowDate.getTime() - 6 * 24 * 60 * 60 * 1000)).format('YYYY-MM-DD'))
const endTime = ref(proxy.$common.moment(new Date(nowDate.getTime() + 24 * 60 * 60 * 1000)).format('YYYY-MM-DD'))
const date = computed(() => {
  if (startTime.value) {
    return startTime.value + " ~ " + endTime.value;
  } else {
    return ''
  }
})
const handleDateConFirm = (values) => {
  const [start, end] = values;
  startTime.value = proxy.$common.moment(start).format('YYYY-MM-DD');
  endTime.value = proxy.$common.moment(end).format('YYYY-MM-DD')
  date.value = startTime.value + " ~ " + endTime.value;
  dateShow.value = false;
};

const current = ref(0)
const size = ref(20)
const finished = ref(false)
const loading = ref(false);
const list = ref([]);
let isLoading = ref(false)

function handleSearch() {
  current.value = 0
  list.value = []
  finished.value = false
  filterShow.value = false
  handleLoad()
}

function handleReset() {
  current.value = 0
  list.value = []
  finished.value = false
  startTime.value = proxy.$common.moment(new Date(nowDate.getTime() - 6 * 24 * 60 * 60 * 1000)).format('YYYY-MM-DD')
  endTime.value = proxy.$common.moment(new Date(nowDate.getTime() + 24 * 60 * 60 * 1000)).format('YYYY-MM-DD')
  typeId.value = 0
  accountId.value = 0
}

function handleLoad() {
  if (isLoading.value) return
  isLoading.value = true
  current.value++
  getBillPage()
}

function getBillPage() {

  let data = {
    beginTime: `${startTime.value} 00:00:00`,
    endTime: `${endTime.value} 23:59:59`,
    page: current.value,
    pageSize: size.value,
  }
  if (accountId.value !== 0) {
    data.coinType = accountId.value

  }
  if (typeId.value !== 0) {
    data.tradeType = typeId.value
  }
  let loadingToast = proxy.$toast.loading({
    duration: 0,
  });
  _getBillPage(data).then(res => {
    list.value = list.value.concat(res.list)
    if (list.value.length >= res.page.count) {
      finished.value = true
    }
  }).finally(() => {
    isLoading.value = false
    loadingToast.clear()
  })
}

onMounted(() => {
  getBillType()
})
onUnmounted(() => {
  proxy.$toast.clear()

})
</script>


<style lang='scss' scoped>
.trade {
  .left-name {
    display: none;
  }

  .head {
    margin-bottom: 0.1rem;
    display: flex;
    justify-content: space-between;

    .select-name {
      margin-bottom: 0.06rem;
      margin-right: 0.12rem;
      min-width: 1.4rem;
      cursor: pointer;
      height: 0.4rem;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 0.12rem;
      white-space: nowrap;
      border-radius: 0.1rem;
      font-family: 'PingFang SC';
      font-style: normal;
      font-weight: 400;
      font-size: 0.14rem;
      line-height: 1.5em;
      color: var(--gg-text);
      background: var(--gg-select-bg);
      box-shadow: var(--gg-select-shadow);

      .val {
        width: 0;
        flex: 1 1 auto;
        margin-right: 0.05rem;
      }
    }

    .select_date {
      min-width: 2.5rem;

    }



    &-right {
      align-self: flex-end;
      display: flex;
      align-items: flex-end;

      .filter-btn {
        display: none;
      }

    }

    .btn {
      margin-bottom: 0.06rem;
      margin-left: 0.13rem;
      min-width: 0.72rem;
      height: 0.4rem;
      border-radius: 0.1rem;
      font-family: 'PingFang SC';
      font-style: normal;
      font-weight: 400;
      font-size: 0.14rem;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0 0.2rem;
      box-sizing: border-box;
      cursor: pointer;

      &.search {
        color: var(--gg-btn-color);
        background: var(--gg-btn-bg);
      }

      &.reset {

        border: 1px solid var(--theme);
        color: var(--theme);
      }


      &:first-child {
        margin-left: 0;
      }
    }
  }
}

@media (max-width:749px) {
  .trade {
    height: 100%;
    display: flex;
    flex-direction: column;


    .head {
      flex: 0 0 auto;
      margin-bottom: 0;
      height: 0.4rem;
      align-items: center;

      .head-left {
        flex: 1;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;

      }

      .head-right {
        align-self: center;
        align-items: center;

        .btn {
          display: none;
        }


        .filter-btn {
          font-family: 'PingFang SC';
          font-style: normal;
          font-weight: 400;
          font-size: 0.14rem;
          line-height: 1.5em;
          display: flex;
          align-items: center;

          img {
            margin-left: 0.04rem;
            width: 0.14rem;
            height: 0.14rem;
            object-fit: cover;
          }
        }
      }

      :deep {
        .van-popover__wrapper {
          display: none;
          padding-right: 0.1rem;
          width: 50%;
          flex: 0 0 auto;

          &:first-child {}

          &:nth-child(3) {
            flex: 0 0 auto;
            width: 100%;
          }
        }
      }

      .select-name {
        margin-right: 0;
        min-width: auto;
        width: 100%;
        height: 0.36rem;
        font-size: 0.12rem;
        padding: 0 0.1rem;
      }

      .select_date {
        width: 100%;
      }

      .btn {
        margin-left: 0;
        height: 0.36rem;
        // flex: 1;
        font-size: 0.14rem;
      }
    }

    .left-name {
      font-family: 'PingFang SC';
      font-style: normal;
      font-weight: 400;
      font-size: 0.14rem;
      line-height: 1.5em;
      display: flex;
      align-items: center;
      position: relative;

      :deep {
        .van-icon {
          margin-left: 0.04rem;
        }
      }
    }

    .box {
      display: flex;
      flex-direction: column;

      .title {
        font-family: 'PingFang SC';
        font-style: normal;
        font-weight: 400;
        font-size: 0.12rem;
        line-height: 0.17rem;
      }

      .list {
        margin-bottom: 0.3rem;
        display: flex;
        flex-wrap: wrap;

        &.date-list {
          align-items: center;
          justify-content: space-between;

          .item {
            margin-right: 0;
            flex: 1;
            text-align: center;
            justify-content: center;
            font-size: 0.14rem;
          }

          span {
            margin: 0 0.05rem;
          }
        }

        .item {
          margin-right: 0.14rem;
          margin-top: 0.1rem;
          height: 0.3rem;
          padding: 0 0.2rem;
          display: flex;
          align-items: center;
          border-radius: 0.15rem;
          background: var(--gg-tab-btn-bg);
          border-color: var(--gg-tab-btn-border);
          box-shadow: var(--gg-tab-btn-shadow);
          color: var(--gg-btn-text);

          &.on {
            background: var(--gg-btn-bg-active);
            color: var(--gg-btn-color-active);
          }
        }
      }


    }

    .btn-con {
      display: flex;
      margin-bottom: 0.4rem;

      .btn {
        flex: 1;
        margin-right: 0.25rem;
        height: 0.44rem;
        font-family: 'PingFang SC';
        font-style: normal;
        font-weight: 400;
        font-size: 0.16rem;
        line-height: 1.4em;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid var(--theme);
        color: var(--theme);
        border-radius: 0.12rem;

        &:last-child {
          margin-right: 0;
          background: var(--gg-btn-bg);
          border: 1px solid var(--gg-btn-border);
          color: var(--gg-btn-color);

        }
      }
    }
  }
}
</style>
