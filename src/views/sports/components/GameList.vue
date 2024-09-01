<template>
  <com-list v-model:loading="_loading" :finished="finished" @load="emit('load')" v-if="list.length">
    <div class="com-container">
      <div class="game-list" :class="{unfold:navUnfold}">
        <div class="item" v-for="(item) of list" :key="item.code">
          <game-item :info="item" />
        </div>
      </div>
    </div>
  </com-list>
  <div class="loading-nodata" v-show="loading||!list.length">
    <loading-nodata :loading="_loading&&!list.length" :nodata="!list.length" :size="2.4" />
  </div>
</template>
<script setup>
import { computed } from 'vue'
import { useRouter } from "vue-router";
import { useStore } from 'vuex';
const store = useStore()
const navUnfold = computed(() => store.state.global.navUnfold)
const router = useRouter();
const props = defineProps({
  total: Number,
  loading: Boolean,
  finished: Boolean,
  list: Array,
  isLoading: Boolean
})
const _loading = computed({
  get() {
    return props.loading;
  },
  set(e) {
    emit("update:loading", e);
  },
});
const emit = defineEmits(['update:loading', 'load'])

</script>


<style lang='scss' scoped>
.game-list {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-column-gap: 0.16rem;

  &.unfold {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;

  }

  .item {
    margin-bottom: 0.16rem;

  }
}

.loading-nodata {
  height: 40vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (max-width: 1500px) {
  .game-list {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;

    &.unfold {
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;

    }

  }
}

@media (max-width: 1199px) {
  .game-list {
    grid-template-columns: 1fr 1fr 1fr 1fr;

    &.unfold {
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr;

    }

  }
}

@media (max-width: 992px) {
  .game-list {
    grid-template-columns: 1fr 1fr 1fr;

    &.unfold {
      grid-template-columns: 1fr 1fr 1fr 1fr;

    }

  }
}

@media (max-width: 749px) {
  .game-list {
    grid-template-columns: 1fr 1fr 1fr;
    grid-column-gap: 0.08rem;

    .item {
      margin-bottom: 0.08rem;
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
      }
    }
  }
}
</style>