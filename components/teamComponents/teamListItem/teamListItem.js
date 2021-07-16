// components/teamComponents/teamListItem/teamListItem.js
const request = require('../../../request/api')
let app =  getApp();

  
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    teamDetail: Array
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */

  methods: {
    login(e) {
      console.log(1)
      wx.login({
        success: (result) => {
          let obj = {
            "jsCode": result.code,
            "id": e.currentTarget.dataset.id
          }
          request.identify(obj)
            .then(res => {
              let data = res.data
              wx.setStorageSync('token', data.token)
              wx.setStorageSync('id', data.mid)
              app.globalData.isLogin = 1
              wx.switchTab({
                url: '/pages/index/index'
              })
            })
        }
      })
    }
  }
})
