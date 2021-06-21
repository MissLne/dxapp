// components/indexPageItem/setUpPage/setUpItem/setUpItem.js
// const o = require('')
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    setUpItem: Array,
    pickMessage: Object
  },

  /**
   * 组件的初始数据
   */
  data: {
    // setUpItem: app.globalData.setUpCustomizeData,/
    defaultArray: [
      {
        title: '默认项',
        name: '请输入姓名',
        sex: 0,
        phone: '请输入联系方式',
        school: '例：广东工业大学'
      }
    ],
    checkBox: [],
    boxHeight: [],
    justNum: -1,
    justNum1: -1,
    temBox: [],
    aNum: -1,
    aaNum: -1,
    // lianxi: '例：联系方式',
    // laiyuan: '例：你了解到报名的来源',
    // tips: '例：请输入联系方式',
    // jizan: '例：朋友圈集赞图片',
    gzh: '例：公众号'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    inputFocus1(e) {
      let temArr = []
      let first = e.currentTarget.dataset.num
      temArr[0] = this.properties.setUpItem[e.currentTarget.dataset.num]
      this.properties.setUpItem.map((item, index) => {
        if (index != e.currentTarget.dataset.num)
          temArr.push(item)
      })
      console.log(temArr,'呜呜呜')
      // setTimeout(() => {
      if(e.currentTarget.dataset.str && e.currentTarget.dataset.str == 'property') {
        temArr[0].laiyuan = ''
        this.setData({
          setUpItem: temArr,
          aNum: -1
        })
        setTimeout(() => {
          this.setData({
            aaNum: 0
          })
        },300)
        wx.pageScrollTo({
          scrollTop: 0
        })
        return
      }
      if(e.currentTarget.dataset.inputindex) {
        temArr[0].content[e.currentTarget.dataset.inputindex - 1] = ''
        this.setData({
          setUpItem: temArr,
          aaNum: -1
        })
        setTimeout(() => {
          this.setData({
            aNum: e.currentTarget.dataset.inputindex - 1
          })
        },200)
      }
      if(first != 0){
        
        wx.pageScrollTo({
          scrollTop: 0
        })
      }
    },
    inputFocus(e) {
      // console.log(e)
      // this.setData({
      //   // setUpItem: temArr,
      //   justNum: e.currentTarget.dataset.num,
      //   justNum1: -1,
      //   aNum: -1
      // })
      let temArr = []
      temArr[0] = this.properties.setUpItem[e.currentTarget.dataset.num]
      
      this.properties.setUpItem.map((item, index) => {
        if (index != e.currentTarget.dataset.num)
          temArr.push(item)
      })
      console.log(temArr,'呜呜呜')
      // setTimeout(() => {
      if(e.currentTarget.dataset.identify == 0) {
        this.setData({
          justNum1: -1,
          setUpItem: temArr
        })
        setTimeout(() => {
          this.setData({
            justNum: 0
          })
        },250)
      } else if(e.currentTarget.dataset.identify == 1){
        temArr[0].tips = ''
        this.setData({
          setUpItem: temArr,
          justNum: -1
        })
        setTimeout(() => {
          this.setData({
            justNum1: 0
          })
        },250)
      } else {
        temArr[0].jizan = ''
        this.setData({
          setUpItem: temArr
          // justNum1: -1,
          // aNum: -1
        })
        setTimeout(() => {
          this.setData({
            justNum: 0
          })
        },250)
      }
      
      // }, 1000)
      console.log(temArr,this.data.justNum,'哈哈哈哈')
      wx.pageScrollTo({
        scrollTop: 0
        //   duration: 300
      })
      // wx.createSelectorQuery().in(this).select('.lala0').boundingClientRect(function (rect) {
      //   // wx.pageScrollTo({
      //   //   scrollTop: scrollTop + rect.top,
      //   //   duration: 300
      //   // })
      //   console.log(rect)
      // }).exec()
      // const query = wx.createSelectorQuery().in(this)                // 创建节点查询器 query
      // query.select('#diyclass0').boundingClientRect()    // 这段代码的意思是选择Id=productServe的节点，获取节点位置信息的查询请求
      // // query.select('#enterpriseServe').boundingClientRect() // 这段代码的意思是选择Id=enterpriseServe的节点，获取节点位置信息的查询请求
      // // query.select('#normalServe').boundingClientRect()     // 这段代码的意思是选择Id=normalServe的节点，获取节点位置信息的查询请求
      // // query.selectViewport().scrollOffset()                 // 这段代码的意思是获取页面滑动位置的查询请求
      // query.exec((res) => {
      //   console.log(res)                                          // #productServe节点的到页面顶部的距离
      //   // res[1].width                                        // #enterpriseServe节点的宽度
      //   // res[2].height                                       // #normalServe节点的高度
      // })
    },
    addChoice(e) {
      this.setData({
        justNum: -1,
        justNum1: -1,
        aNum: -1
      })
      let _this = this
      let tArr = this.properties.setUpItem
      console.log(e.currentTarget.dataset.item, this.properties.setUpItem)
      tArr[e.currentTarget.dataset.item].content.push('')
      console.log(tArr)
      this.setData({
        setUpItem: tArr
      })
      wx.createSelectorQuery().in(this).selectAll('.diySelectBox').boundingClientRect(function (rect) {
        console.log(rect)
        _this.data.boxHeight = []
        rect.map(item => {
          _this.data.boxHeight.push((item.height * 2))
        })
        _this.setData({
          boxHeight: _this.data.boxHeight
        })
        console.log(_this.data.boxHeight)
      }).exec()
    },
    radioChange(e) {
      this.properties.setUpItem[e.currentTarget.dataset.num].isOptional = e.detail.type
      this.setData({
        setUpItem: this.properties.setUpItem
      })
      this.triggerEvent('setup', { arr: this.properties.setUpItem })
    },
    changeInput(e) {
      let data = this.properties.setUpItem[e.currentTarget.dataset.num][`${e.currentTarget.dataset.str}`]
      Object.prototype.toString.call(data) === '[object Array]' ? data = [e.detail.value] : data = e.detail.value
      this.properties.setUpItem[e.currentTarget.dataset.num][`${e.currentTarget.dataset.str}`] = data
      this.setData({
        setUpItem: this.properties.setUpItem
      })
      this.triggerEvent('setup', { arr: this.properties.setUpItem })
    },
    checkChange(e) {
      if (e.detail.type == 0) {
        this.properties.setUpItem[e.currentTarget.dataset.num].propertyType = 3
        this.setData({
          setUpItem: this.properties.setUpItem
        })
      }
    },
    changeSonInput(e) {
      // this.data.checkBox[e.currentTarget.dataset.inputindex] = e.detail.value
      this.properties.setUpItem[e.currentTarget.dataset.boxindex].content[e.currentTarget.dataset.inputindex] = e.detail.value
      this.setData({
        setUpItem: this.properties.setUpItem
      })
      this.triggerEvent('setup', { arr: this.properties.setUpItem })
    },
    deleteInput(e) {
      let _this = this
      this.properties.setUpItem[e.currentTarget.dataset.boxindex].content.splice(e.currentTarget.dataset.inputindex, 1)
      // console.log(this.data.checkBox)
      // this.properties.setUpItem[e.currentTarget.dataset.boxindex].content = this.data.checkBox
      console.log(this.properties.setUpItem)
      this.setData({
        setUpItem: this.properties.setUpItem
      })
      this.triggerEvent('setup', { arr: this.properties.setUpItem })
      wx.createSelectorQuery().in(this).selectAll('.diySelectBox').boundingClientRect(function (rect) {
        _this.data.boxHeight = []
        rect.map(item => {

          console.log(item)

          _this.data.boxHeight.push((item.height * 2))
        })
        _this.setData({
          boxHeight: _this.data.boxHeight
        })
        console.log(_this.data.boxHeight)
      }).exec()
    }
    ,
    deleteBox(e) {
      // this.properties.setUpItem.splice(e.currentTarget.dataset.num,1)
      // this.setData({
      //   setUpItem: this.properties.setUpItem
      // })
      let obj = {
        arr: this.properties.setUpItem,
        show: 1,
        deleteIndex: e.currentTarget.dataset
      }
      this.triggerEvent('setupdelete', { obj: obj })
      wx.createSelectorQuery().in(this).selectAll('.diySelectBox').boundingClientRect(function (rect) {
        _this.data.boxHeight = []
        rect.map(item => {

          console.log(item)

          _this.data.boxHeight.push((item.height * 2))
        })
        _this.setData({
          boxHeight: _this.data.boxHeight
        })
        console.log(_this.data.boxHeight)
      }).exec()
    },
    pickValue(e) {
      this.setData({
        justNum: -1,
        justNum1: -1,
        aNum: -1
      })
      let _this = this
      let scrollTop = this.properties.pickMessage.scrollTop
      wx.createSelectorQuery().in(this).select('.pickBtnContent').boundingClientRect(function (rect) {
        wx.pageScrollTo({
          scrollTop: scrollTop + rect.top,
          duration: 300
        })
      }).exec()
      // wx.pageScrollTo({
      //   scrollTop: scrollTop + 300,
      //   duration: 300
      // })
      this.triggerEvent('pick', { value: e.detail.value })
      wx.createSelectorQuery().in(this).selectAll('.diySelectBox').boundingClientRect(function (rect) {
        _this.data.boxHeight = []
        rect.map(item => {

          console.log(item)

          _this.data.boxHeight.push((item.height * 2))
        })
        _this.setData({
          boxHeight: _this.data.boxHeight
        })
        console.log(_this.data.boxHeight)
      }).exec()
    }
  }
})
