<template>
  <div class="">
    <div class="word title">{{item.word_en}}</div>
    <div class="audio">
      <div class="ph">
        <span>英</span>
        <div class="en" v-if="item.ph_en">[{{item.ph_en}}]</div>
        <div class="ph-icon" v-if="item.ph_en_mp3" @click="playSound(item.ph_en_mp3)"></div>
      </div>
      <div class="ph">
        <span>美</span>
        <div class="am" v-if="item.ph_am">[{{item.ph_am}}]</div>
        <div class="ph-icon" v-if="item.ph_am_mp3" @click="playSound(item.ph_am_mp3)"></div>
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
    }
  },
  name: 'word',
  methods: {
    playSound (url) {
      this.$emit('sendAudioUrl', url)
    }
  }
}
</script>

<style lang="less" scoped>
  .display_flex{
    display: flex;
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
