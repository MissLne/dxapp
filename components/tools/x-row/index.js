// components/hor-line-view/hor-line-view.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    height: {
      type: String,
      value: '45px',
      optionalTypes: [Number]
    },
    width: {
      type: String,
      value: '',
      optionalTypes: [Number]
    },
    shadow:{
      type: Boolean,
      value: false
    },
    radius: { // 是否圆角
      type: String,
      value: "rect"
    },
    margin: { // 是否圆角
      type: String,
      value: "4px 0px"
    },
    leftIcon:{
      type:String,
      value: ''
    },
    label:{
      type: String,
      value: ''
    },
    signText:{ // 中间提示文字，当redPoint存在时，背景为红色
      type:String,
      value:''
    },
    redPoint:{
      type: Boolean,
      value: false
    },
    rightIcon:{
      type: String,
      value: ''
    },
    target: { // 默认 是打开对应页面，传入对应路径即可 或者 ‘_contact’ 打开客服页面 或者传入操作函数
      type: String,
      optionalTypes: [Function],
      value: ''
    },
    info: {
      type: String,
      value: '',
      optionalTypes: [Number, Boolean],
    }
  },
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的初始数据
   */
  data: {
    showSign:true
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 点击事件
     * 1.跳转路径
     * 2.打开客服页面
     * 3.执行传入的函数
     */
    _click(){
      let that = this;
      if (that.data.target === '_contact') {
        return;
      } else if (that.data.target){
        wx.navigateTo({
          url: that.data.target,
        })
      }
      if(that.data.redPoint){
        that._hiddenSign();
      }
      that.triggerEvent('click', that.data.info);
    },
    /**
     * 长按事件
     */
    _longClick(){
      let that = this;
      that.triggerEvent('longClick', that.data.info);
    },
    /**
     * 
     */
    _hiddenSign(){
      let that = this;
      that.setData({
        showSign: false
      })
    }
  }
})
