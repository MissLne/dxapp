// pages/activityPage/manage/memberMessage/memberMessage.js
const request = require('../../../../request/api')
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(parseInt(options.activityId)
    this.showDetail(options)
  },


  showDetail(reqObj) {
    let activityId = parseInt(reqObj.activityId)
    let obj = {
      activityId: activityId,
      mId: reqObj.mId.substr(1,reqObj.mId.length - 2)
    }
    console.log(reqObj.mId.substr(1,reqObj.mId.length - 2))
    request.showMemberDetail(obj)
      .then(res => {
        console.log(res)
      })
  }
})