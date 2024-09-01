<template>
  <div class="help-con">
    <div class="com-container">
      <div class="help-tabs">
        <div class="scroll">
          <div class="dl" v-for="item of allList" :key="item.id">
            <div class="dt">{{ item.name }}</div>
            <div class="dd" :class="{on:detailId===child.id}" v-for="child of item.list" :key="child.id"
              @click="handleTab(child.id)">
              {{child.title}}
            </div>
          </div>
        </div>
      </div>
      <div class="help-desc">
        <div class="title">{{ detail.title }}</div>
        <div class="desc">
          <div class="scroll" v-html="detail.content">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { _articlesCategory, _articlesPage, _articlesDetail } from '@/utils/api/common'
import { ref, watch, onMounted, computed } from "vue";
import { useRoute } from 'vue-router';
const route = useRoute()
const detailId = ref(null)
let detail = ref({})
function getDetail(id) {
  _articlesDetail(id).then(res => {
    detail.value = res
  })
}
function handleTab(id) {
  detailId.value = id
  getDetail(detailId.value)
}
const categoryList = ref([])
const allList = ref([])
async function getAll() {
  categoryList.value = await _articlesCategory('HELP')
  const listAll = categoryList.value.map(async (item) => {
    const data = await _articlesPage({
      categoryId: item.id,
      page: 1,
      pageSize: 100
    })
    return {
      categoryId: item.id,
      name: item.name,
      list: data.list
    }
  })
  allList.value = await Promise.all(listAll)
  handleQueryIdChange()
}

watch(() => route.query.id, (e) => {
  if (e) {
    handleQueryIdChange()
  }
})

function handleQueryIdChange() {
  let id = null
  if (route.query.id) {
    const index = categoryList.value.findIndex(item => {
      return Number(item.id) === Number(route.query.id)
    })
    id = allList.value[index].list[0].id
  } else {
    id = allList.value[0].list[0].id
  }
  handleTab(id)
}


onMounted(() => {
  getAll()
})
</script>


<style lang='scss' scoped>
.help-con {
  height: 0;
  flex: 1;
  padding-bottom: 0.8rem;

  .com-container {
    height: 100%;
    display: flex;
    justify-content: space-between;
  }

}

.scroll {
  width: 100%;
  height: 100%;
  overflow-y: auto;
}

.help-tabs {
  width: 2.4rem;
  height: 100%;
  background: var(--gg-card-bg);
  border-radius: 0.16rem;
  padding: 0.2rem 0.16rem;
  box-sizing: border-box;



  .dl {
    margin-bottom: 0.15rem;
    display: flex;
    flex-direction: column;

    &:last-child {
      margin-bottom: 0;
    }

    .dt {
      margin-bottom: 0.12rem;
      font-size: 0.16rem;
      line-height: 1.4em;
      color: var(--gg-text);
    }

    .dd {
      margin-bottom: 0.05rem;
      font-size: 0.14rem;
      line-height: 1.4em;
      color: var(--gg-subtitle);
      padding: 0.1rem 0.12rem;
      border-radius: 0.08rem;
      cursor: pointer;

      &.on {
        background: var(--gg-nav-bg-active);
        color: var(--gg-nav-color-active);
      }
    }
  }


}

.help-desc {
  margin-left: 0.16rem;
  width: 0;
  flex: 1;
  height: 100%;
  padding: 0.32rem;
  background: var(--gg-card-bg);
  border-radius: 0.16rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;


  .title {
    flex: 0 0 auto;
    font-size: 0.16rem;
    line-height: 1.4em;
    color: var(--gg-text);
    margin-bottom: 0.12rem;
  }

  .desc {
    width: 100%;
    height: 0;
    flex: 1;
    font-size: 0.14rem;
    line-height: 1.4em;
    color: var(--gg-subtitle);
  }
}

@media (max-width:992px) {
  .help-desc {
    padding: 0.24rem;
  }
}
</style>