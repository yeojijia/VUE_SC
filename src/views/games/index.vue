<template>
  <div class="games">
    <div class="com-container ">
      <div class="game-head">
        <div class="tabs-con">
          <van-tabs class="tabs" v-model:active="tabActive" shrink swipe-threshold v-if="tabs.length">
            <van-tab v-for="item of tabs" :key="item.id" :name="item.id">
              <template #title>
                <img class="default" :src="item.icon" />
                <img class="on" :src="item.icon_on" />
                {{item.name}}
              </template>
            </van-tab>
          </van-tabs>
        </div>
        <div class="search-con">
          <game-search :allList="allList" />
        </div>
      </div>
    </div>
    <div class="scroll">
      <game-list :list="list" :finished="finished" :loading="loading" @load="handleLoad" />
    </div>
  </div>
</template>
<script setup>
import GameList from './components/GameList'
import { ref, getCurrentInstance, watch } from 'vue'
import { useRouter } from 'vue-router';
import { _gameList } from '@/utils/api/game'
const router = useRouter()
const { proxy } = getCurrentInstance()
const tabs = ref([
  {
    id: '0',
    icon: require('../../assets/images/nav/icon_game_all.svg'),
    icon_on: require('../../assets/images/nav/icon_game_all_on.svg'),
    name: proxy.$t('common.desc0'),
    code: 'ALL',
  },
  {
    id: '1',
    icon: require('../../assets/images/nav/icon_game_qipai.svg'),
    icon_on: require('../../assets/images/nav/icon_game_qipai_on.svg'),
    name: proxy.$t('nav.desc14'),
    code: 'QIPAI',
  },
  {
    id: '2',
    icon: require('../../assets/images/nav/icon_game_shixun.svg'),
    icon_on: require('../../assets/images/nav/icon_game_shixun_on.svg'),
    name: proxy.$t('nav.desc15'),
    code: 'SHIXUN',
  },
  {
    id: '3',
    icon: require('../../assets/images/nav/icon_game_dianzi.svg'),
    icon_on: require('../../assets/images/nav/icon_game_dianzi_on.svg'),
    name: proxy.$t('nav.desc16'),
    code: 'DIANZI',
  },
  {
    id: '4',
    icon: require('../../assets/images/nav/icon_game_buyu.svg'),
    icon_on: require('../../assets/images/nav/icon_game_buyu_on.svg'),
    name: proxy.$t('nav.desc17'),
    code: 'BUYU',
  },
  {
    id: '5',
    icon: require('../../assets/images/nav/icon_game_dianjing.svg'),
    icon_on: require('../../assets/images/nav/icon_game_dianjing_on.svg'),
    name: proxy.$t('nav.desc18'),
    code: 'DIANJING',
  },
  // {
  //   id: '6',
  //   icon: require('../../assets/images/nav/icon_lottery.svg'),
  //   icon_on: require('../../assets/images/nav/icon_lottery_on.svg'),
  //   name: proxy.$t('nav.desc19'),
  //   code: 'LOTTERY',
  // },
  // {
  //   id: '7',
  //   icon: require('../../assets/images/nav/icon_game_tiyu.svg'),
  //   icon_on: require('../../assets/images/nav/icon_game_tiyu_on.svg'),
  //   name: proxy.$t('nav.desc3'),
  //   code: 'TIYU',
  // },
])
const tabActive = ref('0')

const page = ref(1)
const pageSize = ref(12)
const allList = ref([])
const list = ref([])


let loading = ref(false)
let finished = ref(false)
watch(() => tabActive.value, (e) => {
  if (e) {
    router.push(`/games/${e}`)
  }
})
watch(() => {
  return {
    params: router.currentRoute.value.params,
    path: router.currentRoute.value.fullPath
  }
}, ({ params, path }) => {
  const { id } = params
  if (id && path.indexOf('games') > -1) {
    tabActive.value = id

    getList(tabActive.value)
  }
},
  { immediate: true }
)

function getList(id) {
  // let code = null
  // if (id === '0') {
  //   code = 'ALL'
  // } else {
  //   code = tabs.value.find(item => item.id === id).code
  // }
  let code = tabs.value.find(item => item.id === id).code
  allList.value = []
  list.value = []
  finished.value = false
  loading.value = true
  _gameList(`${code}`).then(res => {
    allList.value = res
    loading.value = false
    list.value = allList.value.slice(0, page.value * pageSize.value)
  })
}
function handleLoad() {
  page.value++
  const next = allList.value.slice(list.value.length, page.value * pageSize.value)
  list.value = list.value.concat(next)
  if (list.value.length === allList.value.length) {
    finished.value = true
  }
}


</script>


<style lang='scss' scoped>
.games {
  padding-top: 0.24rem;
  color: var(--gg-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .game-head {
    margin-bottom: 0.2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: var(--gg-game-head-bg);
    box-shadow: var(--gg-game-head-shadow);
    padding: 0.11rem 0.2rem;
    box-sizing: border-box;
    border-radius: 0.12rem;
  }

  .tabs-con {
    margin-right: 0.2rem;
    width: 0;
    flex: 1;



    img {
      flex: 0 0 auto;
      margin-right: 0.04rem;
      width: 0.16rem;
      height: 0.16rem;
      object-fit: cover;
    }

    .van-icon {
      margin-right: 0.04rem;
      font-size: 0.2rem;
    }

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
        color: var(--btn-text-3);
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

  .search-con {
    flex: 0 0 auto;
    width: 22%;
    min-width: 2rem;
  }

  .scroll {
    position: relative;
    flex: 1;
    width: 100%;
  }

  .game-bot {
    margin-top: 0.4rem;
    margin-bottom: 0.8rem;
    display: flex;
    flex-direction: column;
    align-items: center;

    .total {
      font-family: 'PingFang SC';
      font-style: normal;
      font-weight: 400;
      font-size: 0.18rem;
      line-height: 1.5em;
      color: var(--title);

      span {
        color: var(--gg-subtitle);
      }
    }

    .more {
      margin-top: 0.2rem;
      padding: 0 0.24rem;
      height: 0.4rem;
      font-family: 'PingFang SC';
      font-style: normal;
      font-weight: 400;
      font-size: 0.14rem;
      text-align: center;
      border-radius: 0.04rem;
      display: flex;
      align-items: center;
      background-color: var(--card-bg);
      cursor: pointer;
    }
  }
}

@media (max-width:749px) {
  .games {
    margin-top: 0;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding-top: 0;

    .game-head {
      margin-bottom: 0.12rem;
      flex-direction: column-reverse;
      background: none;
      box-shadow: none;
      padding: 0;
    }

    .tabs-con {
      flex: 0 0 auto;
      width: 100%;
      margin-right: 0;
      // margin-bottom: 0.1rem;
      // background: var(--gg-game-head-bg);
      // box-shadow: var(--gg-game-head-shadow);
      // padding: 0.11rem 0.2rem;
      box-sizing: border-box;
      // border-radius: 0.12rem;

      .tabs {}

      :deep {
        .van-tab {
          padding: 0;

          .van-tab__text {
            height: 0.32rem;
          }
        }
      }


    }

    .search-con {
      margin-top: 0.15rem;
      margin-bottom: 0.12rem;
      width: 100%;
      background: var(--gg-game-head-bg);
      box-shadow: var(--gg-game-head-shadow);
      padding: 0.1rem 0.12rem;
      border-radius: 0.1rem;
    }


    .scroll {
      flex: 1;
      width: 100%;
      overflow-y: auto;
    }

  }
}
</style>