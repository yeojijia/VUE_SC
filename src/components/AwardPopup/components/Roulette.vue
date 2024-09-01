<template>
  <div class="content">
    <audio controls loop class="audio" ref="audio1">
      <source src="../../../assets/images/award/bg.mp3" type="audio/mpeg" />
      您的浏览器不支持 audio 元素。
    </audio>
    <audio controls loop class="audio" ref="audio2">
      <source src="../../../assets/images/award/rotate.mp3" type="audio/mpeg" />
    </audio>
    <audio controls loop class="audio" ref="audio3">
      <source src="../../../assets/images/award/win.mp3" type="audio/mpeg" />
    </audio>
    <audio controls class="audio" ref="audio4">
      <source src="../../../assets/images/award/applause.mp3" type="audio/mpeg" />
    </audio>
    <div class="con-top">
      <div class="title" :class="{en:lang==='en'}">
        <img src="../../../assets/images/award/title_en.png" />
      </div>

      <van-icon name="cross" class="close" @click="emit('hide')" />
    </div>
    <div class="con-center">
      <div class="myLucky">
        <img class="decorate" src="../../../assets/images/award/decorate.png" />
        <div class="canvas">
          <div class="border-bg" :class="{flashing:flashingShow}">

          </div>
          <LuckyWheel ref="myLucky" :width="luckyW" :height="luckyW" :prizes="prizes" :blocks="blocks" :buttons="buttons"
            :defaultConfig="defaultConfig" :defaultStyle="defaultStyle" @start="startCallback" @end="endCallback" />
          <div class=" mask">
            <img src="../../../assets/images/award/mask_1.svg" />
          </div>
          <div class="mask">
            <img src="../../../assets/images/award/mask.png" />
          </div>
          <div class="border" :class="{flashing:flashingShow}">
            <div class="border-item" v-for="(item, index) of 19" :key="index">
              <i />
            </div>
          </div>
          <div class="start" @click="startCallback">
            <img class="spin" :class="{animation:spinShow}" src="../../../assets/images/award/spin.png">
          </div>
        </div>
        <img class="selecked" src="../../../assets/images/award/selecked.png" />
      </div>
      <div class="amount">
        <div class="val">$ {{info?.maxBonus}}</div>
        <div class="name">{{$t('award.desc5')}}</div>
      </div>
      <div class="frequency">{{$t('award.desc6',{n:info?.times?info?.times:0})}}</div>
      <div class="to-con">
        <div class="item" @click="emit('change','DeawRecord')">{{$t('award.desc7')}} <van-icon name="arrow" /></div>
        <div class="item" @click="emit('change','TimesRecord')">{{$t('award.desc8')}} <van-icon name="arrow" /></div>
      </div>
      <div class="celebrate">
        <div class="border-gradient">
          <van-notice-bar left-icon="volume-o" :scrollable="false">
            <van-swipe vertical class="notice-swipe" :autoplay="3000" :touchable="false" :show-indicators="false">
              <van-swipe-item v-for="item of winnings" :key="item.id"
                v-html="$t('award.desc20',{n1:item.userName,n2:item.amount})"></van-swipe-item>
            </van-swipe>
          </van-notice-bar>
        </div>
      </div>
    </div>
  </div>

  <img class="gold" src="../../../assets/images/award/gold.gif" v-show="goldShow" />
  <div class="win-popup" :class="{show:winShow}" ref="downBox">
    <van-icon name="cross" class="win-close" :class="{opacityHide:downLoading}" @click="winShow = false" />
    <div class="text-con">
      <div class="text">
        <img class="bg" src="../../../assets/images/award/win_test_decorate.png" />
        <img class="img-fail" src="../../../assets/images/award/fail_test.png" v-if="drawAmount===0" />
        <img class="img"
          :src="lang==='en'?require('../../../assets/images/award/win_test_en.png'):require('../../../assets/images/award/win_test_en.png') "
          v-else />
      </div>
    </div>
    <div class="amount-con">
      <div class="amount">
        + ${{drawAmount}}
      </div>
    </div>
    <div class="btn-con" :class="{opacityHide:downLoading}">
      <div class="btn on" v-if="Number(drawAmount) === 0" @click="winShow = false">{{ $t('award.desc25') }}</div>
      <div class="btn on" @click="getRewardsDraw" v-if="grantTypeNum===1 &&Number(drawAmount) !== 0">{{ $t('award.desc12')
        }}
      </div>
      <div class="btn save" @click.stop="handleDownload" v-if="drawAmount>0">
        {{ $t('award.desc22') }}
      </div>
    </div>
    <div class="invite">
      <div class="invite-left">
        <p>{{ $t('award.desc23') }}</p>
        <span>{{ $t('award.desc24') }}</span>
      </div>
      <div class="invite-right">
        <div ref="inviteCodeUrl" id="qrcodeUrl" />
      </div>
    </div>
    <!-- <div class="share">
      <div class="share-title">Share on social media</div>
      <div class="share-list">
        <div class="item-con" v-for="(item) of links" :key="item.id">
          <div class="item">
            <img :src="item.imgUrl" />
          </div>
        </div>
      </div>
    </div> -->
  </div>
</template>
<script setup>
import html2canvas from "html2canvas";
import QRCode from 'qrcodejs2';
import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick, getCurrentInstance } from "vue";
import { useStore } from "vuex";
import { _turntableDraw } from '@/utils/api/user'
import { _ads, _rewardsDraw } from '@/utils/api/common'
const { proxy } = getCurrentInstance()
const store = useStore();
const isMobile = computed(() => store.state.global.isMobile)
const lang = computed(() => store.state.user.lang)
const inviteInfo = computed(() => store.state.user.inviteInfo)
const isLogin = computed(() => store.getters.isLogin)
const decal = proxy.$common.decal
const props = defineProps({
  ribbon: Boolean,
  show: Boolean,
  info: Object,
  winnings: Array
});
const emit = defineEmits(["update:ribbon", "confirm", "change", 'hide', 'succ', 'toActivity']);
const inviteCodeUrl = ref(null)
async function handleCreatQrCode() {
  await store.dispatch('getUserInviteInfo')
  inviteCodeUrl.value.innerHTML = ''
  new QRCode(inviteCodeUrl.value, {
    text: inviteInfo.value.inviteUrl, // 需要转换为二维码的内容
    width: 120,
    height: 120,
    correctLevel: QRCode.CorrectLevel.H,
  })
}

const blocks = ref([
  { padding: '0.05rem', },
])
const prizes = ref([])

watch(() => props.info, () => {
  if (props.info.bonusList && props.info.bonusList.length) {
    handleListPush()
  }
}, {
  immediate: true,
  deep: true
})
const links = ref([])
function getLinks() {
  if (links.value.length > 0) {
    return
  }
  _ads({ positionKey: 'BOTTOM_MENU_3' }).then(res => {
    links.value = res[0].nodeList
  })
}
function handleListPush() {
  const colors = ['#9FD102', '#FFD300', '#FF9200', '#CB2C00', '#C41FC2', '#932BFF', '#0076FF', '#23A600']
  prizes.value = props.info.bonusList.map((item, index) => {
    const background = index % colors.length === 0 ? colors[0] : colors[index % colors.length]
    return {
      id: item.id,
      fonts: [{ text: item.awardAmount, top: '15%', fontSize: isMobile.value ? '0.12rem' : '0.16rem' }],
      background
    }
  })
}

const buttons = ref([
  {
    radius: '28%',
    background: 'transparent',
    pointer: true,
    fonts: [{ text: '开始', top: '-10px' }]
  }
])

const defaultConfig = ref({})
const defaultStyle = ref({
  fontColor: '#fff'
})
const winShow = ref(false)
const goldShow = ref(false)
const flashingShow = ref(false)
const myLucky = ref(null)
const audio1 = ref(null)
const audio2 = ref(null)
const audio3 = ref(null)
const audio4 = ref(null)
const spinShow = ref(false)
let timer1 = ref(null)
let timer2 = ref(null)
let timer3 = ref(null)
let timer4 = ref(null)

const luckyW = computed(() => {
  if (isMobile.value) {
    return '2rem';
  } else {
    return '2.95rem';
  }

});

watch(() => luckyW.value, () => {
  nextTick(() => {
    myLucky.value.init()
  })
})
function getTurntableDraw() {
  return _turntableDraw({
    activityId: props.info.id
  })
}
const drawIndex = ref(-1)
const drawAmount = ref(0)
const grantTypeNum = ref(1)//发放类型 0-客服发放 1-彩金发放 2-自动发放
const drawId = ref(null)//彩金id
function startCallback() {
  if (!isLogin.value) {
    spop({
      template: proxy.$t('common.desc4'),
      style: 'info',
      group: 'login-prompt',
      autoclose: 2000
    })
    emit('hide')
    return
  }
  if (props.info.times === 0) {
    emit('toActivity')
    return
  }
  myLucky.value.play()
  // 模拟调用接口异步抽奖
  audio2.value.play()
  spinShow.value = false
  getTurntableDraw().then(res => {
    const { grantType, id, resultId } = res
    grantTypeNum.value = grantType
    drawId.value = id
    // 假设后端返回的中奖索引是0
    drawIndex.value = prizes.value.findIndex(item => item.id === resultId)
    if (drawIndex.value >= 0) {
      drawAmount.value = props.info.bonusList[drawIndex.value].awardAmount
    }
    emit('succ')
    // 调用stop停止旋转并传递中奖索引
    myLucky.value.stop(drawIndex.value)
    audio3.value.play()
    flashingShow.value = true
    goldShow.value = true
    getLinks()
    timer2.value = setTimeout(() => {
      audio3.value.pause()
      audio4.value.play()
      winShow.value = true
      flashingShow.value = false
      goldShow.value = false
      audio2.value.pause()
      spinShow.value = true
      timer3.value = setTimeout(() => {
        emit('update:ribbon', true)
        timer4.value = setTimeout(() => {
          emit('update:ribbon', false)
        }, 3200)
      }, 300)

    }, 2500)
  })
  // timer1.value = setTimeout(() => {

  // }, 3000)
}

const downBox = ref(null)
const downLoading = ref(false)
function handleDownload() {
  if (downLoading.value) return
  downLoading.value = true
  nextTick(() => {
    const w = downBox.value.clientWidth
    const h = downBox.value.clientHeight
    html2canvas(downBox.value, {
      backgroundColor: 'transparent',
      useCORS: true,
      allowTaint: true,
      x: -w / 2,
      y: -h / 2,
      scrollX: 0,
      scrollY: 0
    }).then((canvas) => {
      const a = document.createElement("a");
      a.download = `inviteCodeUrl.png`;
      a.href = canvas.toDataURL("image/png");
      a.click();
    }).finally(() => {
      downLoading.value = false
    })
  })
}


function endCallback(prize) {
  console.log(prize)
}
//获取轮盘列表
function getThematicActivitiesListByApp() {

}

//彩金领取
function getRewardsDraw() {
  _rewardsDraw({
    ids: [drawId.value]
  }).then(res => {
    if (res === 'success') {
      spop({
        template: proxy.$t('award.desc21'),
        style: 'success',
        autoclose: 2000
      })
      winShow.value = false
    }
  })
}

watch(() => props.show, async (e) => {
  if (!e) {
    audio1.value.pause()
    audio2.value.pause()
    audio3.value.pause()
    audio4.value.pause()
    clearTimeout(timer1.value)
    clearTimeout(timer2.value)
    clearTimeout(timer3.value)
    clearTimeout(timer4.value)
    goldShow.value = false
    winShow.value = false
    emit('update:ribbon', false)
  } else {
    nextTick(() => {
      audio1.value.play()
      spinShow.value = true
    })
    getThematicActivitiesListByApp()
    handleCreatQrCode()
  }
}, {
  immediate: true
})

onMounted(() => {

})
onBeforeUnmount(() => {
  audio1.value.pause()
  audio4.value.pause()
})
</script>

<style lang="scss" scoped>
@keyframes flashing1 {
  from {
    background: radial-gradient(50% 50% at 50% 50%, #FFFFFF 0%, #FFFFFF 67.15%, #FCEC35 100%);
    box-shadow: 0px 1px 2px rgba(252, 236, 53, 0.5);
  }

  to {
    background: linear-gradient(231.03deg, #FFE41D 13.91%, #FFFBCD 26.01%, #FEE10A 45.79%, #E69721 66.07%, #A95A0D 85.5%);
    box-shadow: none
  }
}

@keyframes flashing2 {

  from {
    background: linear-gradient(231.03deg, #FFE41D 13.91%, #FFFBCD 26.01%, #FEE10A 45.79%, #E69721 66.07%, #A95A0D 85.5%);
    box-shadow: none
  }

  to {
    background: radial-gradient(50% 50% at 50% 50%, #FFFFFF 0%, #FFFFFF 67.15%, #FCEC35 100%);
    box-shadow: 0px 1px 2px rgba(252, 236, 53, 0.5);
  }
}

@keyframes rotate {
  0% {
    transform: scale(1) rotate(0);
  }

  50% {
    transform: scale(0.85) rotate(-15deg);
  }

  100% {
    transform: scale(1) rotate(0);

  }
}

.gold {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}

.audio {
  position: absolute;
  opacity: 0;
}



.content {
  max-width: 90vw;
  width: 4.44rem;
  height: 7rem;
  max-height: 85vh;
  background: url('../../../assets/images/award/award_popup_bg.png') no-repeat center;
  background-size: cover;
  border-radius: 0.16rem;
  overflow: hidden;
  padding: 0.24rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;


  .con-top {
    flex: 0 0 auto;
    margin-top: 0.12rem;
    margin-bottom: 0.1rem;
    width: 100%;
    position: relative;

    .title {
      font-family: 'FZCuQian-M17S';
      font-style: normal;
      font-weight: 400;
      font-size: 0.5rem;
      line-height: 0.59rem;
      text-align: center;
      letter-spacing: 0.12rem;
      background: linear-gradient(180deg, #FCFE8C 0%, #E1A853 53.9%, #FCFE8C 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-fill-color: transparent;
      text-shadow: 0.02rem 0px 0px #C5903A;

      img {
        height: 0.4rem;
      }

      &.en {
        letter-spacing: 0;

      }
    }

    .close {
      position: absolute;
      top: 0;
      right: 0;
      cursor: pointer;

      &.van-icon {
        font-size: 0.2rem;
        color: #fff;
      }
    }

  }

  .con-center {
    padding-top: 0.35rem;
    flex: 1;
    // overflow-y: auto;
    width: calc(100% + 0.48rem);
    // margin-left: -0.24rem;
    display: flex;
    flex-direction: column;
    align-items: center;

  }

  .myLucky {
    position: relative;
    border-radius: 50%;

    .selecked {
      position: absolute;
      top: 0;
      left: 50%;
      transform: translate(-50%, -60%);
      width: 0.78rem;
    }

    .canvas {
      position: relative;
      // background: #000;
      border-radius: 50%;

      // overflow: hidden;
      .border-bg {
        position: absolute;
        top: calc(50% - 0.03rem);
        left: 50%;
        transform: translate(-50%, -50%);
        width: calc(100% + 0.5rem);
        height: calc(100% + 0.5rem);
        background: url('../../../assets/images/award/border.png') no-repeat center;
        background-size: 100% 100%;

      }

      .border {
        position: absolute;
        top: calc(50% - 0.03rem);
        left: 50%;
        transform: translate(-50%, -50%);
        width: calc(100% + 0.5rem);
        height: calc(100% + 0.5rem);

        .border-item {
          font-size: 0.18rem;
          width: 0.5em;
          height: 0.5em;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          transform-origin: center center;
          display: flex;
          align-items: center;
          justify-content: center;



          &:nth-child(1) {
            transform: translate(-50%, -50%) rotate(20deg);
          }

          &:nth-child(2) {
            transform: translate(-50%, -50%) rotate(40deg);
          }

          &:nth-child(3) {
            transform: translate(-50%, -50%) rotate(60deg);
          }

          &:nth-child(4) {
            transform: translate(-50%, -50%) rotate(80deg);
          }

          &:nth-child(5) {
            transform: translate(-50%, -50%) rotate(100deg);
          }

          &:nth-child(6) {
            transform: translate(-50%, -50%) rotate(120deg);
          }

          &:nth-child(7) {
            transform: translate(-50%, -50%) rotate(140deg);
          }

          &:nth-child(8) {
            transform: translate(-50%, -50%) rotate(160deg);
          }

          &:nth-child(9) {
            transform: translate(-50%, -50%) rotate(180deg);
          }

          &:nth-child(10) {
            transform: translate(-50%, -50%) rotate(-20deg);
          }

          &:nth-child(11) {
            transform: translate(-50%, -50%) rotate(-40deg);
          }

          &:nth-child(12) {
            transform: translate(-50%, -50%) rotate(-40deg);
          }

          &:nth-child(13) {
            transform: translate(-50%, -50%) rotate(-60deg);
          }

          &:nth-child(14) {
            display: none;
            // transform: translate(-50%, -50%) rotate(-80deg);
          }

          &:nth-child(15) {
            display: none;
            // transform: translate(-50%, -50%) rotate(-100deg);
          }

          &:nth-child(16) {
            transform: translate(-50%, -50%) rotate(-120deg);
          }

          &:nth-child(17) {
            transform: translate(-50%, -50%) rotate(-140deg);
          }

          &:nth-child(18) {
            transform: translate(-50%, -50%) rotate(-160deg);
          }

          &:nth-child(odd) {
            i {
              // width: 0.07rem;
              // height: 0.07rem;
              background: linear-gradient(231.03deg, #FFE41D 13.91%, #FFFBCD 26.01%, #FEE10A 45.79%, #E69721 66.07%, #A95A0D 85.5%);
              animation: flashing2 2s ease-in-out infinite;
            }
          }

          &:nth-child(even) {
            i {
              background: radial-gradient(50% 50% at 50% 50%, #FFFFFF 0%, #FFFFFF 67.15%, #FCEC35 100%);
              box-shadow: 0px 1px 2px rgba(252, 236, 53, 0.5);
              animation: flashing1 2s ease-in-out infinite;
            }
          }

          // &.flashing {
          //   animation: flashing 1s infinite;
          // }
        }

        i {
          flex: 0 0 auto;
          display: block;
          position: relative;
          // position: absolute;
          width: 100%;
          height: 100%;
          // width: 0.05em;
          // height: 0.05em;
          // font-size: 100rem;
          left: 1.52rem;
          // background-color: #fff;
          border-radius: 50%;


        }
      }



      .mask {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        padding: 0.03rem;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .start {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: url('../../../assets/images/award/btn.png') no-repeat center;
        background-size: cover;
        width: 0.84rem;
        height: 0.84rem;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;

        .spin {
          // position: absolute;
          // top: 50%;
          // left: 50%;
          // transform: translate(-50%, -50%);
          width: 56%;

          &.animation {
            animation: rotate 2s infinite ease-in-out;

          }
        }
      }

    }


    .decorate {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      transform: translateY(30%);
    }

  }

  .amount {
    width: 3.36rem;
    height: 0.93rem;
    position: relative;
    z-index: 1;
    margin-top: -0.2rem;
    padding: 0.24rem 0 0.12rem;
    background: url('../../../assets/images/award/amount_bg.png') no-repeat center;
    background-size: contain;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;

    .val {
      font-family: 'PingFang SC';
      font-style: normal;
      font-weight: 600;
      font-size: 0.28rem;
      line-height: 0.3rem;
      text-align: center;

      background: linear-gradient(180deg, #FCFE8C 0%, #E1A853 53.9%, #FCFE8C 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-fill-color: transparent;

      text-shadow: 0.02rem 0px 0px #C5903A;

    }

    .name {
      font-family: 'PingFang SC';
      font-style: normal;
      font-weight: 600;
      font-size: 0.18rem;
      line-height: 0.2rem;
      text-align: center;

      background: linear-gradient(180deg, #FCFE8C 0%, #E1A853 53.9%, #FCFE8C 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-fill-color: transparent;
    }
  }

  .frequency {
    flex: 0 0 auto;
    margin-top: 0.15rem;
    width: 80%;
    height: 0.48rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'PingFang SC';
    font-style: normal;
    font-weight: 600;
    font-size: 0.15rem;
    line-height: 0.21rem;
    color: #100908;
    background: conic-gradient(from 90deg at 50% 50%, #FFF257 -90deg, #E48A00 270deg, #FFF257 270deg, #E48A00 630deg);
    border-radius: 0.06rem;
  }

  .to-con {
    margin-top: 0.1rem;
    width: 80%;
    display: flex;
    justify-content: space-between;
    font-family: 'PingFang SC';
    font-style: normal;
    font-weight: 400;
    font-size: 0.14rem;
    line-height: 0.2rem;
    color: #FFFFFF;

    .item {
      display: flex;
      align-items: center;
      cursor: pointer;
    }
  }

  .celebrate {
    flex: 0 0 auto;
    margin-top: 0.2rem;
    width: 80%;
    height: 0.5rem;
    border-radius: 0.06rem;
    overflow: hidden;
    padding: 0.04rem;
    box-sizing: border-box;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 0.06rem;

    :deep {
      .van-notice-bar {
        height: 0.42rem;
        border-radius: 0.04rem;
        background: rgba(0, 0, 0, 0.3);

      }

      .van-notice-bar__left-icon {
        color: #fff;
      }

      .van-notice-bar__content.van-ellipsis {
        height: 100%;
      }

      .van-swipe {
        height: 100%;
      }

      .van-swipe-item {
        height: 0.42rem !important;

        width: 100%;
        height: 0.42rem;
        color: #fff;
        font-size: 0.16rem;
        line-height: 0.22rem;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        line-height: 0.44rem;
      }

    }

    .swiper {
      width: 100%;
    }

    .border-gradient {
      border-radius: 0.04rem;
      background: rgba(0, 0, 0, 0.3);
      width: 100%;
      height: 100%;
    }

    .item {
      width: 100%;
      height: 0.42rem;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      font-size: 0.16rem;
      line-height: 0.22rem;
      white-space: nowrap;

      .text {
        color: #FFF257;
      }

      .price {
        color: #2BE0B5;
      }
    }
  }

}

.win-popup {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 3.9rem;
  height: 6.4rem;
  background: url('../../../assets/images/award/win_bg.png') no-repeat center;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  transform: translate(-50%, -50%) scale(0.1);
  transition: all 0.5s linear;
  z-index: -1;
  opacity: 0;
  border-radius: 0.08rem;

  .win-close {
    position: absolute;
    top: 0.2rem;
    right: 0.2rem;
    z-index: 8;

    :deep {
      &.van-icon {
        cursor: pointer;
        color: #fff;
        font-size: 0.2rem;

      }
    }
  }

  &.show {
    opacity: 1;
    z-index: 2;
    transform: translate(-50%, -50%) scale(1);

    .text {
      img {
        // transform: translate(-50%, -50%) scale(1);
        transform: scale(1);
      }

      .img {}
    }
  }

  .text-con {
    width: 86%;
    height: 0;
    padding-bottom: 86%;
    position: relative;
  }

  .text {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    // width: 86%;
    // height: 0;
    // padding-bottom: 86%;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      transition: all 0.3s linear .3s;

      transform: scale(0.1);
    }


    .bg {
      // width: 100%;
      height: 100%;
      // object-fit: cover;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      margin: auto;
    }

    .img {
      height: 31.25%;
    }

    .img-fail {
      height: 50%;
    }
  }

  .amount-con {
    width: 80%;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 0.06rem;
    padding: 0.04rem;
    box-sizing: border-box;
  }

  .amount {
    width: 100%;
    padding: 0.08rem;
    font-family: 'PingFang SC';
    font-style: normal;
    font-weight: 600;
    font-size: 0.2rem;
    line-height: 1.4em;
    color: #00FFC1;
    background: rgba(0, 0, 0, 0.4);
    border-radius: 0.04rem;
    display: flex;
    justify-content: center;

    span {
      margin-left: 0.08rem;
      color: #fff;
    }
  }

  .btn-con {
    margin-top: 0.2rem;
    width: 80%;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;



    .btn {
      flex: 1;
      height: 0.44rem;
      padding: 0.14rem;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'PingFang SC';
      font-style: normal;
      font-weight: 600;
      font-size: 0.16rem;
      line-height: 0.22rem;
      color: #3F1910;
      background: #1EBB95;
      border-radius: 0.06rem;
      cursor: pointer;
      margin-left: 0.08rem;

      &:first-child {
        margin-left: 0;
      }


      &.on {
        background: conic-gradient(from 90deg at 50% 50%, #FFF257 -90deg, #E48A00 270deg, #FFF257 270deg, #E48A00 630deg);

      }

      &.save {
        color: #fff;
        background: #1E2823;

      }

      img {
        width: 0.16rem;
      }
    }
  }

  .opacityHide {
    opacity: 0;
    visibility: hidden;
  }

  .invite {
    width: 80%;
    margin-top: 0.16rem;
    display: flex;
    justify-content: space-between;

    &-left {
      width: 30%;

      p {
        margin-bottom: 0.08rem;
        font-family: 'PingFang SC';
        font-style: normal;
        font-weight: 600;
        font-size: 0.14rem;
        line-height: 1.5em;

        color: #FFFFFF;
      }

      span {
        font-family: 'PingFang SC';
        font-style: normal;
        font-weight: 600;
        font-size: 0.18rem;
        line-height: 1.4em;
        color: #FFF257;
      }
    }

    &-right {
      flex: 0 0 auto;
      background: #FFFFFF;
      padding: 0.06rem;
      border-radius: 0.06rem;

      :deep {
        img {
          width: 1.2rem;

        }
      }
    }
  }

  .share {
    margin-top: 0.3rem;
    width: 80%;

    &-title {
      width: 100%;
      margin-bottom: 0.12rem;
      font-family: 'PingFang SC';
      font-style: normal;
      font-weight: 400;
      font-size: 0.15rem;
      line-height: 0.21rem;
      color: rgba(255, 255, 255, 0.6);
      text-align: center;
    }

    &-list {
      display: flex;
      justify-content: space-between;
      width: calc(100% + 0.12rem);
      margin-left: -0.06rem;

      .item-con {
        width: 16.66%;
        padding: 0 0.06rem;
        box-sizing: border-box;

        .item {
          cursor: pointer;
          width: 100%;
          height: 0;
          padding-bottom: 100%;
          position: relative;
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 0.06rem;

          img {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 0.2rem;
            height: 0.2rem;
            object-fit: cover;
          }

        }
      }
    }
  }

}

@media only screen and (min-width: 320px) and (max-width: 750px) {
  .content {
    .con-top {
      margin-top: 0;

      .title {
        font-size: 0.4rem;
        line-height: 0.6rem;

        img {
          height: 0.28rem;
        }
      }
    }

    .con-center {
      padding-top: 0.2rem;
    }

    .myLucky .canvas .border {
      .border-item {
        font-size: 0.12rem;
      }

      i {
        left: 1.1rem;
      }
    }

    .amount {
      width: 3.02rem;
      height: 0.84rem;

      .val {
        font-size: 0.24rem;
      }
    }

    .frequency {
      width: 80%;
      height: 0.4rem;
    }

    .to-con {
      margin-top: 0.08rem;
      width: 80%;
    }

    .celebrate {
      margin-top: 0.16rem;
      width: 80%;
      height: 0.5rem;

      .item {
        font-size: 0.14rem;
      }
    }
  }

  .win-popup {
    width: 90%;
    height: 5.2rem;

    .text {
      // height: 1.3rem;
    }

    .invite-left {
      width: 50%;
    }

    .invite-right {
      :deep {
        img {
          width: 0.8rem;
        }
      }
    }

    .amount {

      // height: 0.45rem;
      // font-size: 0.2rem;
      // padding-top: 0.12rem;
    }

    .btn-con {
      .btn {
        height: 0.36rem;
        font-size: 0.14rem;
      }
    }
  }
}
</style>


