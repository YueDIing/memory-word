<template>
  <div class="user-center">
    <loading :visility="loading"></loading>
    <div class="u-content">
      <popup :status="popupStatus" :title="'添加单词'" @closed="changeStatus">
        <div class="word-file">
          <repeatSelect
            :empty="true"
            :data="classifyList"
            :placeholder="'请选择分类'"
            v-model="currentClassify"
          ></repeatSelect>
          <label for="word" class="iconfont btns-main">&#xe83b; <span>上传文件</span></label>
          <input type="file" class="hide" id="word" @change="addWordFile" ref="wordFile">
        </div>
        <button class="btns-main" @click="submitFile">Submit</button>
      </popup>
      <div class="u-list-content" v-if="defaultActive === 0">
        <div class="justify">
          <h3 class="title">单词管理</h3>
          <button class="btns-main" @click="changeStatus">添加单词</button>
        </div>
        <div class="list-head u-list-word u-list-head">
          <div class="position">序号</div>
          <div class="word">单词</div>
          <div class="ph_en">音标英式</div>
          <div class="ph_an">音标美式</div>
          <div class="time">添加时间</div>
          <div class="operation">操作</div>
        </div>
        <ul class="list-content u-c-list">
          <li v-for="(item, index) in word" :key="item.id || index">
            <div class="u-list-word">
              <div class="position">{{ index + 1 }}</div>
              <div class="word">
                <input type="text" v-model='word[index].word' v-if="index !== changeIndex" readonly>
                <input type="text" v-model='word[index].word' v-else>
              </div>
              <div class="ph_en">{{ item.ph_en }}</div>
              <div class="ph_an">{{ item.ph_am }}</div>
              <div class="time">{{item.time}}</div>
              <div class="iconfont operation" @click="openWindow(index, item.explanation)">&#xe6ce;</div>
            </div>
            <div class="word-explanation" v-if="changeIndex === index">
              <div class="explanation">
                <div
                  v-for="(temp, _index) in item.explanation"
                  :key="_index"
                  class="explanation-wrap"
                >
                  <div class="explanation-content">
                    <div class="explanation-key">{{temp.part}}</div>
                    <input
                      type="text"
                      v-for="(current, __index) in temp.means"
                      :key="current || __index"
                      v-model="word[index].explanation[_index].means[__index]"
                    >
                  </div>
                </div>
              </div>
              <div class="iconfont more-operation">
                <div class="btns-danger" @click="deleteWord(item.id, index)">&#xe641;</div>
                <div class="btns-main" @click="changeComment(index)">&#xe68c;</div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
import methods from '@public/script/methods'
// components
import popup from '../../repeat/popup'
import Fade from '../../repeat/fade'
import loading from '../../repeat/loading'
import repeatSelect from '../../repeat/select'
export default {
  name: 'wordManage',
  components: {
    Fade,
    loading,
    popup,
    repeatSelect
  },
  data () {
    return {
      defaultActive: 0,
      word: null,
      changeIndex: null,
      currentWord: null,
      file: null, // 上传文件
      loading: false,
      popupStatus: false, // 弹窗
      classifyList: null, // 分类列表
      currentClassify: '', // 当前分类
      formData: null // 暂存formdata数据，到点击提交时提交数据
    }
  },
  created () {
    this.getAllWord()
    // 获取试卷类型
    axios({
      mehtod: 'get',
      url: `${methods.path}/get_test_type.php`
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
  methods: {
    openWindow (index, cn) {
      let current = this.changeIndex
      if (index === current) {
        this.changeIndex = -1
        return
      }
      this.currentWord = cn
      this.changeIndex = index
    },
    changeComment (index) {
      const {id, explanation} = this.word[index]
      axios({
        method: 'post',
        url: `${methods.path}/manage_word.php`,
        data: qs.stringify({
          type: 'update',
          id,
          explanation
        })
      }).then(res => {
        let getData = res.data
        if (res.status === 200 && getData.code === 4000) {
          methods.popup('change success')
        } else {
          methods.getCode(getData.code)
        }
      }).catch(error => console.log(error))
    },
    getAllWord () { // 获取全部单词
      axios({
        methods: 'get',
        url: `${methods.path}/manage_word.php`
      }).then(res => {
        let getData = res.data
        if (res.status === 200 && getData.code / 1 === 4000) {
          getData.data = getData.data.map(item => {
            item.explanation = JSON.parse(item.explanation)
            return item
          })
          this.word = getData.data
        }
      }).catch(error => { console.log(error) })
    },
    addWordFile (ev) { // 以文件形式添加单词
      const file = ev.target.files[0]
      if (file && file.type.indexOf('json') === -1) {
        alert('非txt文件')
        return
      }
      let files = new FileReader()
      files.readAsText(file, 'gb2312')
      files.onload = e => {
        let data = new FormData()
        data.append('file', file)
        this.formData = data
      }
    },
    deleteWord (id, index) { // 删除单词
      if (confirm('是否删除单词')) {
        axios({
          method: 'post',
          url: `${methods.path}/manage_word.php`,
          data: qs.stringify({
            type: 'remove',
            id
          })
        }).then(res => {
          let getData = res.data
          if (res.status === 200 && getData.code / 1 === 4000) {
            this.word.splice(index, 1)
            this.currentWord = null
            this.changeIndex = null
          } else {
            methods.getCode(getData.code)
          }
        })
      }
    },
    changeStatus () {
      this.currentClassify = ''
      this.popupStatus = !this.popupStatus
    },
    submitFile () { // 提交文件
      if (this.currentClassify && this.formData) {
        // 0.3秒后显示loading动画
        let time = setTimeout(() => { this.loading = true }, 300)
        this.changeStatus() // 关闭添加单词窗口
        axios({
          method: 'post',
          url: `${methods.path}/get_word_file.php`,
          data: this.formData
        }).then(res => {
          let getData = res.data
          if (res.status === 200 && getData.code / 1 === 4000) {
            this.formData = null
            // 待优化： 当一个加载时间只有0.4s的时候, 页面会闪烁一下
            this.getAllWord()
            clearTimeout(time)
            this.loading = false
          }
          methods.getCode(getData.code)
        })
      } else {
        alert('参数为空')
      }
    }
  }
}
</script>

<style lang="less" scoped>
  @import url('../../../assets/css/public');
  .u-content{
    width: 100%;
  }
  .u-list-content{
    flex: 8.8;
    padding: 15px 30px 30px;
    border-radius: @border-radius;
    background-color: white;
  }
  .btn-min{
    margin-left: auto;
  }
  .justify .btns-main{
    margin-top: 20px;
  }
  .u-list-word{
    display: flex;
    text-align: center;
    .position,
    .operation{
      flex: 1;
    }
    .word,
    .ph_en,
    .ph_an,
    .time{
      flex: 2;
    }
    .word input{
      height: inherit;
      line-height: inherit;
      text-align: inherit;
      border: none;
      background-color: transparent;
    }
  }
  .u-c-list{
    .operation{
      cursor: pointer;
      border-radius: @border-radius;
      transition: color .3s, background-color .3s;
      &:hover{
        color: white;
        background-color: @color;
      }
    }
    .explanation{
      display: flex;
      flex-wrap: wrap;
      padding: 0 15px;
      .explanation-wrap{
        @width: calc(100% - 25px);
        width: calc(@width / 2);
        &:nth-child(2n){
          // margin: 0 20px;
          margin-left: 25px;
        }
      }
      .explanation-key{
        font-weight: bold;
        font-size: 18px;
        padding-left: 5px;
      }
      .explanation-content{
        input {
          display: block;
          width: 100%;
          height: 45px;
          // padding-right: 127px;
          line-height: 45px;
          border-radius: @border-radius;
          margin: 5px 0;
        }
      }
    }
  }
  .more-operation{
    display: flex;
    padding: 0 15px 15px;
    justify-content: center;
    cursor: pointer;
    margin: 8px 0;
    & > *{
      flex: 1;
      padding: 0 10px;
    }
    .btns-danger{
      margin-right: 25px;
    }
  }
  .word-file{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 35px;
    label{
      display: block;
      width: 100%;
      padding: 0;
      height: 35px;
      line-height: 35px;
      text-align: center;
      margin-left: 30px;
      span{
        padding-left: 5px;
      }
    }
  }
</style>
