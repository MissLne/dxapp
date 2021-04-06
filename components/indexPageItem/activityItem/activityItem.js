const navigate = require('../../navigator/index')
Component({

  /**
   * 页面的初始数据
   */
  properties: {
    propArray:{
      type:Array,
    }
  },
  data: {
  },
  methods: {
    edit(e) {
      let query = {
        activityId: e.currentTarget.dataset.activityid
      }
      query.activityId = JSON.stringify(query.activityId)
      navigate.navigateTo({
        url: "../../pages/editActivity/editActivity",
        query
      })
    }
  }
})