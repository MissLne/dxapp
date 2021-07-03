// pages/userPage/cashSuccess/cashSuccess.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    topBar: {
      title: '提现成功',
      isOne: 0
    },
    cashAmount: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      cashAmount: options.amount
    })
  },
  back() {
    let _this = this
    wx.switchTab({
      url: '/pages/userPage/user/user'
    })
  }
})