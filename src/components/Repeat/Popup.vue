<template>
  <Fade :status="status">
    <div class="popup-bg">
      <slot></slot>
    </div>
  </Fade>
</template>

<script>
import Fade from './Fade'
export default {
  props: {
    status: {
      type: Boolean,
      default: false
    }
  },
  name: 'Popup',
  components: {
    Fade
  }
}
</script>

<style lang="less" scoped>
  .popup-bg{
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, .5)
  }
</style>
