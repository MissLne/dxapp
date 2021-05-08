// pages/activityPage/publish/ticket/ticket.js
const request = require('../../../../request/api')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    base: {
      content: '点击新增票种',
      scrollTop: 0
    },
    ticketDetailArray: [
      {
        ticketName: '早鸟票',
        ticketPrice: '100',
        ticketNumber: '100',
        ticketInstructions: '早起的票',
        ticketRefundType: 1
      },
      {
        ticketName: '丑鸟票',
        ticketPrice: '100',
        ticketNumber: '100',
        ticketInstructions: '早起的票',
        ticketRefundType: 0
      },
      {
        ticketName: '美丽鸟票',
        ticketPrice: '100',
        ticketNumber: '100',
        ticketInstructions: '早起的票',
        ticketRefundType: 1
      },
    ],
    footerBtnObject: {
      leftUrl: '/pages/activityPage/publish/introdution/introdution',
      leftBtn: '上一步',
      rightUrl: '/pages/activityPage/publish/setUp/setUp',
      rightBtn: '下一步',
      number: 1,
      addActivity: {}
    },
    paramsObj: {},
    popUpObj: {
      content: '是否保存为草稿',
      leftBtn: '保存',
      rightBtn: '不保存',
      show: 0,
      toPopUPData: 0
    },
    showBubble: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
   onPageScroll: function (e) {
    this.data.base.scrollTop = e.scrollTop
    this.setData({
      base: this.data.base
    })
  },
  onLoad: function (options) {
    this.setData({
      paramsObj: options
    })
  },
  updateGlobalTicket(data) {
    app.globalData.publishActivityData.ticketList = data
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
  getTicketMessage(e) {
    this.data.footerBtnObject.addActivity.ticketList = e.detail.arr
    this.setData({
      footerBtnObject: this.data.footerBtnObject,
      ticketDetailArray: e.detail.arr
    })
    this.updateGlobalTicket(this.data.ticketDetailArray)
    console.log(app.globalData.publishActivityData)
  },
  addTicket() {
    this.data.ticketDetailArray.push({
      ticketName: '',
      ticketPrice: '',
      ticketNumber: '',
      introduce: '请用一句话介绍此票种',
      bounce: 0
    })
    let arr = this.data.ticketDetailArray
    this.data.footerBtnObject.addActivity.ticketList = arr
    this.setData({
      ticketDetailArray: arr,
      footerBtnObject: this.data.footerBtnObject
    })
    this.updateGlobalTicket(this.data.ticketDetailArray)
    // console.log(app.globalData.publishActivityData)
  }
})