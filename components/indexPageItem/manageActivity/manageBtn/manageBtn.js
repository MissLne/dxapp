
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    content: String,
    ticketDetail: Array
  },
  /**
   * 组件的初始数据
   */
  data: {
    iconfonts: [
      {
        url: '../../../../images/activity/cancel.png',
        name: '取消活动'
      },
      {
        url: '../../../../images/activity/share.png',
        name: '分享'
      },
      {
        url: '../../../../images/activity/clock.png',
        name: '设置提醒'
      },
      {
        url: '../../../../images/activity/review.png',
        name: '预览活动'
      },
      {
        url: '../../../../images/activity/renew.png',
        name: '更新活动信息'
      },
      {
        url: '../../../../images/activity/parse.png',
        name: '暂停报名'
      }
    ]
  },
   
  /**
   * 组件的方法列表
   */
 
  methods: {
    clickHandle(e) {
      this.triggerEvent('clickHandle',{index: e.currentTarget.dataset.num})
    }
  }
})
