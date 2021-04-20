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
        ticketName: '早鸟票',
        ticketPrice: '100',
        ticketNumber: '100',
        ticketInstructions: '早起的票',
        ticketRefundType: 0
      },
      {
        ticketName: '早鸟票',
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
      rightBtn: '下一步'
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
  },
  addTicket() {
    
    this.data.ticketDetailArray.push({
      ticketName: '输入票种名',
      price: '输入0即为免费票',
      count: '输入0即为不限数目',
      introduce: '请用一句话介绍此票种',
      bounce: 0
    })
    let arr = this.data.ticketDetailArray
    this.setData({
      ticketDetailArray: arr
    })
  }
})