// components/tools/dateBtn/dateBtn.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    time: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    
  },

  /**
   * 组件的方法列表
   */
  ready: function () {
    this.loadCurrentMonth()
  },
  methods: {
    loadCurrentMonth() {
      var myDate = new Date();
      var tYear = myDate.getFullYear()
      var tMonth = myDate.getMonth()

      var m = tMonth + 1;
      if (m.toString().length == 1) {
        m = "0" + m;
      }
      return tYear + '-' + m
    },
    pickerChange() {
      let currentTime = this.loadCurrentMonth()
      // if(this.properties.time == currentTime) {
      //   this.setData({
      //     time: '本月'
      //   })
      // }
      this.triggerEvent('datepicker',{time: this.properties.time})
    }
  }
})
