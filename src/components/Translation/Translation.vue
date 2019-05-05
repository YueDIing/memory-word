<template>
  <div class="translaiton">
    <div class="tl-content">
      <div class="tl-operation">
        <div class="btn-min tl-translation" @click="change">翻译</div>
      </div>
      <div class="tl-area">
        <div class="tl-enter">
          <textarea
            placeholder="请输入要翻译的内容 中 <=> 英"
            v-model="getWord"
            @input="change"
          ></textarea>
        </div>
        <div class="tl-result">
          <div class="tl-r-c" v-if="word && word.status / 1 === 0">
            <word :item="word.content" @sendAudioUrl="getAudioUrl"></word>
            <word-audio :path="audioUrl" @sendRequireClearUrl="getClearUrl"></word-audio>
            <div class="btn-min tl-btn" @click="addWord">添加到单词库</div>
          </div>
          <div class="tl-r-c" v-else-if="word">
            {{word.content.out}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
import bus from '../../assets/script/bus.js'
import methods from '../../assets/script/methods.js'
// components
import word from '../repeat/word'
import wordAudio from '../repeat/audio'
export default {
  name: 'translation',
  data () {
    return {
      getWord: '',
      enterFlag: true,
      word: null,
      starId: null,
      audioUrl: null
    }
  },
  components: {
    word,
    wordAudio
  },
  created () {
    bus.$on('sendUser', res => {
      this.starId = res
    })
  },
  methods: {
    change () { // 监控输入框, 有点小问题, 待优化
      if (this.enterFlag && this.getWord !== '') {
        this.enterFlag = false
        setTimeout(() => {
          axios({
            url: `http://localhost/Vue_project/Memory-word/static/php/translation.php?word=${this.getWord}`,
            method: 'get'
          }).then(res => {
            if (res.status === 200 && res.data.code / 1 === 4000) {
              let getData = res.data
              // console.log(getData)
              if (getData.data.content.error_code) {
                methods.popup('数据错误')
              } else {
                if (!getData.data.status) {
                  let wordMean = getData.data.content.word_mean // 保存api中的中文翻译
                  delete getData.data.content.word_mean // 删除api中的中文翻译
                  getData.data.content.word_json = wordMean // 重新命名并保存中文翻译
                }
                console.log(getData.data)
                this.word = getData.data
              }
            }
          }).catch(error => { console.log(error) })
          this.enterFlag = true
        }, 500)
      } else {
        this.word = null
      }
    },
    addWord () {
      let word = this.word
      let starId = this.starId
      if (word && starId) {
        word.content.star_id = starId
        axios({
          url: 'http://localhost/Vue_project/Memory-word/static/php/add_word.php',
          method: 'post',
          data: qs.stringify({
            word: word.content
          })
        }).then(res => {
          let getData = res.data
          if (res.status === 200 && getData.code / 1 === 4000) {
            if (getData.message.length !== 0) {
              methods.popup(getData.message)
            }
          }
          methods.getCode(getData.code)
        }).catch(error => { console.log(error) })
      } else {
        methods.popup('单词是空的')
      }
    },
    getAudioUrl (url) { // 获取url, 并传给audio组件
      this.audioUrl = url
    },
    getClearUrl () { // 播放完毕, 清除url
      this.audioUrl = null
    }
  }
}
</script>

<style lang="less" scoped>
  .translaiton{
    width: 100%;
    height: 100%;
  }
  .tl-content{
    width: 1330px;
    // padding-top: 55px;
    margin: 0 auto;
  }
  .tl-operation{
    margin-bottom: 25px;
  }
  .tl-area{
    display: flex;
    justify-content: space-between;
    & > div{
      width: calc(50% - 20px);
      padding: 15px;
      height: 350px;
      border-radius: 3px;
      background-color: white;
      box-shadow: 0 0 5px 0 rgba(0, 0, 0, .1);
    }
    .word{
      font-size: 24px;
    }
  }
  .tl-enter textarea{
    display: block;
    width: 100%;
    height: 100%;
    resize: none;
    font-size: 14px;
    outline: none;
    transition: box-shadow .3s;
    border-color: transparent;
  }
  .tl-r-c{
    position: relative;
    height: 100%;
  }
  .tl-btn{
    position: absolute;
    font-size: 14px;
    right: 0px;
    bottom: 0px;
  }
</style>
