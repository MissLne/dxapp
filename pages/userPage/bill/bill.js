// pages/userPage/bill/bill.js
const request = require('../../../request/api')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    billDetail: [],
    selectList: [
      {
        name: '全部活动',
        arr: ['全部','上架中']
      },
      {
        name: '全部交易',
        arr: ['售票','退票','充值','提现','全部']
      }
    ],
    showSelectListIndex: 10,
    windowHeight: 0,
    pay: 0,
    income: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.showBillDetail()
    this.getWindowHeight()
  },
  getWindowHeight() {
    this.setData({
      windowHeight: (wx.getSystemInfoSync().windowHeight) * 2 - 90
    })
  },
  showSelectList(e) {
    this.setData({
      showSelectListIndex: e.currentTarget.dataset.num
    })
  },
  showBillDetail() {
    let obj = {
      "id": wx.getStorageSync('id'),
      "month": 12,
      "status": 4, 
      "activityId": 0,
      "year": 2020 
    }
    request.showBillDetail(obj)
    .then(res => {
      let result = res.data.walletDetailBaseMsgs
      console.log(result)
      for(let i = 0;i < result.length;i++) {
        if(result[i].feeCharge != undefined) {
          result[i].feeCharge = result[i].feeCharge.toFixed(2)
        }
        result[i].amount = result[i].amount.toFixed(2)
        switch (result[i].moneyType) {
          case -1:
            result[i].moneyType = '提现'
            break;
          case 0:
            result[i].moneyType = '充值'
            break;
          case 1:
            result[i].moneyType = '售票'
            break;
          default:
            result[i].moneyType = '退票'
            break;
        }
        if(result[i].moneyType == '提现' || result[i].moneyType == '退票') {
          this.data.pay += parseFloat(result[i].amount)
        } else {
          this.data.income += parseFloat(result[i].amount)
        }
      }
      this.setData({
        billDetail: result,
        pay: this.data.pay.toFixed(2),
        income: this.data.income.toFixed(2)
      })
    })
  }
})