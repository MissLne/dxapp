// pages/activityPage/publish/setUp/setUp.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    footerBtnObject: {
      leftUrl: '/pages/activityPage/publish/ticket/ticket',
      rightUrl: '/pages/index/index',
      leftBtn: '上一步',
      rightBtn: '发布',
      number: 10,
      addActivity: {}
    },
    pickMessage: {
      content: '新增填写项',
      array: ['文字填空', '图片', '单选/多选']
    },
    setUpItem: [],
    publishActivity: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.publishActivity = Object.assign(options,this.data.publishActivity)
    this.setData({
      publishActivity: this.data.publishActivity
    })
  },
  publishAct(options) {
    let obj = Object.assign(options,this.data.publishActivity)
    let data = this.data.footerBtnObject
    data.addActivity = obj
    this.setData({
      footerBtnObject: data
    })
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
  },
  getSetUpMessage(e) {
    this.setData({
      setUpItem: e.detail.arr
    })
    this.data.publishActivity.webFormList = this.data.setUpItem
    this.setData({
      publishActivity: this.data.publishActivity
    })
  }
})