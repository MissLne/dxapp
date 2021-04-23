// components/tools/pick/pick.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    pickMessage: Object
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
    pickValue(e) {
      this.triggerEvent('pick',{value: e.detail.value})
    }
  }
})
