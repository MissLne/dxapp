// pages/activityPage/manage/memberMessage/memberMessage.js
const request = require('../../../../request/api')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    memberObj: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.showDetail(options)
    wx.showShareMenu({
      withShareTicket: true
    })
  },
  showDetail(reqObj) {
    let activityId = parseInt(reqObj.activityId)
    let obj = {
      activityId: activityId,
      mId: reqObj.mId.substr(1, reqObj.mId.length - 2)
    }
    request.showMemberDetail(obj)
      .then(res => {
        console.log(res)
        switch (res.data.gender) {
          case 1:
            res.data.gender = '男'
            break
          case 0:
            res.data.gender = '女'
            break
          default:
            res.data.gender = '未知'
            break
        }
        this.setData({
          memberObj: res.data
        })
      })
  }
})