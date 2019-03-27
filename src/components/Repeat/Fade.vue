<template>
  <transition name="fade">
    <div class="fade" v-if="status">
      <slot></slot>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    status: {
      type: Boolean,
      required: true,
      default: true
    }
  },
  name: 'Fade'
}
</script>

<style lang="less" scoped>
  .fade-enter, .fade-leave-to{
    opacity: 0;
  }
  .fade-enter-active, .fade-leave-active{
    transition: opacity .3s;
  }
  .fade{
    position: absolute;
    top: 0;
    left: 0;
    z-index: 6;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, .6);
  }
</style>
