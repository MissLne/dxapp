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
    walletDetail() {
      wx.navigateTo({
        url: '/pages/userPage/userWallet/userWallet'
      })
    },
    logout() {
      request.logout()
      .then(() => {
        wx.removeStorageSync('token')
        wx.navigateTo({
          url: '../../loginPage/login/login'
        })
        wx.showToast({
          title: '退出成功',
          icon: 'success',
          duration: 1000
        })
      })
    },
    getWalletCount() {
      let obj = {
        mId: wx.getStorageSync('id')
      }
      request.showWallet(obj)
      .then(res => {
        this.setData({
          walletCount: (res.data.allAmount / 100).toFixed(2)
        })
      })
    }
  }
})
