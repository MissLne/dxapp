// components/indexPageItem/publishIntroduce/btn/btn.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    base: Object,
    ticketDetail: Array
  },
  /**
   * 组件的初始数据
   */
  data: {
  },

  /**
   * 组件的方法列表
   */
  
  methods: {
    getHeight() {

      this.triggerEvent('addTicketBtn')
      let scrollTop = this.properties.base.scrollTop
      wx.createSelectorQuery().in(this).select('#addTicketBtn').boundingClientRect(function (rect) {
        wx.pageScrollTo({
          scrollTop: scrollTop + rect.top,
          duration: 300
        })
      }).exec()
    }
  }
})
