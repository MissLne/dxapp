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
      let scrollTop = this.properties.base.scrollTop
      wx.createSelectorQuery().in(this).select('#addTicketBtn').boundingClientRect(function (rect) {
        // rect.id      // 节点的ID
        // rect.dataset // 节点的dataset
        // rect.left    // 节点的左边界坐标
        // rect.right   // 节点的右边界坐标
        // rect.top     // 节点的上边界坐标
        // rect.bottom  // 节点的下边界坐标
        // rect.width   // 节点的宽度
        // rect.height  // 节点的高度
        // 
        console.log(rect)
        wx.pageScrollTo({
          scrollTop: scrollTop + rect.top,
          duration: 300
        })
      }).exec()
    }
  }
})
