<template>
  <div class="overview">
    <div class="overview-top">
      <user-info />
      <laundry-info />
    </div>
    <div class="overview-bot">
      <asset />
      <invite-info />
    </div>
  </div>
</template>
<script setup>
import UserInfo from './components/UserInfo';
import LaundryInfo from './components/LaundryInfo';
import Asset from './components/Asset'
import InviteInfo from './components/InviteInfo'


</script>


<style lang='scss' scoped>
.overview {
  padding-bottom: 0.5rem;

  &-top {
    margin-bottom: 0.16rem;
    display: flex;
  }

  &-bot {
    display: flex;
  }
}

@media (max-width:992px) {
  .overview {
    &-top {
      flex-direction: column;
    }

    &-bot {
      flex-direction: column;
    }
  }
}

@media (max-width:749px) {
  .overview {
    height: 100%;
    padding-bottom: 0.4rem;
    overflow-y: auto;

    &-top {
      margin-top: 0.16rem;
      margin-bottom: 0.16rem;
    }
  }
}
</style>