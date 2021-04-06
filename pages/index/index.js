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
  onLoad: function() {
    this.showActivity()
  },
  showActivity() {
    let obj = {
      mId: 34
    }
    request.showActMessage(obj)
    .then(res => {
      console.log(res)
      let data = res.data
      data.forEach(item => {
        switch (item.status) {
          case 1:
            item.status = '上架'
            break
          case -1:
            item.status = '下架'
            break
          case 2:
            item.status = '草稿'
            break
          default:
            break
        }
      });
      this.setData({
        activityArray : data,
        activityCount : data.length
      })
    })
  },
  
}) 
