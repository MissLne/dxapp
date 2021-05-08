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
        activityArray: []
    },
    onLoad: function () {
        this.showActivity()
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
                data.map((item,index) => {
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