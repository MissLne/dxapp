// pages/userPage/invest/investSuccess/investSuccess.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topBar: {
      title: '充值成功',
      isOne: 0
    },
    amount: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      amount: (options.amount.replace(/\"/g, "") / 100).toFixed(2)
    })
  }
})