// components/tools/inputBox/inputBox.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    inputTitle: String,
    inputValue: String,
    ifRed: Number,
    ifFocus: Boolean
    },
  /**
   * 组件的初始数据
   */
  data: {
    inputMessage: ''
  },
  externalClasses: ['parent-component-input','input-box-class'],

  /**
   * 组件的方法列表
   */
  methods: {
    updateMessage(e) {
      this.setData({
        inputMessage: e.detail.value
      })
      this.triggerEvent('act',{str: this.data.inputMessage})
    }
  }
})
