// pages/activityPage/manage/activityManage/activityManage.js
const request = require('../../../../request/api')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    manageActivity: {},
    memberMessage: [],
    billDetail: [],
    swiperHeight: 0,
    currentIndex: 0,
    searchContent: '',
    activityId: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      activityId: options.activityId
    })
    this.showActivityManage(options),
    this.geiHeight(),
    this.showBillDetail()
  },
  searchHandle() {
    let obj = {
      activityId: this.data.activityId,
      content: this.data.searchContent
    }
    request.searchActivity(obj)
    .then(res => {
      this.setData({
        memberMessage: res.data
      })
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
  showActivityManage(options) {
    let obj = {
      activityId: options.activityId
    }
    request.showActivityManage(obj)
    .then(res => {
      this.setData({
        manageActivity: res.data
      })
    })
    request.showMemberMessage(obj)
    .then(res => {
      this.setData({
        memberMessage: res.data
      })
    })
  },
  geiHeight() {
      this.setData({
        swiperHeight: (wx.getSystemInfoSync().windowHeight) * 2 - 64
      })
  },
  showBillDetail() {
    let obj = {
      "id": wx.getStorageSync('id'),
      "month": 12,
      "status": 4, 
      "activityId": 0,
      "year": 2020 
    }
    request.showBillDetail(obj)
    .then(res => {
      let result = res.data.walletDetailBaseMsgs
      for(let i = 0;i < result.length;i++) {
        if(result[i].feeCharge != undefined) {
          result[i].feeCharge = result[i].feeCharge.toFixed(2)
        }
        result[i].amount = result[i].amount.toFixed(2)
        switch (result[i].moneyType) {
          case -1:
            result[i].moneyType = '提现'
            break;
          case 0:
            result[i].moneyType = '充值'
            break;
          case 1:
            result[i].moneyType = '售票'
            break;
          default:
            result[i].moneyType = '退票'
            break;
        }
      }
      this.setData({
        billDetail: result
      })
    })
  }
})