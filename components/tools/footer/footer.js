// components/indexPageItem/publishIntroduce/footer/footer.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    contentObject: {
      type: Object
    },
    goPage: Object
  },
  externalClasses: ['parent-leftbtn','parent-footer'],
  /**
   * 组件的初始数据
   */
  data: {
    swiperCurrent: 0
  },
  /**
   * 组件的方法列表
   */
  methods: {
    goNext() {
      let obj = this.properties.contentObject.addActivity
      let newobj = {}
      for(let key in obj) {
        if(obj[key] == '' || !obj[key]) {
          newobj = obj[key]
        } else {
          let query = obj
          query = JSON.stringify(query)
          navigate.navigateTo({
            url: this.properties.contentObject.rightUrl,
            query
          })
        }
      }
      this.triggerEvent('next',{obj: newobj})
    }
  }
})
