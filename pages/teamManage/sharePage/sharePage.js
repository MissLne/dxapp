// pages/teamManage/sharePage/sharePage.js
const request = require('../../../request/api')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    teamMaterial: {},
    activity: [],
    count: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.showMessage()
  },
  showMessage() {
    let id = wx.getStorageSync('id')
    request.showUserMessge({ id: id })
      .then(res => {
        console.log(res)
        this.setData({
          teamMaterial: res.data
        })
      })
    request.showActMessage({ mId: id })
      .then(res => {
        res.data.sort((a, b) => b.startTime.localeCompare(a.startTime))
        this.setData({
          activity: res.data.slice(0,3),
          count: res.data.length
        })
      })
  },
  sureEnterTeam() {
    let that = this
    wx.showModal({
      title: '温馨提示',
      content: '正在请求您的个人信息',
      success(res) {
        if (res.confirm) {
          wx.getUserProfile({
            desc: "获取你的昵称、头像等信息",
            success: res => {
              let wxUserInfo = res.userInfo
              wx.login({
                success: (result) => {
                  let obj = {
                    "nickName": wxUserInfo.nickName,
                    "headPitcher": wxUserInfo.avatarUrl,
                    "jsCode": result.code,
                    "role": 1,
                    "mid": wx.getStorageSync('id')
                  }
                  console.log(obj)
                  request.addTeamMembers(obj)
                    .then(res => {
                      console.log(res)
                    })
                }
              })

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

  }
})