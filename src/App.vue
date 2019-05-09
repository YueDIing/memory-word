<template>
  <div id="app" v-cloak>
    <heads :active="-1" v-show="this.$route.name !== 'testprint'"></heads>
    <backTop></backTop>
    <div class="main-wrap">
      <div class="main-content">
        <!--
          过渡模式
            in-out 新元素先过渡完成后删除之前的元素
            out-in 跟上面相反, 当前元素先过渡离开, 完成之后新元素过渡进入
        -->
        <transition name="fade" mode="out-in">
          <router-view />
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import './assets/css/global.less'
// import bus from './assets/script/bus'
// components
import backTop from './components/repeat/backTop'
import heads from './components/head/head'
export default {
  name: 'App',
  components: {
    backTop,
    heads
  },
  created () {
  }
}
</script>

<style lang='less'>
[v-cloak]{
  display: none !important;
}
.main-wrap{
  /*
    防止页面抖动
  */
  padding-left: calc(100vw - 100%);
}
.main-content{
  width: 1330px;
  margin: 0 auto 50px;
}
.fade-enter-active, .fade-leave-active{
  /*
    由于动画模式是out-in 把原本的.3s 替换成.15s
    解决问题
      动画完成时间从 0.6 => 0.4 (目前进出各0.2)
  */
  transition: opacity .2s;
}
@media print{
  .main-content{
    width: auto;
    margin: 0;
  }
}
</style>
