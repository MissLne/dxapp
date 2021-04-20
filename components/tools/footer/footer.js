// components/indexPageItem/publishIntroduce/footer/footer.js
const navigate = require('../../../navigator/index')
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
  externalClasses: ['parent-leftbtn', 'parent-footer'],
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
      let obj = this.properties.contentObject.addActivity,
        newobj = {},
        count = 0
      console.log(11)
      for (let key in obj) {
        if (obj[key] !== '' && obj[key]) {
          newobj[key] = obj[key]
          count++
        }
      }
      console.log(count)
      if (count === this.properties.contentObject.number) {
        let query = obj
        console.log(query)
        for (let key in query) {
            query[key] = JSON.stringify(query[key])
        }
        navigate.navigateTo({
          url: this.properties.contentObject.rightUrl,
          query
        })
      }
      this.triggerEvent('next', { obj: newobj })
    }
  }
})
