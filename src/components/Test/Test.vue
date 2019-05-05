<template>
  <div class="test">
    <div class="t-content">
      <div class="t-list-head">
        <div class="t-position">Position</div>
        <div class="t-title">Title</div>
        <div class="t-number">Number</div>
        <div class="t-status">Status</div>
        <div class="t-time">Time</div>
        <div class="t-operation">Operation</div>
      </div>
      <ul class="t-list" v-if="allTest && allTest.length">
        <li v-for="(item, index) in allTest" :key="item.id || index">
          <div class="t-position">{{ allTest.length - index}}</div>
          <div class="t-title">{{ item.title }}</div>
          <div class="t-number">{{item.number}}</div>
          <div class="t-status">{{ item.status  / 1? '已结束' : '进行中' }}</div>
          <div class="t-time">{{item.time}}</div>
          <div class="t-operation">
            <router-link class="select" :to="{path: 'TestPrint', query: {id: item.id}}" v-if="item.status / 1 === 1">查看答案</router-link>
            <div class="select nodrop" v-else>查看答案</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Bus from '../../assets/script/bus.js'
import Methods from '../../assets/script/methods.js'
// 组件
import repeatSelect from '../repeat/select'
import popup from '../repeat/popup'
export default {
  name: 'test',
  components: {
    repeatSelect,
    popup
  },
  data () {
    return {
      user: null,
      newTestStatus: false, // 是否显示添加试卷
      newTest: {title: '', number: ''},
      numberList: [
        { id: '0', val: '40' },
        { id: '1', val: '50' },
        { id: '2', val: '60' },
        { id: '3', val: '70' },
        { id: '4', val: '80' },
        { id: '5', val: '90' },
        { id: '6', val: '100' }
      ],
      classifyList: null, // 试卷类型
      allTest: null
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
          this.user = getData.data
        } else {
          Methods.getCode(getData.code)
        }
      })
    })
    this.getAllTest()
  },
  beforeDestroy () {
    // 需要手动销毁Bus, 避免多次重复调用事件
    Bus.$off('sendUser')
  },
  methods: {
    getAllTest () { // 获取全部试卷
      axios({
        method: 'get',
        url: 'http://localhost/Vue_project/Memory-word/static/php/get_all_test.php'
      }).then(res => {
        let getData = res.data
        if (res.status === 200 && getData.code / 1 === 4000) {
          this.allTest = getData.data
        } else {
          Methods.getCode(getData.code)
        }
      })
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
    border-radius: 3px;
    padding: 35px 30px 45px 30px;
    background-color: white;
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
    width: 500px;
    background-color: white;
    border-radius: 3px;
    transform: translate(-50%, -50%);
    h3{
      margin-bottom: 25px;
      font-size: 20px;
      color: #1e90ff;
    }
  }
  .t-enter{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  .t-list-head{
    display: flex;
    padding-bottom: 15px;
    text-align: center;
    font-weight: bold;
    color: #1e90ff;
    border-bottom: 1px solid #dfe4ea;
  }
  .t-list{
    background-color: white;
    border-radius: 3px;
    & > li{
      display: flex;
      text-align: center;
    }
    & > li{
      font-size: 14px;
      line-height: 45px;
      &:nth-child(2n){
        background-color: #eee;
      }
      &:hover{
        background-color: #dfe4ea;
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
    & > *{
     flex: 1;
    }
  }
  .btn-auto{
    margin-top: 25px;
  }
  .select{
    display: block;
    cursor: pointer;
    transition: background-color .3s, color .3s;
    &:hover{
      color: white;
      background-color: #1e90ff;
    }
  }
  .nodrop{
    color: #ccc;
    &:hover{
      color: #ccc;
      background-color: transparent;
    }
  }
</style>
