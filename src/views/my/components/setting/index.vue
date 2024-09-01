<template>
  <div class="setting">
    <setting-btn />
    <div class="setting-bot">
      <user-info />
      <login-info />
    </div>
  </div>
</template>
<script setup>
import SettingBtn from './components/SettingBtn'
import UserInfo from './components/UserInfo'
import LoginInfo from './components/LoginInfo'
</script>


<style lang='scss' scoped>
.setting {
  padding-bottom: 0.2rem;

  .setting-bot {
    display: flex;

  }
}

@media (max-width:992px) {
  .setting {
    .setting-bot {
      flex-direction: column;

    }
  }
}

@media (max-width:749px) {
  .setting {
    height: 100%;
    padding-bottom: 0.4rem;
    overflow-y: auto;
  }
}
</style>