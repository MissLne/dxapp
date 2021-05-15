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
  },

  /**
   * 组件的方法列表
   */
  methods: {
    hide() {
      this.properties.scrollSelect.isShow = 0
      this.setData({
        scrollSelect: this.properties.scrollSelect
      })
    },
    showSelectList() {
      this.properties.scrollSelect.isShow = !this.properties.scrollSelect.isShow
      this.setData({
        scrollSelect: this.properties.scrollSelect
      })
      this.triggerEvent('selectscroll',{show: this.properties.scrollSelect.isShow})
    },
    selectActivityName(e) {
      console.log(e)
      this.properties.scrollSelect.isShow = 0
      this.properties.scrollSelect.title = e.currentTarget.dataset.name
      this.setData({
        scrollSelect: this.properties.scrollSelect
      })
      this.triggerEvent('activityId',{id: e.currentTarget.dataset.id,name: e.currentTarget.dataset.name})
    }
  }
})
