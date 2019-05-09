<template>
  <div class="user-center">
    <div class="user-menu" v-show="this.$route.name !== 'testprint'">
      <usermenu :active="9999"></usermenu>
    </div>
    <div class="user-content">
      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
    </div>
  </div>
</template>

<script>
// components
import usermenu from './components/usermenu'
export default {
  name: 'userCenter',
  components: {
    usermenu
  },
  beforeCreate () {
    const user = this.$store.user
    // 如果没有权限返回首页
    if (user && user._level / 1) {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="less" scoped>
  .user-center{
    display: flex;
  }
  .user-menu{
    flex: 1.2;
  }
  .user-content{
    flex: 8.8;
    margin-left: 35px;
  }
  .fade-enter-active, .fade-leave-active{
    transition: opacity .2s;
  }
</style>
