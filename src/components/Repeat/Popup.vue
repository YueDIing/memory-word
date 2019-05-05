<template>
  <Fade :status="status">
    <div class="center popup-bg">
      <div class="popup">
        <div class="p-content">
          <div class="iconfont close" @click="close">&#xe65c;</div>
          <h3 class="title">{{title}}</h3>
          <div class="p-slot">
            <slot></slot>
          </div>
        </div>
      </div>
    </div>
  </Fade>
</template>

<script>
import Fade from './fade'
export default {
  props: {
    status: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '默认标题'
    }
  },
  name: 'popup',
  components: {
    Fade
  },
  methods: {
    close () {
      this.$emit('closed', false)
    }
  }
}
</script>

<style lang="less" scoped>
  .popup-bg{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5)
  }
  .popup{
    position: relative;
    width: 530px;
    padding: 30px 30px;
    background-color: white;
    border-radius: 3px;
    .title{
      margin-top: 10px;
      color: #1e90ff;
    }
  }
  .p-slot{
    margin: 30px 0;
  }
</style>
