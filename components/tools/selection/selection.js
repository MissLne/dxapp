// components/tools/selection/selection.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    selectList: Object
  },
  externalClasses: ['parent-select-name'],
  /**
   * 组件的初始数据
   */
  data: {
    selectIndex: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    selectIndex(e) {
      this.setData({
        selectIndex: e.currentTarget.dataset.num
      })
    },
    isShow() {
      this.properties.selectList.isShow = !this.properties.selectList.isShow
      this.setData({
        selectList: this.properties.selectList
      })
      this.triggerEvent('selectlist',{show: this.properties.selectList.isShow})
    }
  }
})
