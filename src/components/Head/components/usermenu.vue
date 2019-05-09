<template>
  <ul class="u-list">
    <!--
      加.native 解决路由无法触发click事件
    -->
    <router-link
      :class="[item.id === active ? 'active' : '']" :to="{path: item.path}"
      v-for="(item, index) in menu" :key="item.id || index"
      tag="li"
      @click.native="selectCurrent(index)"
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
      active: 0,
      menu: [
        { id: 0, content: '试卷管理', path: '/usercenter/testmanage', icon: '&#xe6ca;', active: false },
        { id: 1, content: '单词管理', path: '/usercenter/wordManage', icon: '&#xe624;', active: true },
        { id: 2, content: '分类管理', path: '/usercenter/classifyManage', icon: '&#xe600;', active: false }
      ]
    }
  },
  beforeMount () {
    // 当前router高亮
    let name = (this.$route.name.indexOf('/') > -1) ? this.$route.name : `/${this.$route.name}`
    this.menu.forEach(item => {
      if (item.path.indexOf(name) > -1) {
        this.selectCurrent(item.id)
      }
    })
  },
  methods: {
    selectCurrent (index) {
      let active = this.active
      this.menu[active].active = false
      this.menu[index].active = true
      this.active = index
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
