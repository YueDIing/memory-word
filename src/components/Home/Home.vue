<template>
  <div class="home">
    <Head></Head>
    <div class="h-content">
      <audio class="hide" src="" ref="audio" controls autoplay></audio>
      <!-- <h3 class="title-24">全部单词</h3> -->
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
          <Word :item="item"></Word>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Head from '../Head/Head'
import Word from '../Repeat/Word'
export default {
  name: 'Home',
  components: {
    Head,
    Word
  },
  data () {
    return {
      showWord: null, // 当前显示单词,
      showIndex: 0, // 当前显示单词分类的的index
      wordHeight: [], // 记录瀑布流的前4个的高度
      firstLetter: {} // 按首字母字母排序 数据格式： {"#": array}
    }
  },
  beforeMount () { // 获取数据库中的单词
    axios({
      url: 'http://localhost/Vue_project/Memory-word/static/php/getAllWord.php',
      method: 'get'
    }).then(res => {
      let getData = res.data
      if (res.status === 200 && getData.code === 4000) {
        let len = getData.data.length
        // let currentWord = this.firstLetter
        let newWord = {}
        for (let i = 0; i < len; i++) {
          getData.data[i].word_json = JSON.parse(getData.data[i].word_json)
          let letter = getData.data[i].word_en.slice(0, 1).toUpperCase() // 获取首字母
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
  mounted () {
    let audio = this.$refs.audio
    // 开始播放
    audio.addEventListener('canplay', () => {
      console.log('播放开始')
    }, false)
    // 结束播放
    audio.addEventListener('ended', () => {
      console.log('结束播放')
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
    playSound (url) { // 添加audio的url
      console.log(url)
      let audio = this.$refs.audio
      if (audio) {
        this.$refs.audio.src = url
      }
    },
    showCurrent (index, key) {
      this.showIndex = index
      this.showWord = this.firstLetter[key]
      this.wordHeight = [] // 清空之前的瀑布流的数据
      this.changeLayout()
      console.log(this.firstLetter)
    }
  }
}
</script>

<style lang='less' scoped>
  .home > div{
    // 防止滚动条抖动, 100vw(浏览器内部宽度， 包含滚动条宽度) 100%(可用宽度, 不包含滚动条宽度)
    padding-left: calc(100vw - 100%);
  }
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
    position: fixed;
    z-index: 2;
    margin-top: 25px;
    padding: 20px 0;
    font-size: 14px;
    background-color: white;
    transform: translateX(-250%);
    li{
      width: 45px;
      height: 32px;
      line-height: 32px;
      text-align: center;
      cursor: pointer;
      &:hover{
        background: #1e90ff;
        color: white;
      }
    }
    .current{
      background-color: #1e90ff;
      color: white;
    }
  }
  .word-list{
    @value: 25px;
    position: relative;
    // margin-top: @value;
    .display_flex();
    width: 100%;
    flex-wrap: wrap;
    > li{
      position: absolute;
      width: calc(1225px / 4);
      margin-bottom: @value;
      padding: 15px;
      background-color: white;
      border-radius: 3px;
    }
    /* > li:not(:nth-child(4n)){
      border-right: 25px solid #dfe4ea;
    } */
  }
</style>
