<template>
  <div class="user-center">
    <Head :active="9999"></Head>
    <div class="u-content">
      <div class="u-menu">
        <ul class="u-list">
          <li :class="[(defaultActive === index) ? 'active' : '']" v-for="(item, index) in menu" :key="item.id || index">
            <span class="iconfont menu-content" v-html="item.icon"></span>
            <span>{{ item.content }}</span>
          </li>
        </ul>
      </div>
      <div class="u-list-content" v-if="defaultActive === 0">
        <div class="u-list-word u-list-head">
          <div class="position">序号</div>
          <div class="word">单词</div>
          <div class="ph_en">音标英式</div>
          <div class="ph_an">音标美式</div>
          <div class="time">添加时间</div>
          <div class="operation">操作</div>
        </div>
        <ul class="u-c-list">
          <li v-for="(item, index) in word" :key="item.id || index">
            <div class="u-list-word">
              <div class="position">{{ index + 1 }}</div>
              <div class="word">{{ item.word_en }}</div>
              <div class="ph_en">{{ item.ph_en }}</div>
              <div class="ph_an">{{ item.ph_am }}</div>
              <div class="time">添加时间</div>
              <div class="iconfont operation" @click="openWindow(index)">&#xe68c;</div>
            </div>
            <div class="explanation" v-if="changeIndex === index">
              <dir v-for="(temp, index) in item.word_json" :key="index">
                <input type="text">
              </dir>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Head from '../Head'
import Fade from '../../Repeat/Fade'
export default {
  name: 'user-center',
  components: {
    Head,
    Fade
  },
  data () {
    return {
      menu: [
        { id: 1, content: '单词管理', icon: '&#xe624;' },
        { id: 2, content: '试卷管理', icon: '&#xe6ca;' }
      ],
      defaultActive: 0,
      word: null,
      changeIndex: null
    }
  },
  created () {
    axios({
      methods: 'get',
      url: 'http://localhost/Vue_project/Memory-word/static/php/getAllWord.php'
    }).then(res => {
      let getData = res.data
      if (res.status === 200 && getData.code / 1 === 4000) {
        console.log(getData)
        let cn = getData.data
        getData.data = cn.map(item => {
          item.word_json = JSON.parse(item.word_json)
          return item
        })
        // console.log(getData.data)
        this.word = getData.data
      }
    }).catch(error => { console.log(error) })
  },
  methods: {
    openWindow (index) {
      let current = this.changeIndex
      if (index === current) {
        this.changeIndex = -1
        return
      }
      this.changeIndex = index
    }
  }
}
</script>

<style lang="less" scoped>
  .u-content{
    display: flex;
    width: 1330px;
    margin: 0 auto;
  }
  .u-menu{
    flex: 1.2;
    .u-list{
      padding: 15px 0;
      border-radius: 3px;
      background-color: white;
    }
    li{
      line-height: 35px;
      padding: 5px 15px;
      font-size: 14px;
      color: #1e90ff;
      cursor: pointer;
      &:not(:last-child){
        border-bottom: 1px solid #eee;
      }
      &:hover{
        color: white;
        background-color: #1e90ff;
      }
    }
  }
  .menu-content{
    margin-right: 8px;
  }
  .u-list-content{
    flex: 8.8;
    margin-left: 35px;
    padding: 15px;
    border-radius: 3px;
    background-color: white;
  }
  .u-list-head{
    padding-bottom: 15px;
    color: #1e90ff;
    border-bottom: 2px solid #1e90ff;
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
    li{
      line-height: 45px;
      font-size: 14px;
      &:nth-child(2n) .u-list-word{
        background-color: #f1f1f1;
      }
      &:hover .u-list-word{
        background-color: #DFDFDF;
      }
    }
    .operation{
      cursor: pointer;
      transition: color .3s, background-color .3s;
      &:hover{
        color: white;
        background-color: #1e90ff;
      }
    }
  }
</style>
