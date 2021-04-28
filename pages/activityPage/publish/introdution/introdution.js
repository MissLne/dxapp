// pages/activityPage/publish/introdution/introdution.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    footerBtnObject: {
      leftUrl: '/pages/activityPage/publish/enterMessage/enterMessage',
      leftBtn: '上一步',
      rightUrl: '/pages/activityPage/publish/ticket/ticket',
      rightBtn: '下一步',
      number: 3,
      addActivity: {}
    },
    activityMaterial: {},
    template : {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      template: options
    })
  },
  getMessage(e) {
    this.setData({
      activityMaterial: e.detail.obj
    })
    console.log(this.data.activityMaterial)
    let data = this.data.footerBtnObject
    data.addActivity = this.data.activityMaterial
    this.setData({
      footerBtnObject: data
    })
  },
  pageToRichText() {
    wx.navigateTo({
      url: '/pages/activityPage/publish/officialAccount/officialAccount'
    })
  }
})