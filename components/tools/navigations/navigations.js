// components/tools/navigations/navigations.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    navigationsArray: Array
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentCount: 0
  },
  externalClasses: ['parent-nav-class'],
  /**
   * 组件的方法列表
   */
  methods: {
    selectNavigation(e) {
    this.setData({
      currentCount: e.currentTarget.dataset.num
    })
    }
  }
})
