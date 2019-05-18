<template>
  <div class="flex switch-wrap">
    <span class="tips">{{ before }}</span>
    <span class="switch"></span>
    <span class="tips">{{ after }}</span>
  </div>
</template>

<script>
export default {
  name: 'RepeatSwitch',
  props: {
    after: {
      type: String,
      default: '中英'
    },
    before: {
      type: String,
      default: '英'
    },
    status: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="less" scoped>
@import url("../../assets/css/public");
.switch-wrap{
  cursor: pointer;
}
.switch{
  position: relative;
  width: 40px;
  height: 20px;
  margin: 0 8px;
  border-radius: 20px;
  background-color: #dcdfe6;
  &:before{
    position: absolute;
    top: 50%;
    left: 2px;
    content: '';
    width: 16px;
    height: 16px;
    border-radius: 16px;
    background-color: @color-white;
    transform: translateY(-50%);
    transition: background-color .3s;
  }
}
.tips{
  font-size: 14px;
  transition: color .3s;
}
.tips-active{
  color: @color;
}
</style>
