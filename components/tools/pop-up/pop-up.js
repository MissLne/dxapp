// components/tools/pop-up/pop-up.js
const app = getApp()

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    popUpObj: Object
  },
  externalClasses: ['parent-pop-up'],
  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    close() {
      this.properties.popUpObj.show = 0
      this.setData({
        popUpObj: this.properties.popUpObj
      })
      if (this.properties.popUpObj.rightBtn == '不保存') {
        wx.switchTab({
          url: '../../../index/index'
        })
      }
      this.triggerEvent('close')
    },
    sure() {
      this.triggerEvent('sure')
      this.close()
    }
  }
})
