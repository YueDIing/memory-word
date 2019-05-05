<template>
  <div class="manage-classify">
    <div class="classify-wrap">
      <div class="classify-content">
        <div class="add-classify">
          <input type="text" class="classify-name" v-model="name" placeholder="Enter classify name">
          <div class="btns" @click="addClassify">Add classify</div>
        </div>
        <div class="classify-list-head">
          <div class="c-list-position">Position</div>
          <div class="c-list-name">Name</div>
          <div class="c-list-num">Num</div>
          <div class="c-list-time">Time</div>
          <div class="c-list-operation">Operation</div>
        </div>
        <ul class="classify-list">
          <li v-for="(item, index) in allClassify" :key="item.id || index">
            <div class="c-list-position">{{index + 1}}</div>
            <div class="c-list-name">{{item.type_name}}</div>
            <div class="c-list-num">{{item.num}}</div>
            <div class="c-list-time">{{item.time}}</div>
            <div class="c-list-operation">
              <div class="iconfont btn-delete" @click="deleteClassify(item.id, index)">&#xe641;</div>
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
import methods from '../../../assets/script/methods'
// components
export default {
  name: 'classifyManage',
  data () {
    return {
      allClassify: null,
      name: null
    }
  },
  created () {
    this.getAllClassify()
  },
  methods: {
    getAllClassify () {
      axios({
        methods: 'get',
        url: 'http://localhost/Vue_project/Memory-word/static/php/get_all_classify.php'
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
          url: 'http://localhost/Vue_project/Memory-word/static/php/add_classify.php',
          data: qs.stringify({
            name
          })
        }).then(res => {
          let getData = res.data
          if (res.status === 200 && getData.code / 1 === 4000) {
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
        url: 'http://localhost/Vue_project/Memory-word/static/php/delete_classify.php',
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
.classify-wrap{
  width: 100%;
}
.classify-content{
  padding: 15px 30px 30px;
  border-radius: 3px;
  background-color: white;
}
.add-classify{
  display: flex;
  justify-content: space-between;
  padding: 10px 0 25px;
  .btns{
    flex: 2;
  }
}
.classify-name{
  flex: 8;
  height: 40px;
  margin-right: 25px;
  border-radius: 3px;
  line-height: 40px;
}
.classify-list-head{
  display: flex;
  text-align: center;
  height: 45px;
  line-height: 45px;
  font-weight: bold;
  color: #1e90ff;
  border-top: 1px solid #dfe4ea;
  border-bottom: 1px solid #dfe4ea;
  & > div{
    flex: 2;
  }
}
.classify-list{
  li {
    display: flex;
    height: 45px;
    line-height: 45px;
    text-align: center;
    cursor: pointer;
    &:nth-child(2n){
      background-color: #eee;
    }
    & ~ li:hover{
      background-color: #dfe4ea;
    }
    & > div{
      flex: 2;
    }
  }
}
.btn-delete{
  height: 45px;
  line-height: 45px;
}
</style>
