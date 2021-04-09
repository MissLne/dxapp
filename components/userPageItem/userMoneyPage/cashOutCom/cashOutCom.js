// components/userPageItem/userMoneyPage/cashOutCom/cashOutCom.js
const request = require('../../../../request/api')
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
    this.getCanCash()
  },
  /**
   * 组件的方法列表
   */
  methods: {
    cashOut() {
      let obj = {
        "mId": wx.getStorageSync('id'),
        "amount": this.data.cashOutCount
      }
      request.cashOut(obj)
      .then(res => {
        console.log(res)
      })
    },
    getCanCash() {
      let obj = {
        mId: wx.getStorageSync('id')
      }
      request.showWallet(obj)
      .then(res => {
        console.log(res)
        this.setData({
          canDrawCashAmount: res.data.canDrawCashAmount.toFixed(2)
        })
      })
    }
  }
})
