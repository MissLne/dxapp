// components/tools/comNav/comNav.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    topBar: Object
  },

  /**
   * 组件的初始数据
   */
  data: {
    topBarMargin: (wx.getMenuButtonBoundingClientRect().top) * 2,
    topBarHeight: (wx.getMenuButtonBoundingClientRect().height) * 2 + 15,
  },
  /**
   * 组件的方法列表
   */
  methods: {
    backBtn() {
      if (this.properties.topBar.hasOwnProperty('goUrl')) {
        if (this.properties.topBar.hasOwnProperty('index')) {
          wx.switchTab({
            url: this.properties.topBar.goUrl
          })
        } else {
          wx.navigateTo({
            url: this.properties.topBar.goUrl
          })
        }
      } else {
        wx.navigateBack({
          delta: 1
        })
      }
    }
  }
})
