<template>
  <fade :status="visility">
    <div class="center loading-bg">
      <svg class="load-wrap" viewBox='-5 -5 60 60'>
        <circle class="loading" cx='25' cy='25' r='25'/>
      </svg>
    </div>
  </fade>
</template>

<script>
import fade from './fade'
export default {
  props: {
    visility: {
      type: Boolean,
      required: true
    }
  },
  name: 'loading',
  components: {
    fade
  }
}
</script>

<style lang="less" scoped>
.loading-bg{
  position: fixed;
  z-index: 99;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .8);
}
.load-wrap{
  width: 60px;
  height: 60px;
  animation: rotate 2s linear infinite;
}
.loading{
  stroke: #1e90ff;
  stroke-width: 3px;
  fill: transparent;
  animation: loading 2s linear infinite;
}
@keyframes loading{
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 130, 200;
    stroke-dashoffset: -50;
  }
  100% {
    stroke-dasharray: 130, 200;
    stroke-dashoffset: -188;
  }
}
@keyframes rotate{
  to{ transform: rotate(360deg) }
}
</style>
