<template>
  <div class="head">
    <div class="h-content">
      <div class="center h-logo">LOGO</div>
      <ul class="h-menu">
        <router-link class="center"
          :to="item.href"
          v-for="(item, index) in menu"
          :key="index"
          tag="li"
          :class="[(active === index) ? 'active' : '']"
        >
          {{item.name}}
        </router-link>
      </ul>
      <div class="h-user">
        <div class="center h-login">Login</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    active: {
      type: Number,
      default: 0
    }
  },
  name: 'Head',
  data () {
    return {
      menu: [
        {name: '全部单词', href: '/', icon: ''},
        {name: '查看试卷', href: '', icon: ''}
      ]
    }
  }
}
</script>

<style lang='less' scoped>
  @value: 15px;
  .head{
    position: relative;
    z-index: 5;
    width: 100%;
    height: 65px;
    background-color: white;
    // box-shadow: 0 -2px 5px 0 rgb(0, 0, 0, .1);
  }
  .h-content{
    display: flex;
    align-items: center;
    width: 1330px;
    height: inherit;
    margin: 0 auto;
  }
  .h-logo{
    width: 125px;
    height: inherit;
    margin-right: @value;
    font-weight: bold;
    color: #1e90ff;
  }
  .h-menu{
    display: flex;
    height: inherit;
    li{
      width: 120px;
      height: inherit;
      color: #1e90ff;
      transition: color .3s, background-color .3s;
      cursor: pointer;
    }
    li:not(:last-child){
      margin-right: @value;
    }
    li:hover{
      background-color: #1e90ff;
      color: white;
    }
    .active{
      background-color: #1e90ff;
      color: white;
    }
  }
  .h-user{
    height: 100%;
    margin-left: auto;
  }
  .h-login{
    width: 125px;
    height: 100%;
    transition: background-color .3s, color .3s;
    cursor: pointer;
    &:hover{
      background-color: #1e90ff;
      color: white;
    }
  }
</style>
