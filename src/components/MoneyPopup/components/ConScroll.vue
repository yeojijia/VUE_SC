<template>
  <div class="con-scroll">
    <div class="scroll-center">
      <div class="scroll">
        <slot name="top" />
        <slot />
      </div>
    </div>
    <div class="scroll-bot">
      <slot name="bot" />
    </div>
  </div>
</template>
<script setup>
</script>


<style lang='scss' scoped>
.con-scroll {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding-bottom: 0.2rem;

  .scroll-top {
    margin-bottom: 0.2rem;
    flex: 0 0 auto;
    position: relative;



    .title {
      padding: 0 0.2rem;
      box-sizing: border-box;
    }
  }

  .scroll-center {
    flex: 1 1 auto;
    position: relative;

    .scroll {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      overflow-y: auto;
      box-sizing: border-box;
    }
  }

}

@media (max-width:749px) {
  .con-scroll {
    padding-bottom: 0;
  }
}
</style>