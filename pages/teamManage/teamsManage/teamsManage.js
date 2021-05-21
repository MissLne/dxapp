// pages/teamManage/teamsManage/teamsManage.js
const request = require('../../../request/api')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    teamMembers: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showShareMenu({
      withShareTicket: true
    })
    this.getAllMembers()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.showShareMenu({
      withShareTicket: true
    })
  },
  deleteMember() {
    this.onLoad()
  },
  compare(attribute) {
    return function (obj1, obj2) {
      let val1 = obj1[attribute];
      let val2 = obj2[attribute];
      if (val1 < val2) {
        return -1
      } else if (val1 > val2) {
        return 1
      } else {
        return 0
      }
    }
  },
  getAllMembers() {
    let _this = this
    request.getAllMembers({ mId: wx.getStorageSync('id') })
      .then(res => {
        res.data = res.data.sort(_this.compare('role'))
        res.data.map(item => {
          switch (item.role) {
            case 0:
              item.role = '管理员'
              break
            case 1:
              item.role = '运营'
              break
            default:
              break
          }
        })
        this.setData({
          teamMembers: res.data
        })
      })
  },
  onShareAppMessage: function () {
    return {
      title: '团队邀请',
      path: 'pages/teamManage/sharePage/sharePage?' + 'id=' + wx.getStorageSync('id'),
      success: function (res) {
        var shareTickets = res.shareTickets;
        if (shareTickets.length == 0) {
          return false;
        }
        wx.getShareInfo({
          shareTicket: shareTickets[0],
          success: function (res) {
            var encryptedData = res.encryptedData;
            var iv = res.iv;
          }
        })
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})