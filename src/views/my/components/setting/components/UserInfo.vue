<template>
  <div class="user-info">
    <div class="title">{{$t('my.desc26')}}</div>
    <div class="form" ref="userInpDom">
      <div class="form-content">
        <div class="inp-con">
          <span>{{$t('my.desc32')}}：</span>
          <input type="text" :placeholder="$t('my.desc33')" v-model="nickname">
        </div>
        <div class="inp-con">
          <span>{{$t('my.desc30')}}：</span>
          <input type="text" :placeholder="$t('my.desc31')" v-model="realName">
        </div>
        <div class="inp-con">
          <span>{{$t('my.desc99')}}：</span>
          <com-select class="select" v-model:show="sexShow" v-model:val="sexId" :list="sexList"
            :custom-field-name="{
                                                                                                                                        id: 'id',
                                                                                                                                        text: 'name',
                                                                                                                                      }" placement="bottom-end" :width="`${userInpDomW}px`"
            :place="$t('common.desc105')">
            <div class="select-name" @click.stop="sexShow = !sexShow">
              <div class="val overflow1">
                {{ sexInfo?.name?sexInfo.name:$t('my.desc100') }}
              </div>
              <van-icon name="arrow-down" />
            </div>
          </com-select>
        </div>
        <div class="inp-con" v-if="!inviteInfo.parentInviteCode">
          <span>{{$t('my.desc8')}}：</span>
          <input type="text" :placeholder="$t('invite.desc68')" v-model="inviteCode">
        </div>
        <div class="inp-con" v-else>
          <span>{{$t('my.desc8')}}：</span>
          <input type="text" :placeholder="$t('invite.desc68')" v-model="inviteInfo.parentInviteCode">
        </div>
        <!-- <div class="inp-con">
            <span>{{$t('my.desc40')}}：</span>
            <com-date placement="bottom-end" v-model:show="dateShow" v-model:date="date" :width="`${userInpDomW}px`">
              <div class="select-name" @click.stop="dateShow = !dateShow">
                <div class="val overflow1">
                  {{ dateVal?dateVal:$t('my.desc41') }}
                </div>
                <van-icon name="arrow-down" />
              </div>
            </com-date>
          </div> -->
        <!-- <div class="inp-con">
          <span>{{$t('my.desc38')}}：</span>
          <input type="text" :placeholder="$t('my.desc39')">
        </div>
        <div class="inp-con">
          <span>{{$t('my.desc101')}}：</span>
          <input type="text" :placeholder="$t('my.desc102')">
        </div> -->
      </div>

      <div class="btn" @click="handleSubmit">{{ $t('my.desc42') }}</div>

    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, getCurrentInstance, computed, watch, nextTick, onUpdated } from 'vue'
import { _updateUserInfo } from '@/utils/api/user'
import { _inviteCodeAdd } from '@/utils/api/invite'
import { useStore } from 'vuex';
const store = useStore()
const { proxy } = getCurrentInstance()
const info = computed(() => store.state.user.userInfo)
const inviteInfo = computed(() => store.state.user.inviteInfo)
const sexList = ref([
  {
    id: 'MALE',
    name: proxy.$t('user.desc94'),
  },
  {
    id: 'FEMAL',
    name: proxy.$t('user.desc95'),
  }
])
let sexShow = ref(false)
let sexId = ref('')
const sexInfo = computed(() => {
  try {
    return sexList.value.find(item => item.id === sexId.value)
  } catch (error) {
    return {}
  }
})

const dateShow = ref(false);
const date = ref(new Date())

const dateVal = computed(() => {
  return proxy.$common.moment(date.value).format('YYYY-MM-DD')
})

const userInpDom = ref(null)
const userInpDomW = ref(0)
function getInpW() {
  nextTick(() => {
    userInpDomW.value = userInpDom.value.clientWidth
  })
}

const nickname = ref('')
const realName = ref('')
watch(() => {
  return {
    info: store.state.user.userInfo,
  }
}, ({ info }) => {
  nickname.value = info.nickName
  realName.value = info.realName
  if (info.sex && info.sex.code) sexId.value = info.sex.code
},
  { immediate: true }
)
function handleSubmit() {
  handleInviteCodeConfirm()
  _updateUserInfo({
    nickname: nickname.value,
    realName: realName.value,
    sex: sexId.value
  }).then(res => {
    if (res) {
      store.dispatch('getUserInfo')
      spop({
        template: proxy.$t('user.desc45'),
        style: 'success',
        autoclose: 2000
      })
    }
  })
}

const inviteCode = ref('')
function handleInviteCodeConfirm() {
  if (!inviteCode.value) {
    return
  }
  _inviteCodeAdd({
    inviteCode: inviteCode.value
  }).then(res => {
    if (res) {
      store.dispatch('getUserInviteInfo')
    }
  })
}


onMounted(() => {
  getInpW()
  store.dispatch('getUserInviteInfo')
})
onUpdated(() => {
  getInpW()

})

</script>


<style lang='scss' scoped>
.user-info {
  flex: 0 0 auto;
  margin-right: 0.16rem;
  width: 33.14%;
  min-width: 3.5rem;
  background: var(--gg-card-bg);
  border-radius: 0.2rem;
  padding: 0.24rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .title {
    flex: 0 0 auto;
    margin-bottom: 0.16rem;
    font-family: 'PingFang SC';
    font-style: normal;
    font-weight: 400;
    font-size: 0.2rem;
    line-height: 2em;
    color: var(--gg-text);
  }

  .form {
    flex: 1;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .inp-con {
      margin-bottom: 0.16rem;
      display: flex;
      flex-direction: column;
      border-radius: 0.04rem;
      font-size: 0.14rem;

      &:last-child {
        margin-bottom: 0;
      }

      span {
        margin-bottom: 0.08rem;
        flex: 0 0 auto;
        display: flex;
        align-items: center;
        box-sizing: border-box;
        font-size: 0.16rem;
        line-height: 1.5em;
        color: var(--gg-text);
      }

      input {
        width: 100%;
        height: 0.44rem;
        padding: 0 0.16rem;
        box-sizing: border-box;
        color: var(--gg-subtitle);
        background: var(--gg-inp-bg);
        border-radius: 0.08rem;
        font-size: 0.14rem;
        color: var(--gg-text);

        &::placeholder {
          color: var(--gg-inp-plac);
        }
      }

      .select-name {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: var(--gg-subtitle);
        font-size: 0.14rem;
        padding-right: 0.12rem;
        box-sizing: border-box;

        .val {
          height: 100%;
          display: flex;
          align-items: center;
        }
      }

      :deep {
        .van-popover__wrapper {
          width: 100%;
          height: 0.44rem;
          color: var(--gg-subtitle);
          background: var(--gg-inp-bg);
          border-radius: 0.08rem;
          padding: 0 0.16rem;
          font-size: 0.14rem;
        }
      }
    }

    .btn {
      margin-top: 0.32rem;
      width: 100%;
      height: 0.48rem;
      background: var(--gg-btn-bg);
      color: var(--gg-btn-color);
      border-radius: 0.12rem;
      font-size: 0.16rem;
      line-height: 1.4em;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }


  }
}

@media (max-width:992px) {
  .user-info {
    width: 100%;
    margin-right: 0;
    margin-bottom: 0.16rem;
    border-radius: 0.06rem;

  }
}

@media (max-width:749px) {
  .user-info {
    min-width: 100%;
    margin-bottom: 0.16rem;
    padding: 0.16rem;
    border-radius: 0.12rem;

    .title {
      margin-bottom: 0.12rem;
      font-size: 0.16rem;
      line-height: 0.22rem;
    }

    .form {
      .inp-con {
        margin-bottom: 0.12rem;
      }

      .btn {
        height: 0.44rem;
        margin-top: 0.2rem;
        border-radius: 0.08rem;
        font-size: 0.14rem;
      }
    }
  }
}
</style>