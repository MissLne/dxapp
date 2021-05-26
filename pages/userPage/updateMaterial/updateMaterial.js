// pages/userPage/updateMaterial/updateMaterial.js
const request = require('../../../request/api')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topBar: {
      title: '修改资料',
      isOne: 0
    },
    messageArray: [],
    avaterUrl: '',
    userMessageObject: {},
    showBubble: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMessageArr()
    this.updateUrl()

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
    console.log(1)
    let obj = {
      "id": wx.getStorageSync('id'),
      "nickName": this.data.messageArray[0] ? this.data.messageArray[0].value : this.data.userMessageObject.nickName,
      "phone": this.data.messageArray[1] ? this.data.messageArray[1].value : this.data.userMessageObject.phone,
      "introduction": this.data.messageArray[2] ? this.data.messageArray[2].value : this.data.userMessageObject.introduction,
      "imgShowUrl": this.data.avaterUrl
    }
    if (this.data.messageArray[1]) {
      if (!(/^1(?:3\d|4[4-9]|5[0-35-9]|6[67]|7[013-8]|8\d|9\d)\d{8}$/.test(this.data.messageArray[1].value))) {
        this.setData({
          showBubble: 1
        })
        setTimeout(() => {
          this.setData({
            showBubble: 0
          })
        }, 3000)
      } else {
        request.updateUserMessage(obj)
          .then(() => {
            wx.switchTab({
              url: '/pages/userPage/user/user'
            })
          })
      }
    }
  },
  getMessageArr(e) {
    if(e != undefined) {
      this.setData({
        messageArray: e.detail.arr
      })
    }
  },
  updateUrl(e) {
    if(e != undefined) {
      this.setData({
        avaterUrl: e.detail.url
      })
    }
  }
})