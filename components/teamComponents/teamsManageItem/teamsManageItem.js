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
    popUpObj: {
      content: '确认删除该成员？',
      leftBtn: '确认',
      rightBtn: '取消',
      show: 0,
      toPopUPData: 0
    },
    memberId: -1
  },

  /**
   * 组件的方法列表
   */
  methods: {
    suredelete() {
      request.deleteMember({id: this.data.memberId})
      .then(() => {
        wx.showToast({
          title: '删除成功',
          icon: 'success',
          image: '',
          duration: 1500
        })
        this.triggerEvent('deleteMember')
      })
    },
    deleteMember(e) {
      this.data.popUpObj.show = 1
      this.setData({
        memberId: e.currentTarget.dataset.id,
        popUpObj: this.data.popUpObj
      })
      
    }
  }
})
