// components/messagePageItem/messageItem/messageItem.js
const request = require('../../../request/api')
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    messageItemArray: Array,
    messageType: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    replyContent: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    reply(e) {
      if(this.properties.messageType == '回答') {
        let obj = {
          aId: e.currentTarget.dataset.num,
          reply: this.data.replyContent
        }
        request.restore(obj)
        .then(res => {
          console.log(res)
        })
      } else {
        let obj = {
          cId: e.currentTarget.dataset.num,
          reply: this.data.replyContent
        }
        request.reply(obj)
        .then(res => {
          console.log(res)
        })
      }
      
    }
  }
})
