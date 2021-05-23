// pages/userPage/invest/invest.js
const request = require('../../../request/api')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topBar: {
      title: '充值',
      isOne: 0
    },
    investCount: 0 .toFixed(2)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  invest() {
    let data = this.data.investCount * 100 + ""
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
          success: () => {
            let query = {
              amount: obj.data
            }
            query.amount = JSON.stringify(query.amount)
            navigate.navigateTo({
              url: "./investSuccess/investSuccess",
              query
            })
          },
          fail: (res) => {
            console.log(res)
          },
          complete: (res) => {
            console.log(res)
          }
        })

      })
  }
})