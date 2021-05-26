// pages/activityPage/publish/pubSuccess/pubSuccess.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topBar: {
      title: '发布成功',
      isOne: 0
  },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  backToIndex() {
    console.log(1)
    wx.switchTab({
      url: '/pages/index/index'
    })
      
  }
})