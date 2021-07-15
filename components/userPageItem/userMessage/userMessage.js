// components/userPageItem/userMessage/userMessage.js
const request = require('../../../request/api')
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    
  },

  /**
   * 组件的初始数据
   */
  data: {
    userMessage: [
      {
        text: '组织名',
        value: '请填写组织名'
      },
      {
        text: '组织负责人电话',
        value: '请填写负责人手机号'
      },
      {
        text: '组织介绍',
        value: '请填写组织介绍'
      }
    ],
    userMessageObject: Object
  },

  /**
   * 组件的方法列表
   */
  ready: function () {
    this.showUserMaterial()
  },
  methods: {
    // eventHandle(e) {
    //   let arr = this.data.userMessage
    //   arr[e.currentTarget.dataset.num].value = ''
    //   this.setData({
    //     userMessage: arr
    //   })
    // },
    updateUrl(e) {
      this.triggerEvent('name', { arr: this.data.userMessage,url: e.detail.url })
    },
    showUserMaterial() {
      let obj = {
        id: wx.getStorageSync('id')
      }
      request.showUserMessge(obj)
        .then(res => {
          let arr1 = [res.data.nickName,res.data.phone,res.data.introduction]
          let arr2 = this.data.userMessage
          arr2.forEach((element,index) => {
            element.value = arr1[index]
          })
          this.setData({
            userMessage: arr2
          })
        })
    },
    getValue(e) {
      let arr = this.data.userMessage
      arr[e.currentTarget.dataset.num].value = e.detail.value
      this.setData({
        userMessage: arr
      })
      this.triggerEvent('name', { arr: this.data.userMessage })
    }
  }
})
