<template>
  <fade :status="backTopStatus">
    <div class="center back-top" @click="back">
      <div class="arrow-top"></div>
    </div>
  </fade>
</template>

<script>
import fade from './fade'
export default {
  name: 'backTop',
  components: {
    fade
  },
  data () {
    return {
      show: false,
      backTopStatus: false
    }
  },
  methods: {
    back () {
      let time = setInterval(() => {
        let val = document.documentElement.scrollTop
        if (val === 0) {
          clearInterval(time)
          return
        }
        let speed = Math.floor(-val / 6)
        document.documentElement.scrollTop = val + speed
      }, 25)
    }
  },
  mounted () {
    const docu = document.documentElement
    // 监听滚动事件，获取滚动条位置
    window.addEventListener('scroll', () => {
      let scrTop = docu.scrollTop
      if (scrTop >= docu.clientHeight) {
        this.backTopStatus = true
      } else {
        this.backTopStatus = false
      }
    })
  }
}
</script>

<style lang="less" scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to{
  opacity: 0;
}
.back-top{
  position: fixed;
  z-index: 3;
  right: 30px;
  bottom: 10%;
  width: 50px;
  height: 50px;
  background-color: white;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, .2);
  border-radius: 3px;
  cursor: pointer;
  transition: box-shadow .3s;
  &:hover{
    box-shadow: 0 0 8px 0 rgba(0, 0, 0, .4);
  }
  .arrow-top{
    width: 0;
    height: 0;
    line-height: 0;
    border-bottom: 12px solid #1e90ff;
    border-left: 9px solid transparent;
    border-right: 9px solid transparent;
  }
}
</style>
