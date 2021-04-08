// components/userPageItem/userUploadPic/userUploadPic.js
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
  methods: {
    chooseImg() {
      wx.chooseImage({
        count: 1,
        success: (result) => {
          wx.showToast({
            title: '正在上传...',
            icon: 'loading',
            duration: 1500,
            mask: true
          })
          this.setData({
            imageUrl: result.tempFilePaths[0]
          })
          this.triggerEvent('url',{url: this.data.imageUrl})
        }
      })
      
    }
  }
})
