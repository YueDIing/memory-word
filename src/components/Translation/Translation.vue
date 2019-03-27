<template>
  <div class="translaiton">
    <Head :active="1"></Head>
    <div class="tl-content">
      <div class="tl-operation">
        <div class="btn-min tl-translation" @click="change">翻译</div>
      </div>
      <div class="tl-area">
        <textarea
          class="tl-enter"
          placeholder="请输入要翻译的内容 中 <=> 英"
          v-model="getWord"
          @input="change"
        ></textarea>
        <div class="tl-result">
          <div class="tl-r-c" v-if="word && word.status / 1 === 0">
            <Word :item="word.content"></Word>
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
import Bus from '../../assets/script/Bus.js'
import Head from '../Head/Head'
import Word from '../Repeat/Word'
import Methods from '../../assets/script/Methods.js'
export default {
  name: 'Translation',
  data () {
    return {
      getWord: '',
      enterFlag: true,
      word: null,
      starId: null
    }
  },
  components: {
    Head,
    Word
  },
  created () {
    Bus.$on('sendUser', res => {
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
                Methods.popup('数据错误')
              } else {
                if (!getData.data.status) {
                  getData.data.content.word_en = this.getWord
                  let wordMean = getData.data.content.word_mean // 保存api中的中文翻译
                  delete getData.data.content.word_mean // 删除api中的中文翻译
                  getData.data.content.word_json = wordMean // 重新命名并保存中文翻译
                }
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
              Methods.popup(getData.message)
            }
          }
          Methods.getCode(getData.code)
        }).catch(error => { console.log(error) })
      } else {
        Methods.popup('单词是空的')
      }
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
  }
  .tl-enter,
  .tl-result{
    width: calc(50% - 20px);
    padding: 15px;
    height: 350px;
    border-radius: 3px;
    background-color: white;
    .word{
      font-size: 24px;
    }
  }
  .tl-enter{
    resize: none;
    font-size: 14px;
    outline: none;
    transition: border-color .3s;
    &:focus{
      border: 1px solid #1e90ff;
    }
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
