const request = require('../../../request/api')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topBarMargin: 0,
    topBarHeight: 0,
    userMessageObject: {},
    identifyLoginShow: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.setData({
      topBarMargin: (wx.getMenuButtonBoundingClientRect().top) * 2,
      topBarHeight: (wx.getMenuButtonBoundingClientRect().height) * 2,
    })

    this.showUserMaterial()
  },
  onShow: function () {
    this.onLoad()
    this.loginOrNot()
  },
  getPersonalMessage() {
    wx.showModal({
      title: '温馨提示',
      content: '正在请求您的个人信息',
      success(res) {
        if (res.confirm) {
          wx.getUserProfile({
            desc: "获取你的昵称、头像等信息",
            success: res => {
              if (wx.getStorageSync('id')) {
                console.log(1)
                wx.navigateTo({
                  url: '../../../pages/teamManage/teamList/teamList'
                })
              } else {
                wx.navigateTo({
                  url: '../../../pages/loginPage/login/login'
                })
              }
            },
            fail: res => {
              wx.showErrorModal('您拒绝了请求')
              return;
            }
          })
        } else if (res.cancel) {
          that.showErrorModal('您拒绝了请求')
          return;
        }
      }
    })
  },
  loginOrNot() {
    if (wx.getStorageSync('token') == '') {
      this.setData({
        identifyLoginShow: 1
      })
    } else {
      this.setData({
        identifyLoginShow: 0
      })
    }
  },
  showUserMaterial() {
    let obj = {
      id: wx.getStorageSync('id')
    }
    request.showUserMessge(obj)
      .then(res => {
        this.setData({
          userMessageObject: res.data
        })
      })
  }
})