// components/tools/pop-up/pop-up.js
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
    }
  }
})
