// components/indexPageItem/manageActivity/ticketUpdate/ticketUpdate.js
// const mm = require('../../../../images/activity')
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    ticketsMaterial: Array
  },

  /**
   * 组件的初始数据
   */
  data: {
    ticketDetail: []
  },

  /**
   * 组件的方法列表
   */
  ready: function() {
    // let data = JSON.stringify(this.properties.ticketsMaterial)
    // console.log(data)
  },
  methods: {
    ticketSetting(e) {
      let data = this.properties.ticketsMaterial
      data[e.currentTarget.dataset.num].ticketInstruction = e.detail.str
      this.triggerEvent('tick',{data: data})
    },
    ticketPrice(e) {
     
      let data = JSON.stringify(this.properties.ticketsMaterial)
      let data1 = JSON.parse(data)
      data1[e.currentTarget.dataset.num].ticketNumber = e.detail.value
      this.setData({
        ticketDetail: data1
      })
      this.triggerEvent('tick',{data: this.data.ticketDetail})
    }
  }
})
