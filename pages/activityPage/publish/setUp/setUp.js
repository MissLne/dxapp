// pages/activityPage/publish/setUp/setUp.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    popUpObj: {
      content: '确认删除该自定义模块？',
      leftBtn: '确认',
      rightBtn: '取消',
      show: 1
    },
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
    this.data.footerBtnObject.addActivity.webFormList = this.data.setUpItem
    this.setData({
      setUpItem: this.data.setUpItem,
      footerBtnObject: this.data.footerBtnObject
    })
  },
  getSetUpMessage(e) {
    this.setData({
      setUpItem: e.detail.obj.arr
    })
    this.data.popUpObj.show = e.detail.obj.show
    this.data.footerBtnObject.addActivity.webFormList = this.data.setUpItem
    this.setData({
      footerBtnObject: this.data.footerBtnObject,
      popUpObj: this.data.popUpObj
    })
  }
})