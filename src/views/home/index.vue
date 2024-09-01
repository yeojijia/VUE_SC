<template>
  <div class="content">
    <home-banner />
    <div class="com-container">
      <!-- <home-card v-if="!isMobile" /> -->
      <home-intr />
      <home-recent-swiper :list="recentList" :title="$t('home.desc6')" v-if="recentList.length" />


      <home-game-swiper :id="5" :list="DIANJINGList" :title="$t('nav.desc18')" v-if="DIANJINGList.length" />
      <home-game-swiper :id="1" :list="QIPAIList" :title="$t('nav.desc14')" v-if="QIPAIList.length" />
      <home-game-swiper :id="2" :list="SHIXUNList" :title="$t('nav.desc15')" :intr="$t('home.desc9')"
        v-if="SHIXUNList.length" />
      <home-game-swiper :id="3" :list="DIANZIList" :title="$t('nav.desc16')" :intr="$t('home.desc11')"
        v-if="DIANZIList.length" />
      <!-- <home-game-swiper :id="4" :list="BUYUList" :title="$t('nav.desc17')" v-if="BUYUList.length" /> -->
      <!-- <home-game-swiper :id="6" :list="LOTTERYList" :title="$t('nav.desc19')" v-if="LOTTERYList.length" /> -->

      <!-- <home-sport :id="7" :list="TIYUList" :title="$t('nav.desc3')" :intr="$t('home.desc13')" v-if="TIYUList.length" /> -->
      <home-reason :title="$t('home.desc18')" />
      <!-- <home-provider :title="$t('home.desc19')" /> -->
    </div>
  </div>
</template>
<script setup>
import HomeBanner from './components/HomeBanner';
import HomeCard from './components/HomeCard'
import HomeIntr from './components/HomeIntr'
import HomeRecentSwiper from './components/HomeRecentSwiper';
import HomeGameSwiper from './components/HomeGameSwiper'
import HomeReason from './components/HomeReason'
import HomeSport from './components/HomeSport'
import HomeProvider from './components/HomeProvider'
import { ref, getCurrentInstance, onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import { _ads } from '@/utils/api/common'
import { _gameList, _gamesParticipation } from '@/utils/api/game'
const { proxy } = getCurrentInstance()
const store = useStore()
const isLogin = computed(() => store.getters.isLogin)
const isMobile = computed(() => store.state.global.isMobile)

//最近
const recentList = ref([])
function getGamesParticipation() {
  if (!isLogin.value) {
    recentList.value = []
    return
  }
  _gamesParticipation().then(res => {
    recentList.value = res
  })
}

//棋牌
const QIPAIList = ref([])
function getQIPAI() {
  _gameList('QIPAI?isHot=true').then(res => {
    QIPAIList.value = res
  })
}
//真人
const SHIXUNList = ref([])
function getSHIXUN() {
  _gameList('SHIXUN?isHot=true').then(res => {
    SHIXUNList.value = res
  })
}
//电子
const DIANZIList = ref([])
function getDIANZI() {
  _gameList('DIANZI?isHot=true').then(res => {
    DIANZIList.value = res
  })
}
//捕鱼
const BUYUList = ref([])
function getBUYU() {
  _gameList('BUYU?isHot=true').then(res => {
    BUYUList.value = res
  })
}
//电竞
const DIANJINGList = ref([])
function getDIANJING() {
  _gameList('DIANJING?isHot=true').then(res => {
    DIANJINGList.value = res
  })
}
//彩票
const LOTTERYList = ref([])
function getLOTTERY() {
  _gameList('LOTTERY?isHot=true').then(res => {
    LOTTERYList.value = res
  })
}

//体育
const TIYUList = ref([])
function getTIYU() {
  _gameList('TIYU?isHot=true').then(res => {
    TIYUList.value = res
  })
}
onMounted(() => {
  getGamesParticipation()
  getQIPAI()
  getSHIXUN()
  getDIANZI()
  getBUYU()
  getDIANJING()
  getLOTTERY()
  getTIYU()
})
</script>


<style lang='scss' scoped>
.content {
  width: 100%;
  overflow: hidden;
  // padding-bottom: 0.5rem;
}
</style>