<template>
  <ul class="u-list">
    <router-link
      :class="[currentRouter === index ? 'active' : '']"
      :to="{path: item.path}"
      v-for="(item, index) in menu" :key="item.id || index"
      tag="li"
    >
      <span class="iconfont menu-content" v-html="item.icon"></span>
      <span>{{ item.content }}</span>
    </router-link>
  </ul>
</template>

<script>
// components
export default {
  name: 'userMenu',
  data () {
    return {
      menu: [
        { id: 0, content: '试卷管理', path: '/usercenter/testmanage', icon: '&#xe6ca;', active: false },
        { id: 1, content: '单词管理', path: '/usercenter/wordManage', icon: '&#xe624;', active: true },
        { id: 2, content: '分类管理', path: '/usercenter/classifyManage', icon: '&#xe600;', active: false }
      ]
    }
  },
  computed: {
    currentRouter () {
      const menu = this.menu
      const route = this.$route
      return menu.findIndex(item => item.path.toLowerCase() === route.path.toLowerCase())
    }
  }
}
</script>

<style lang="less" scoped>
  @import url('../../../assets/css/public');
  .u-list{
    padding: 15px 0;
    border-radius: 3px;
    background-color: @color-white;
  }
  li{
    line-height: 35px;
    padding: 5px 15px;
    font-size: 14px;
    color: @color;
    cursor: pointer;
    &:not(:last-child){
      border-bottom: 1px solid #eee;
    }
    &:hover{
      color: @color-white;
      background-color: @color;
    }
  }
  .menu-content{
    margin-right: 8px;
  }
</style>
