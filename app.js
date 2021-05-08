// app.js
App({
  globalData: {
    userInfo: null,
    publishActivityData: {
      accountId: wx.getStorageSync('id').toString(),
      activityName: 'q',
      startTime: '2021-09-02 08:00:00',
      endTime: '2021-09-05 08:00:00',
      registrationDeadline: '2021-09-02 08:00:00',
      label: ['q'],
      lightSpot: 'q',
      address: 'q',
      posterImage: 'http://www.xinhuanet.com/photo/titlepic/112740/1127402419_1619875420580_title0h.jpg',
      activityDetails: 'q',
      announcement: 'q',
      linkmanCode: 'http://www.xinhuanet.com/photo/titlepic/112740/1127402419_1619875420580_title0h.jpg',
      groupCode: 'http://www.xinhuanet.com/photo/titlepic/112740/1127402419_1619875420580_title0h.jpg',
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
  },
  onLoad: function () {
    this.loadFont()
  },
  loadFont() {
    console.log(1)
    if (wx.canIUse('loadFontFace')) {

      console.log("支持自定义字体");

      wx.loadFontFace({

        family: 'Ping Fang',
        //source: 'url("https://sungd.github.io/Pacifico.ttf")',
        source: 'url("https://image.tiaozaoj.com/PingFang-SC-Regular.ttf")',
        //source: 'url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/fonts/fontawesome-webfont.ttf")',
        global: true,
        success: function (res) {
          console.log("字体加载成功") //  loaded
          console.log(res)
        },
        fail: function (res) {
          console.log("字体加载失败") //  error
          console.log(res)
        },
        complete: function (res) {
          console.log("加载完成")
        }
      });
    } else {
      console.log('不支持自定义字体')
    }
  },

})
