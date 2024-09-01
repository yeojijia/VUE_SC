<template>
  <home-box :title="title" :total="list.length" :rightShow="true" @prev="controlledSwiper.slidePrev()"
    @next="controlledSwiper.slideNext()">
    <swiper class="swiper" :modules="modules" :autoplay="autoplayOptions" :breakpoints="breakpoints"
      @swiper="handleSetControlledSwiper">
      <swiper-slide v-for="item of list" :key="item.id" @click="handleItemClick(item)">
        <div class="item-con">
          <div class="item">
            <div class="img-con">
              <com-image class="img" :src="item.imgUrl" />
            </div>
            <div class="name">PLAYER GAMING </div>
          </div>
        </div>
      </swiper-slide>
    </swiper>
  </home-box>
</template>
<script setup>
import HomeBox from './HomeBox'
import { ref, onMounted } from "vue";
import { Autoplay } from "swiper";
import { _ads } from '@/utils/api/common'
const props = defineProps({
  title: String
});
//swiper
let modules = [Autoplay];
let autoplayOptions = ref({
  delay: 3000,
  disableOnInteraction: false,
  pauseOnMouseEnter: true,
  reverseDirection: false,
});
let breakpoints = ref({
  320: {
    slidesPerView: 2,
    spaceBetween: 10,
  },
  750: {
    slidesPerView: 3,
    spaceBetween: 9,
  },
  1200: {
    slidesPerView: 4,
    spaceBetween: 9,
  },
  1400: {
    slidesPerView: 5,
    spaceBetween: 9,
  },
  1536: {
    slidesPerView: 6,
    spaceBetween: 9,
  },
});
let controlledSwiper = ref(null);
function handleSetControlledSwiper(swiper) {
  controlledSwiper.value = swiper;
}

function handleItemClick(item) {
  let url = item.forwardPath
  if (url.replace(/\s+/g, '')) window.open(url.replace(/\s+/g, ''), '_blank')
}
const list = ref([])
function getList() {
  _ads({ positionKey: 'INDEX_PROVIDE_BUSINESS' }).then(res => {

    list.value = res
  })
}

onMounted(() => {
  getList()
})

</script>

<style lang="scss" scoped>
.swiper {
  padding: 0.1rem 0;
  width: 100%;

  .item-con {
    margin-bottom: 0.2rem;
    width: 100%;
    box-sizing: border-box;
  }

  .item {
    width: 100%;
    cursor: pointer;
    border-radius: 0.12rem;
    overflow: hidden;

    &:hover {
      .img-con {
        .img {
          transform: scale(1.05);
        }
      }
    }

    .img-con {
      width: 100%;
      height: 0;
      padding-bottom: 53.91%;
      overflow: hidden;
      position: relative;

      .img {
        position: absolute;
        width: 100%;
        height: 100%;
        transition: all 0.3s linear;
      }
    }

    .name {
      height: 0.36rem;
      font-family: "PingFang SC";
      font-style: normal;
      font-weight: 400;
      font-size: 0.14rem;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0 0.1rem;
      box-sizing: border-box;
      color: var(--gg-text);
      background: var(--btn-bg-5);
      // text-align: center;
    }
  }
}

@media (max-width:749px) {
  .swiper {
    .item {
      .name {
        height: 0.3rem;
        font-size: 0.14rem;
      }
    }
  }
}
</style>
