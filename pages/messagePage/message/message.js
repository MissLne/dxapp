// pages/messagePage/message/message.js
const request = require('../../../request/api')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topBar: {
      title: '消息',
      isOne: 1
    },
    topBarMargin: (wx.getMenuButtonBoundingClientRect().top) * 2,
    topBarHeight: (wx.getMenuButtonBoundingClientRect().height) * 2 + 15,
    selectArray1: [
      {
        "id": 0,
        "text": "全部活动"
      }
    ],
    selectArray2: [
      {
        "text": '未回答',
        "id": 0
      },
      {
        "text": '已回答',
        "id": 1
      }
    ],
    windowHeight: 0,
    questionMessage: [],
    commentMessage: [],
    currentIndex: 0,
    swiperIndex: 0,
    scrollSelect: {
      title: '全部活动',
      selectList: [
        {
          activityName: '全部活动'
        }
      ],
      isShow: 0
    },
    scrollSelect1: {
      title: '全部活动',
      selectList: [
        {
          activityName: '全部活动'
        }
      ],
      isShow: 0
    },
    replyId: -1,
    replyType: '',
    isShow: 0,
    inputHeight: 0,
    replyContent: '',
    flag: 1,
    isCover2Show: 0,
    selectList:
    {
      name: '全部提问',
      arr: ['全部', '已回答', '未回答'],
      isShow: 0,
      boxWidth: 120
    },
    windowHeight1: 0,
    selectListIsShow: 0,
    showList: [],
    hideList: [],
    pageSize: 5,
    ifPages: true,
    showList1: [],
    hideList1: [],
    pageSize1: 5,
    ifPages1: true,
    chooseOrNot: true
  },

  /**
   * 生命周期函数--监听页面加载
   */


  onLoad: function (options) {
    console.log(options)
    this.getTopHeight()
    this.getMessage()
    
  },
  onShow: function() {
    if(app.globalData.showQuesCom.number == 1) {
      request.showQuesMessge({
        mId: wx.getStorageSync('id')
      })
        .then(res => {
          let emptyReply = []
          let reply = []
          
          res.data.map(item => {
            item.reply == null && item.aid == app.globalData.showQuesCom.id? emptyReply.push(item) : reply.push(item)
          })
          this.setData({
            questionMessage: emptyReply
          })
        })
    } else if(app.globalData.showQuesCom.number == 2) {
      this.setData({
        swiperIndex: 1
      })
      request.actIdGetComment({
        activityId: app.globalData.showQuesCom.id,
        mId: wx.getStorageSync('id')
      })
        .then(res => {
          this.setData({
            commentMessage: res.data
          })
        })
    }
  },
  onHide: function() {
    app.globalData.showQuesCom.number = 1
    app.globalData.showQuesCom.id = -1
  },
  showQuesByStatus(e) {
    this.setData({
      chooseOrNot: false
    })
    request.showQuesMessge({
      mId: wx.getStorageSync('id')
    })
      .then(res => {
        let emptyReply = []
        let reply = []
        res.data.map(item => {
          item.reply == null ? emptyReply.push(item) : reply.push(item)
        })
        switch (e.detail.name) {
          case '全部':
            this.setData({
              questionMessage: res.data
            })
            break
          case '已回答':
            this.setData({
              questionMessage: reply
            })
            break
          case '未回答':
            this.setData({
              questionMessage: emptyReply
            })
            break
          default:
            this.setData({
              questionMessage: res.data
            })
            break
        }
      })
  },
  getTopHeight() {
    let _this = this
    let query = wx.createSelectorQuery().in(this)
    query.select(`.messageTitle`).boundingClientRect(rect => {
      let height1 = _this.getRealHeight(rect)
      // let clientHeight = rect.height
      let query1 = wx.createSelectorQuery().in(_this)
      query1.select(`.massageScrollTop`).boundingClientRect(rect1 => {
        let height2 = _this.getRealHeight(rect1)
        this.setData({
          windowHeight: app.getSomgthingHeight().viewHeight - height1 - height2 - this.data.topBarMargin - this.data.topBarHeight,
          windowHeight1: app.getSomgthingHeight().viewHeight - height1 - this.data.topBarMargin - this.data.topBarHeight
        })
      }).exec()
      let query2 = wx.createSelectorQuery().in(_this)
      query2.select(`.massageScrollTop2`).boundingClientRect(rect2 => {
        let height2 = _this.getRealHeight(rect2)
        this.setData({
          windowHeight2: app.getSomgthingHeight().viewHeight - height1 - height2 - this.data.topBarMargin - this.data.topBarHeight,
        })
      }).exec()
    }).exec()
  },
  getRealHeight(rect) {
    let clientHeight = rect.height
    let clientWidth = rect.width
    let ratio = 750 / clientWidth
    let height = clientHeight * ratio
    return height
  },
  getActivityId(e) {
    if (e.currentTarget.dataset.item) {
      console.log(e)
      request.actIdGetComment({
        activityId: e.detail.id,
        mId: wx.getStorageSync('id')
      })
        .then(res => {
          this.setData({
            commentMessage: res.data
          })
        })
    } else {
      request.actIdGetConsult({
        activityId: e.detail.id,
        mId: wx.getStorageSync('id')
      })
        .then(res => {
          console.log(res)
          this.setData({
            questionMessage: res.data
          })
        })
    }
  },
  getSelectScrollShow(e) {
    if (e.detail.show == 1) {
      this.setData({
        selectListIsShow: 0
      })
    }
    let obj = {
      mId: wx.getStorageSync('id')
    }
    if (this.data.flag) {
      request.showActMessage(obj)
        .then(res => {
          res.data.map(item => {
            this.data.scrollSelect.selectList.push({
              activityId: item.activityId,
              activityName: item.activityName
            })
            this.data.scrollSelect1.selectList.push({
              activityId: item.activityId,
              activityName: item.activityName
            })
          })
          if (e.currentTarget.dataset.item) {
            this.data.scrollSelect1.isShow = e.detail.show
          } else {
            this.data.scrollSelect.isShow = e.detail.show
          }

          this.setData({
            scrollSelect: this.data.scrollSelect,
            scrollSelect1: this.data.scrollSelect1,
            flag: 0
          })
        })
    }
  },
  setKeyHeight(obj) {
    let _sysInfo = uni.getSystemInfoSync()
    let _heightDiff = _sysInfo.screenHeight - _sysInfo.windowHeight
    let _diff = obj.height - _heightDiff
    this.keyHeight = _diff > 0 ? _diff : 0
  },
  replyQuestion() {
    let _this = this
    if (this.data.replyContent != '' && !this.data.replyContent.replace(/\s+/g, '').length == 0) {
      if (this.data.replyType == '回答') {
        let obj = {
          aId: this.data.replyId,
          reply: this.data.replyContent
        }
        request.restore(obj)
          .then(res => {
            wx.showToast({
              title: '发送成功',
              icon: 'success',
              duration: 2000
            })
            _this.onLoad()
          })
      } else {
        let obj = {
          cId: this.data.replyId,
          reply: this.data.replyContent
        }
        request.reply(obj)
          .then(res => {
            wx.showToast({
              title: '发送成功',
              icon: 'success',
              duration: 2000
            })
            _this.onLoad()
          })
      }
    }
  },
  reply(e) {
    console.log(e)
    this.setData({
      isShow: 1,
      replyId: e.detail.obj.id,
      replyType: e.detail.obj.type
    })
  },
  hideInput() {
    this.setData({
      inputHeight: 0,
      isShow: 0
    })
  },
  getTabBarHeight() {
    let systemInfo = wx.getSystemInfoSync()
    let pxToRpxScale = 750 / systemInfo.windowWidth
    let ktxStatusHeight = systemInfo.statusBarHeight * pxToRpxScale
    let navigationHeight = 44 * pxToRpxScale
    let ktxWindowHeight = systemInfo.windowHeight * pxToRpxScale
    let ktxScreentHeight = systemInfo.screenHeight * pxToRpxScale
    let tabBarHeight = ktxScreentHeight - ktxStatusHeight - navigationHeight - ktxWindowHeight
    let viewHeight = ktxWindowHeight
    return { tabBarHeight, viewHeight }
  },
  getKeyHeight(e) {
    // let _sysInfo = wx.getSystemInfoSync()
    // let _heightDiff = _sysInfo.screenHeight - _sysInfo.windowHeight
    // let _diff = e.detail.height - _heightDiff
    // let height = _diff > 0 ? _diff : 0
    // console.log(height,_heightDiff)
    // let tabBarHeight = this.getTabBarHeight().tabBarHeight
    // 
    this.setData({
      // inputHeight: (e.detail.height) * 2 - tabBarHeight - height,
      replyContent: ''
    })
  },
  swiperCurrent(e) {
    this.setData({
      swiperIndex: e.detail.current
    })
  },
  swiperChange(e) {
    this.setData({
      currentIndex: e.detail.current
    })
  },
  getMessage() {
    let obj = {
      mId: wx.getStorageSync('id')
    }
    request.actIdGetConsult(obj)
      .then(res => {
        this.setData({
          questionMessage: res.data
        })
      })
    request.actIdGetComment(obj)
      .then(res => {
        this.setData({
          commentMessage: res.data
        })
      })
  }
})