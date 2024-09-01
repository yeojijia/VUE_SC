<template>
  <div class="page-nav" :class="{unfold:navUnfold}">
    <div class="page-nav-overlay" @click.stop="store.commit('SET_NAV_UNFOLD')" />
    <nav-full />
    <nav-bar />
  </div>
</template>
<script setup>
import NavFull from './components/NavFull'
import NavBar from './components/NavBar'
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
const navUnfold = computed(() => store.state.global.navUnfold)

</script>

<style lang="scss" scoped>
.page-nav {
  flex: 0 0 auto;
  width: 2.6rem;
  overflow-anchor: none;
  position: relative;
  z-index: 10;
  transition: all 0.2s linear;
  background: var(--gg-card-bg);

  &.unfold {
    width: 0.8rem;
  }

}

.page-nav-overlay {
  display: none;
}



@media (max-width: 749px) {
  .page-nav {
    position: fixed;
    width: 100%;
    padding: 0;
    top: 0;
    bottom: 0.5rem;
    z-index: 999;
    visibility: hidden;
    background: transparent;

    .page-nav-overlay {
      display: block;
      position: fixed;
      top: 0;
      left: 0;
      bottom: 0.5rem;
      width: 100%;
      background: transparent;
      transition: all 0.2s linear 0.1s;
    }

    &.unfold {
      width: 2.6rem;
      visibility: visible;

      .page-nav-overlay {
        background: var(--gg-overlay);
      }
    }
  }


}
</style>