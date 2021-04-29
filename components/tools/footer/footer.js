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
    goNext() {
      let obj = this.properties.contentObject.addActivity,
        newobj = {},
        count = 0,
        arr = [],
        nullArr = 0
      app.globalData.publishActivityData = Object.assign(app.globalData.publishActivityData, obj)
      console.log(app.globalData.publishActivityData)
      for (let key in obj) {
        if (obj[key] !== '' && obj[key]) {
          newobj[key] = obj[key]
          if (Object.prototype.toString.call(obj[key]) === '[object Array]') arr = obj[key]
          count++
        }
      }
      console.log(arr)
      if (this.properties.contentObject.rightBtn == '发布' && count == 10) {
        request.publishActivities(obj)
          .then(res => {
            console.log(res)
          })
      }
      if (count === this.properties.contentObject.number) {
        if (arr.length == 0) {
          wx.navigateTo({
            url: this.properties.contentObject.rightUrl
          })
        } else {
          arr.map(item => {
            for (let key in item) {
              if (item[key] === '') nullArr = 1
            }
          })
          if (!nullArr) {
            wx.navigateTo({
              url: this.properties.contentObject.rightUrl
            })
          }

        }

      }
      this.triggerEvent('next', { obj: newobj })
    }
  }
})
