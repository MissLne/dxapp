// pages/userPage/updateMaterial/updateMaterial.js
const request = require('../../../request/api')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    messageArray: [],
    avaterUrl: '',
    userMessageObject: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMessageArr(e)
    this.updateUrl(e)
    
  },

  showUserMaterial() {
    let obj = {
      id: wx.getStorageSync('id')
    }
    request.showUserMessge(obj)
      .then(res => {
        this.setData({
          userMessageObject: res.data
        })
      })
  },
  updateMessage() {
    let obj = {
      "id": wx.getStorageSync('id'),
      "nickName": this.data.messageArray[0]? this.data.messageArray[0].value : this.data.userMessageObject.nickName,
      "phone": this.data.messageArray[1]? this.data.messageArray[1].value : this.data.userMessageObject.phone,
      "introduction": this.data.messageArray[2]? this.data.messageArray[2].value : this.data.userMessageObject.introduction,
      "imgShowUrl": this.data.avaterUrl
    }
    request.updateUserMessage(obj)
    .then(() => {
      wx.switchTab({
        url: '/pages/userPage/user/user'
      })
    })
  },
  getMessageArr(e) {
    this.setData({
      messageArray: e.detail.arr
    })
  },
  updateUrl(e) {
    this.setData({
      avaterUrl: e.detail.url
    })
  }
})