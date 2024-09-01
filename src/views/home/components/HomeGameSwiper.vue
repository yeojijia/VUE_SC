<template>
  <home-box :id="id" :title="title" :intr="intr" :total="list.length" :rightShow="true"
    @prev="controlledSwiper.slidePrev()" @next="controlledSwiper.slideNext()" :key="key">
    <swiper class="swiper" :modules="modules" :breakpoints="breakpoints" @swiper="handleSetControlledSwiper">
      <swiper-slide v-for="(item,index) of  list" :key="index">
        <game-item :info="item" />
        <!-- <div class="item" @click="handleItemClick(item)">
          <div class="img-con">
            <com-image class="img" :src="item.picurl" />
          </div>
          <div class="text">
            <div class="name overflow1">{{item.name}}</div>
            <div class="vendor overflow1">{{item.thirdpartyModuleName}}</div>
            <div class="btn">{{$t('home.desc20')}}</div>
          </div>
        </div> -->
      </swiper-slide>
    </swiper>
  </home-box>
</template>
<script setup>
import HomeBox from './HomeBox'
import { ref, computed, watch } from "vue";
import { Autoplay, Grid } from "swiper";
import 'swiper/modules/grid/grid.scss';
import { useStore } from "vuex";
import { useRouter } from "vue-router";
const router = useRouter();
const store = useStore()
const navUnfold = computed(() => store.state.global.navUnfold)
const props = defineProps({
  list: Array,
  title: String,
  intr: String,
  id: [String, Number]
})
const key = ref(1)
let modules = ref([Autoplay, Grid]);
let autoplayOptions = ref({
  delay: 3000,
  disableOnInteraction: false,
  pauseOnMouseEnter: true,
  reverseDirection: false,
});
let breakpoints = ref({});
watch(() => navUnfold.value, (e) => {
  if (e) {
    breakpoints.value = {
      320: {
        slidesPerView: 3,
        spaceBetween: 8,
        grid: {
          fill: 'row',
          rows: 2,
        }
      },
      750: {
        slidesPerView: 4,
        spaceBetween: 16,
        grid: {
          fill: 'row',
          rows: 2,
        }
      },
      993: {
        slidesPerView: 5,
        spaceBetween: 16,
        grid: {
          fill: 'row',
          rows: 2,
        }

      },
      1200: {
        slidesPerView: 6,
        spaceBetween: 16,
        grid: {
          fill: 'row',
          rows: 2,
        }
      },
      1500: {
        slidesPerView: 7,
        spaceBetween: 16,
        grid: {
          fill: 'row',
          rows: 2,
        }
      },
    }
  } else {
    breakpoints.value = {
      320: {
        slidesPerView: 3,
        spaceBetween: 8,
        grid: {
          fill: 'row',
          rows: 2,
        }
      },
      750: {
        slidesPerView: 3,
        spaceBetween: 16,
        grid: {
          fill: 'row',
          rows: 2,
        }
      },
      993: {
        slidesPerView: 4,
        spaceBetween: 16,
        grid: {
          fill: 'row',
          rows: 2,
        }

      },
      1200: {
        slidesPerView: 5,
        spaceBetween: 16,
        grid: {
          fill: 'row',
          rows: 2,
        }
      },
      1500: {
        slidesPerView: 6,
        spaceBetween: 16,
        grid: {
          fill: 'row',
          rows: 2,
        }
      },
    }
  }
  key.value++
}, {
  immediate: true
})
let controlledSwiper = ref(null);
function handleSetControlledSwiper(swiper) {
  controlledSwiper.value = swiper;
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

</script>



<style lang='scss' scoped>
.swiper {
  width: 100%;
  padding: 0.1rem 0;

  .swiper-slide {
    height: auto;
  }

  .item {
    cursor: pointer;
    width: 100%;
    background: var(--card-bg);
    box-shadow: var(--shadow);
    border-radius: 0.1rem;
    overflow: hidden;
    display: flex;
    flex-direction: column;

    &:hover {
      .item__mask {
        opacity: 1;

        &::after {
          transform: translate(-50%, -50%) scale(0.9);
        }
      }

    }

    .item__mask {
      position: absolute;
      z-index: 1;
      bottom: 0;
      left: 0;
      right: 0;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      transition: 200ms linear;
      opacity: 0;

      &::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0.8);
        transition: 500ms linear;
        width: 0.6rem;
        height: 0.6rem;
        background: url("../../../assets/images/common/item_mask.svg") no-repeat center/contain;

      }
    }

    .img-con {
      flex: 0 0 auto;
      width: 100%;
      height: 0;
      padding-bottom: 100%;
      position: relative;

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
      padding: 0.07rem;
      box-sizing: border-box;

      .name {
        font-family: 'PingFang SC';
        font-style: normal;
        font-weight: 600;
        font-size: 0.16rem;
        line-height: 1.4em;
        color: var(--gg-text);
      }

      .vendor {
        margin-top: 0.07rem;
        font-family: 'PingFang SC';
        font-style: normal;
        font-weight: 400;
        font-size: 0.14rem;
        line-height: 1.4em;
        color: var(--gg-subtitle);
      }

      .btn {
        margin-top: 0.07rem;
        width: 100%;
        height: 0.32rem;
        background: var(--btn-bg-active);
        border-radius: 0.04rem;
        font-family: 'PingFang SC';
        font-style: normal;
        font-weight: 400;
        font-size: 0.16rem;
        color: var(--btn-text-active);
        display: flex;
        justify-content: center;
        align-items: center;

      }
    }
  }
}

@media (max-width: 749px) {
  .swiper {

    .item {
      border-radius: 0.06rem;

      .text {
        padding: 0.05rem;

        .name {
          font-size: 0.14rem;
        }

        .vendor {
          margin-top: 0;
          font-size: 0.12rem;
        }

        .btn {
          height: 0.2rem;
          margin-top: 0.03rem;
          font-size: 0.12rem;
        }
      }
    }
  }
}
</style>