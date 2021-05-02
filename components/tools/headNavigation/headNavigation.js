// components/tools/headNavigation/headNavigation.js
const request = require('../../../request/api')
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    topBarMargin: (wx.getMenuButtonBoundingClientRect().top) * 2,
    topBarHeight: (wx.getMenuButtonBoundingClientRect().height) * 2 + 15,
  },
ready: function() {
},
  /**
   * 组件的方法列表
   */
  methods: {
    backBtn() {
      this.triggerEvent('headnav')
    }
  }
})
