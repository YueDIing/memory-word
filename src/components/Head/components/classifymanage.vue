<template>
  <div class="manage-classify">
    <div class="classify-wrap">
      <popup :title="'添加分类'" :status="status" @closed="toggleWindows">
        <div class="enter-classify">
          <input type="text" class="classify-name" v-model="name" placeholder="Enter classify name">
          <div class="btns-main" @click="addClassify">提交</div>
        </div>
      </popup>
      <div class="classify-content">
        <div class="justify">
          <h3 class="title">分类管理</h3>
          <div class="btns-main" @click="toggleWindows">添加分类</div>
        </div>
        <div class="list-head classify-list-head">
          <div class="c-list-position">序号</div>
          <div class="c-list-name">分类名称</div>
          <div class="c-list-num">数量</div>
          <div class="c-list-time">时间</div>
          <div class="c-list-operation">操作</div>
        </div>
        <ul class="list-content classify-list">
          <li v-for="(item, index) in allClassify" :key="item.id || index">
            <div class="c-list-position">{{index + 1}}</div>
            <div class="c-list-name">{{item.type_name}}</div>
            <div class="c-list-num">{{item.num}}</div>
            <div class="c-list-time">{{item.time}}</div>
            <div class="c-list-operation">
              <div class="iconfont btns-danger" @click="deleteClassify(item.id, index)" v-if="item.id / 1 !== 1">&#xe641;</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
import methods from '@public/script/methods'
// components
import popup from '../../repeat/popup'
export default {
  name: 'classifyManage',
  data () {
    return {
      allClassify: null,
      name: null,
      status: false
    }
  },
  components: {
    popup
  },
  created () {
    this.getAllClassify()
  },
  methods: {
    toggleWindows () {
      this.status = !this.status
    },
    getAllClassify () {
      axios({
        methods: 'get',
        url: `${methods.path}/get_all_classify.php`
      }).then(res => {
        let getData = res.data
        if (res.status === 200 && getData.code / 1 === 4000) {
          this.allClassify = getData.data
        }
      }).catch(error => { console.log(error) })
    },
    addClassify () {
      let name = this.name
      if (name && name.length > 0) {
        axios({
          method: 'post',
          url: `${methods.path}/add_classify.php`,
          data: qs.stringify({
            name
          })
        }).then(res => {
          let getData = res.data
          if (res.status === 200 && getData.code / 1 === 4000) {
            this.name = null
            this.status = false
            this.getAllClassify()
          } else {
            methods.getCode(getData.code)
          }
        }).catch(error => { console.log(error) })
      } else {
        methods.popup('parameter is empty')
      }
    },
    deleteClassify (id, index) {
      axios({
        method: 'post',
        url: `${methods.path}/delete_classify.php`,
        data: qs.stringify({
          id
        })
      }).then(res => {
        let getData = res.data
        console.log(getData)
        if (res.status === 200 && getData.code / 1 === 4000) {
          this.allClassify.splice(index, 1)
        } else {
          methods.getCode(getData.code)
        }
      }).catch(error => { console.log(error) })
    }
  }
}
</script>

<style lang="less" scoped>
@import url("../../../assets/css/public");
.classify-wrap{
  width: 100%;
}
.classify-content{
  padding: 15px 30px 30px;
  border-radius: @border-radius;
  background-color: @color-white;
}
.classify-name{
  flex: 8;
  height: 40px;
  margin-right: 25px;
  border-radius: @border-radius;
  line-height: 40px;
}
.classify-list-head{
  display: flex;
  text-align: center;
  & > div{
    flex: 2;
  }
}
.enter-classify{
  input{
    width: 100%;
    margin-bottom: 35px;
  }
}
.classify-list{
  li {
    display: flex;
    height: 45px;
    line-height: 45px;
    text-align: center;
    & > div{
      flex: 2;
    }
  }
}
.btns-danger{
  display: block;
  height: 45px;
  line-height: 45px;
  padding: 0;
}
</style>
