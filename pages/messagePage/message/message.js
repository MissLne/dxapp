// pages/messagePage/message/message.js
const request = require('../../../request/api')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectArray1: [
      {
        "id": 0,
        "text": "全部活动"
      }
    ],
    selectArray2: [
      {
        "text": '未回答',
        "id": 0
      },
      {
        "text": '已回答',
        "id": 1
      }
    ],
    windowHeight: 0,
    questionMessage: [],
    commentMessage: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getHeight()
    this.getMessage()
  },
  getMessage() {
    let obj = {
      mId: wx.getStorageSync('id')
    }
    request.showQuesMessge(obj)
    .then(res => {
      console.log(res)
      this.setData({
        questionMessage: res.data
      })
    })
    request.showCommMessge(obj)
    .then(res => {
      console.log(res)
      this.setData({
        commentMessage: res.data
      })
    })
  },
  getHeight() {
    this.setData({
      windowHeight: (wx.getSystemInfoSync().windowHeight) * 2 - 100
    })
  }
})