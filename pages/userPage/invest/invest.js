// pages/userPage/invest/invest.js
const request = require('../../../request/api')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    investCount: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  invest() {
    let data = this.data.investCount + ""
    let obj = {
      "mId": wx.getStorageSync('id'),
      "amount": data
    }
    request.invest(obj)
    .then(res => {
      wx.requestPayment({
        timeStamp: res.data.timeStamp,
        nonceStr: res.data.nonce_str,
        package: res.data.package,
        signType: res.data.signType,
        paySign: res.data.paySign,
        success: (result) => {
          console.log(result)
        },
        fail: (res) => {
          console.log(res)
        },
        complete: (res) => {
          console.log(res)
        }
      });
        
    })
  }
})