//index.js
const app = getApp()
const request = require('../../request/api')
Page({
    data: {
        selectArray: [{
            "id": 0,
            "text": "全部活动"
        }],
        activityCount: 3,
        tikect: 2,
        activityArray: [],
        selectList:
        {
            name: '全部活动',
            arr: ['全部', '已取消','暂停报名','上架中','已下架','草稿'],
            isShow: 0
        },
    },
    onLoad: function () {
        this.showActivity()
    },
    // showSelectList(e) {
    //     this.setData({
    //       showSelectListIndex: e.currentTarget.dataset.num
    //     })
    // },
    addActivity() {
        wx.navigateTo({
            url: '../../pages/activityPage/publish/enterMessage/enterMessage'
        })
    },
    showActivityByStatus(e) {
        let obj = {
            mId: wx.getStorageSync('id'),
            status: e.detail.type
        }
        request.showActivityByStatus(obj)
        .then(res => {
            console.log(res.data)
            this.setData({
                activityArray: res.data
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
                console.log(data)
                console.log(res)
                data.map((item, index) => {
                    item.color = res.data[index].status
                    switch (item.status) {
                        case -3:
                            item.status = '已取消'
                            break
                        case -2:
                            item.status = '暂停报名'
                            break
                        case 1:
                            item.status = '上架中'
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
                });
                this.setData({
                    activityArray: data,
                    activityCount: data.length
                })
            })
    },

})