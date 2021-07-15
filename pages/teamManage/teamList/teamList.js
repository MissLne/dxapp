// pages/teamManage/teamList/teamList.js
const request = require('../../../request/api')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topBar: {
      title: '运营人员登录',
      isOne: 0
    },
    showTeams: 0,
    teamDetail: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: "正在加载中",
      mask: true,
    })
    this.getLoginAccount()
    
  },

  getLoginAccount() {
    let _this = this
    wx.login({
      success: (result) => {
        console.log(typeof `${result.code}`)
        let obj = {
          "jsCode": result.code.toString()
        }
        request.getLoginAccount(obj)
          .then(res => {
            _this.setData({
              showTeams: 1,
              teamDetail: res.data
            })
            wx.hideLoading()
          })
      }
    })

  }
})