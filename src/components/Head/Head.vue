<template>
  <div class="head">
    <div class="h-content">
      <router-link tag="div" to="/" class="center title-main h-logo"></router-link>
      <ul class="h-menu">
        <router-link class="center"
          :to="item.href"
          v-for="(item, index) in menu"
          :key="index"
          tag="li"
          :class="[currentRouter === index ? 'active' : '']"
        >
          {{item.name}}
        </router-link>
      </ul>
      <div class="center h-user" v-if="user && JSON.stringify(user) !== '{}'">
        <router-link
          class="center username"
          :to="user && user._level / 1 === 0 ? '/userCenter' : ''"
          tag="a"
        >
          <img :src="'http://10.21.40.40/star2/' + user.image" alt="userImg">
          <span>{{ user.name }}</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
import Bus from '@public/script/bus.js'
import methods from '@public/script/methods.js'
export default {
  name: 'heads',
  data () {
    return {
      active: null,
      menu: [
        { name: '全部单词', href: '/home', icon: '', active: false },
        { name: '查看试卷', href: '/test', icon: '', active: false }
      ],
      user: null
    }
  },
  created () {
    // 获取用户信息
    this.$route.query.key = '%2Fr0qngP9ySfZO3zuDkFnARuV8le7WzUbus013UdaMD4zcb4PnY%2FS3IInHShTDxz%2F9M1DXWx2b7GjQYYTKUvc'
    // this.$route.query.key = '%20ex7lgKpniDZP3zuDkFrAQmUwEdwzYwb%2Fo1%2Fm19Oejkfcq0znsGFjYN5XWEZS1f%2F681DQmxpcq2oXIcfKUvaZWh%20'
    axios({
      url: `${methods.path}/userss.php?key=${this.$route.query.key}`,
      method: 'get'
    }).then(res => {
      let data = res.data
      if (res.status === 200 && data) {
        res.data._level = null
        this.user = res.data
        Bus.$emit('sendUser', data.userID)
        axios({ // 是否加入数据库
          url: `${methods.path}/add_user.php`,
          method: 'post',
          data: qs.stringify({
            name: data.name,
            star_id: data.userID,
            level: data.level
          })
        }).then(_res => {
          const _getData = _res.data
          if (_res.status === 200 && _getData.code / 1 === 4000 && _getData.data) {
            this.user._level = _getData.data.level
            // 将用户信息保存到bus中, 让其他组件获取用户信息
            Bus.$emit('userInfo', this.user)
            this.$store.commit('getUser', this.user)
          }
        }).catch(_error => { console.log(_error) })
      }
    }).catch(error => { console.log(error) })
  },
  computed: {
    currentRouter () {
      const menu = this.menu
      const route = this.$route
      return menu.findIndex(item => item.href === route.path.toLowerCase())
    }
  }
}
</script>

<style lang='less' scoped>
  @import url('../../assets/css/public');
  @value: 15px;
  .head{
    @width: 100%;
    position: relative;
    z-index: 5;
    width: @width;
    height: 65px;
    margin-bottom: 50px;
    background-color: @color-white;
    padding-left: calc(100vw - @width);
  }
  .h-logo{
    background: url(../../../static/img/logo_v2.png) no-repeat center;
    background-size: auto 80%;
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
    color: @color;
    cursor: pointer;
  }
  .h-menu{
    display: flex;
    height: inherit;
    li{
      width: 120px;
      height: inherit;
      color: @color;
      transition: color .3s, background-color .3s;
      cursor: pointer;
    }
    li:not(:last-child){
      margin-right: @value;
    }
    li:hover{
      background-color: @color;
      color: @color-white;
    }
  }
  .h-user{
    height: 100%;
    margin-left: auto;
    cursor: pointer;
    &:hover{
      color: @color;
    }
  }
  .username{
    height: 100%;
    & img{
      @val: 40px;
      display: block;
      width: @val;
      height: @val;
      border-radius: 20px;
    }
    & span {
      display: block;
      line-height: 65px;
      padding: 0 15px;
      height: inherit;
    }
  }
</style>
