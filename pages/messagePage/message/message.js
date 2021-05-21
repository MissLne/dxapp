// pages/messagePage/message/message.js
const request = require('../../../request/api')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
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
          activityId: '0',
          activityName: '全部活动'
        }
      ],
      isShow: 0
    },
    scrollSelect1: {
      title: '全部活动',
      selectList: [
        {
          activityId: '0',
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
    this.getTopHeight()
    this.getMessage()
  },
  showQuesByStatus(e) {
    console.log(e)
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
  comLazyLoad() {
    let { hideList1, pageSize1, ifPages1, commentMessage } = this.data
    if (ifPages1) {
      let newList = [];
      if (hideList1.length > pageSize1) {
        newList = commentMessage.concat(hideList1.splice(0, pageSize1));
      } else {
        newList = commentMessage.concat(hideList1)
        this.setData({
          ifPages1: false,
          hideList1: []
        })
      }
      this.setData({
        commentMessage: newList,
        hideList1
      })
    }
  },
  quesLazyLoad() {
    if (this.data.chooseOrNot) {
      let { hideList, pageSize, ifPages, questionMessage } = this.data
      if (ifPages) {
        let newList = [];
        if (hideList.length > pageSize) {
          newList = questionMessage.concat(hideList.splice(0, pageSize));
        } else {
          newList = questionMessage.concat(hideList)
          this.setData({
            ifPages: false,
            hideList: []
          })
        }
        this.setData({
          questionMessage: newList,
          hideList
        })
      }
    }

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
          windowHeight: app.getSomgthingHeight().viewHeight - height1 - height2,
          windowHeight1: app.getSomgthingHeight().viewHeight - height1
        })
      }).exec()
      let query2 = wx.createSelectorQuery().in(_this)
      query2.select(`.massageScrollTop2`).boundingClientRect(rect2 => {
        let height2 = _this.getRealHeight(rect2)
        this.setData({
          windowHeight2: app.getSomgthingHeight().viewHeight - height1 - height2,
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
    console.log(e.currentTarget.dataset.item)
    if (e.currentTarget.dataset.item) {
      console.log(e)
      request.actIdGetComment({ aId: e.detail.id })
        .then(res => {
          console.log(res)
          this.setData({
            commentMessage: res.data
          })
        })
    } else {
      request.actIdGetConsult({ aId: e.detail.id })
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
    if (this.data.replyType == '回答') {
      let obj = {
        aId: this.data.replyId,
        reply: this.data.replyContent
      }
      if (this.data.replyContent != '') {
        request.restore(obj)
          .then(res => {
            wx.showToast({
              title: '发送成功',
              icon: 'success',
              duration: 2000
            })
            _this.onLoad()
          })
      }
    } else {
      let obj = {
        cId: this.data.replyId,
        reply: this.data.replyContent
      }
      if (this.data.replyContent != '') {
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
    request.showQuesMessge(obj)
      .then(res => {
        console.log(res)
        let hideList = res.data
        let { pageSize } = this.data;
        if (hideList.length > pageSize) {
          this.setData({
            showList: hideList.splice(0, pageSize)
          })
        } else {
          this.setData({
            showList: hideList,
            ifPages: false
          })
        }
        this.setData({
          questionMessage: this.data.showList,
          hideList: hideList
        })
      })
    request.showCommMessge(obj)
      .then(res => {
        let hideList1 = res.data
        let { pageSize1 } = this.data;
        if (hideList1.length > pageSize1) {
          this.setData({
            showList1: hideList1.splice(0, pageSize1)
          })
        } else {
          this.setData({
            showList1: hideList1,
            ifPages1: false
          })
        }
        this.setData({
          commentMessage: this.data.showList1,
          hideList1: hideList1
        })
      })
  }
})