// pages/activityPage/publish/addDiyBox/addDiyBox.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    popUpObj: {
      content: '确认删除该自定义模块？',
      leftBtn: '确认',
      rightBtn: '取消',
      show: 0,
      toPopUPData: 0
    },
    popUpObj2: {
      content: '是否保存为草稿',
      leftBtn: '保存',
      rightBtn: '不保存',
      show: 0,
      toPopUPData: 0
    },
    footerBtnObject: {
      leftUrl: '/pages/activityPage/publish/ticket/ticket',
      rightUrl: '/pages/index/index',
      leftBtn: '上一步',
      rightBtn: '发布',
      number: 1,
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
  getSetUpMessage(e) {
    // this.data.popUpObj.show = e.detail.obj? e.detail.obj.show : 0
    // this.data.popUpObj.toPopUPData = e.detail.obj.deleteIndex.num
    // this.setData({
    //   popUpObj: this.data.popUpObj
    // })
    app.globalData.publishActivityData.webFormList = e.detail.arr
    this.setData({
      setUpItem: e.detail.arr
    })
    // this.data.popUpObj.show = e.detail.obj.show
    this.data.footerBtnObject.addActivity.webFormList = this.data.setUpItem
    this.setData({
      footerBtnObject: this.data.footerBtnObject
    })
  },
  delete(e) {
    this.data.popUpObj.show = e.detail.obj.show
    this.data.popUpObj.toPopUPData = e.detail.obj.deleteIndex.num
    this.setData({
      popUpObj: this.data.popUpObj
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
    console.log(obj.pickType)
    switch (obj.pickType) {
      case '0':
        obj.propertyType = 0
        break
      case '1':
        obj.propertyType = 4
        obj.property = '图片填写项'
        break
      default:
        obj.propertyType = 3
        break
    }
    console.log(obj)
    app.globalData.publishActivityData.webFormList.push(obj)
    this.data.footerBtnObject.addActivity.webFormList = app.globalData.publishActivityData.webFormList
    this.setData({
      setUpItem: app.globalData.publishActivityData.webFormList,
      footerBtnObject: this.data.footerBtnObject
    })
  }
})