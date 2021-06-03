
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    materialObject: {
      type: Object,
      observer: function (newVal, oldVal) {
        this.setData({
          materialObject: newVal
        })
      }
    }

  },
  /**
   * 组件的初始数据
   */
  data: {
    socialArray: [
      {
        name: '今日热度'
      },
      {
        name: '未回答问题'
      },
      {
        name: '评论'
      }
    ],
    setUpArray: [
      {
        name: '总报名人数'
      },
      {
        name: '总票款'
      }
    ],
    progresses: [
    ],
    color: ['#7295C7','#D0BEDA','#BEA4CB','#EF8374','#E586A5'],
    isShow: 0
  },
  attached: function() {
    // this.data.progresses.map((item,index) => {
    //   item.color = this.data.color[index]
    // })
    // this.setData({
    //   progresses: this.data.progresses
    // })
  },
  /**
   * 组件的方法列表
   */
  ready: function () {
    this.getMaterialMessage()
    this.getSetUpMessage()
  },
  methods: {
    showDetail() {
      this.setData({
        isShow: !this.data.isShow
      })
    },
    getMaterialMessage() {
      console.log(this.properties.materialObject)
      let dataArr = this.data.socialArray
      let data = this.properties.materialObject
      let arr = [data.todayClickRate, data.waitReply, data.commentCount]
      for (let i = 0; i < arr.length; i++) {
        dataArr[i].value = arr[i]
      }
      this.setData({
        socialArray: dataArr
      })
    },
    getSetUpMessage() {
      let dataArr = this.data.setUpArray
      let data = this.properties.materialObject
      data.totalPrice == null ? data.totalPrice = 0 .toFixed(2) : data.totalPrice
      let arr = [data.registryNumber, data.totalPrice.toFixed(2)]
      for (let i = 0; i < arr.length; i++) {
        dataArr[i].value = arr[i]
      }
      data.tickets.map((item,index) => {
        item.color = this.data.color[index]
      })
      this.setData({
        setUpArray: dataArr,
        progresses: data.tickets
      })
      console.log(this.data.setUpArray)
    }
  }
})
