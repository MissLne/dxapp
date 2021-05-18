// components/userPageItem/userMoneyPage/cashOutCom/cashOutCom.js
const request = require('../../../../request/api')
const navigate = require('../../../../navigator/index')
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    canDrawCashAmount: 0,
    cashOutCount: 0
  },
  ready: function() {
    this.setData({
      cashOutCount: this.data.cashOutCount.toFixed(2)
    })
    this.getCanCash()
  },
  /**
   * 组件的方法列表
   */
  methods: {
    cashAllAmount() {
      this.setData({
        cashOutCount: this.data.canDrawCashAmount
      })
    },
    cashOut() {
      let data = this.data.cashOutCount + ""
      let obj = {
        "mId": wx.getStorageSync('id'),
        "amount": data
      }
      // request.cashOut(obj)
      // .then(res => {
      //   console.log(res)
        let query = {
          amount: data
        }
        query.data = JSON.stringify(query.data)
        navigate.navigateTo({
          url: "/pages/userPage/cashSuccess/cashSuccess",
          query
        })
      // })
    },
    getCanCash() {
      let obj = {
        mId: wx.getStorageSync('id')
      }
      request.showWallet(obj)
      .then(res => {
        this.setData({
          canDrawCashAmount: res.data.canDrawCashAmount.toFixed(2)
        })
      })
    }
  }
})
