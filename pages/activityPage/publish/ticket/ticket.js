// pages/activityPage/publish/ticket/ticket.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
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
    paramsObj: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      paramsObj: options
    })
  },
  getTicketMessage(e) {
    this.data.footerBtnObject.addActivity.ticketList = e.detail.arr
    this.setData({
      footerBtnObject: this.data.footerBtnObject,
      ticketDetailArray: e.detail.arr
    })
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
  }
})