// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  globalData: {
    userInfo: null,
    publishActivityData: {
      accountId: wx.getStorageSync('id').toString(),
      activityName: 'q',
      startTime: 'q',
      endTime: 'q',
      registrationDeadline: 'q',
      label: 'q',
      lightSpot: 'q',
      address: 'q',
      posterImage: 'q',
      activityDetails: 'q',
      announcement: 'q',
      linkmanCode: 'q',
      groupCode: 'q',
      ticketList: [
        {
          ticketType: 0,
          ticketName: 'q',
          ticketPrice: 0,
          ticketNumber: 100,
          ticketInstructions: 'q',
          ticketRefundType: 0
        }
      ],
      webFormList: []
    },
    setUpCustomizeData: []
  }
})
