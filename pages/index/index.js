//index.js
const app = getApp()
const request = require('../../request/api')
Page({
    data: {
        selectArray: [{
            "id": 0,
            "text": "全部活动"
        }],
        activityCount: 0,
        tikect: 0,
        activityArray: [],
        selectList:
        {
            name: '全部活动',
            arr: ['全部', '已取消', '已结束', '上架中', '已下架', '草稿'],
            isShow: 0,
            boxWidth: 690
        },
        identifyLoginShow: 0
    },
    onLoad: function () {
        // wx.hideTabBar()

        this.showActivity()
        this.loginOrNot()
    },
    getPersonalMessage() {
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
                          "nickName": wxUserInfo.nickName,
                          "headPitcher": wxUserInfo.avatarUrl,
                          "jsCode": result.code,
                          "role": 1,
                          "mid": wx.getStorageSync('id')
                        }
                        console.log(obj)
                        request.addTeamMembers(obj)
                          .then(res => {
                            console.log(res)
                          })
                      }
                    })
      
                  },
                  fail: res => {
                    wx.showErrorModal('您拒绝了请求')
                    return;
                  }
                })
              } else if (res.cancel) {
                that.showErrorModal('您拒绝了请求')
                return;
              }
            }
          })
    },
    loginOrNot() {
        if(wx.getStorageSync('token') == '') {
            wx.hideTabBar()
            this.setData({
                identifyLoginShow: 1
            })
        }
    },
    addActivity() {
        wx.navigateTo({
            url: '../../pages/activityPage/publish/enterMessage/enterMessage'
        })
    },
    switchData(data1, data2) {
        data1.map((item, index) => {
            item.color = data2[index].status
            switch (item.status) {
                case -3:
                    item.status = '已取消'
                    break
                case -2:
                    item.status = '已结束'
                    break
                case 1:
                    item.status = '上架中',
                        this.data.tikect++
                    break
                case -1:
                    item.status = '已下架'
                    break
                case 2:
                    item.status = '草稿'
                    break
                default:
                    break
            }
        })
        this.setData({
            tikect: this.data.tikect
        })
        return data1
    },
    showActivityByStatus(e) {
        let obj = {
            mId: wx.getStorageSync('id'),
            status: e.detail.type
        }
        request.showActivityByStatus(obj)
            .then(res => {
                let data = JSON.parse(JSON.stringify(res.data))
                data = this.switchData(data, res.data)
                this.setData({
                    activityArray: data
                })
            })
    },
    showActivity() {
        let obj = {
            mId: parseInt(wx.getStorageSync('id'))
        }
        request.showActMessage(obj)
            .then(res => {
                let data = JSON.parse(JSON.stringify(res.data))
                data = this.switchData(data, res.data)
                this.setData({
                    activityArray: data,
                    activityCount: data.length
                })
            })
    },

})