// components/userPageItem/userMessage/userMessage.js
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
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getValue(e) {
      let arr = this.data.userMessage
      arr[e.currentTarget.dataset.num].value = e.detail.value
      this.setData({
        userMessage: arr
      })
      this.triggerEvent('name',{arr: this.data.userMessage})
    }
  }
})
