<template>
  <div class="home-box">
    <div class="box-top">
      <div class="left">
        <div class="title">{{title}}</div>
        <p>{{intr}}</p>
      </div>
      <div class="right" v-if="rightShow&&total">

        <div class="prev-next">
          <div class="btn" @click="emit('prev')"><van-icon name="arrow-left" /></div>
          <div class="btn" @click="emit('next')"><van-icon name="arrow" /></div>
        </div>
        <div class="total" @click="handleAllPath">
          {{$t('home.desc31')}}
          <!-- {{total}} -->
        </div>
      </div>
    </div>
    <div class="box-con">
      <slot />
    </div>
  </div>
</template>
<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
const props = defineProps({
  title: String,
  intr: String,
  total: Number,
  rightShow: {
    type: Boolean,
    default: false,
  },
  id: [Number, String]
})
const emit = defineEmits(['prev', 'next', 'all'])
function handleAllPath() {
  if (props.id) {
    router.push(`/games/${props.id}`)
  }
}
</script>


<style lang='scss' scoped>
.home-box {
  padding-top: 0.28rem;
  padding-bottom: 0.1rem;

  .box-top {
    margin-bottom: 0.14rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .left {
      padding-right: 0.2rem;
      display: flex;
      flex-direction: column;

      .title {
        font-family: 'Venryn Sans';
        font-weight: 900;
        text-transform: uppercase;
        font-size: 0.2rem;
        line-height: 1.4em;
        color: var(--gg-text);
      }

      p {
        font-family: 'PingFang SC';
        font-style: normal;
        font-weight: 400;
        font-size: 0.16rem;
        line-height: 1.5em;
        color: var(--gg-subtitle);

      }
    }

    .right {
      align-self: flex-start;
      display: flex;

      .total {
        cursor: pointer;
        height: 0.38rem;
        font-family: 'PingFang SC';
        font-style: normal;
        font-weight: 500;
        font-weight: 400;
        font-size: 0.16rem;
        background: var(--gg-home-head-btn-bg);
        border: 1px solid var(--gg-home-head-btn-border);
        color: var(--gg-text);
        display: flex;
        align-items: center;
        padding: 0 0.12rem;
        box-sizing: border-box;
        border-radius: 0.1rem;
        white-space: nowrap;
      }

      .prev-next {
        margin-right: 0.15rem;
        display: flex;
        align-items: center;
        justify-content: center;

        .btn {
          width: 0.38rem;
          height: 0.38rem;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--gg-home-head-btn-bg);
          border: 1px solid var(--gg-home-head-btn-border);
          border-radius: 0.1rem;
          cursor: pointer;
          opacity: 0.8;
          transition: all 0.3s linear;
          box-sizing: border-box;

          .van-icon {
            font-weight: bold;
            font-size: 0.12rem;
            color: var(--gg-home-head-icon);
          }

          &:hover {
            opacity: 1;


          }

          &:first-child {
            margin-right: 0.1rem;
          }
        }
      }
    }
  }
}

@media (max-width:749px) {
  .home-box {
    padding-top: 0.14rem;
    padding-bottom: 0;

    .box-top {
      margin-bottom: 0.02rem;

      .left {
        .title {
          font-size: 0.16rem;
        }

        p {
          font-size: 0.12rem;
          line-height: 0.17rem;
        }
      }

      .right {
        .total {
          height: 0.24rem;
          font-size: 0.12rem;
          border-radius: 0.06rem;
        }

        .prev-next {
          margin-right: 0.08rem;

          .btn {
            width: 0.24rem;
            height: 0.24rem;
            border-radius: 0.06rem;

            &:first-child {
              margin-right: 0.04rem;
            }
          }
        }
      }
    }

  }
}
</style>