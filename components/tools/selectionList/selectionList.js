// components/tools/selectionList/selectionList.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    selectList: Array,
    showSelect: Boolean,
    selectname: Number
  },
  externalClasses: ['parent-select-list'],
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
      let obj = {
        name: this.properties.selectname,
        type: this.data.selectIndex
      }
      let arr = []
      arr.push({
        name: this.properties.selectname,
        type: this.data.selectIndex
      })
      console.log(arr)
    }
  }
})
