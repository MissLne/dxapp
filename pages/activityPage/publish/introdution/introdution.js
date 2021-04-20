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
      rightBtn: '下一步'
    },
    activityMaterial: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
  },
  getMessage(e) {
    this.setData({
      activityMaterial: e.detail.obj
    })
    console.log(this.data.activityMaterial)
  },
})