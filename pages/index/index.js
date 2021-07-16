//index.js
const app = getApp()
const request = require('../../request/api.js')
Page({
    data: {
        selectIndex: 0,
        popUpObj: {
            content: '请完善账号资料',
            leftBtn: '修改资料',
            rightBtn: '先看看',
            show: 0,
            toPopUPData: 0
        },
        topBar: {
            title: '活动列表',
            isOne: 1
        },
        topBarMargin: (wx.getMenuButtonBoundingClientRect().top) * 2,
        topBarHeight: (wx.getMenuButtonBoundingClientRect().height) * 2 + 15,
        scrollviewHeight: app.getSomgthingHeight().viewHeight - 71 - (wx.getMenuButtonBoundingClientRect().top) * 2 - (wx.getMenuButtonBoundingClientRect().height) * 2 + 15,
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
        pageSize: 10, // 每页条数
        ifPages: true, //是否下滑的时候继续添加页面显示的数据
        isLazy: 1,
        isByStatus: 0,
        firstLoad: 1

    },
    onLoad: function () {
        if (wx.getStorageSync('token') != '') {
            wx.showLoading({
                title: "正在加载中",
                mask: true,
            })
        }

        this.getHeight()

        this.showActivity()

        request.showUserMessge({ id: wx.getStorageSync('id') })
            .then(res => {
                console.log(res.data)
                for (let key in res.data) {
                    if (res.data[key] == "") {
                        this.setData({})
                    }
                }
            })
    },

    onShow: function () {
        // this.loginOrNot()
        this.getHeight()
        if (!this.data.isByStatus || this.data.firstLoad) {
            this.showActivity()
            this.setData({
                firstLoad: 0
            })
        }
        let { selectList } = this.data
        selectList.name = '全部活动' 
        if(app.globalData.isLogin) {
            this.showActivity()
            this.setData({
                selectList,
                selectIndex: 0
            })
            app.globalData.isLogin = 0
        }
        this.setData({
            identifyLoginShow: 0
            // selectIndex: 0
        })
    },
    bianji() {
        this.data.popUpObj.show = 0
        this.setData({
            popUpObj: this.data.popUpObj
        })
        wx.navigateTo({
            url: '/pages/userPage/updateMaterial/updateMaterial'
        })
    },
    close() {
        this.data.popUpObj.show = 0
        this.setData({
            popUpObj: this.data.popUpObj
        })
    },
    lalal() {
        console.log(1)
        // if (this.data.isLazy) {
        let { showList, hideList, pageSize, ifPages, activityArray } = this.data
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
        // }
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
                scrollviewHeight: app.getSomgthingHeight().viewHeight - height - this.data.topBarMargin - this.data.topBarHeight
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
        if (wx.getStorageSync('token') == '') {
            // wx.hideTabBar()  
            this.setData({
                identifyLoginShow: 1
            })
        } else {
            // wx.showTabBar()
            this.setData({
                identifyLoginShow: 0
            })
            wx.navigateTo({
                url: '../../pages/activityPage/publish/enterMessage/enterMessage'
            })
            
        }
    },
    hideIdentify() {
        // wx.showTabBar()
        this.setData({
            identifyLoginShow: 0
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
                    item.status = '上架中'
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
        this.setData({
            ifPages: true
        })
        let obj = {
            mId: wx.getStorageSync('id'),
            status: e.detail.type
        }
        console.log(obj.status)
        // if (e.detail.type == 0) {
        //     this.setData({
        //         isLazy: 1
        //     })
        //     console.log(this.data.isLazy,'----')
        //     this.showActivity()
        //     return
        // }
        // console.log('ouo')
        request.showActivityByStatus(obj)
            .then(res => {
                let data = JSON.parse(JSON.stringify(res.data))
                data = this.switchData(data, res.data)
                data.sort((a, b) => b.startTime.localeCompare(a.startTime))
                let hideList = data
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
                    activityArray: this.data.showList,
                    hideList: hideList,
                    isByStatus: 1
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
                let hideList = data
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
                wx.hideLoading()
            })
    },

})