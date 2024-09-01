<template>
  <van-popup v-model:show="_show" class="popup-transparent" :position="isMobile?'bottom':'right'">
    <div class="popup-con">
      <div class="con-top">
        <div class="title">
          <div class="val">{{info.name}}</div>
          <!-- <span>{{$t('common.desc104')}}：{{info.createTime}}</span> -->
        </div>
        <div class="cross" @click="_show = false">
          <van-icon name="cross" />
        </div>
      </div>

      <div class="con-desc">
        <div class="scroll" v-html="info.content">

        </div>
      </div>
    </div>
  </van-popup>
</template>
<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex';
const store = useStore()
const props = defineProps({
  show: Boolean,
  info: Object
})

const isMobile = computed(() => store.state.global.isMobile)
const emit = defineEmits(["update:show"])
const _show = computed({
  get: () => {
    return props.show;
  },
  set: (e) => {
    emit("update:show", e);
  },
});


</script>


<style lang='scss' scoped>
.popup-con {
  width: 4.4rem;
  height: 100vh;
  background: var(--gg-card-bg);
  overflow: hidden;
  padding: 0.24rem 0.4rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  .con-top {
    flex: 0 0 auto;
    margin-bottom: 0.32rem;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    border-bottom: 1px solid var(--gg-line);
    padding: 0.24rem 0;

    .title {
      font-family: 'Venryn Sans';
      font-style: normal;
      font-weight: 900;
      font-size: 0.2rem;
      line-height: 1.5em;
      color: var(--gg-text);
    }

    .cross {
      color: var(--gg-text);
      width: 0.32rem;
      height: 0.32rem;
      display: flex;
      justify-content: center;
      align-items: center;
      // transform: translateX(50%);
      cursor: pointer;

      .van-icon {
        font-size: 0.18rem;
      }
    }
  }

  .scroll {
    width: 100%;
    height: 100%;
    overflow: auto;
  }

  .con-desc {
    flex: 1;
    height: 0;
    font-family: 'PingFang SC';
    font-style: normal;
    font-weight: 400;
    font-size: 0.16rem;
    line-height: 1.5em;
    color: var(--gg-text);

    :deep {
      img {
        margin-bottom: 0.12rem;
        max-width: 100%;
      }

      p {
        margin-bottom: 0.12rem;
      }
    }

  }


}



@media (max-width: 749px) {


  .popup-con {
    width: 100vw;
    height: 90vh;
    padding: 0.16rem 0.2rem;
    border-radius: 0.2rem 0.2rem 0 0;


    .con-top {
      margin-bottom: 0.2rem;
      padding: 0;
      border-bottom: none;

      .title {
        font-size: 0.18rem;
        line-height: 0.25rem;
      }

      .cross {
        height: auto;
      }
    }
  }

}
</style>