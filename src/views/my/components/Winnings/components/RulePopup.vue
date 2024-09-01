<template>
  <van-popup v-model:show="_show" class="popup-transparent">
    <div class="popup-con">
      <div class="con-top">
        <div class="title">{{title}}</div>
        <div class="cross" @click="_show = false">
          <van-icon name="cross" />
        </div>
      </div>
      <div class="con-desc">
        <div class="scroll">
          {{ text }}
        </div>
      </div>
    </div>
  </van-popup>
</template>
<script setup>

import { computed } from 'vue'
const props = defineProps({
  show: Boolean,
  text: String,
  title: String
})

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
  width: 4.3rem;
  height: 50vh;
  background: var(--gg-card-bg);
  border-radius: 0.16rem;
  overflow: hidden;
  padding: 0.24rem 0.2rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  .con-top {
    flex: 0 0 auto;
    margin-bottom: 0.3rem;
    display: flex;
    justify-content: space-between;
    padding: 0 0.04rem;
    box-sizing: border-box;

    .title {
      font-family: 'PingFang SC';
      font-style: normal;
      font-weight: 400;
      font-size: 0.24rem;
      line-height: 1.5em;
      color: var(--gg-text);
    }

    .cross {
      color: var(--nav-btn-text);
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

  .con-desc {
    flex: 1 1 auto;
    position: relative;
  }

  .scroll {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow-y: auto;
    padding: 0 0.04rem;
    // box-sizing: border-box;

    &::-webkit-scrollbar {
      width: 4px;
      height: 0;
    }
  }

  .con-desc {
    font-family: 'PingFang SC';
    font-style: normal;
    color: var(--gg-text);
    font-size: 0.16rem;
    line-height: 1.5em;
  }
}



@media (max-width: 749px) {
  .popup-con {
    width: 100vw;
    height: 100vh;
    padding: 0.1rem 0.05rem 0.2rem;
    border-radius: 0;

    .con-top {
      padding: 0 0.15rem;
      margin-bottom: 0.15rem;

      .title {
        font-size: 0.2rem;
      }
    }

    .scroll {
      padding: 0 0.15rem;
    }


  }
}
</style>