// components/tools/selection/selection.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    selectList: Object,
    content: String
  },
  externalClasses: ['parent-select-name', 'parent-select-list'],
  /**
   * 组件的初始数据
   */
  data: {
    selectIndex: 0,
    scrollHeight: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    selectIndex(e) {
      let index = 0
      console.log(e.currentTarget.dataset.name)
      switch (e.currentTarget.dataset.name) {
        case '全部':
          index = 0
          break
        case '已取消':
          index = -3
          break
        case '草稿':
          index = 2
          break
        case '已下架':
          index = -1
          break
        case '上架中':
          index = 1
          break
        case '已结束':
          index = -2
          break
        default:
          index = 0
          break
      }
      this.properties.selectList.name = e.currentTarget.dataset.name
      this.setData({
        selectList: this.properties.selectList,
        selectIndex: e.currentTarget.dataset.num
      })
      this.triggerEvent('showType', { type: index, count: e.currentTarget.dataset.num, name: e.currentTarget.dataset.name })
    },
    isShow() {
      let query = wx.createSelectorQuery().in(this);
      
      this.properties.selectList.isShow = !this.properties.selectList.isShow
      this.setData({
        selectList: this.properties.selectList,
        scrollHeight: !this.data.scrollHeight
      })
      query.select('.selectionBox').boundingClientRect(rect => {
        let clientHeight = rect.height;
        let clientWidth = rect.width;
        let ratio = 750 / clientWidth;
        let height = clientHeight * ratio;
        console.log(height);
        this.triggerEvent('selectlist', { show: this.properties.selectList.isShow,height: height})
      }).exec();
      
    }
  }
})
