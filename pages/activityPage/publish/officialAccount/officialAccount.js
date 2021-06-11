// pages/activityPage/publish/officialAccount/officialAccount.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topBar: {
      title: '活动详情',
      isOne: 0
    },
    inputValue: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
  save() {
    app.globalData.publishActivityData.linkGzh = this.data.inputValue
    if(this.data.inputValue != '' || app.globalData.publishActivityData.activityDetails != '') {
      wx.navigateBack({ delta: 1 })
    }
  },
  toEditorPage() {
      wx.navigateTo({
        url: '/pages/editor/editor'
      })
  }
})