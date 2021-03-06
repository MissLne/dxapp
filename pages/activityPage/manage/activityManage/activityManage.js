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
    popUpObj: {
      showBubble: 0,
      content: '确定没有手抖吗？',
      leftBtn: '确认',
      rightBtn: '取消',
      show: 0,
      toPopUPData: 0
    },
    topBar: {
      title: '活动管理',
      isOne: 0,
      goUrl: '/pages/index/index',
      index: 1
    },
    topBarMargin: (wx.getMenuButtonBoundingClientRect().top) * 2,
    topBarHeight: (wx.getMenuButtonBoundingClientRect().height) * 2 + 15,
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
    month: -1,
    year: -1,
    time: '',
    isEmpty: 0,
    isScrollLoad: 0,
    erweimaShow: 0,
    erweimaUrl: '',
    stopOrCancel: -1,
    showList: [],
    hideList: [],
    pageSize: 15,
    ifPages: true,
    showList1: [],
    hideList1: [],
    pageSize1: 20,
    ifPages1: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: "正在加载中",
      mask: true,
    })
    let _this = this
    this.setData({
      activityId: options.activityId,
      month: _this.loadCurrentMonth().m,
      year: _this.loadCurrentMonth().tYear,
      time: _this.loadCurrentMonth().tYear + '-' + _this.loadCurrentMonth().m
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
  erweima() {
    this.setData({
      erweimaShow: 0
    })
  },
  doClick(e) {
    let { popUpObj,stopOrCancel } = this.data
    let _this = this
    if (e.detail.index == 4) {
      this.lala()
    } else if (e.detail.index == 0) {
      popUpObj.show = 1
      stopOrCancel = 2
      this.setData({
        popUpObj,
        stopOrCancel
      })
    } else if (e.detail.index == 5) {
      popUpObj.show = 1
      stopOrCancel = 1
      this.setData({
        popUpObj,
        stopOrCancel
      })
        
    } else if (e.detail.index == 2) {
      wx.showModal({
        title: '温馨提示',
        content: '正在请求您的个人信息',
        success(res) {
          if (res.confirm) {
            wx.getUserProfile({
              desc: "获取你的昵称、头像等信息",
              success: res => {
                let wxUserInfo = res.userInfo
                wx.login({
                  success: (result) => {
                    let obj = {
                      activityId: _this.data.activityId,
                      status: 1
                    }
                    request.getQRTicket(obj)
                      .then((res) => {
                        let reg = /\.(png|jpg|gif|jpeg|webp)$/;
                        if(res.data.includes("http")) {
                          _this.setData({
                            erweimaShow: 1,
                            erweimaUrl: res.data
                          })

                        } else {
                          wx.showToast({
                            title: '操作失败',
                            duration: 1500,
                            mask: false
                          })
                        }
                      })
                  }
                })
              },
              fail: res => {
                wx.showToast({
                  title: '操作失败',
                  duration: 1500,
                })
              }
            })
          } else if (res.cancel) {
            that.showErrorModal('您拒绝了请求')
            return;
          }
        },
        fail: () => {
          wx.showToast({
            title: '操作失败',
            duration: 1500,
          })
        }
      })
    } else if(e.detail.index == 3) {
      // request.preview({aId: this.data.activityId})
      // .then(res => {
        this.setData({
          showBubble: 1
        })
        setTimeout(() => {
          this.setData({
            showBubble: 0
          })
        }, 3000)
        // console.log(res)
        // wx.navigateToMiniProgram({
        //   appId: 'wx9fa9d2342bc085ea',
        //   path: 'pages/index/detail/detail?id=123',
        //   extraData: {
        //     obj: res.data
        //   },
        //   envVersion: 'develop',
        //   success(res) {
        //     // 打开成功
        //   }
        // })
      // })
    } else{
      this.setData({
        showBubble: 1
      })
      setTimeout(() => {
        this.setData({
          showBubble: 0
        })
      }, 3000)
    }
    
  },
  suredelete() {
    if (this.data.stopOrCancel == 2) {
      console.log(this.data.activityId)
      request.cancelActivity({
        activityId: this.data.activityId.toString(),
        mId: wx.getStorageSync('id')
      })
        .then(() => {
          wx.showToast({
            title: '操作成功',
            icon: 'success',
            duration: 1500,
            mask: false
          })
        })
        
    } else if(this.data.stopOrCancel = 1) {
      request.stopActivity({
        activityId: Number(this.data.activityId)
      })
        .then(() => {
          wx.showToast({
            title: '操作成功',
            icon: 'success',
            duration: 1500,
            mask: false
          })
        })
    }
  },
  async getNextMonth() {
    let { year, month, isEmpty } = this.data
    year = Number(year)
    month = Number(month)
    if (month == this.loadCurrentMonth().m && year == this.loadCurrentMonth().tYear) {
      this.setData({
        time: '本月'
      })
      return
    }
    if (Number(month) == 12) {
      month = 1
      month = "0" + month
      year++
    } else {
      month++
      if (month.toString().length == 1) month = "0" + month
    }
    this.setData({
      month,
      year,
      isScrollLoad: 1,
      time: `${year}-${month}`
    })
    let obj = {
      "id": wx.getStorageSync('id'),
      "month": month,
      "status": 4,
      "activityId": this.data.activityId,
      "year": year
    }
    await this.requestBill(obj)
    console.log(this.data.isEmpty)
    while (isEmpty) {
      this.getNextMonth()
    }
  },
  getPickerTime(e) {
    let year
    let month
    if (e.detail.time == '本月') {
      year = this.loadCurrentMonth().tYear
      month = this.loadCurrentMonth().m
      this.setData({
        time: '本月'
      })
    } else {
      year = e.detail.time.slice(0, 4).toString()
      month = e.detail.time.slice(5).toString()
    }
    let obj = {
      "id": wx.getStorageSync('id'),
      "month": month,
      "status": 0,
      "activityId": this.data.activityId,
      "year": year
    }
    this.setData({
      ifPages1: true,
      month: month,
      year: year,
      isScrollLoad: 0,
      time: `${year}-${month}`
    })
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
    navigate.navigateTo({
      url: `../activityUpdate/activityUpdate`,
      query
    })
  },

  searchHandle() {
    this.setData({
          ifPages: true
        })
    let obj = {
      activityId: this.data.activityId,
      content: this.data.searchContent
    }
    request.searchActivity(obj)
      .then(res => {
        this.memberLoad(res.data)
        
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
  timestampToTime(timestamp) {
    var date = new Date(timestamp);
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
    var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
    var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
    let strDate = Y + M + D + h + m + s;
    return strDate;

  },
  showActivityManage(options) {
    let _this = this
    let obj = {
      activityId: options.activityId
    }
    request.showActivityManage(obj)
      .then(res => {
        console.log(res)
        res.data.startTime = _this.timestampToTime(res.data.startTime)
        switch (res.data.status) {
          case -3:
            res.data.status = '已取消'
            break
          case -2:
            res.data.status = '已结束'
            break
          case 1:
            res.data.status = '上架中'
            break
          case -1:
            res.data.status = '已下架'
            break
          case 2:
            res.data.status = '草稿'
            break
          default:
            break
        }
        _this.setData({
          manageActivity: res.data,
          showComponent: 1
        })
        wx.hideLoading()
      })
      console.log(this.data.manageActivity)
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
        this.memberLoad(res.data)
      })
  },
  geiHeight() {
    this.setData({
      swiperHeight: app.getSomgthingHeight().viewHeight - 64 - this.data.topBarMargin - this.data.topBarHeight
    })
  },
  requestBill(obj) {
    let _this = this
    request.showBillDetail(obj)
      .then(res => {
        console.log(res)
        if (res.data.walletDetailBaseMsgs.length == 0 && obj['year'] != _this.loadCurrentMonth().tYear && obj['month'] != _this.loadCurrentMonth().m) {
          console.log(1)
          this.setData({
            isEmpty: 1
          })
          return
        } else {
          this.setData({
            isEmpty: 0
          })
        }
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
          this.billLoad(result)
          this.setData({
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
      "status": 0,
      "activityId": this.data.activityId,
      "year": current.tYear
    }
    this.setData({
      time: '本月'
    })
    console.log(this.data.activityId)
    this.requestBill(obj)
  },
  billLazy() {
    let { hideList1, pageSize1, ifPages1, billDetail } = this.data
    if (ifPages1) {
      let newList = [];
      if (hideList1.length > pageSize1) {
        newList = billDetail.concat(hideList1.splice(0, pageSize1));
      } else {
        newList = billDetail.concat(hideList1)
        this.setData({
          ifPages1: false,
          hideList1: []
        })
      }
      this.setData({
        billDetail: newList,
        hideList1
      })
    }
  },
  memberLazy() {
    let { hideList, pageSize, ifPages, memberMessage } = this.data
    if (ifPages) {
      let newList = [];
      if (hideList.length > pageSize) {
        newList = memberMessage.concat(hideList.splice(0, pageSize));
      } else {
        newList = memberMessage.concat(hideList)
        this.setData({
          ifPages: false,
          hideList: []
        })
      }
      this.setData({
        memberMessage: newList,
        hideList
      })
    }
  },
  memberLoad(res) {
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
          memberMessage: this.data.showList,
          hideList
        })
  },
  billLoad(res) {
    let hideList1 = res
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
          billDetail: this.data.showList1,
          hideList1
        })
  }
})