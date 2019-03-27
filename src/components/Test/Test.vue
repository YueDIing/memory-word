<template>
  <div class="test">
    <Head :active='2'></Head>
    <div class="t-content">
      <div class="t-head">
        <div class="btn-min"
          v-if="user && user.level / 1 === 0"
          @click="change"
        >New Test</div>
      </div>
      <Fade :status="newTest">
        <div class="t-test-bg">
          <div class="iconfont close" @click="change">&#xe65c;</div>
          <h3>123</h3>
        </div>
      </Fade>
      <ul class="t-list">
        <li>
          <div class="t-position">Position</div>
          <div class="t-title">Title</div>
          <div class="t-number">Number</div>
          <div class="t-status">Status</div>
          <div class="t-time">Time</div>
          <div class="t-operation">Operation</div>
        </li>
        <li>
          <div class="t-position">1</div>
          <div class="t-title">第N次测试</div>
          <div class="t-number">50</div>
          <div class="t-status">进行中</div>
          <div class="t-time">time</div>
          <div class="t-operation" v-if="user && user.level / 1 !== 0">
            <div class="select">查看答案</div>
          </div>
          <div class="t-operation" v-else>
            <div class="select">打印</div>
            <div class="select">出卷</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Bus from '../../assets/script/Bus.js'
import Methods from '../../assets/script/Methods.js'
import Head from '../Head/Head'
import Fade from '../Repeat/Fade'

export default {
  name: 'Test',
  components: {
    Head,
    Fade
  },
  data () {
    return {
      user: null,
      newTest: true
    }
  },
  created () {
    Bus.$on('sendUser', res => {
      axios({
        methdo: 'get',
        url: `http://localhost/Vue_project/Memory-word/static/php/query_user.php?id=${res}`
      }).then(res => {
        let getData = res.data
        if (res.status === 200 && getData.code === 4000) {
          console.log(getData)
          this.user = getData.data
        } else {
          Methods.popup(getData.code)
        }
      })
    })
  },
  methods: {
    change () {
      this.newTest = !this.newTest
    }
  }
}
</script>

<style lang="less" scoped>
  .test{
    width: 100%;
  }
  .t-content{
    width: 1330px;
    margin: 55px auto 0 auto;
  }
  .t-head{
    display: flex;
    .btn-min{
      margin-left: auto;
      font-weight: bold;
      transform: translateY(-65%);
    }
  }
  .t-test-bg{
    position: absolute;
    top: 50%;
    left: 50%;
    width: 550px;
    height: 350px;
    padding: 15px;
    background-color: white;
    border-radius: 3px;
    transform: translate(-50%, -50%);
  }
  .t-list{
    padding: 25px 15px;
    background-color: white;
    border-radius: 3px;
    & > li{
      display: flex;
      text-align: center;
    }
    & > li:first-child{
      padding-bottom: 15px;
      font-weight: bold;
      color: #1e90ff;
      border-bottom: 1px solid #dfe4ea;
    }
    & > li:first-child ~ li{
      font-size: 14px;
      line-height: 50px;
      &:nth-child(2n + 1){
        background-color: #eee;
      }
      &:hover{
        background-color: #dfe4ea;
        // background-color: rgba(30, 144, 255, .1);
      }
    }
    & > li:last-child{
      border-bottom: 1px solid #dfe4ea;
    }
  }
  .t-position,
  .t-number,
  .t-status{
    flex: 1;
  }
  .t-title{
    flex: 3;
  }
  .t-time,
  .t-operation{
    flex: 2;
  }
  .t-operation{
    display: flex;
    justify-content: center;
    & div{
     flex: 1;
    }
  }
  .select{
    cursor: pointer;
    transition: background-color .3s, color .3s;
    &:hover{
      color: white;
      background-color: #1e90ff;
    }
  }
</style>
