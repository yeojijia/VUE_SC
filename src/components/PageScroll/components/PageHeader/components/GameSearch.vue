<template>
  <div class="game-search" ref="searchDom">
    <van-popover v-model:show="show" placement="bottom-start">
      <template #reference>
        <div class="inp-con">
          <van-icon name="search" />
          <input type="text" :placeholder="`${ $t('game.desc1')} | ${$t('game.desc2')}`" v-model="searchVal" />
        </div>
      </template>
      <div class="scroll" :style="{ width: `${searchDomW}px`}">
        <div class="options">
          <div class="item" v-for="item of list" :key="item.code" @click="handleItemClick(item)">
            <div class="img-con">
              <com-image class="img" :src="item.picurl" />
            </div>
            <div class="text">
              <div class="name overflow1">
                {{ item.name }}</div>
              <div class="vendor overflow1">{{ item.thirdpartyModuleName }}</div>
            </div>
          </div>
        </div>
      </div>
    </van-popover>

  </div>
</template>
<script setup>
import { ref, watch, computed, onMounted, nextTick } from 'vue'
import { useRouter } from "vue-router";
import { useStore } from 'vuex';
import { _gameList } from '@/utils/api/game'
const store = useStore()
const router = useRouter();
let allList = ref([])
const resize = computed(() => store.state.global.resize)
const list = ref([])
const searchVal = ref('')
const show = ref(false)

watch(() => searchVal.value, () => {
  if (allList.value.length === 0) {
    getAllList()
  } else {
    handleSearch()
  }
  if (list.length) {
    show.value = true
  }
})

watch(() => list.value.length, (e) => {
  if (e) {
    show.value = true
  }
})

function getAllList() {
  let code = 'ALL'
  list.value = []
  _gameList(`${code}`).then(res => {
    allList.value = res
    handleSearch()
  })
}

function handleSearch() {
  if (searchVal.value === '') {
    list.value = []
    return
  }
  list.value = allList.value.filter(item => {
    return item.name.indexOf(searchVal.value) > -1 || item.thirdpartyModuleName.indexOf(searchVal.value) > -1
  })
}
function handleItemClick(item) {
  store.commit('SET_GAME_URL_PARAMS', {
    handler: item.handler,
    code: item.code,
    thirdpartyPlatformCode: item.thirdpartyPlatformCode,
    id: item.id
  })
  router.push('/games/detail')
}
const searchDom = ref(null)
const searchDomW = ref(0)
watch(() => resize.value, (cur) => {
  if (cur > 992) {
    handleDomW()
  }
}, {
  immediate: true
})
function handleDomW() {
  // nextTick(() => {
  setTimeout(() => {
    searchDomW.value = searchDom.value.clientWidth
  }, 500)
  // })
}
// onMounted(() => {
//   handleDomW()

// })
</script>


<style lang='scss' scoped>
.game-search {
  width: 100%;

  :deep {
    .van-popover__wrapper {
      width: 100%;
    }
  }



  .inp-con {
    width: 100%;
    height: 0.36rem;
    border-radius: 0.08rem;
    background: var(--gg-inp-bg);
    box-shadow: var(--gg-inp-shadow);
    display: flex;
    align-items: center;
    padding: 0 0.13rem;
    box-sizing: border-box;


    .van-icon {
      margin-right: 0.07rem;
      font-size: 0.18rem;
      flex: 0 0 auto;
      color: var(--gg-inp-plac);
    }

    input {
      flex: 1;
      width: 0;
      height: 100%;
      color: var(--gg-text);
      font-family: 'PingFang SC';
      font-style: normal;
      font-weight: 400;
      font-size: 0.14rem;
      line-height: 1.5em;

      &::placeholder {
        color: var(--gg-inp-plac);
      }
    }
  }
}

.scroll {
  background: var(--gg-inp-bg);
  box-shadow: var(--gg-inp-shadow);
  border-radius: 0.2rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  max-height: 50vh;
  padding: 0.14rem;


}

.options {
  width: 100%;
  max-height: 100%;
  overflow-y: auto;

  .item {
    margin-bottom: 0.14rem;
    width: 100%;
    cursor: pointer;
    box-sizing: border-box;
    display: flex;

    &:last-child {
      margin-bottom: 0;
    }

    .img-con {
      flex: 0 0 auto;
      width: 25%;
      position: relative;

    }

    .img {
      width: 100%;
      height: 0;
      padding-bottom: 100%;
      border-radius: 0.08rem;
      overflow: hidden;

    }

    .text {
      width: 0;
      flex: 1 1 auto;
      margin-left: 0.06rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .name {
        font-family: 'PingFang SC';
        font-style: normal;
        font-weight: 600;
        font-size: 0.14rem;
        line-height: 1.5em;
        color: var(--gg-text);
      }

      .vendor {
        margin-top: 0.1rem;
        font-family: 'PingFang SC';
        font-style: normal;
        font-weight: 400;
        font-size: 0.12rem;
        line-height: 1.5em;
        color: var(--gg-subtitle);
      }


    }
  }
}

@media (max-width:992px) {
  .game-search {
    display: none;
  }

  .options {
    .item {
      width: 25%;

      .img-con {
        width: 33.33%;
      }
    }
  }
}

@media (max-width:749px) {
  .options {
    padding: 0.05rem;

    .item {
      padding: 0.05rem;
      width: 50%;

      .img-con {
        width: 33.33%;
      }

      .text {
        .name {
          font-size: 0.14rem;
        }

        .vendor {
          font-size: 0.12rem;
        }
      }
    }
  }

}
</style>