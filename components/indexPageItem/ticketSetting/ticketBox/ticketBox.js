// components/indexPageItem/ticketSetting/ticketBox/ticketBox.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    ticketDetail: {
      type: Array
    },
    base: Object
  },

  /**
   * 组件的初始数据
   */
  data: {
    defaultArray: [
      {
        ticketName: '输入票种名',
        ticketPrice: '输入0即为免费票',
        ticketNumber: '输入0即为不限数目',
        ticketInstructions: '请用一句话介绍此票种',
        ticketRefundType: 0
      }
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    updateInput(e) {
      let arr = this.properties.ticketDetail
      arr[e.currentTarget.dataset.num][`${e.currentTarget.dataset.name}`] = e.detail.value
      if(e.currentTarget.dataset.name == 'ticketPrice') {
        e.detail.value == 0? arr[e.currentTarget.dataset.num].ticketType = 0 : arr[e.currentTarget.dataset.num].ticketType = 1
      }
      
      this.setData({
        ticketDetail: arr
      })
      this.triggerEvent('ticket',{arr: this.data.ticketDetail})
      console.log(app.globalData.publishActivityData)
    },
    getInput(e) {
      let arr = this.properties.ticketDetail
      arr[e.currentTarget.dataset.num].ticketInstructions = e.detail.str
      this.setData({
        ticketDetail: arr
      })
      this.triggerEvent('ticket',{arr: this.data.ticketDetail})
    },
    getType(e) {
      let arr = this.properties.ticketDetail
      arr[e.currentTarget.dataset.num].ticketRefundType = e.detail.type
      this.setData({
        ticketDetail: arr
      })
      this.triggerEvent('ticket',{arr: this.data.ticketDetail})
    },
    deleteTicket(e) {
      delete this.properties.ticketDetail.splice(e.currentTarget.dataset.num, 1)
      this.setData({
        ticketDetail: this.properties.ticketDetail
      })
      console.log(this.data.ticketDetail)
      console.log( this.properties.base)
      let scrollTop = this.properties.base.scrollTop
      wx.pageScrollTo({
        scrollTop: scrollTop - 430,
        duration: 300
      })
      this.triggerEvent('ticket',{arr: this.data.ticketDetail})
    }
  }
})
