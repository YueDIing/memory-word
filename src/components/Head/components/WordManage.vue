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
          <button class="btns-main" @click="changeStatus">Open</button>
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
              <div class="word">{{ item.word_en }}</div>
              <div class="ph_en">{{ item.ph_en }}</div>
              <div class="ph_an">{{ item.ph_am }}</div>
              <div class="time">{{item.time}}</div>
              <div class="iconfont operation" @click="openWindow(index, item.word_json)">&#xe6ce;</div>
            </div>
            <div class="explanation" v-if="changeIndex === index">
              <div v-for="(temp, _index) in item.word_json" :key="_index">
                <input type="text" v-model="word[index].word_json[_index]">
              </div>
              <div class="iconfont more-operation">
                <!-- &#xe68c; -->
                <div class="btns-danger" @click="deleteWord(item.id, index)">&#xe641;</div>
                <div class="btns-main" @click="changeComment(item.id, index)">&#xe68c;</div>
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
      formData: null // 暂存formdata数据，到点击提交是提交数据
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
    changeComment (id, index) {
      let wordCn = this.word[index].word_json
      if (this.currentWord === wordCn) {
        methods.popup('Data has not changed')
        return
      }
      axios({
        method: 'post',
        url: `${methods.path}/change_comment.php`,
        data: qs.stringify({
          id,
          wordCn
        })
      }).then(res => {
        let getData = res.data
        if (res.status === 200 && getData.code === 4000) {
          console.log(getData.data)
        } else {
          methods.getCode(getData.code)
        }
      }).catch(error => console.log(error))
    },
    getAllWord () { // 获取全部单词
      axios({
        methods: 'get',
        url: `${methods.path}/getAllWord.php`
      }).then(res => {
        let getData = res.data
        if (res.status === 200 && getData.code / 1 === 4000) {
          let cn = getData.data
          getData.data = cn.map(item => {
            item.word_json = JSON.parse(item.word_json)
            return item
          })
          this.word = getData.data
        }
      }).catch(error => { console.log(error) })
    },
    addWordFile (ev) { // 添加单词
      const file = ev.target.files[0]
      if (file.type.indexOf('text') === -1) {
        alert('非txt文件')
        return
      }
      let files = new FileReader()
      files.readAsText(file, 'gb2312')
      files.onload = e => {
        let data = new FormData()
        data.append('file', file)
        data.append('classify_id', this.currentClassify.id)
        this.formData = data
      }
    },
    deleteWord (id, index) { // 删除单词
      axios({
        method: 'post',
        url: `${methods.path}/delete_word.php`,
        data: qs.stringify({
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
    },
    changeStatus () {
      this.currentClassify = ''
      this.popupStatus = !this.popupStatus
    },
    submitFile () {
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
            console.log(getData)
            this.formData = null
            // 待优化： 当一个加载时间只有0.4s的时候, 页面会闪烁一下
            this.getAllWord()
            clearTimeout(time)
            this.loading = false
          } else {
            methods.getCode(getData.code)
          }
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
      & > div{
        display: flex;
      }
      input {
        display: block;
        width: 100%;
        height: 45px;
        padding-right: 127px;
        line-height: 45px;
        border-radius: @border-radius;
        margin: 5px 0;
      }
      .more-operation{
        display: flex;
        justify-content: center;
        cursor: pointer;
        margin: 8px 0 12px;
        & > *{
          flex: 1;
          padding: 0 10px;
        }
        .btns-danger{
          margin-right: 25px;
        }
      }
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
