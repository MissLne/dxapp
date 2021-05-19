//index.js
const app = getApp()
const request = require('../../request/api')
Page({
    data: {
        scrollviewHeight: app.getSomgthingHeight().viewHeight - 71,
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
        identifyLoginShow: 0,
        getTopHeight: 0,
        
            showList: [],//显示在页面上的数据
            hideList: [],//未显示在页面的数据
            pageSize: 5, // 每页条数
            ifPages: true //是否下滑的时候继续添加页面显示的数据
        
    },
    onLoad: function () {
        this.getHeight()

    },

    onShow: function () {
        this.showActivity()
        this.loginOrNot()
    },
    lalal() {
        let { showList, hideList, pageSize, ifPages,activityArray } = this.data
        if (ifPages) {
            let newList = [];
            if (hideList.length > pageSize) {//如果未显示的数据 大于显示条数 截取添加
                newList = activityArray.concat(hideList.splice(0, pageSize));
            } else { //如果不大于 那就直接全部添加
                newList = activityArray.concat(hideList)
                this.setData({
                    ifPages: false,
                    hideList: []
                })
            }
            this.setData({
                activityArray: newList,
                hideList
            })
        }
    },
    getHeight() {
        let query = wx.createSelectorQuery().in(this)
        query.select('.top-nav').boundingClientRect(rect => {
            let clientHeight = rect.height
            let clientWidth = rect.width
            let ratio = 750 / clientWidth
            let height = clientHeight * ratio
            console.log(height)
            this.setData({
                scrollviewHeight: app.getSomgthingHeight().viewHeight - height
            })
        }).exec();
    },
    getTopHeight(e) {
        this.getHeight()
        // this.setData({
        //     getTopHeight: e.detail.height,
        //     scrollviewHeight: app.getSomgthingHeight().viewHeight - e.detail.height - 13
        // })
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
                            if (wx.getStorageSync('id')) {
                                console.log(1)
                                wx.navigateTo({
                                    url: '../../pages/teamManage/teamList/teamList'
                                })
                            } else {
                                wx.navigateTo({
                                    url: '../../pages/loginPage/login/login'
                                })
                            }
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
        if (wx.getStorageSync('token') == '') {
            wx.hideTabBar()
            this.setData({
                identifyLoginShow: 1
            })
        } else {
            wx.showTabBar()
            this.setData({
                identifyLoginShow: 0
            })
        }
    },
    addActivity() {
        wx.navigateTo({
            url: '../../pages/activityPage/publish/enterMessage/enterMessage'
        })
    },
    switchData(data1, data2) {
        let ticket = 0
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
                        ticket++
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
            tikect: ticket
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
                data.sort((a, b) => b.startTime.localeCompare(a.startTime))
                let  hideList  = data
                let { pageSize } = this.data;
                if (hideList.length > pageSize) { //如果数据大于页面显示条数 那就先赋值条数，然后再通过滑动的时候再加数据
                    this.setData({
                        showList: hideList.splice(0, pageSize)
                    })
                } else { //如果数据小于显示条数 直接赋值 且不会再分页
                    this.setData({
                        showList: hideList,
                        ifPages: false
                    })
                }
                this.setData({
                    activityArray: this.data.showList,
                    hideList: hideList,
                    activityCount: data.length
                })
            })
    },

})