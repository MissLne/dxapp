// components/userPageItem/userUploadPic/userUploadPic.js
const request = require('../../../request/api')
let app = getApp();


Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    imageUrl: ''
  },

  /**
   * 组件的方法列表
   */
  ready: function () {
    this.showUserMaterial()
  },
  methods: {
    showUserMaterial() {
      let obj = {
        id: wx.getStorageSync('id')
      }
      request.showUserMessge(obj)
        .then(res => {
          this.setData({
            imageUrl: res.data.imgShowUrl
          })
        })
    },
    chooseImg() {
      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: (result) => {
          wx.showLoading({
            title: "正在加载中",
            mask: true,
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
                let imgObj = JSON.parse(result.data)
                this.setData({
                  imageUrl: imgObj.data
                })
                this.triggerEvent('url', { url: this.data.imageUrl })
                wx.hideLoading()
                wx.showToast({
                  title: '上传成功',
                  icon: 'success',
                  duration: 1500,
                  mask: true
                })
              } else {
                wx.hideLoading()
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
    }
  }
})
