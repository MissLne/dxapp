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
    requestData() {
      request.publishActivities(app.globalData.publishActivityData)
        .then(res => {
          console.log(res)
        })
    },
    goNext() {
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
      if (this.properties.contentObject.rightBtn == '发布' && count == 10) this.requestData()
      if (count >= this.properties.contentObject.number || (this.properties.contentObject.rightBtn == '发布' && arr.length == 0)) {
        if (arr.length == 0) {
          this.requestData()
          // wx.navigateTo({
          //   url: this.properties.contentObject.rightUrl
          // })
        } else {
          arr.map(item => {
            for (let key in item) {
              if (item[key] === '' || item[key].length == 0) {
                nullArr = 1
                this.triggerEvent('next')
              }
            }
          })
          if (!nullArr) {
            this.requestData()
            // wx.navigateTo({
            //   url: this.properties.contentObject.rightUrl
            // })
          }
        }
      } else {
        this.triggerEvent('next')
      }
    }
  }
})
