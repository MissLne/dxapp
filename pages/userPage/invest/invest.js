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
  setMoney(e) {
    let { investCount } = this.data
    investCount = investCount.replace(/[^\d.]/g, "");//清除"数字"和"."以外的字符
    investCount = investCount.replace(/^\./g, "");//验证第一个字符是数字而不是字符
    investCount = investCount.replace(/\.{2,}/g, ".");//只保留第一个.清除多余的
    investCount = investCount.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
    investCount = investCount.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');
    this.setData({
      investCount: investCount
    })
  },
  invest() {
    let { investCount } = this.data
    let data = investCount * 100 + ""
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