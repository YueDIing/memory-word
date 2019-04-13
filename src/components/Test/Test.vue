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
      <popup :status="newTestStatus">
        <div class="t-test-bg">
          <div class="iconfont close" @click="change">&#xe65c;</div>
          <h3>添加试卷</h3>
          <div class="t-enter">
            <Repeat-select
              :empty="true"
              :data="classifyList"
              :placeholder="'请选择分类'"
              v-model="newTest.title"
            ></Repeat-select>
            <Repeat-select
              :empty="true"
              :data="numberList"
              :placeholder="'请选择数量'"
              v-model="newTest.number"
            ></Repeat-select>
            <button class="btn-auto" @click="submitTest">添加</button>
          </div>
        </div>
      </popup>
      <ul class="t-list" v-if="allTest && allTest.length">
        <li>
          <div class="t-position">Position</div>
          <div class="t-title">Title</div>
          <div class="t-number">Number</div>
          <div class="t-status">Status</div>
          <div class="t-time">Time</div>
          <div class="t-operation">Operation</div>
        </li>
        <li v-for="(item, index) in allTest" :key="item.id || index">
          <div class="t-position">{{ allTest.length - index}}</div>
          <div class="t-title">{{ item.title }}</div>
          <div class="t-number">{{item.number}}</div>
          <div class="t-status">进行中</div>
          <div class="t-time">{{item.time}}</div>
          <div class="t-operation" v-if="user && user.level / 1 !== 0">
            <router-link class="select" :to="{path: 'TestPrint', query: {id: item.id}}" v-if="item.status / 1 === 1">查看答案</router-link>
            <div class="select" v-else>查看答案</div>
          </div>
          <div class="t-operation" v-else>
            <!-- <div class="select">打印</div> -->
            <router-link class="select" :to="{path: 'TestPrint', query: {id: item.id}}">打印</router-link>
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
import qs from 'qs'
import Methods from '../../assets/script/Methods.js'
// 组件
import Head from '../Head/Head'
import RepeatSelect from '../Repeat/Select'
import Popup from '../Repeat/Popup'
export default {
  name: 'Test',
  components: {
    Head,
    RepeatSelect,
    Popup
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
          if (getData.data.level / 1 === 0) {
            // 获取所有试卷分类
            this.getTestType()
          }
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
    change () { // 是否显示添加试卷
      this.newTestStatus = !this.newTestStatus
      this.newTest.title = ''
      this.newTest.number = ''
    },
    submitTest () { // 添加试卷
      let parameter = this.newTest
      if (parameter.title !== '' && parameter.number !== '') {
        axios({
          method: 'post',
          url: 'http://localhost/Vue_project/Memory-word/static/php/add_test.php',
          data: qs.stringify({
            class_id: this.newTest.title.id,
            number: this.newTest.number.val
          })
        }).then(res => {
          let getData = res.data
          if (res.status === 200 && getData.code === 4000) {
            // console.log(getData)
            Methods.popup(getData.message)
            this.newTestStatus = !this.newTestStatus
            this.getAllTest()
          } else {
            Methods.getCode(this.code)
          }
        })
      } else {
        Methods.popup('参数为空')
      }
    },
    getTestType () { // 获取试卷类型
      axios({
        mehtod: 'get',
        url: 'http://localhost/Vue_project/Memory-word/static/php/get_test_type.php'
      }).then(res => {
        let getData = res.data
        if (res.status === 200 && getData.code / 1 === 4000) {
          let data = getData.data
          // 改变成成select组件需要的的数据格式
          this.classifyList = data.map(item => { return { id: item.id, val: item.type_name, lebal: item.num } })
        } else {
          Methods.popup(getData.code)
        }
      })
    },
    getAllTest () { // 获取全部试卷
      axios({
        method: 'get',
        url: 'http://localhost/Vue_project/Memory-word/static/php/get_all_test.php'
      }).then(res => {
        let getData = res.data
        if (res.status === 200 && getData.code / 1 === 4000) {
          console.log(getData)
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
    // height: 250px;
    padding: 35px 15px 45px 15px;
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
</style>
