// pages/activityPage/publish/setUp/setUp.js
const request = require('../../../../request/api')
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
    showBubble: 0,
    footerBtnObject: {
      leftUrl: '/pages/activityPage/publish/ticket/ticket',
      rightUrl: '/pages/activityPage/publish/pubSuccess/pubSuccess',
      leftBtn: '上一步',
      rightBtn: '发布',
      number: 1,
      addActivity: {}
    },
    pickMessage: {
      content: '新增填写项',
      array: ['文字填空', '图片', '单选/多选'],
      scrollTop: 0,
      ifRedArr: []
    },
    setUpItem: [],
    publishActivity: {},
    showBubble1: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
  onPageScroll: function (e) {
    this.data.pickMessage.scrollTop = e.scrollTop
    this.setData({
      pickMessage: this.data.pickMessage
    })
  },
  suredelete() {
    app.globalData.publishActivityData.webFormList.splice(this.properties.popUpObj.toPopUPData, 1)
    this.setData({
      setUpItem: app.globalData.publishActivityData.webFormList,
      footerBtnObject: this.data.footerBtnObject
    })

    let scrollTop = this.data.pickMessage.scrollTop
    wx.pageScrollTo({
      scrollTop: scrollTop - 230,
      duration: 300
    })
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
    let data = this.data.footerBtnObject.addActivity.webFormList
    let index = e.detail.obj.deleteIndex.num
    if (data[index].content.length == 0 && data[index].property == "") {
      app.globalData.publishActivityData.webFormList.splice(index, 1)
      this.setData({
        setUpItem: app.globalData.publishActivityData.webFormList,
        footerBtnObject: this.data.footerBtnObject
      })
      let scrollTop = this.data.pickMessage.scrollTop
      wx.pageScrollTo({
        scrollTop: scrollTop - 230,
        duration: 300
      })
      return
    }
    this.data.popUpObj.show = e.detail.obj.show
    this.data.popUpObj.toPopUPData = index
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
    
    
    // gzh: '例：公众号'
    console.log(obj.pickType)
    switch (obj.pickType) {
      case '0':
        obj.propertyType = 0
        obj.lianxi = '例：联系方式'
        obj.tips = '例：请输入联系方式'
        break
      case '1':
        obj.propertyType = 4
        obj.property = '图片填写项'
        obj.jizan = '例：朋友圈集赞图片'
        break
      default:
        obj.propertyType = 3
        obj.laiyuan = '例：你了解到报名的来源'
        break
    }
    console.log(obj)
    app.globalData.publishActivityData.webFormList.push(obj)
    this.data.footerBtnObject.addActivity.webFormList = app.globalData.publishActivityData.webFormList
    this.setData({
      setUpItem: app.globalData.publishActivityData.webFormList,
      footerBtnObject: this.data.footerBtnObject
    })
  },
  backIndex() {
    this.data.popUpObj2.show = 1
    this.setData({
      popUpObj2: this.data.popUpObj2
    })
  },
  isSave() {
    this.data.popUpObj.show = 0
    this.setData({
      popUpObj: this.data.popUpObj
    })
    request.saveDraft(app.globalData.publishActivityData)
      .then(res => {
        console.log(res)
      })
    wx.switchTab({
      url: '/pages/index/index',
    })
  },
  goNext(e) {
    this.data.pickMessage.ifRedArr = Array.from(new Set(e.detail.index))
    console.log(this.data.pickMessage)
    this.setData({
      showBubble: 1,
      pickMessage: this.data.pickMessage
    })
    setTimeout(() => {
      this.setData({
        showBubble: 0
      })
    }, 2000)
  },
  // addSetUp(e) {
  //   wx.navigateTo({
  //     url: '/pages/activityPage/publish/addDiyBox/addDiyBox'
  //   })

  // let obj = {
  //   isOptional: 0,
  //   property: '',
  //   content: [],
  //   propertyType: 0,
  //   pickType: e.detail.value
  // }
  // console.log(obj.pickType)
  // switch (obj.pickType) {
  //   case '0':
  //     obj.propertyType = 0
  //     break
  //   case '1':
  //     obj.propertyType = 4
  //     obj.property = '图片填写项'
  //     break
  //   default:
  //     obj.propertyType = 3
  //     break
  // }
  // console.log(obj)
  // app.globalData.publishActivityData.webFormList.push(obj)
  // this.data.footerBtnObject.addActivity.webFormList = app.globalData.publishActivityData.webFormList
  // this.setData({
  //   setUpItem: app.globalData.publishActivityData.webFormList,
  //   footerBtnObject: this.data.footerBtnObject
  // })
  // },
  // lala() {
  // },
  ououo() {
    this.setData({
      showBubble1: 1,
      pickMessage: this.data.pickMessage
    })
    setTimeout(() => {
      this.setData({
        showBubble1: 0
      })
    }, 2000)
    // wx.navigateToMiniProgram({
    //   appId: 'wx9fa9d2342bc085ea',
    //   path: 'pages/index/detail/detail?id=123',
    //   extraData: {
    //     obj: app.globalData.publishActivityData
    //   },
    //   envVersion: 'develop',
    //   success(res) {
    //     // 打开成功
    //   }
    // })
  }
})