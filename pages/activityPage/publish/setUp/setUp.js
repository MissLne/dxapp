// pages/activityPage/publish/setUp/setUp.js
const app = getApp();

  
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
    app.globalData.setUpCustomizeData.push(obj)
    console.log(app.globalData.setUpCustomizeData)
    // this.data.footerBtnObject.addActivity.webFormList = this.data.setUpItem
    this.setData({
      setUpItem: app.globalData.setUpCustomizeData
    })
  },
  suredelete() {
    this.setData({
        setUpItem: app.globalData.setUpCustomizeData
      })
  },
  lala() {
    console.log(app.globalData.setUpCustomizeData)
  },
  delete(e) {
    this.data.popUpObj.show = e.detail.obj.show
    this.data.popUpObj.toPopUPData = e.detail.obj.deleteIndex.num
    this.setData({
      popUpObj: this.data.popUpObj
    })
  },
  getSetUpMessage(e) {
    console.log(e)
    // this.data.popUpObj.show = e.detail.obj? e.detail.obj.show : 0
    // this.data.popUpObj.toPopUPData = e.detail.obj.deleteIndex.num
    // this.setData({
    //   popUpObj: this.data.popUpObj
    // })
    app.globalData.setUpCustomizeData = e.detail.arr
    // this.setData({
    //   setUpItem: e.detail.obj.arr
    // })
    // this.data.popUpObj.show = e.detail.obj.show
    // this.data.footerBtnObject.addActivity.webFormList = this.data.setUpItem
    // this.setData({
    //   footerBtnObject: this.data.footerBtnObject,
    //   popUpObj: this.data.popUpObj
    // })
  }
})