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
      let _this = this
      app.globalData.publishActivityData.status = 1
      request.publishActivities(app.globalData.publishActivityData)
        .then(res => {
          console.log(res)
          if (res.msg == 'success') {
            wx.navigateTo({
              url: _this.properties.contentObject.rightUrl
            })
          } else {
            wx.navigateTo({
              url: '/pages/activityPage/publish/pubFail/pubFail'
            })
          }
        })
        .catch(() => {
          wx.navigateTo({
            url: '/pages/activityPage/publish/pubFail/pubFail'
          })
        })
    },
    goNext() {
      let startTime = JSON.stringify(app.globalData.publishActivityData.startTime)
      let registrationDeadline = JSON.stringify(app.globalData.publishActivityData.registrationDeadline)
      startTime = startTime.replace(/\"/g, "")
      registrationDeadline = registrationDeadline.replace(/\"/g, "")
      startTime = Date.parse(startTime)
      registrationDeadline = Date.parse(registrationDeadline)
      if(startTime < registrationDeadline) {
        this.triggerEvent('next')
        return
      }
      app.globalData.publishActivityData.ticketList.map(item => {
        item.ticketPrice == 0 ? item.ticketType = 0 : item.ticketType = 1
        if (!item.hasOwnProperty('ticketRefundType')) item.ticketRefundType = 0
        item.ticketPrice = item.ticketPrice * 100
      })
      if (this.properties.contentObject.rightBtn == '提现') {
        wx.navigateTo({
          url: this.properties.contentObject.rightUrl
        })
        return
      }
      let obj = this.properties.contentObject.addActivity,
        count = 0,
        arr = [],
        nullArr = 0,
        newobj = {}
      obj.activityDetails = app.globalData.publishActivityData.activityDetails
      for (let key in obj) {
        if (obj[key] !== '' && obj[key]) {
          // newobj[key] = obj[key]
          if (Object.prototype.toString.call(obj[key]) === '[object Array]') arr = obj[key]
          count++
        }
        if (obj[key] == '' && !obj[key]) {
          newobj[key] = obj[key]
        }
      }
      console.log(newobj)
      // if (this.properties.contentObject.rightBtn == '发布' && count == 10) {
      //   console.log('ouo')
      //   this.requestData()
      // }
      if (count >= this.properties.contentObject.number || (this.properties.contentObject.rightBtn == '发布' && arr.length == 0)) {
        if (this.properties.contentObject.rightBtn == '发布' && arr.length == 0) {
          this.requestData()

        } else {
          console.log(2)
          let nularr = []
          arr.map((item, index) => {
            console.log(item)
            for (let key in item) {
              if (item[key] === '' || item[key].length == 0) {
                console.log('oxo')
                nullArr = 1
                nularr.push(index)
              }
            }
          })
          if (!nullArr) {

            if (this.properties.contentObject.rightBtn == '发布') {
              console.log(1)
              this.requestData()

            } else {
              wx.navigateTo({
                url: this.properties.contentObject.rightUrl
              })
            }
          } else {
            this.triggerEvent('next', { index: nularr })
          }

        }
      } else {
        this.triggerEvent('next', { nulObj: newobj })
      }
    }
  }
})
