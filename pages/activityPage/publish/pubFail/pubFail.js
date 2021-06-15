// pages/activityPage/publish/pubFail/pubFail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topBar: {
      title: '发布失败',
      isOne: 0
    },
  },
  backTo() {
    wx.navigateBack({
      delta: 1
    })
  }
})