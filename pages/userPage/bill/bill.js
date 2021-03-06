// pages/userPage/bill/bill.js
// const { exec } = require('node:child_process')
const request = require('../../../request/api')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topBarMargin: (wx.getMenuButtonBoundingClientRect().top) * 2,
    topBarHeight: (wx.getMenuButtonBoundingClientRect().height) * 2 + 15,
    topBar: {
      title: '账单明细',
      isOne: 0
    },
    flag: 1,
    billDetail: [],
    selectList: [
      {
        name: '全部交易',
        arr: ['全部', '提现', '充值', '退票', '售票'],
        isShow: 0,
        boxWidth: 150
      }
    ],
    showSelectListIndex: 10,
    windowHeight: 0,
    pay: 0,
    income: 0,
    scrollSelect: {
      title: '全部活动',
      selectList: [
        {
          activityName: '全部活动'
        }
      ],
      isShow: 0
    },
    activityId: 0,
    month: '1',
    year: '2021',
    status: 0,
    selectListIsShow: 0,
    showList: [],
    hideList: [],
    pageSize: 20,
    ifPages: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onReachBottom: function () {
    // 页面触底时执行
    console.log(1)
  },
  onLoad: function (options) {
    wx.showLoading({
      title: "正在加载中",
      mask: true,
    })
    this.showBillDetail()
    
  },
  onShow: function () {
    this.getWindowHeight()
  },
  billLazy() {
    let { hideList, pageSize, ifPages, billDetail } = this.data
    console.log(ifPages)

    if (ifPages) {
      console.log(1)
      let newList = [];
      if (hideList.length > pageSize) {
        newList = billDetail.concat(hideList.splice(0, pageSize));
      } else {
        newList = billDetail.concat(hideList)
        this.setData({
          ifPages: false,
          hideList: []
        })
      }
      this.setData({
        billDetail: newList,
        hideList
      })
    }
  },
  loadBill(res) {
    let hideList = res
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
          billDetail: this.data.showList,
          hideList
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
          result[i].amount = (result[i].amount / 100).toFixed(2)
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
        this.loadBill(result)
        this.setData({
          pay: Number(num).toFixed(2),
          income: Number(num1).toFixed(2)
        })
        wx.hideLoading()
      })
    // this.loadCurrentMonth()
  },
  getIndex(e) {
    console.log(e)
    this.data.selectList[0].name = e.detail.name
    this.data.selectList[0].isShow = 1
    let obj = {
      "id": wx.getStorageSync('id'),
      "month": this.data.month,
      "status": e.detail.count,
      "activityId": this.data.activityId,
      "year": this.data.year
    }
    let obj1 = {
      "id": wx.getStorageSync('id'),
      "month": this.data.month,
      "status": e.detail.count,
      "activityId": this.data.activityId,
      "year": this.data.year
    }
    this.setData({
      status: e.detail.count,
      selectList: this.data.selectList,
      ifPages: true
    })

    console.log(obj, '----')
    this.requestBill(obj)
  },
  getSelectScrollShow(e) {
    if (e.detail.show == 1) {
      // this.setData({
      //   selectListIsShow: 0
      // })
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
    this.setData({
      isShowSelectList: !this.data.isShowSelectList
    })
    this.getWindowHeight()
  },
  getWindowHeight() {
    let _this = this
    let query = wx.createSelectorQuery().in(this)
    query.select(`.selectionClass`).boundingClientRect(rect => {
      let height1 = app.getRealHeight(rect)
      let query1 = wx.createSelectorQuery().in(_this)
      query1.select(`.payAndIncome`).boundingClientRect(rect => {
        let height2 = app.getRealHeight(rect)
        // console.log
        this.setData({
          windowHeight: app.getSomgthingHeight().viewHeight - (height1 + height2) - _this.data.topBarMargin - _this.data.topBarHeight
        })
      }).exec()
    }).exec()

  },
  showSelectList(e) {
    this.setData({
      showSelectListIndex: e.currentTarget.dataset.num,

    })

  },
  getPickerTime(e) {
    let year = e.detail.time.slice(0, 4).toString()
    let month = e.detail.time.slice(5).toString()
    let obj = {
      "id": wx.getStorageSync('id'),
      "month": month,
      "status": this.data.status,
      "activityId": this.data.activityId,
      "year": year
    }
    this.setData({
      ifPages: true,
      year: year,
      month: month
    })
    console.log(obj, '----')
    this.requestBill(obj)
  },
  getActivityId(e) {
    this.data.scrollSelect.title = e.detail.name
    this.data.scrollSelect.isShow = 0
    this.setData({
      activityId: e.detail.id,
      scrollSelect: this.data.scrollSelect,
      ifPages: true
    })
    let obj = {
      "id": wx.getStorageSync('id'),
      "month": this.data.month,
      "status": this.data.status,
      "activityId": this.data.activityId,
      "year": this.data.year
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
    this.setData({
      year: tYear,
      month: m
    })
    return { tYear, m }
  },
  showBillDetail() {
    const current = this.loadCurrentMonth()
    let obj = {
      "id": wx.getStorageSync('id'),
      "month": current.m,
      "status": 0,
      "year": current.tYear
    }
    console.log(obj)
    this.requestBill(obj)
    // request.showBillDetail(obj)
    //   .then(res => {
    //     let result = res.data.walletDetailBaseMsgs
    //     for (let i = 0; i < result.length; i++) {
    //       if (result[i].feeCharge != undefined) {
    //         result[i].feeCharge = result[i].feeCharge.toFixed(2)
    //       }
    //       result[i].amount = result[i].amount.toFixed(2)
    //       switch (result[i].moneyType) {
    //         case -1:
    //           result[i].moneyType = '提现'
    //           break;
    //         case 0:
    //           result[i].moneyType = '充值'
    //           break;
    //         case 1:
    //           result[i].moneyType = '售票'
    //           break;
    //         default:
    //           result[i].moneyType = '退票'
    //           break;
    //       }
    //       if (result[i].moneyType == '提现' || result[i].moneyType == '退票') {
    //         this.data.pay += parseFloat(result[i].amount)
    //       } else {
    //         this.data.income += parseFloat(result[i].amount)
    //       }
    //     }
    //     this.setData({
    //       billDetail: result,
    //       pay: this.data.pay.toFixed(2),
    //       income: this.data.income.toFixed(2)
    //     })
    //   })
  }
})