// pages/userPage/bill/bill.js
const request = require('../../../request/api')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag: 1,
    billDetail: [],
    selectList: [
      {
        name: '全部交易',
        arr: ['全部', '上架中'],
        isShow: 0
      }
    ],
    showSelectListIndex: 10,
    windowHeight: 0,
    pay: 0,
    income: 0,
    scrollSelect: {
      title: '全部活动',
      selectList: [],
      isShow: 0
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.showBillDetail()
    this.getWindowHeight()
  },
  getSelectScrollShow(e) {
    if (e.detail.show == 1) {
      this.data.selectList[0].isShow = 0
      this.setData({
        selectList: this.data.selectList
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
          })
          this.data.scrollSelect.isShow = e.detail.show
          this.setData({
            scrollSelect: this.data.scrollSelect,
            flag: 0
          })
        })
    }
  },
  getSelectListShow(e) {
    if (e.detail.show == 1) {
      this.data.scrollSelect.isShow = 0
      this.setData({
        scrollSelect: this.data.scrollSelect
      })
    }
  },
  getWindowHeight() {
    this.setData({
      windowHeight: (wx.getSystemInfoSync().windowHeight) * 2 - 120
    })
  },
  showSelectList(e) {
    this.setData({
      showSelectListIndex: e.currentTarget.dataset.num
    })
  },
  getPickerTime(e) {
    let year = e.detail.time.slice(0,4).toString()
    let month = e.detail.time.slice(5).toString()
    return {year,month}
  },
  getActivityId(e) {
    return e? e.detail.id : 0
  },
  loadCurrentMonth() {
    var myDate = new Date();
    var tYear = myDate.getFullYear().toString()
    var tMonth = myDate.getMonth()
    var m = tMonth + 1;
    if (m.toString().length == 1) {
      m = "0" + m;
    }
    return {tYear,m}
  },
  showBillDetail() {
    const current = this.loadCurrentMonth()
    const ll = this.getActivityId()
    let obj = {
      "id": wx.getStorageSync('id'),
      "month": current.m,
      "status": 4,
      "activityId": ll,
      "year": current.tYear
    }
    console.log(obj)
    request.showBillDetail(obj)
      .then(res => {
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
            this.data.pay += parseFloat(result[i].amount)
          } else {
            this.data.income += parseFloat(result[i].amount)
          }
        }
        this.setData({
          billDetail: result,
          pay: this.data.pay.toFixed(2),
          income: this.data.income.toFixed(2)
        })
      })
  }
})