const request = require('../../../request/api')

Page({
  data: {
    account: 'LCE',
    password: '123456'
  },
  handleLogin() {
    let obj = {
      role: "1",
      account: this.data.account,
      password: this.data.password
    }
    request.userLogin(obj)
    .then(res => {
      let data = res.data
      wx.setStorageSync('token',data.token)
      wx.setStorageSync('id',data.id)
      wx.switchTab({
        url: '/pages/index/index'
      })
    })
    .catch(err => {
      console.log(err)
    })
  },
  accountEdit: function(e) {
    let value = e.detail.value
    this.setData({
      account: value
    })
  },
  passwordEdit: function(e) {
    let value = e.detail.value
    this.setData({
      password: value
    })
  }
})