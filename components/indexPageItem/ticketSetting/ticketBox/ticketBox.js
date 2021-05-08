// components/indexPageItem/ticketSetting/ticketBox/ticketBox.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    ticketDetail: {
      type: Array
    }
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
      switch (e.currentTarget.dataset.count) {
        case 0:
          arr[e.currentTarget.dataset.num].ticketName = e.detail.value
          break
        case 1:
          arr[e.currentTarget.dataset.num].ticketPrice = e.detail.value
          break
        case 2:
          arr[e.currentTarget.dataset.num].ticketNumber = e.detail.value
          break
        default:
          break
      }
      this.setData({
        ticketDetail: arr
      })
      this.triggerEvent('ticket',{arr: this.data.ticketDetail})
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
      this.triggerEvent('ticket',{arr: this.data.ticketDetail})
    }
  }
})
