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
      this.setData({
        memberObj: res.data
      })
    })
}
})