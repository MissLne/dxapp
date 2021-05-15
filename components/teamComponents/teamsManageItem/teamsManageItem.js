// components/teamComponents/teamsManageItem/teamsManageItem.js
const request = require('../../../request/api')
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    teamMembers: Array
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
    deleteMember(e) {
      let _this = this
      request.deleteMember({id: e.currentTarget.dataset.id})
      .then(() => {
        wx.showToast({
          title: '删除成功',
          icon: 'success',
          image: '',
          duration: 1500
        })
        _this.onLoad()
      })
    }
  }
})
