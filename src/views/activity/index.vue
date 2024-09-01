<template>
  <div class="activity">
    <div class="com-container ">
      <div class="tabs-con">
        <van-tabs v-model:active="activeId" shrink swipe-threshold @click-tab="handleClickTab"
          v-if="activityCategory.length">
          <van-tab v-for="item of activityCategory" :key="item.id" :name="item.id">
            <template #title>
              {{item.name}}
            </template>
          </van-tab>
        </van-tabs>
      </div>
    </div>
    <div class="com-container scroll">
      <div class="list-con">
        <div class="item-con" v-for="item of list" :key="item.id">
          <div class="item" @click="handleDetailShow(item.id)">
            <div class="img-con">
              <com-image class="img" :src="item.imgUrl" />
            </div>
            <div class="text">
              <div class="title">{{ item.name }}</div>
              <div class="date-to">
                <div class="date">
                  <div class="name">{{$t('activity.desc1')}}：</div>
                  <span>{{toTimeZone(item.startTime) }}
                    {{$t('common.desc103')}} {{ toTimeZone(item.endTime) }}</span>
                </div>
                <div class="to">
                  {{$t('activity.desc2')}}
                  <van-icon name="arrow" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <no-data v-if="(list.length===0&&!isLoading)" />
    </div>
    <detail-popup v-model:show="detailShow" :info="detailInfo" />
  </div>
</template>
<script setup>
import DetailPopup from './components/DetailPopup'
import { ref, watch, onUnmounted, getCurrentInstance, onActivated, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
import { _getActivityCategory, _getByCategory, _activityInfo } from '@/utils/api/common'
const router = useRouter()
const route = useRoute()
const store = useStore()
const { proxy } = getCurrentInstance()
let activityCategory = computed(() => store.state.global.activityCategory)
const toTimeZone = proxy.$common.toTimeZone
const activeId = ref(null)

let detailShow = ref(false)

function getTypes() {
  proxy.$toast.loading({
    duration: 0,
  });
  if (activityCategory.value.length > 0) {
    handleTabInit()
    proxy.$toast.clear()
    return
  }
  store.dispatch('getActivityCategory')
    .then(() => {
      handleTabInit()
    }).finally(() => {
      proxy.$toast.clear()
    })
}
function handleTabInit() {
  if (route.query.id) {
    activeId.value = Number(route.query.id)
  } else {
    activeId.value = activityCategory.value[0].id
  }
}

watch(() => activeId.value, (e) => {
  if (e) {
    getList()
  }
})
function handleClickTab({ name }) {
  activeId.value = name
}
let list = ref([])
const isLoading = ref(false)
function getList() {
  if (isLoading.value) return
  isLoading.value = true
  proxy.$toast.loading({
    duration: 0,
  });
  _getByCategory(activeId.value).then(res => {
    list.value = res
  }).finally(() => {
    proxy.$toast.clear()
    isLoading.value = false
  })
}

const detailInfo = ref(null)
const detailIsLoading = ref(false)
function handleDetailShow(id) {
  if (detailIsLoading.value) return
  detailIsLoading.value = true
  proxy.$toast.loading({
    duration: 0,
  });
  _activityInfo(id).then(res => {
    detailShow.value = true
    detailInfo.value = res
  }).finally(() => {
    proxy.$toast.clear()
    detailIsLoading.value = false
  })
}


onActivated(() => {
  getTypes()

})
onUnmounted(() => {
  proxy.$toast.clear()
})


</script>


<style scoped lang="scss">
.activity {
  padding-top: 0.34rem;
}





.tabs-con {
  background: var(--gg-game-head-bg);
  box-shadow: var(--gg-game-head-shadow);
  padding: 0.11rem 0.2rem;
  box-sizing: border-box;
  border-radius: 0.12rem;

  :deep {
    .van-tabs {
      border-radius: 0.08rem;
      overflow: hidden;

    }

    .van-tabs__line {
      display: none;
    }

    .van-tabs__wrap {
      height: auto;
    }

    .van-tabs__nav {
      padding: 0;
      background: transparent;

    }

    .van-tab {
      padding: 0 0.06rem;

      &:first-child {
        padding-left: 0;


      }

      .van-tab__text {
        height: 0.36rem;
        padding: 0 0.14rem;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        border-radius: 0.08rem;
        font-family: 'PingFang SC';
        font-style: normal;
        font-weight: 400;
        font-size: 0.14rem;
        line-height: 1.5em;
        color: var(--gg-subtitle);
        border: 1px solid transparent;

        .default {
          display: block;
        }

        .on {
          display: none;
        }

      }
    }

    .van-tab--active {
      .van-tab__text {
        font-weight: 500;
        background: var(--gg-nav-bg-active);
        color: var(--gg-nav-color-active);
        box-shadow: var(--gg-nav-shadow-active);
        border-color: var(--gg-nav-border-active);

        .default {
          display: none;
        }

        .on {
          display: block;
        }

      }
    }
  }
}

.list-con {
  margin-top: 0.24rem;
  margin-bottom: 0.5rem;
  display: flex;
  flex-wrap: wrap;
  width: calc(100% + 0.24rem);
  margin-left: -0.12rem;
  position: relative;

  .item-con {
    width: 50%;
    padding: 0 0.12rem;
    box-sizing: border-box;
  }

  .item {
    margin-bottom: 0.24rem;
    width: 100%;
    border-radius: 0.2rem;
    cursor: pointer;
    overflow: hidden;

    &:hover {
      .img-con {
        .img {
          transform: scale(1.05);
        }
      }

      .text {
        .title {
          color: var(--theme);
        }
      }
    }

    .img-con {
      position: relative;
      width: 100%;
      height: 0;
      padding-bottom: 28.98%;
      overflow: hidden;
      background: var(--gg-game-item-img-bg);

      .img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        transition: all 0.3s linear;

      }
    }

    .text {
      padding: 0.14rem 0.2rem;
      box-sizing: border-box;
      background: var(--gg-card-bg);

      .title {
        font-weight: 400;
        margin-bottom: 0.04rem;
        font-size: 0.2rem;
        line-height: 1.4em;
        color: var(--gg-text);
        transition: all 0.3s linear;

      }

      .date-to {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        font-family: 'PingFang SC';
        font-style: normal;
        font-weight: 400;
        font-size: 0.14rem;
        line-height: 1.5em;

      }

      .date {
        margin-right: 0.2rem;
        display: flex;
        color: var(--gg-subtitle);
      }

      .to {
        cursor: pointer;
        white-space: nowrap;
        color: var(--gg-text);
      }
    }


  }
}





@media (max-width: 749px) {
  .activity {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding-top: 0;



    .scroll {
      flex: 1 1 auto;
      overflow-y: auto;
    }
  }

  .tabs-con {
    padding: 0.16rem 0 0.12rem;
    background: none;
    box-shadow: none;
  }


  .list-con {
    margin-top: 0;
    margin-bottom: 0.4rem;
    width: 100%;
    margin-left: 0;

    .item-con {
      padding: 0;
      width: 100%;


    }

    .item {
      margin-bottom: 0.1rem;
      border-radius: 0.1rem;

      .text {
        padding: 0.08rem 0.12rem;

        .title {
          font-size: 0.14rem;
        }

        .date-to {
          width: 100%;
          font-size: 0.12rem;
          line-height: 0.17rem;
        }

        .date {
          width: 100%;
          margin-right: 0;
          display: flex;
          flex-wrap: wrap;

          .name {
            flex: 0 0 auto;
          }
        }

        .to {
          font-size: 0.12rem;
          display: none;
        }
      }
    }
  }
}
</style>
