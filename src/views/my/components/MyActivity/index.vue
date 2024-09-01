<template>
  <div class="game" :class="{isNoMobile:!isMobile}">
    <div class="head">
      <div class="head-left">
        <com-select v-model:val="nameId" class="select" :list="nameList" :custom-field-name="{
              id: 'id',
              text: 'name',
            }" :custom="true" v-model:show="nameShow">
          <div class="select-name" @click.stop="nameShow = !nameShow">
            <div class="val overflow1">
              {{ nameInfo.name }}
            </div>
            <van-icon name="arrow-down" />
          </div>
        </com-select>
        <com-calendar v-model:show="dateShow" :min-date="getDate(-3)" :max-date="getDate(1)" @confirm="onConfirm">
          <div class="select-name select_date" @click.stop="dateShow = !dateShow">
            <div class="val overflow1">
              {{ date?date:$t('my.desc43') }}
            </div>
            <van-icon name="arrow-down" />
          </div>
        </com-calendar>
      </div>
      <div class="head-right">
        <div class="btn">{{$t('my.desc51')}}</div>
        <div class="btn">{{$t('common.desc89')}}</div>
      </div>
    </div>
    <activity-list :finished="finished" :loading="loading" :list="list" @load="handleLoad" />
  </div>
</template>
<script setup>
import ActivityList from './components/ActivityList'
import { ref, computed, getCurrentInstance, inject } from 'vue'
import { _getBillPage } from '@/utils/api/user'
import { useStore } from 'vuex';
const { proxy } = getCurrentInstance()
const store = useStore()
const isMobile = computed(() => store.state.global.isMobile)

let nameId = ref(1)
const nameList = ref([
  {
    id: 1,
    name: '活动名称1'
  },
  {
    id: 2,
    name: '活动名称2'
  },
])
const nameShow = ref(false)
const nameInfo = computed(() => {
  return nameList.value.find(item => item.id === nameId.value)
})




const date = ref('')
const dateShow = ref(false);
let serachFrom = ref({})
// 时间
function getDate(day) {
  let now = new Date()
  let pastMonth = now.getMonth() + day
  now.setMonth(pastMonth)
  return now
}

const onConfirm = (values) => {
  const [start, end] = values;
  let endtime = new Date(end - 24 * 60 * 60 * 1000)
  serachFrom.value.start = proxy.$common.moment(start).format('YYYY-MM-DD 00:00:00');
  serachFrom.value.end = proxy.$common.moment(endtime).format('YYYY-MM-DD 23:59:59')
  date.value = serachFrom.value.start + "-" + serachFrom.value.end;
  dateShow.value = false;
};


const current = ref(0)
const isOrder = ref(true)
const orderBy = ref('id')
const orderType = ref('desc')  //example:升序 desc:降序
const size = ref(20)
const finished = ref(false)
const loading = ref(false);
const list = ref([]);
let isLoading = ref(false)

function handleSearch() {
  current.value = 0
  list.value = []
  finished.value = false
  handleLoad()
}

function handleReset() {
  current.value = 0
  list.value = []
  finished.value = false
  date.value = ''
  startTime.value = ''
  endTime.value = ''
  typeId.value = ''
}

function handleLoad() {
  if (isLoading.value) return
  isLoading.value = true
  current.value++
  getBillPage()
}

function getBillPage() {
  const pageParam = {
    current: current.value,
    orderType: orderType.value,
    size: size.value
  }
  const searchParam = {
    startTime: startTime.value,
    endTime: endTime.value,
    wb_bizModel: [typeId.value]
  }
  _getBillPage(pageParam, searchParam).then(res => {

    const { records, total } = res
    list.value = list.value.concat(records)
    if (total >= list.value.length) {
      finished.value = true
    }
    isLoading.value = false
  })
}
</script>


<style lang='scss' scoped>
.game {
  .head {
    margin-bottom: 0.2rem;
    display: flex;
    justify-content: space-between;

    &-left {
      display: flex;
      flex-wrap: wrap;
    }

    .select-name {
      margin-bottom: 0.1rem;
      margin-right: 0.13rem;
      min-width: 1.4rem;
      cursor: pointer;
      height: 0.44rem;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 0.2rem;
      white-space: nowrap;
      background: #22242D;
      border-radius: 0.06rem;
      font-family: 'PingFang SC';
      font-style: normal;
      font-weight: 400;
      font-size: 0.16rem;
      line-height: 1.375em;
      color: rgba(255, 255, 255, 0.53);

      .val {
        width: 0;
        flex: 1 1 auto;
        margin-right: 0.05rem;
      }
    }



    .select_date {
      min-width: 3.8rem;

    }

    &-right {
      align-self: flex-end;
      display: flex;
      align-items: flex-end;

    }

    .btn {
      margin-bottom: 0.1rem;
      margin-left: 0.13rem;
      min-width: 0.9rem;
      height: 0.44rem;
      background: #272A35;
      border-radius: 0.06rem;
      font-family: 'PingFang SC';
      font-style: normal;
      font-weight: 400;
      font-size: 0.16rem;
      color: #FFFFFF;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0 0.1rem;
      box-sizing: border-box;
      transition: all 0.3s linear;
      cursor: pointer;

      &:first-child {
        margin-left: 0;
      }

      &:hover {
        background: conic-gradient(from 0deg at 50% 50%, #591FBF 0deg, #744BE7 0.01deg, #591FBF 360deg, #744BE7 360.01deg);
      }
    }
  }
}

@media (max-width:749px) {
  .game {
    .head {
      flex-direction: column;

      .head-left {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
      }

      :deep {
        .van-popover__wrapper {
          flex: 1;

          &:first-child {
            // margin-right: 0.15rem;
          }

          &:last-child {
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
        height: 0.4rem;
        flex: 1;
        font-size: 0.14rem;
      }
    }
  }
}
</style>
