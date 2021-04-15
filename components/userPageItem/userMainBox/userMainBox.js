// components/userPageItem/userMainBox/userMainBox.js
const request = require('../../../request/api')
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
    walletCount: 0
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
        this.setData({
          walletCount: res.data.allAmount
        })
      })
    }
  }
})