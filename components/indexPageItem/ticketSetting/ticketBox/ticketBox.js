// components/indexPageItem/ticketSetting/ticketBox/ticketBox.js
// const  s = require('../../../../toolFunc/index')
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    ticketDetail: {
      type: Array
    },
    base: Object,
    ifRedArr: Array
  },

  /**
   * 组件的初始数据
   */
  data: {
    defaultArray: [
      {
        ticketName: '',
        ticketPrice: '',
        ticketNumber: '',
        ticketInstructions: '',
        ticketRefundType: 0
      }
    ],
    popUpObj: {
      content: '确认删除该自定义模块？',
      leftBtn: '确认',
      rightBtn: '取消',
      show: 0,
      toPopUPData: 0
    },
  },

  /**
   * 组件的方法列表
   */
  ready: function() {
    console.log(this.properties.base)
  },

  methods: {
    updateInput(e) {
      if (e.currentTarget.dataset.name == 'ticketPrice') {
        e.detail.value = e.detail.value.replace(/[^\d.]/g, "");//清除"数字"和"."以外的字符
        e.detail.value = e.detail.value.replace(/^\./g, "");//验证第一个字符是数字而不是字符
        e.detail.value = e.detail.value.replace(/\.{2,}/g, ".");//只保留第一个.清除多余的
        e.detail.value = e.detail.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
        e.detail.value = e.detail.value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3')
      } else if (e.currentTarget.dataset.name == 'ticketNumber'){
        e.detail.value = e.detail.value.replace(/[^\d]/g, "");//清除"数字"和"."以外的字符
      }
      let arr = this.properties.ticketDetail
      arr[e.currentTarget.dataset.num][`${e.currentTarget.dataset.name}`] = e.detail.value
      if (e.currentTarget.dataset.name == 'ticketPrice') {
        e.detail.value == 0 ? arr[e.currentTarget.dataset.num].ticketType = 0 : arr[e.currentTarget.dataset.num].ticketType = 1
      }

      this.setData({
        ticketDetail: arr
      })
      this.triggerEvent('ticket', { arr: this.data.ticketDetail })
      console.log(app.globalData.publishActivityData)
    },
    getInput(e) {
      let arr = this.properties.ticketDetail
      arr[e.currentTarget.dataset.num].ticketInstructions = e.detail.str
      this.setData({
        ticketDetail: arr
      })
      this.triggerEvent('ticket', { arr: this.data.ticketDetail })
    },
    getType(e) {
      let arr = this.properties.ticketDetail
      arr[e.currentTarget.dataset.num].ticketRefundType = e.detail.type
      this.setData({
        ticketDetail: arr
      })
      this.triggerEvent('ticket', { arr: this.data.ticketDetail })
    },
    deleteTicket(e) {
      let arr = this.properties.ticketDetail[e.currentTarget.dataset.num]
      let count = 0
      for (let item in arr) {
        arr[item] == "" || arr[item] == 0 ? count++ : count
      }
      if (count == 4) {
        this.properties.ticketDetail.splice(e.currentTarget.dataset.num, 1)
        this.setData({
          ticketDetail: this.properties.ticketDetail
        })
        let scrollTop = this.properties.base.scrollTop
        wx.pageScrollTo({
          scrollTop: scrollTop - 430,
          duration: 300
        })
        this.triggerEvent('ticket', { arr: this.data.ticketDetail })
        return
      }
      this.data.popUpObj.show = 1
      this.data.popUpObj.toPopUPData = e.currentTarget.dataset.num
      this.setData({
        popUpObj: this.data.popUpObj
      })
    },
    suredelete() {
      app.globalData.publishActivityData.ticketList.splice(this.properties.popUpObj.toPopUPData, 1)
      this.setData({
        ticketDetail: app.globalData.publishActivityData.ticketList
      })
      let scrollTop = this.properties.base.scrollTop
      wx.pageScrollTo({
        scrollTop: scrollTop - 430,
        duration: 300
      })
      this.triggerEvent('ticket', { arr: this.data.ticketDetail })
    },
  }
})
