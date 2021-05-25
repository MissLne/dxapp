// pages/activityPage/publish/enterMessage/enterMessage.js
const app = getApp()
const request = require('../../../../request/api')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    footerBtnObject: {
      leftBtn: '保存草稿',
      rightUrl: '/pages/activityPage/publish/introdution/introdution',
      rightBtn: '下一步',
      number: 5,
      addActivity: {
        posterImage: '',
        activityName: '',
        startTime: '',
        address: '',
        registrationDeadline: ''
      }
    },
    temObject: {
      activityDetails: 1,
      activityName: 1,
      address: 1,
      posterImage: 1,
      registrationDeadline: 1,
      startTime: 1
    },
    popUpObj: {
      content: '是否保存为草稿',
      leftBtn: '保存',
      rightBtn: '不保存',
      show: 0,
      toPopUPData: 0
    },
    showBubble: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.initWatch(this)
  },
  watch: {
    'showBubble': function(newVal,oldVal) {
      console.log(newVal)
    }
  },
  backIndex(e) {
    this.data.popUpObj.show = 1
    this.setData({
      popUpObj: this.data.popUpObj
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
    for (let key in this.data.temObject) {
      if (e.detail.nulObj.hasOwnProperty(key)) this.data.temObject[key] = 0
    }
    this.setData({
      showBubble: 1,
      temObject: this.data.temObject
    })
    console.log(this.data.temObject)
    setTimeout(() => {
      this.setData({
        showBubble: 0
      })
    }, 3000)
  },
  materialChange(e) {
    let data = this.data.footerBtnObject
    if (e.currentTarget.dataset.name == 'startTime' || e.currentTarget.dataset.name == 'registrationDeadline') {
      e.detail.value = e.detail.value + ' 00:00:00'
    }
    app.globalData.publishActivityData[`${e.currentTarget.dataset.name}`] = e.detail.value
    data.addActivity[`${e.currentTarget.dataset.name}`] = e.detail.value
    this.setData({
      footerBtnObject: data
    })
    this.data.temObject[`${e.currentTarget.dataset.name}`] = 1
    this.setData({
      temObject: this.data.temObject
    })
  },
  chooseImg() {
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (result) => {
        wx.showToast({
          title: '正在上传...',
          icon: 'loading',
          duration: 1500,
          mask: true
        })
        wx.uploadFile({
          url: 'http://47.119.112.252:8089/party/web_public/upload_picture',
          filePath: result.tempFilePaths[0],
          name: 'file',
          header: {
            token: wx.getStorageSync('token')
          },
          success: (result) => {
            let imgObj = JSON.parse(result.data)
            let data = this.data.footerBtnObject
            data.addActivity.posterImage = imgObj.data
            app.globalData.publishActivityData.posterImage = imgObj.data
            this.setData({
              footerBtnObject: data
            })
          }
        })
      }
    })
  }
})