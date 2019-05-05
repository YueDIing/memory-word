<template>
  <div class="word-manage">
    <div class="test-manage">
      <div class="all-test">
        <div class="t-head">
          <div class="btn-min"
            @click="change"
          >New Test</div>
        </div>
        <ul class="t-list-head">
          <li>
            <div class="t-position">Position</div>
            <div class="t-title">Title</div>
            <div class="t-number">Number</div>
            <div class="t-status">Status</div>
            <div class="t-time">Time</div>
            <div class="t-operation">Operation</div>
          </li>
        </ul>
        <ul class="t-list" v-if="allTest && allTest.length">
          <li v-for="(item, index) in allTest" :key="item.id || index">
            <div class="t-position">{{ allTest.length - index}}</div>
            <div class="t-title">{{ item.title }}</div>
            <div class="t-number">{{item.number}}</div>
            <div class="t-status">{{ item.status  / 1? '已结束' : '进行中' }}</div>
            <div class="t-time">{{item.time}}</div>
            <div class="t-operation" v-if="user && user.level / 1 !== 0">
              <!-- <router-link class="select" :to="{path: 'TestPrint', query: {id: item.id}}" v-if="item.status / 1 === 1">查看答案</router-link> -->
              <router-link class="select" :to="{path: 'TestPrint', query: {id: item.id}}" v-if="item.status / 1 === 1">查看答案</router-link>
              <div class="select" v-else>查看答案</div>
            </div>
            <div class="t-operation" v-else>
              <router-link class="select" :to="{path: 'TestPrint', query: {id: item.id}}">{{ item.status / 1 ? '答案' : '打印' }}</router-link>
              <div class="select nodrop" v-if="item.status / 1">出卷</div>
              <div class="select" @click="outTest(item.id, index)" v-else>出卷</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <popup :status="newTestStatus" :title="'添加试卷'" @closed="closed">
      <div class="t-test-bg">
        <div class="t-enter">
          <repeat-select
            :empty="true"
            :data="classifyList"
            :placeholder="'请选择分类'"
            v-model="newTest.title"
          ></repeat-select>
          <repeat-select
            :empty="true"
            :data="numberList"
            :placeholder="'请选择数量'"
            v-model="newTest.number"
          ></repeat-select>
          <button class="btn-auto" @click="submitTest">添加</button>
        </div>
      </div>
    </popup>
  </div>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
import methods from '../../../assets/script/methods'
import Bus from '../../../assets/script/bus'
// 组件
import repeatSelect from '../../repeat/select'
import popup from '../../repeat/popup'
export default {
  name: 'testManage',
  components: {
    repeatSelect,
    popup
  },
  data () {
    return {
      user: null,
      allTest: null,
      newTestStatus: false, // 是否显示添加试卷
      newTest: {title: '', number: ''},
      classifyList: null, // 显示所有试卷
      numberList: [
        { id: '0', val: '40' },
        { id: '1', val: '50' },
        { id: '2', val: '60' },
        { id: '3', val: '70' },
        { id: '4', val: '80' },
        { id: '5', val: '90' },
        { id: '6', val: '100' }
      ]
    }
  },
  beforeMount () {
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
          methods.getCode(getData.code)
        }
      })
    })
    this.getAllTest()
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
          methods.getCode(getData.code)
        }
      })
    },
    closed (res) {
      this.newTestStatus = !this.newTestStatus
    },
    change () { // 是否显示添加试卷
      this.newTestStatus = !this.newTestStatus
      this.newTest.title = ''
      this.newTest.number = ''
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
          methods.popup(getData.code)
        }
      })
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
            methods.popup(getData.message)
            this.newTestStatus = !this.newTestStatus
            this.getAllTest()
          } else {
            methods.getCode(getData.code)
          }
        })
      } else {
        methods.popup('参数为空')
      }
    },
    outTest (id, index) { // 出卷
      axios({
        method: 'post',
        url: 'http://localhost/Vue_project/Memory-word/static/php/out_test.php',
        data: qs.stringify({ id: id })
      }).then(res => {
        let getData = res.data
        if (res.status === 200 && getData.code / 1 === 4000) {
          this.allTest[index].status = 1
        }
      }).catch(error => { console.log(error) })
    }
  }
}
</script>

<style lang="less" scoped>
  .border-radius{
    border-radius: 3px;
  }
  .test-manage{
    width: 100%;
  }
  .all-test{
    padding: 15px 30px 30px;
    .border-radius();
    background-color: white;
  }
  .t-head{
    display: flex;
    .btn-min{
      margin-left: auto;
    }
  }
  .t-list-head{
    color: #1e90ff;
    font-weight: bold;
    background-color: white;
    border-radius: 3px;
    & > li{
      display: flex;
      text-align: center;
      padding: 15px 0;
      font-weight: bold;
      color: #1e90ff;
      border-bottom: 1px solid #dfe4ea;
      border-top: 1px solid #dfe4ea;
    }
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
      &:nth-child(2n + 1){
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
  // popup
  .t-enter{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
</style>
