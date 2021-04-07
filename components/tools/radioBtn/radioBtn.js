// components/tools/radioBtn/radioBtn.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    radioContent: Array,
    defultData: Number
  },
  externalClasses: ['radio-parent-class'],
  /**
   * 组件的初始数据
   */
  data: {
    currentSelect: 0
  },

  /**
   * 组件的方法列表
   */
  ready: function() {
    this.defaultData()
  },
  methods: {
    defaultData() {
      this.setData({
        currentSelect: this.properties.defultData
      })
    },
    checkedHandle(e) {
        if(this.properties.radioContent.length == 1) {
          this.setData({
            currentSelect: !this.data.currentSelect
          })
        } else {
          this.setData({
            currentSelect: e.currentTarget.dataset.num
          })
        }
    }
  }
})
