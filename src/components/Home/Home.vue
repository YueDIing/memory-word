<template>
  <div class="home">
    <div class="h-content">
      <word-audio :path="audioPath" @sendRequireClearUrl="clearUrl"></word-audio>
      <ul class="h-classify" v-if="JSON.stringify(firstLetter) !== '{}'">
        <li
          v-for="(item, key, index) in firstLetter" :key="index"
          :class="[(showIndex === index) ? 'current' : '']"
          @click="showCurrent(index, key)"
        >
          {{key}}
        </li>
      </ul>
      <ul class="word-list" v-if="showWord">
        <li
          v-for="(item, index) in showWord"
          :key="index"
          ref="wordItem"
          :style="{left: `${(item.x) ? item.x : 0}px`, top: `${(item.y) ? item.y : 0}px`}"
        >
          <word :item="item" @sendAudioUrl="getAudioUrl"></word>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import methods from '@public/script/methods'
// components
import heads from '../head/head'
import word from '../repeat/word'
import wordAudio from '../repeat/audio'
export default {
  name: 'home',
  components: {
    heads,
    word,
    wordAudio
  },
  data () {
    return {
      showWord: null, // 当前显示单词,
      showIndex: 0, // 当前显示单词分类的的index
      wordHeight: [], // 记录瀑布流的前4个的高度
      firstLetter: {}, // 按首字母字母排序 数据格式： {"#": array}
      audioPath: null
    }
  },
  beforeMount () { // 获取数据库中的单词
    axios({
      url: `${methods.path}/manage_word.php`,
      method: 'get'
    }).then(res => {
      let getData = res.data
      if (res.status === 200 && getData.code === 4000) {
        let len = getData.data.length
        // let currentWord = this.firstLetter
        let newWord = {}
        for (let i = 0; i < len; i++) {
          getData.data[i].word_json = JSON.parse(getData.data[i].explanation)
          let letter = getData.data[i].word.slice(0, 1).toUpperCase() // 获取首字母
          // 以首字母分类
          if (newWord[letter]) {
            newWord[letter].push(getData.data[i])
          } else {
            newWord[letter] = [getData.data[i]]
          }
        }
        newWord['#'] = getData.data
        let classify = [] // 获取所有首字母分类
        for (let item in newWord) {
          classify.push(item)
        }
        let letterClassify = classify.sort()
        let newClassifyWord = {}
        // 把对象里的key以A-z的方式排列
        for (let i = 0; i < letterClassify.length; i++) {
          newClassifyWord[letterClassify[i]] = newWord[letterClassify[i]]
        }
        this.firstLetter = newClassifyWord
        this.showWord = newClassifyWord['#']
        this.changeLayout() // 添加瀑布流布局
      }
    })
  },
  methods: {
    changeLayout () { // 改变layout为瀑布流域
      this.$nextTick(() => { // Vue 本身回调, 当v-for 渲染完成后执行
        let word = this.$refs.wordItem
        let len = this.showWord.length
        let num = 0
        let column = 4 // 瀑布流排多少列
        let interval = 25 // 每个之间的间隔
        for (let i = 0; i < len; i++) {
          if (num >= column) num = 0
          let width = word[i].offsetWidth
          let y = word[i].offsetHeight
          if (i < column) {
            this.$set(this.showWord[i], 'x', width * num + num * interval)
            this.$set(this.showWord[i], 'y', 0)
            this.wordHeight.push(y)
          } else {
            let wordHeight = Math.min(...this.wordHeight)
            let minIndex = this.wordHeight.indexOf(wordHeight)
            this.$set(this.showWord[i], 'x', width * minIndex + interval * minIndex)
            this.$set(this.showWord[i], 'y', this.wordHeight[minIndex] + interval)
            this.wordHeight[minIndex] += y + interval
          }
          num++
        }
      })
    },
    showCurrent (index, key) {
      this.showIndex = index
      this.showWord = this.firstLetter[key]
      this.wordHeight = [] // 清空之前的瀑布流的数据
      this.changeLayout()
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

<style lang='less' scoped>
  @import url('../../assets/css/public');
  .display_flex{
    display: flex;
  }
  .home{
    height: inherit;
  }
  .h-content{
    width: 1330px;
    margin: 0 auto;
    padding: 0 15px;
  }
  .h-classify{
    @color-555: #555;
    position: fixed;
    z-index: 2;
    padding: 20px 0;
    font-size: 14px;
    background-color: @color-white;
    transform: translateX(-170%);
    &:hover li{
      background-color: @color-white;
      color: @color-555;
    }
    li{
      @height: 32px;
      width: 45px;
      height: @height;
      line-height: @height;
      text-align: center;
      color: @color-555;
      cursor: pointer;
      &:hover{
        background: @color;
        color: @color-white;
      }
    }
    .current{
      background-color: @color;
      color: @color-white;
    }
  }
  .word-list{
    @value: 25px;
    position: relative;
    .display_flex();
    width: 100%;
    flex-wrap: wrap;
    > li{
      position: absolute;
      width: calc(1225px / 4);
      margin-bottom: @value;
      padding: 15px;
      background-color: @color-white;
      border-radius: @border-radius;
    }
  }
</style>
