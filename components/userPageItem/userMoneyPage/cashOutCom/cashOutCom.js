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
    setMoney() {
      let { cashOutCount,canDrawCashAmount } = this.data
      cashOutCount = cashOutCount.replace(/[^\d.]/g, "");//清除"数字"和"."以外的字符
      cashOutCount = cashOutCount.replace(/^\./g, "");//验证第一个字符是数字而不是字符
      cashOutCount = cashOutCount.replace(/\.{2,}/g, ".");//只保留第一个.清除多余的
      cashOutCount = cashOutCount.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
      cashOutCount = cashOutCount.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3')
      if(cashOutCount > canDrawCashAmount) cashOutCount = canDrawCashAmount
      this.setData({
        cashOutCount: cashOutCount
      })
    },
    cashAllAmount() {
      this.setData({
        cashOutCount: this.data.canDrawCashAmount
      })
    },
    cashOut() {
      let data = (this.data.cashOutCount) * 100 + ""
      let obj = {
        "mId": wx.getStorageSync('id'),
        "amount": data
      }
      request.cashOut(obj)
      .then(res => {
        console.log(res)
        let query = {
          amount: data
        }
        query.data = JSON.stringify(query.data)
        navigate.navigateTo({
          url: "/pages/userPage/cashSuccess/cashSuccess",
          query
        })
      })
    },
    getCanCash() {
      let obj = {
        mId: wx.getStorageSync('id')
      }
      request.showWallet(obj)
      .then(res => {
        this.setData({
          canDrawCashAmount: (res.data.canDrawCashAmount / 100).toFixed(2)
        })
      })
    }
  }
})
