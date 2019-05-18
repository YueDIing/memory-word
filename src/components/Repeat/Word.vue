<template>
  <div class="">
    <div class="flex word title">
      <span v-if="directory">{{`${directory.toString().padStart(2, '0')}. ${item.word_en}`}}</span>
      <span v-else>{{item.word_en}}</span>
      <div class="ph-icon" @click="playSound(item.word_en)"></div>
    </div>
    <div class="audio" v-if="item.ph_en || item.ph_am">
      <div class="ph">
        <span>英</span>
        <div class="en" v-if="item.ph_en">[{{item.ph_en}}]</div>
        <div class="ph-icon" @click="playSound(item.word_en, 'uk')"></div>
      </div>
      <div class="ph">
        <span>美</span>
        <div class="am" v-if="item.ph_am">[{{item.ph_am}}]</div>
        <div class="ph-icon" @click="playSound(item.word_en)"></div>
      </div>
    </div>
    <ul class="cn-list">
      <li v-for="(temp, tempIndex) in item.word_json" :key="tempIndex">
        <div class="cn-item">
          {{temp}}
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    },
    directory: { // 是否显示索引
      type: Number,
      default: null
    }
  },
  name: 'word',
  methods: {
    playSound (name, lan = 'en') { // en 美式 uk 英式, 数据来源百度翻译
      this.$emit('sendAudioUrl', `https://fanyi.baidu.com/gettts?lan=${lan}&text=${name}&spd=3&source=web`)
    }
  }
}
</script>

<style lang="less" scoped>
  .display_flex{
    display: flex;
  }
  .word{
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    padding-bottom: 3px;
    margin-bottom: 8px;
    font-size: 14px;
    line-height: 30px;
    font-weight: bold;
    border-bottom: 1px solid #ced6e0;
    span{
      display: block;
      width: 100%;
      padding-right: 15px;
    }
  }
  .audio{
    .display_flex();
    flex-wrap: wrap;
    margin-bottom: 8px;
    font-size: 14px;
    line-height: 25px;
    &, & + ul{
      color: #555;
    }
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
  .ph:not(:last-child){
    margin-right: 15px;
  }
  .ph-icon{
    margin-left: 5px;
  }
  .cn-list{
    font-size: 14px;
    li{
      line-height: 22px;
      &:not(:last-child){
        margin-bottom: 5px;
      }
    }
  }
</style>
