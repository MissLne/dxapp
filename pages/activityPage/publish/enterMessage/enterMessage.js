// pages/activityPage/publish/enterMessage/enterMessage.js
const app = getApp()
const request = require('../../../../request/api')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    theCover: '',
    BubbleText: '',
    footerBtnObject: {
      leftBtn: '返回首页',
      rightUrl: '/pages/activityPage/publish/introdution/introdution',
      rightBtn: '下一步',
      number: 6,
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
    showBubble: 0,
    date: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // let that = this;
    // let now = new Date();
    // that.setData({
    //   date: now.getFullYear() + '年' + (now.getMonth() + 1) + '月' + now.getDate() + '日' + now.getHours() + '时' + now.getMinutes() + '分'
    // })
    // console.log(this.data.date)
    app.initWatch(this)
  },
  watch: {
    'showBubble': function (newVal, oldVal) {
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
    let startTime = JSON.stringify(app.globalData.publishActivityData.startTime)
    let registrationDeadline = JSON.stringify(app.globalData.publishActivityData.registrationDeadline)
    startTime = startTime.replace(/\"/g, "")
    registrationDeadline = registrationDeadline.replace(/\"/g, "")
    startTime = Date.parse(startTime)
    registrationDeadline = Date.parse(registrationDeadline)
    if (startTime < registrationDeadline) {
      this.setData({
        showBubble: 1,
        BubbleText: "报名截止时间必须早于活动开始时间"
      })
      setTimeout(() => {
        this.setData({
          showBubble: 0
        })
      }, 3000)
      return
    }
    for (let key in this.data.temObject) {
      if (e.detail.nulObj.hasOwnProperty(key)) this.data.temObject[key] = 0
    }
    this.setData({
      showBubble: 1,
      BubbleText: "请完善活动的所有信息",
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
    console.log(e.currentTarget.dataset.name)
    let data = this.data.footerBtnObject
    // if (e.currentTarget.dataset.name == 'startTime' || e.currentTarget.dataset.name == 'registrationDeadline') {
    //   e.detail.value = e.detail.value + ' 00:00:00'
    // }
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
          url: app.globalData.urlLink + 'web_public/upload_picture',
          filePath: result.tempFilePaths[0],
          name: 'file',
          header: {
            token: wx.getStorageSync('token')
          },
          success: (result) => {
            if (result.statusCode == 200) {
              console.log(result.data)
              let imgObj = JSON.parse(result.data)
              let data = this.data.footerBtnObject
              data.addActivity.posterImage = imgObj.data
              app.globalData.publishActivityData.posterImage = imgObj.data
              this.setData({
                footerBtnObject: data,
                theCover: '重新上传'
              })
              wx.showToast({
                title: '上传成功',
                icon: 'success',
                duration: 1500,
                mask: true
              })
            } else {
              console.log(result,'-0-')
              wx.showToast({
                title: '上传失败',
                icon: 'none',
                duration: 1500,
                mask: true
              })
            }

          }
        })
      }
    })
  },
  chooseFile() {
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      compressed: true,
      maxDuration: 15,
      success: (result) => {
        wx.showToast({
          title: '正在上传...',
          icon: 'loading',
          duration: 1500,
          mask: true
        })
        wx.uploadFile({
          url: app.globalData.urlLink + 'merchant/upload/video',
          filePath: result.tempFilePath,
          name: 'file',
          header: {
            token: wx.getStorageSync('token'),
            'content-type': 'multipart/form-data'
          },
          success: (result) => {
            console.log(result)
            if (result.status == 200) {
              let imgObj = JSON.parse(result.data)
              app.globalData.publishActivityData.videoUrl = imgObj.data
              wx.showToast({
                title: '上传成功',
                icon: 'success',
                duration: 1500,
                mask: true
              })
            } else {
              wx.showToast({
                title: '上传失败',
                icon: 'none',
                duration: 1500,
                mask: true
              })
            }

          }
        })
      },
      fail: () => { },
      complete: () => { }
    })
  },
  getDateData() {
    console.log('...')
  }
})