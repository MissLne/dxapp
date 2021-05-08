// components/indexPageItem/manageActivity/memberMessage/memberMessage.js
const navigate = require('../../../../navigator/index')
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    member: Object
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
    showDetail(e) {
      let query = {
        mId: e.currentTarget.dataset.mid,
        activityId: 89
      }
      query.mId = JSON.stringify(query.mId)
      query.activityId = JSON.stringify(query.activityId)
      navigate.navigateTo({
        url: "../../../../pages/activityPage/manage/memberMessage/memberMessage",
        query
      })
    }
  }
})
