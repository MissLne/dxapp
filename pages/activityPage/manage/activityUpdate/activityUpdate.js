// pages/activityPage/manage/activityUpdate/activityUpdate.js
const request = require('../../../../request/api')
const navigate = require('../../../../navigator/index')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showBubble: 0,
    topBar: {
      title: '更新活动信息',
      isOne: 0
    },
    activityMaterial: {},
    ticketDetail: {},
    ticketDetail1: {},
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
    let corrent = 0
    let { ticketDetail,ticketDetail1 } = this.data
    let obj = JSON.parse(ticketDetail1)
    for (let i = 0; i < ticketDetail.tickets.length; i++) {
      if (ticketDetail.tickets[i].ticketNumber < obj.tickets[i].ticketNumber - obj.tickets[i].ticketRemainNumber) corrent = 1
    }
    if (corrent) {
      this.setData({
        showBubble: 1
      })
      setTimeout(() => {
        this.setData({
          showBubble: 0
        })
      }, 3000)
    } else {
      ticketDetail.tickets.map(item => {
        switch (item.status) {
          case '已售罄':
            item.status = 0
            break
          case '售票中':
            item.status = 1
            break
          default:
            break
        }
      })
      request.updateActivity(ticketDetail)
        .then(res => {
          console.log(res)
          wx.showToast({
            title: '更新成功',
            icon: 'success',
            duration: 1500,
            success: () => {
              setTimeout(() => {
                let query = {
                  activityId: ticketDetail.aid
                }
                query.activityId = JSON.stringify(query.activityId)
                navigate.navigateTo({
                  url: "../activityManage/activityManage",
                  query
                })
              }, 500);
              
                
            }
          })
            
        })
    }

  },
  getMessage(e) {
    console.log(e)
    this.setData({
      ticketDetail: e.detail.obj
    })
  },
  getTicket(e) {
    console.log(e.detail.data)
    let data = this.data.ticketDetail
    data.tickets = e.detail.data
    this.setData({
      ticketDetail: data
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
          ticketDetail1: JSON.stringify(res.data),
          activityMaterial: res.data,
          ticketDetail: res.data,
          showTips: 1
        })
      })
  }
})