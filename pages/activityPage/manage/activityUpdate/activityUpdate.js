// pages/activityPage/manage/activityUpdate/activityUpdate.js
const request = require('../../../../request/api')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activityMaterial: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.showUpdateActivity()
  },
  update() {
    request.updateActivity(this.data.activityMaterial)
    .then(res => {
      console.log(res)
    })
  },
  getMessage(e) {
    this.setData({
      activityMaterial: e.detail.obj
    })
  },
  getTicket(e) {
    let data = this.data.activityMaterial
    data.tickets = e.detail.data
    this.setData({
      activityMaterial: data
    })
    console.log(this.data.activityMaterial)
  },
  showUpdateActivity() {
    let obj = {
      activityId: 89
    }
    request.showUpdateActivity(obj)
      .then(res => {
        console.log(res)
        this.setData({
          activityMaterial: res.data
        })
      })
  }
})