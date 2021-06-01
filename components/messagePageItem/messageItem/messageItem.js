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
    actWidth: 0
  },
  ready: function() {
    let _this = this
    wx.createSelectorQuery().in(this).selectAll('.messageItemTime').boundingClientRect(function (rect) {
      _this.setData({
        actWidth: rect[0].width * 2
      })
    }).exec()
  },
  /**
   * 组件的方法列表
   */
  methods: {
    showInput(e) {
      let obj = {
        id: e.currentTarget.dataset.num,
        type: e.currentTarget.dataset.name
      }
      this.triggerEvent('reply',{obj: obj})
    },
    
  }
})
