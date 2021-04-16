// components/indexPageItem/publishIntroduce/tips/tips.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    activityMaterial: Object
  },

  /**
   * 组件的初始数据
   */
  data: {
    uploadArray: [
      {
        text: '活动须知',
        value: '请输入活动须知',
        type: 1
      },
      {
        text: '负责人微信',
        imgUrl: '',
        value: '点击上传图片>',
        type: 2
      },
      {
        text: '活动微信群',
        imgUrl: '',
        value: '点击上传图片>',
        type: 2
      }
    ],
    inputMessage: '',
    baseMessage: {}
  },

  /**
   * 组件的方法列表
   */
  ready: function () {
    this.showMaterial()
    this.setData({
      baseMessage: this.properties.activityMaterial
    })
  },
  methods: {
    getInput(e) {
      let data = this.data.baseMessage
      data.announcement = e.detail.str
      this.triggerEvent('act',{obj: data})
    },
    showMaterial() {
      let data = this.data.uploadArray
      let obj = this.properties.activityMaterial
      let arr = [obj.linkManCode, obj.groupCode]
      let index = 0
      data.forEach(element => {
        element.type === 1 ? element.value = obj.announcement : element.imgUrl = arr[index++]
      })
      this.setData({
        uploadArray: data
      })
    },
    chooseImg(e) {
      wx.chooseImage({
        count: 1,
        success: (result) => {
          wx.showToast({
            title: '正在上传...',
            icon: 'loading',
            duration: 1500,
            mask: true
          })
          let data = this.data.uploadArray
          let obj = this.properties.activityMaterial
          data[e.currentTarget.dataset.num].imgUrl = result.tempFilePaths[0]
          e.currentTarget.dataset.num === 1? obj.linkManCode = result.tempFilePaths[0] : obj.groupCode = result.tempFilePaths[0]
          this.setData({
            uploadArray: data,
            baseMessage: obj
          })
          this.triggerEvent('act',{obj: obj})
        }
      })
    }
  }
})
