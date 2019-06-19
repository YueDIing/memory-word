export default{
  // path: 'http://10.21.40.160/Memory_word/static/php', // npm run build use
  path: 'http://10.21.40.160/Vue_project/Memory-word/static/php', // api public path
  // path: 'http://10.21.40.40/xili/Memory_word/static/php', // star server use
  popup (msg = '') {
    alert(msg)
  },
  getCode (code) {
    /* 4000 正确 4001 参数为空 4002 参数错误 4003 数据重复 4004 数据不存在 */
    switch (code) {
      case 4001:
        this.popup('参数为空')
        break
      case 4002:
        this.popup('参数错误')
        break
      case 4003:
        this.popup('数据重复')
        break
      case 4004:
        this.popup('数据不存在')
        break
    }
  }
}
