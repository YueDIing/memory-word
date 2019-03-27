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
      <div class="center h-user" v-if="user && JSON.stringify(user) !== '{}'">
        <img :src="'http://10.21.40.40/star2/' + user.image" alt="userImg">
        <div class="username">{{user.name}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
import Bus from '../../assets/script/Bus.js'
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
        {name: '翻译', href: '/Translation', icon: ''},
        {name: '查看试卷', href: '/Test', icon: ''}
      ],
      user: null
    }
  },
  beforeMount () {
    // 获取用户信息
    axios({
      url: 'http://localhost/Vue_project/Memory-word/static/php/userss.php?key=' + this.getUrlParameter('key') + '',
      method: 'get'
    }).then(res => {
      let data = res.data
      if (res.status === 200 && data) {
        this.user = res.data
        console.log(data)
        Bus.$emit('sendUser', data.userID)
        axios({ // 是否加入数据库
          url: 'http://localhost/Vue_project/Memory-word/static/php/add_user.php',
          method: 'post',
          data: qs.stringify({
            name: data.name,
            star_id: data.userID
          })
        }).then(_res => {
          // console.log(_res.data)
        }).catch(_error => { console.log(_error) })
      }
    }).catch(error => { console.log(error) })
  },
  methods: {
    // 获取浏览器路径后的参数
    getUrlParameter (name) {
      let reg = new RegExp(`(^|&)${name}=(([^&]*)(&|$))`)
      let r = location.search.substr(1).match(reg)
      if (r != null) {
        return unescape(r[2])
      } else {
        return null
      }
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
    margin-bottom: 50px;
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
    cursor: pointer;
    &:hover{
      color: #1e90ff;
    }
    & > img{
      display: block;
      width: 40px;
      height: 40px;
      border-radius: 20px;
      margin-right: 15px;
      // box-shadow: 0 0 5px 0 rgba(0, 0, 0, .2);
    }
  }
</style>
