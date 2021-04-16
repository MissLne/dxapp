// components/indexPageItem/manageActivity/ticketUpdate/ticketUpdate.js
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
  },

  /**
   * 组件的方法列表
   */
  methods: {
    ticketSetting(e) {
      let data = this.properties.ticketsMaterial
      data[e.currentTarget.dataset.num].ticketInstruction = e.detail.str
      this.triggerEvent('tick',{data: data})
    }
  }
})
