// pages/messagePage/message/message.js
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
    windowHeight: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getHeight()
  },
  getHeight() {
    this.setData({
      windowHeight: (wx.getSystemInfoSync().windowHeight) * 2 - 100
    })
  }
})