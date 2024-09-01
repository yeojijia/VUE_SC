<template>
  <van-popover v-model:show="_show" :placement="placement">
    <template #reference>
      <slot />
    </template>
    <template v-if="option">
      <slot name="option" />
    </template>
    <div class="options" :style="{ width: width ?width:'auto'}" v-else>
      <div class="options-scroll" :style="{
                                            maxHeight: height ? height : 'auto'
                                          }">
        <div v-for="item of list" :key="item[customFieldName.id]" class="item wrap" @click.stop="handleItemClick(item)">
          {{ item[customFieldName.text] }}
        </div>
        <div class="place" v-if="list.length===0&&place">{{place}}</div>
      </div>
    </div>
  </van-popover>
</template>
<script setup>
import { computed, onMounted } from "vue";
const props = defineProps({
  val: [String, Number],
  width: String,
  place: String,
  list: Array,
  height: String,
  customFieldName: {
    type: Object,
    default: () => {
      return {
        id: "id",
        text: "name",
      };
    },
  },
  option: {
    type: Boolean,
    default: false,
  },
  show: {
    type: Boolean,
    default: false,
  },
  placement: {
    type: String,
    default: 'bottom'
  },
});
const emit = defineEmits(["update:show", "update:val", "change"]);
const _show = computed({
  get: () => {
    return props.show;
  },
  set: (e) => {
    emit("update:show", e);
  },
});




function handleItemClick(item) {
  emit("update:val", item[props.customFieldName.id]);
  emit("update:show", false);
  emit("change", item);
}

onMounted(() => {
  document.addEventListener('click', (e) => {
    if (_show.value) {
      _show.value = false
    }
  })
})

</script>

<style lang="scss" scoped>
.select {
  position: relative;

  .options-scroll {
    width: 100%;
    padding: 0 0.06rem;
    box-sizing: border-box;
    overflow-y: auto;
    max-height: 2rem;

    // &::-webkit-scrollbar {
    //   width: 4px;
    // }

  }

  .options {
    width: 100%;
    padding: 0.1rem 0.06rem;
    box-sizing: border-box;
    border-radius: 0.08rem;
    z-index: 99;
    overflow: hidden;
    background: var(--gg-inp-bg);
    box-shadow: var(--gg-inp-shadow);

    .item {
      cursor: pointer;
      padding: 0.1rem 0.1rem;
      width: 100%;
      font-size: 0.14rem;
      font-weight: 400;
      text-align: left;
      color: var(--gg-text);
      line-height: 1.5em;
      box-sizing: border-box;
      // transition: all 0.3s linear;
      border-radius: 0.05rem;
      white-space: normal;
      overflow: hidden;

      &:hover {
        color: var(--theme);
      }
    }

    .place {
      padding: 0.1rem 0.1rem;
      width: 100%;
      font-size: 0.14rem;
      font-weight: 400;
      text-align: left;
      color: var(--gg-subtitle);
      opacity: 0.8;
      line-height: 1.5em;
      box-sizing: border-box;
    }
  }
}
</style>
