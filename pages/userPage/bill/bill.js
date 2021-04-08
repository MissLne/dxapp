// pages/userPage/bill/bill.js
const request = require('../../../request/api')
Page({

  /**
   * 页面的初始数据
   */
  data: {
  billDetail: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.showBillDetail()
  },
  showBillDetail() {
    let obj = {
      mId: wx.getStorageSync('id')
    }
    request.showBillDetail(obj)
    .then(res => {
      for(let i = 0;i < res.data.length;i++) {
        switch (res.data[i].moneyType) {
          case -1:
            res.data[i].moneyType = '提现'
            break;
          case 0:
            res.data[i].moneyType = '充值'
            break;
          case 1:
            res.data[i].moneyType = '售票'
            break;
          default:
            res.data[i].moneyType = '退票'
            break;
        }
      }
      this.setData({
        billDetail: res.data
      })
      console.log(this.data.billDetail)
    })
  }
})