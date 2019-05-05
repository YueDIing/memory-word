<template>
  <div class="select-main">
    <div class="s-enter">
      <input type="text" class="select"
        readonly
        v-model="value.val"
        @focus="focus"
        @blur="blur"
        :placeholder="placeholder"
      >
      <div class="iconfont s-close closed" @click="remove" v-if="empty">&#xe69e;</div>
      <div class="iconfont s-close direction-down" :style="[status ? rotate : '']">&#xe649;</div>
    </div>
    <fade :status="status">
      <ul class="r-s-list">
        <li
          v-for="item in data"
          :key="item.id.id"
          :style="[item.id === value.id ? color : '']"
          @click="getValue(item)"
        >
          <span>{{item.val}}</span>
          <span class="r-s-label" v-if="item.label">{{item.label}}</span>
        </li>
      </ul>
    </fade>
  </div>
</template>

<script>
import fade from './fade'
export default {
  name: 'repeat-select',
  props: {
    data: { // 数据
      type: Array,
      default () {
        return [
          { id: 0, val: '项目1', label: '提示1' },
          { id: 1, val: '项目2', label: '提示2' },
          { id: 2, val: '项目3', label: '提示3' },
          { id: 3, val: '项目4', label: '提示4' },
          { id: 4, val: '项目5', label: '提示5' },
          { id: 5, val: '项目6', label: '提示6' }
        ]
      }
    },
    empty: { // 是否带清空按钮
      type: Boolean,
      default: false
    },
    setVal: { // 双向绑定, 必需的
      type: [String, Number, Object],
      default: '',
      required: true
    },
    placeholder: { // 提示文字
      type: String,
      default: '请选择'
    }
  },
  model: { // 双向绑定的变量, prop v-model的值
    prop: 'setVal',
    event: 'change'
  },
  components: {
    fade
  },
  data () {
    return {
      status: false,
      value: {},
      color: { color: '#1e90ff' },
      rotate: { transform: 'rotate(180deg)' }
    }
  },
  methods: {
    focus () {
      this.status = true
    },
    blur () {
      this.status = false
    },
    getValue (val) {
      this.value = val
      this.$emit('change', val)
    },
    remove () {
      this.value = {}
      this.$emit('change', '')
    }
  }
}
</script>

<style lang="less" scoped>
  @width: 225px;
  .select-main{
    position: relative;
    margin: 15px 0;
  }
  .select{
    width: @width;
    border-radius: 3px;
    font-size: 12px;
    cursor: pointer;
    & + div:hover{
      z-index: 2;
    }
    &:hover + div{
      z-index: 2;
    }
  }
  .r-s-list{
    position: absolute;
    z-index: 2;
    width: @width;
    max-height: 175px;
    overflow: hidden auto;
    margin-top: 5px;
    border-radius: 3px;
    border: 1px solid #ccc;
    background-color: white;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, .3);
    &::-webkit-scrollbar{
      width: 8px;
    }
    &::-webkit-scrollbar-thumb{
      border-radius: 8px;
      background-color: #ccc;
    }
    li{
      display: flex;
      justify-content: space-between;
      width: 100%;
      height: 35px;
      padding: 0 8px 0 8px;
      font-size: 12px;
      line-height: 35px;
      color: #606266;
      cursor: pointer;
      &:hover{
        background-color: #eee;
      }
    }
  }
  .r-s-label{
    color: #8492a6;
  }
  .s-enter{
    display: inline-block;
    position: relative;
  }
  .s-close{
    position: absolute;
    right: 8px;
    top: 30%;
    font-size: 14px;
    color: #999;
    background-color: white;
    // transform: translateY(-50%);
    cursor: pointer;
    &:hover{
      color: black;
    }
  }
  .direction-down{
    top: 30%;
    transform: rotate(0deg);
    transition: transform .3s;
  }
</style>
