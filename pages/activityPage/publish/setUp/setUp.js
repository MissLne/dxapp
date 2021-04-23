// pages/activityPage/publish/setUp/setUp.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    footerBtnObject: {
      leftUrl: '/pages/activityPage/publish/ticket/ticket',
      leftBtn: '上一步',
      rightBtn: '保存'
    },
    pickMessage: {
      content: '新增填写项',
      array: ['文字填空', '图片', '单选/多选']
    },
    setUpItem: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
  },
  addSetUp(e) {
    let obj = {
      isOptional: 0,
      property: '',
      content: [],
      propertyType: 0,
      pickType: e.detail.value
    }
    switch (e.detail.value) {
      case 0:
        obj.propertyType = 0
        break
      case 1:
        obj.propertyType = 4
        break
      default:
        obj.propertyType = 2
        break
    }
    this.data.setUpItem.push(obj)
    this.setData({
      setUpItem: this.data.setUpItem
    })
  }
})