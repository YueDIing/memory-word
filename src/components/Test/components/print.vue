<template>
  <div :class="['t-print', (word && word.status / 1 === 1) ? 'answer-warp' : '']" v-if="word !== null">
    <h3 class="title-24">{{ word.title }} <span>{{ word.time }}</span></h3>
    <word-audio :path="audioPath" @sendRequireClearUrl="clearUrl"></word-audio>
    <ul class="word-list" v-if="word.status / 1 === 0">
      <li v-for="(item, index) in word.test" :key="index">
        <div>{{ item }}</div>
        <div class="answer-content"></div>
      </li>
    </ul>
    <ul class="answer-list" v-else>
      <li v-for="(item, index) in word.test" :key="item.id || index">
        <word :item="item" @sendAudioUrl="getAudioUrl"></word>
      </li>
    </ul>
  </div>
</template>

<script>
import methods from '../../../assets/script/methods.js'
import axios from 'axios'
// components
import word from '../../repeat/word'
import wordAudio from '../../repeat/audio'
export default {
  name: 'testPrint',
  components: {
    word,
    wordAudio
  },
  data () {
    return {
      word: null, // 一个严重问题, 如果设置默认双面打印, 以及如何添加页眉
      audioPath: null
    }
  },
  mounted () {
    this.getWord()
  },
  methods: {
    getWord () {
      let tid = this.$route.query.id
      axios({
        method: 'get',
        url: `http://localhost/Vue_project/Memory-word/static/php/get_print_word.php?tid=${tid}`
      }).then(res => {
        let getData = res.data
        if (res.status === 200 && getData.code / 1 === 4000) {
          if (getData.data.status / 1 === 0) {
            getData.data.test = getData.data.test.map(item => {
              // 判断单词是否被删除
              if (!item) {
                return '单词已被删除'
              }
              let letter = /^[A-z]+$/gi.test(item)
              // 处理单词释义
              if (!letter) {
                let removeBefore = item.replace(/^[A-z]*\.?\s?(&\s?.*\.)?/g, '')
                let split = removeBefore.split(';')
                let _split = split[0].split('，')
                // 判断 使用 ; 分割后的第一个元素 再使用 , 分割长度是否大于2
                if (_split.length >= 2) {
                  // 返回 ; 分割后的第一个元素的前两个元素
                  return `${_split[0]} ${_split[1]}`
                } else {
                  return `${split[0]} ${split[1]}`
                }
              } else {
                return item
              }
            })
          } else {
            getData.data.test = getData.data.test.map(item => {
              item.word_json = JSON.parse(item.word_json)
              return item
            })
          }
          this.word = getData.data
        } else {
          methods.getCode(getData.code)
        }
      })
    },
    getAudioUrl (url) { // 监听sendAudioUrl触发的事件
      this.audioPath = url
    },
    clearUrl () { // 播放结束清空url
      this.audioPath = null
    }
  }
}
</script>

<style lang="less" scoped>
  @page{
    size: A4 portrait;
    // 底部60防止最后一行的一部分出现在第二页
    margin: 20px 10px 60px;
  }
  @media print{
    .word-list li{
      break-after: page;
      page-break-after: avoid;
      page-break-inside: avoid;
    }
    .t-print{
      margin: 0;
      padding: 0;
      background-color: transparent;
    }
  }
  .t-print{
    // 210 * 297 A4纸大小
    width: 210mm;
    min-height: 297mm;
    margin: 0 auto;
    h3{
      margin-bottom: 30px;
      text-align: center;
      span{
        margin-left: 5px;
        font-size: 12px;
        color: #999;
      }
    }
  }
  .answer-warp{
    width: 1300px;
    height: auto;
    padding: 0 25px;
    h3{
      margin-top: 25px;
    }
  }
  .word-list{
    display: grid;
    grid-template-columns: repeat(3, 33.33333%);
    li{
      display: flex;
      flex-direction: column;
      height: 60px;
      margin-bottom: 15px;
      padding: 0 20px;
      font-size: 14px;
    }
  }
  .answer-content{
    margin-top: auto;
    border-bottom: 1px solid black;
  }
  .answer-list{
    display: grid;
    grid-template-columns: repeat(4, 23.5%);
    justify-content: space-between;
    li{
      padding: 15px;
      border-radius: 3px;
      margin-bottom: 25px;
      background-color: white;
    }
  }
</style>
