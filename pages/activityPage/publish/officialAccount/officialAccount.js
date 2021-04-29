// pages/activityPage/publish/officialAccount/officialAccount.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showBubble: 0,
    inputValue: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  toEditorPage() {
    if (this.data.inputValue === '') {
      wx.navigateTo({
        url: '/pages/editor/editor'
      })
    } else {
      this.setData({
        showBubble: 1
      })
      setTimeout(() => {
        this.setData({
          showBubble: 0
        })
      }, 2000)
    }
  }
})