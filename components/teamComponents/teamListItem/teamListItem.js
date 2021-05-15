// components/teamComponents/teamListItem/teamListItem.js
const request = require('../../../request/api')
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
      wx.login({
        success: (result) => {
          let obj = {
            "jsCode": result.code,
            "id": e.currentTarget.dataset.id
          }
          request.identify(obj)
      }
      })
    }
  }
})
