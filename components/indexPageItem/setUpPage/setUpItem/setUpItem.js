// components/indexPageItem/setUpPage/setUpItem/setUpItem.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    setUpItem: Array
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
    checkBox: []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    addChoice() {
      this.data.checkBox.push('')
      this.setData({
        checkBox: this.data.checkBox
      })
    },
    radioChange(e) {
      this.properties.setUpItem[e.currentTarget.dataset.num].isOptional = e.detail.type
      this.setData({
        setUpItem: this.properties.setUpItem
      })
      this.triggerEvent('setup',{arr: this.properties.setUpItem})
    },
    changeInput(e) {
      let data = this.properties.setUpItem[e.currentTarget.dataset.num][`${e.currentTarget.dataset.str}`]
      Object.prototype.toString.call(data) === '[object Array]'? data = [e.detail.value] : data = e.detail.value
      this.properties.setUpItem[e.currentTarget.dataset.num][`${e.currentTarget.dataset.str}`] = data
      this.setData({
        setUpItem: this.properties.setUpItem
      })
      this.triggerEvent('setup',{arr: this.properties.setUpItem})
    },
    checkChange(e) {
      console.log(e.detail.type)
      if(e.detail.type == 0) {
        this.properties.setUpItem[e.currentTarget.dataset.num].propertyType = 3
      this.setData({
        setUpItem: this.properties.setUpItem
      })
      }
    },
    changeSonInput(e) {
      this.data.checkBox[e.currentTarget.dataset.inputindex] = e.detail.value
      this.properties.setUpItem[e.currentTarget.dataset.boxindex].content = this.data.checkBox
      this.setData({
        setUpItem: this.properties.setUpItem
      })
      this.triggerEvent('setup',{arr: this.properties.setUpItem})
    },
    deleteInput(e) {
      this.data.checkBox.splice(e.currentTarget.dataset.inputindex,1)
      this.properties.setUpItem[e.currentTarget.dataset.boxindex].content = this.data.checkBox
      this.setData({
        setUpItem: this.properties.setUpItem
      })
      this.triggerEvent('setup',{arr: this.properties.setUpItem})
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
      this.triggerEvent('setupdelete',{obj: obj})
    }
  }
})
