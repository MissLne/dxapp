// components/userPageItem/userMoneyPage/wallet/wallet.js
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
  wallet: {}
  },

  ready: function() {
    this.getWalletCount()
  },
  /**
   * 组件的方法列表
   */
  methods: {
    getWalletCount() {
      let obj = {
        mId: wx.getStorageSync('id')
      }
      request.showWallet(obj)
      .then(res => {
        res.data.allAmount = (res.data.allAmount / 100).toFixed(2)
        res.data.canDrawCashAmount = (res.data.canDrawCashAmount / 100).toFixed(2)
        
        this.setData({
          wallet: res.data
        })
      })
    }
  }
})
