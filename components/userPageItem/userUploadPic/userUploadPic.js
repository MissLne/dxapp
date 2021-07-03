// components/userPageItem/userUploadPic/userUploadPic.js
const request = require('../../../request/api')
let app =  getApp();

  
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
  ready: function() {
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
              let imgObj = JSON.parse(result.data)
              this.setData({
                imageUrl: imgObj.data
              })
              this.triggerEvent('url',{url: this.data.imageUrl})
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
      //     this.setData({
      //       imageUrl: result.tempFilePaths[0]
      //     })
      //     this.triggerEvent('url',{url: this.data.imageUrl})
      //   }
      // })
      
    }
  }
})
