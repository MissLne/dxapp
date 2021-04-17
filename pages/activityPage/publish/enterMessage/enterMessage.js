// pages/activityPage/publish/enterMessage/enterMessage.js
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
    materialArray: [],
    temObject: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  goNext(e) {
    this.setData({
      temObject: e.detail.obj
    })
  },
  materialChange(e) {
    let arr = this.data.materialArray
    let data = this.data.footerBtnObject
    arr[e.currentTarget.dataset.num] = e.detail.value
    this.setData({
      materialArray: arr
    })
    data.addActivity.activityName = this.data.materialArray[0]
    data.addActivity.startTime = this.data.materialArray[1]
    data.addActivity.address = this.data.materialArray[2]
    data.addActivity.registrationDeadline = this.data.materialArray[3]
    this.setData({
      footerBtnObject: data
    })
    console.log(this.data.footerBtnObject)
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
            this.setData({
              footerBtnObject: data
            })
          }
        })
      }
    })
    // wx.chooseImage({
    //   count: 1,
    //   success: (result) => {
    //     wx.showToast({
    //       title: '正在上传...',
    //       icon: 'loading',
    //       duration: 1500,
    //       mask: true
    //     })
    //     let data = this.data.footerBtnObject
    //     data.addActivity.posterImage = result.tempFilePaths[0]
    //     this.setData({
    //       footerBtnObject: data
    //     })
    //   }
    // })
    
  }
})