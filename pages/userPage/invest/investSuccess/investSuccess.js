// pages/userPage/invest/investSuccess/investSuccess.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    amount: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      amount: options.amount
    })
  }
})