// components/indexPageItem/publishIntroduce/footer/footer.js
const navigate = require('../../../navigator/index')
const request = require('../../../request/api')
var app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    contentObject: {
      type: Object
    },
    goPage: Object
  },
  externalClasses: ['parent-leftbtn', 'parent-footer'],
  /**
   * 组件的初始数据
   */
  data: {
    swiperCurrent: 0,
  },
  /**
   * 组件的方法列表
   */
  methods: {
    saveDraft() {
      if (this.properties.contentObject.leftBtn == '充值') {
        wx.navigateTo({
          url: this.properties.contentObject.leftUrl
        })
        return
      }
      if (this.properties.contentObject.leftBtn == '保存草稿') {
        request.saveDraft(app.globalData.publishActivityData)
          .then(res => {
            console.log(res)
          })
      }
      wx.navigateBack({ delta: 1 })
    },
    requestData() {
      console.log(app.globalData.publishActivityData)
      // app.globalData.publishActivityData.status = 1
      request.publishActivities(app.globalData.publishActivityData)
        .then(res => {
          console.log(res)
        })
    },
    goNext() {
      if (this.properties.contentObject.rightBtn == '提现') {
        wx.navigateTo({
          url: this.properties.contentObject.rightUrl
        })
        return
      }
      let obj = this.properties.contentObject.addActivity,
        count = 0,
        arr = [],
        nullArr = 0
      for (let key in obj) {
        if (obj[key] !== '' && obj[key]) {
          // newobj[key] = obj[key]
          if (Object.prototype.toString.call(obj[key]) === '[object Array]') arr = obj[key]
          count++
        }
      }
      console.log(this.properties.contentObject.rightBtn)
      // if (this.properties.contentObject.rightBtn == '发布' && count == 10) {
      //   console.log('ouo')
      //   this.requestData()
      // }
      if (count >= this.properties.contentObject.number || (this.properties.contentObject.rightBtn == '发布' && arr.length == 0)) {
        console.log(count)
        if (this.properties.contentObject.rightBtn == '发布' && arr.length == 0) {
          this.requestData()
        } else {
          console.log(2)
          arr.map(item => {
            for (let key in item) {
              if (item[key] === '' || item[key].length == 0) {
                nullArr = 1
                this.triggerEvent('next')
              }
            }
          })
          if (!nullArr) {
            if (this.properties.contentObject.rightBtn == '发布') this.requestData()
            wx.navigateTo({
              url: this.properties.contentObject.rightUrl
            })
          }

        }
      } else {
        this.triggerEvent('next')
      }
    }
  }
})
