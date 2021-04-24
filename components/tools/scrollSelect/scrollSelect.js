// components/tools/scrollSelect/scrollSelect.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    scrollSelect: Object
  },

  /**
   * 组件的初始数据
   */
  data: {
    isShow: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    showSelectList() {
      this.setData({
        isShow: !this.data.isShow
      })
    }
  }
})
