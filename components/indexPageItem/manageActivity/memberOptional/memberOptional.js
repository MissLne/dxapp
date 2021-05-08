// components/indexPageItem/manageActivity/memberOptional/memberOptional.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    optional: Array
  },

  /**
   * 组件的初始数据
   */
  data: {
    baseMaterial: []
  },

  /**
   * 组件的方法列表
   */
  ready: function() {
    setTimeout(() => {
      this.setData({
        baseMaterial: this.properties.optional
      })
    },300)
    
  },
  methods: {
    
  }
})
