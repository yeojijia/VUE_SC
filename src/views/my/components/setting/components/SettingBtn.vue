<template>
  <div class="btn-con">
    <div class="btn" @click="handleShow('login')">{{$t('user.desc43')}} <van-icon name="arrow" /></div>
    <div class="btn" @click="handleShow('fun')">{{info.isSetFundPassword?$t('user.desc49'):$t('user.desc52')}} <van-icon
        name="arrow" /></div>
    <div class="btn" @click="handleShow('email')">{{ info.email? $t('user.desc91'):$t('user.desc96')}} <van-icon
        name="arrow" /></div>
    <!-- <div class="btn" @click="handleShow('phone')">{{$t('user.desc92')}} <van-icon name="arrow" /></div> -->
    <div class="btn" @click="handleShow('google')">{{ info.googleSecret? $t('user.desc93'):$t('user.desc97')}} <van-icon
        name="arrow" /></div>
  </div>
</template>
<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex';
const store = useStore()
const info = computed(() => store.state.user.userInfo)
function handleShow(type) {
  store.dispatch('setSettingFormShow', {
    show: true,
    type
  })
}
</script>


<style lang='scss' scoped>
.btn-con {
  display: flex;
  margin-bottom: .16rem;

  .btn {
    margin-right: 0.12rem;
    height: 0.4rem;
    padding: 0 0.16rem;
    font-family: 'PingFang SC';
    font-style: normal;
    font-weight: 400;
    font-size: 0.14rem;
    line-height: 1.5em;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.1rem;
    cursor: pointer;
    color: var(--gg-btn-text);
    border: 1px solid transparent;

    &:last-child {
      margin-right: 0;
    }

    &:hover {
      font-weight: 600;
      background: var(--gg-tab-btn-bg);
      border-color: var(--gg-tab-btn-border);
      box-shadow: var(--gg-tab-btn-shadow);
      color: var(--gg-text);
    }

    .van-icon {
      display: none;
    }

  }
}

@media (max-width:749px) {
  .btn-con {
    margin-top: 0.16rem;
    // margin-top: 0.1rem;
    margin-bottom: 0.16rem;
    flex-direction: column;
    background: var(--gg-card-bg);
    padding: 0 0.16rem;
    box-sizing: border-box;
    border-radius: 0.12rem;

    .btn {
      height: auto;
      margin-right: 0;
      border-radius: 0;
      border: none;
      border-bottom: 1px solid var(--gg-line);
      justify-content: space-between;
      font-size: 0.16rem;
      padding: 0.14rem 0;
      color: var(--gg-text);

      &:last-child {
        border-bottom: none;
      }

      &:hover {
        font-weight: 400;
        background: transparent;
        // color: var(--btn-text-3);
        // border-bottom: 1px solid var(--gg-line);
      }

      .van-icon {
        display: block;
      }
    }
  }
}
</style>