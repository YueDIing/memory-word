<template>
  <div class="home">
    <Head></Head>
    <div class="h-content">
      <audio class="hide" src="" ref="audio" controls autoplay></audio>
      <!-- <h3 class="title-24">全部单词</h3> -->
      <!-- <ul class="classify" v-if="JSON.stringify(firstLetter) !== '{}'">
        <li
          v-for="(item, key, index) in firstLetter" :key="index"
        >
          {{key}}
        </li>
      </ul> -->
      <ul class="word-list" v-if="firstLetter['#']">
        <li
          v-for="(item, index) in firstLetter['#']"
          :key="index"
          ref="wordItem"
          :style="{left: `${(item.x) ? item.x : 0}px`, top: `${(item.y) ? item.y : 0}px`}"
        >
          <div class="word">{{item.word_en}}</div>
          <div class="audio">
            <div class="ph" v-if="item.ph_en">
              <span>英</span>
              <div class="en">[{{item.ph_en}}]</div>
              <div class="ph-icon" @click="playSound(item.ph_en_mp3)"></div>
            </div>
            <div class="ph" v-if="item.ph_am">
              <span>美</span>
              <div class="am">[{{item.ph_am}}]</div>
              <div class="ph-icon" @click="playSound(item.ph_am_mp3)"></div>
            </div>
          </div>
          <ul class="cn-list">
            <li v-for="(temp, tempIndex) in item.word_json" :key="tempIndex">
              <div class="cn-item">
                {{temp}}
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Head from '../Head/Head'
export default {
  name: 'Home',
  components: {
    Head
  },
  data () {
    return {
      allWord: null, // 全部单词
      wordHeight: [], // 记录瀑布流的前4个的高度
      firstLetter: {} // 首字母
    }
  },
  beforeMount () { // 获取数据库中的单词
    axios({
      url: 'http://localhost/Vue_project/Memory-word/static/php/getAllWord.php',
      method: 'get'
    }).then(res => {
      let getData = res.data
      if (res.status === 200 && getData && getData.code && getData.code === 200) {
        let len = getData.data.length
        for (let i = 0; i < len; i++) {
          getData.data[i].word_json = JSON.parse(getData.data[i].word_json)
          let letter = getData.data[i].word_en.slice(0, 1).toUpperCase() // 获取首字母
          // 以首字母分类
          if (this.firstLetter[letter]) {
            this.firstLetter[letter].push(getData.data[i])
          } else {
            this.$set(this.firstLetter, letter, [getData.data[i]])
          }
        }
        this.$set(this.firstLetter, '#', getData.data)
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
    changeLayout () {
      this.$nextTick(() => { // Vue 本身回调, 当v-for 渲染完成后执行
        // 当节点渲染完成后, 把布局改变成瀑布流
        let word = this.$refs.wordItem
        let len = this.firstLetter['#'].length
        let num = 0
        let column = 4
        for (let i = 0; i < len; i++) {
          if (num >= column) num = 0
          let width = word[i].offsetWidth
          let y = word[i].offsetHeight
          if (i < column) {
            this.$set(this.firstLetter['#'][i], 'x', width * num + num * 25)
            this.$set(this.firstLetter['#'][i], 'y', 0)
            this.wordHeight.push(y)
            // console.log(num, this.firstLetter['#'][i])
          } else {
            let wordHeight = Math.min(...this.wordHeight)
            let minIndex = this.wordHeight.indexOf(wordHeight)
            this.$set(this.firstLetter['#'][i], 'x', width * minIndex + 25 * minIndex)
            this.$set(this.firstLetter['#'][i], 'y', this.wordHeight[minIndex] + 25)
            this.wordHeight[minIndex] += y + 25
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
    }
  }
}
</script>

<style lang='less' scoped>
  .display_flex{
    display: flex;
  }
  .home{
    height: inherit;
  }
  .h-content{
    width: 1330px;
    margin: 0 auto;
    padding: 25px 15px;
  }
  .word-list{
    position: relative;
    margin-top: @value;
    .display_flex();
    width: 100%;
    flex-wrap: wrap;
    @value: 25px;
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
  .word{
    padding-bottom: 3px;
    margin-bottom: 8px;
    font-size: 14px;
    line-height: 30px;
    font-weight: bold;
    border-bottom: 1px solid #ced6e0;
  }
  .audio{
    .display_flex();
    flex-wrap: wrap;
    margin-bottom: 8px;
    font-size: 14px;
    line-height: 25px;
    // margin-bottom: 8px;
  }
  .ph{
    .display_flex();
    align-items: center;
    span{
      display: block;
      margin-right: 8px;
    }
    .en, .am{
      white-space: nowrap;
    }
  }
  .ph-icon{
    width: 19px;
    height: 17px;
    background: url(../../../static/img/audio.png) no-repeat 0 0;
    background-size: 100%;
    cursor: pointer;
    &:hover{
      background-image: url(../../../static/img/audio-active.png);
    }
  }
  .ph:not(:last-child){
    margin-right: 15px;
  }
  .ph-icon{
    margin-left: 5px;
  }
  .cn-list{
    font-size: 14px;
    li{
      line-height: 20px;
      &:not(:last-child){
        margin-bottom: 5px;
      }
    }
  }
</style>
