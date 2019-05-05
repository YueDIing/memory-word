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
  name: 'fade'
}
</script>

<style lang="less" scoped>
</style>
