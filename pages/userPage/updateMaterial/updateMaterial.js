// pages/userPage/updateMaterial/updateMaterial.js
const request = require('../../../request/api')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    messageArray: [],
    avaterUrl: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMessageArr()
  },
  updateMessage() {
    console.log(this.data.messageArray)
    console.log(this.data.avaterUrl)
    let obj = {
      "id": wx.getStorageSync('id'),
      "nickName": this.data.messageArray[0].value,
      "phone": this.data.messageArray[1].value,
      "introduction": this.data.messageArray[2].value,
      "imgShowUrl": this.data.avaterUrl
    }
    request.updateUserMessage(obj)
    .then(res => {
      console.log(res)
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