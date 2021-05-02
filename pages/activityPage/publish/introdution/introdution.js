// pages/activityPage/publish/introdution/introdution.js
const request = require('../../../../request/api')
const app = getApp()
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
    template : {},
    showBubble: 0,
    popUpObj: {
      content: '是否保存为草稿',
      leftBtn: '保存',
      rightBtn: '不保存',
      show: 0,
      toPopUPData: 0
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      template: options
    })
  },
  backIndex() {
    this.data.popUpObj.show = 1
    this.setData({
      popUpObj: this.data.popUpObj
    })
  },
  isSave() {
    this.data.popUpObj.show = 0
    this.setData({
      popUpObj: this.data.popUpObj
    })
    request.saveDraft(app.globalData.publishActivityData)
      .then(res => {
        console.log(res)
      })
    wx.switchTab({
      url: '/pages/index/index',
    })
  },
  goNext() {
    this.setData({
      showBubble: 1
    })
    setTimeout(() => {
      this.setData({
        showBubble: 0
      })
    }, 2000)
  },
  getMessage(e) {
    this.setData({
      activityMaterial: e.detail.obj
    })
    app.globalData.publishActivityData = Object.assign(app.globalData.publishActivityData,this.data.activityMaterial)
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