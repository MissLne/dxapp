// components/indexPageItem/ticketSetting/ticketBox/ticketBox.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    ticketDetail: Array
  },

  /**
   * 组件的初始数据
   */
  data: {
    defaultArray: [
      {
        ticketName: '输入票种名',
        price: '输入0即为免费票',
        count: '输入0即为不限数目',
        introduce: '请用一句话介绍此票种',
        bounce: 0
      }
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
  }
})
