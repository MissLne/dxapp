const request = require('../../../request/api')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topBarMargin: 0,
    topBarHeight: 0,
    userMessageObject: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      topBarMargin: (wx.getMenuButtonBoundingClientRect().top) * 2,
      topBarHeight: (wx.getMenuButtonBoundingClientRect().height) * 2,
    })
    this.showUserMaterial()
  },
  showUserMaterial() {
    let obj = {
      id: wx.getStorageSync('id')
    }
    request.showUserMessge(obj)
    .then(res => {
      console.log(res.data)
      this.setData({
        userMessageObject: res.data
      })
    })
  }
})