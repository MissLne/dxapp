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
  onShareAppMessage: function (ops) {
    if (ops.from === 'button') {
      // 来自页面内转发按钮
      console.log(ops.target)
      console.log(this.data.id)
    }
    return {
      title: '标签l',
      path: '/pages/loginPage/register/register', 
      success: function (res) {
        // 转发成功
        console.log(res);
        console.log("转发成功:" + JSON.stringify(res));
      },
      fail: function (res) {
        // 转发失败
        console.log("转发失败:" + JSON.stringify(res));
      }
    }
 
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
      this.setData({
        memberObj: res.data
      })
    })
}
})