<template>
  <div class="game-item" @click="handleItemClick(info)">
    <div class="img-con">
      <com-image class="img" :src="info.picurl" />
    </div>
    <div class="text">
      <div class="name overflow1">{{info.name}}</div>
      <div class="vendor overflow1">{{info.thirdpartyModuleName}}</div>
    </div>
    <div class="item__mask">
      <div class="btn">
        <img src="../assets/images/game/play_btn.svg" />
      </div>
      <span>PLAY</span>
    </div>
  </div>
</template>
<script setup>
import { useStore } from "vuex";
import { useRouter } from "vue-router";
const router = useRouter();
const store = useStore()
const props = defineProps({
  info: Object
})

function handleItemClick(item) {
  store.commit('SET_GAME_URL_PARAMS', {
    handler: item.handler,
    code: item.code,
    thirdpartyPlatformCode: item.thirdpartyPlatformCode,
    id: item.id
  })
  router.push('/games/detail')
}
</script>


<style lang='scss' scoped>
.game-item {
  cursor: pointer;
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;

  &:hover {
    .item__mask {
      opacity: 1;

      .btn {
        transform: scale(1);
      }
    }

  }

  .item__mask {
    position: absolute;
    z-index: 1;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(0.02rem);
    transition: 200ms linear;
    opacity: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 0.2rem;
    overflow: hidden;



    .btn {
      width: 36.36%;
      height: 0;
      padding-bottom: 36.36%;
      position: relative;
      // border-radius: 0.1rem;
      // font-family: 'PingFang SC';
      // font-style: normal;
      // font-weight: 400;
      // font-size: 0.16rem;
      // color: #fff;
      // display: flex;
      // justify-content: center;
      // align-items: center;
      transform: scale(0.9);
      transition: 500ms linear;

      img {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        object-fit: contain;
      }

    }

    span {
      margin-top: 0.08rem;
      font-family: 'PingFang SC';
      font-style: normal;
      font-weight: 500;
      font-size: 0.16rem;
      line-height: 0.22rem;
      color: #FFFFFF;
    }
  }

  .img-con {
    flex: 0 0 auto;
    width: 100%;
    height: 0;
    padding-bottom: 100%;
    position: relative;
    background: var(--gg-game-item-img-bg);
    border-radius: 0.2rem 0.2rem 0 0;
    overflow: hidden;

  }

  .img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

  }

  .text {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0.12rem 0.16rem;
    box-sizing: border-box;
    background: var(--gg-game-item-text-bg);
    box-shadow: var(--gg-game-item-text-shadow);
    border-radius: 0 0 0.2rem 0.2rem;

    .name {
      font-family: 'PingFang SC';
      font-style: normal;
      font-weight: 600;
      font-size: 0.16rem;
      line-height: 1.4em;
      color: var(--gg-text);
    }

    .vendor {
      margin-top: 0.04rem;
      font-family: 'PingFang SC';
      font-style: normal;
      font-weight: 400;
      font-size: 0.14rem;
      line-height: 1.4em;
      color: var(--gg-subtitle);
    }


  }
}

@media (max-width:749px) {
  .game-item {
    .item__mask {
      border-radius: 0.08rem;

      span {
        margin-top: 0.06rem;
        font-size: 0.14rem;
        line-height: 0.2rem;
      }
    }

    .img-con {
      border-radius: 0.08rem 0.08rem 0 0;
    }

    .text {
      padding: 0.08rem;
      border-radius: 0 0 0.08rem 0.08rem;

      .name {
        font-size: 0.14rem;
      }

      .vendor {
        font-size: 0.12rem;
      }
    }
  }
}
</style>