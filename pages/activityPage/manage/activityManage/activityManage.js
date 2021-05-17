// pages/activityPage/manage/activityManage/activityManage.js
const request = require('../../../../request/api')
const navigate = require('../../../../navigator/index')
const app = getApp()
// import * as echarts from '../../../../components/ec-canvas/echarts';

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
    activityId: -1,
    showComponent: 0,
    c_val: {
      canvasWidth: 100
    },
    pay: 0.00,
    income: 0.00,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      activityId: options.activityId
    })
    this.showActivityManage(options)
    this.geiHeight()
    this.showBillDetail()

  },
  onReady: function () {
    // var that = this;
    // that.canvasRing = that.selectComponent("#canvasRing");
    // that.canvasRing.showCanvasRing();

  },
  getPickerTime(e) {
    let year = e.detail.time.slice(0, 4).toString()
    let month = e.detail.time.slice(5).toString()
    let obj = {
      "id": wx.getStorageSync('id'),
      "month": month,
      "status": 4,
      "activityId": this.data.activityId,
      "year": year
    }
    console.log(obj, '----')
    this.requestBill(obj)
  },
  loadCurrentMonth() {
    var myDate = new Date();
    var tYear = myDate.getFullYear().toString()
    var tMonth = myDate.getMonth()
    var m = tMonth + 1;
    if (m.toString().length == 1) {
      m = "0" + m;
    }
    return { tYear, m }
  },
  lala() {
    let query = {
      activityId: this.data.activityId
    }
    query.activityId = JSON.stringify(query.activityId)
    console.log(this.data.activityId)
    navigate.navigateTo({
      url: `../activityUpdate/activityUpdate`,
      query
    })
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
          manageActivity: res.data,
          showComponent: 1
        })
        console.log(this.data.manageActivity)
      })
    request.showMemberMessage(obj)
      .then(res => {
        console.log(res)
        res.data.map(item => {
          switch (item.gender) {
            case 1:
              item.gender = '男'
              break;
            case 0:
              item.gender = '女'
              break;
            default:
              item.gender = '未知'
              break;
          }
        })
        this.setData({
          memberMessage: res.data
        })
      })
  },
  geiHeight() {
      this.setData({
        swiperHeight: app.getSomgthingHeight().viewHeight - 64
      })
  },
  requestBill(obj) {
    request.showBillDetail(obj)
      .then(res => {
        console.log(res)
        let num = 0
        let num1 = 0
        let result = res.data.walletDetailBaseMsgs
        for (let i = 0; i < result.length; i++) {
          if (result[i].feeCharge != undefined) {
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
          if (result[i].moneyType == '提现' || result[i].moneyType == '退票') {
            num += parseFloat(result[i].amount)
          } else {
            num1 += parseFloat(result[i].amount)
          }
        }
        this.setData({
          billDetail: result,
          pay: Number(num).toFixed(2),
          income: Number(num1).toFixed(2)
        })
      })
  },
  showBillDetail() {
    const current = this.loadCurrentMonth()
    let obj = {
      "id": wx.getStorageSync('id'),
      "month": current.m,
      "status": 4,
      "activityId": this.data.activityId,
      "year": current.tYear
    }
    console.log(obj, '----')
    this.requestBill(obj)
  }
})