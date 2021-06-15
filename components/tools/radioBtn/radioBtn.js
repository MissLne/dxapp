// components/tools/radioBtn/radioBtn.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    radioContent: Array,
    defultData: Number,
    widthCount: Number,
    currentSelect: Number
  },
  externalClasses: ['radio-parent-class'],
  /**
   * 组件的初始数据
   */
  data: {
  },

  /**
   * 组件的方法列表
   */
  ready: function () {
    // this.defaultData()
  },
  methods: {
    defaultData() {
      console.log(this.properties.defaultData);
      this.setData({
        currentSelect: this.properties.defultData
      })
    },
    checkedHandle(e) {
      
      if (this.properties.radioContent.length == 1) {
        this.setData({
          currentSelect: !this.data.currentSelect
        })
      } else {
        this.setData({
          currentSelect: e.currentTarget.dataset.num
        })
      }
      console.log(this.properties.currentSelect)
      this.triggerEvent('type',{type: this.properties.currentSelect})
    }
  }
})
