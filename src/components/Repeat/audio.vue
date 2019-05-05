<template>
  <div class="word-audio">
    <audio class="hide" :src="path" ref="audio" controls autoplay></audio>
  </div>
</template>

<script>
export default {
  name: 'wordAudio',
  props: {
    path: {
      type: String,
      default: null
    }
  },
  mounted () {
    let audio = this.$refs.audio
    audio.addEventListener('play', () => {
      console.log('开始播放')
    })
    audio.addEventListener('ended', () => {
      console.log('播放结束')
      this.$emit('sendRequireClearUrl')
    })
  }
}
</script>

<style scoped>
</style>
