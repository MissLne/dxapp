// pages/activityPage/manage/activityUpdate/activityUpdate.js
const request = require('../../../../request/api')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topBar: {
      title: '更新活动信息',
      isOne: 0
    },
    activityMaterial: {},
    showTips: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.showUpdateActivity(options)
  },
  update() {
    console.log(this.data.activityMaterial)
    request.updateActivity(this.data.activityMaterial)
      .then(res => {
        console.log(res)
      })
  },
  getMessage(e) {
    console.log(e)
    this.setData({
      activityMaterial: e.detail.obj
    })
  },
  getTicket(e) {
    console.log(e.detail.data)
    let data = this.data.activityMaterial
    data.tickets = e.detail.data
    this.setData({
      activityMaterial: data
    })
  },
  showUpdateActivity(options) {
    options.activityId = options.activityId.replace(/\"/g, "")
    let obj = {
      aId: `${options.activityId}`
    }
    request.showUpdateActivity(obj)
      .then(res => {
        console.log(res)
        res.data.tickets.map(item => {
          switch (item.status) {
            case 0:
              item.status = '已售罄'
              break
            case 1:
              item.status = '售票中'
              break
            default:
              break
          }
        })
        this.setData({
          activityMaterial: res.data,
          showTips: 1
        })
      })
  }
})