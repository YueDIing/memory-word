<template>
<div>
    <div
      class="m-list"
      v-for="(item, index) in messageList"
      :key="index"
    >
      <transition name="fade-move">
        <div class="message-window" v-if="item.status">{{item.content}}</div>
      </transition>
    </div>
    <div class="button" @click="messageList.splice(0, 1)">button</div>
    <div @click="messageList.push({content: '111', status: true})">add</div>
</div>
</template>

<script>
export default {
  name: 'message',
  data () {
    return {
      status: true,
      messageList: [
        {content: '1', status: true}/* ,
        {content: '2', status: true},
        {content: '3', status: true},
        {content: '4', status: true},
        {content: '5', status: true} */
      ]
    }
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
.m-list{
  position: absolute;
  z-index: 8;
  top: 30px;
  left: 50%;
}
.message-window{
  position: absolute;
  top: -30px;
  width: 275px;
  height: 55px;
  padding: 0 15px;
  border-radius: 3px;
  line-height: 55px;
  background-color: #edf2fc;
  border: 1px solid #ebeef5;
  color: #909399;
  opacity: 0;
}
</style>
