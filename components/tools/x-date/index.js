// components/aydk_date_ymdhm/aydk_date_ymdhm.js
const MAX_REGION_YEAR = 50;// 默认年的区间是当前时间的开始和结束50年
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // isAfter:{ // 是否允许选择当前日期之后的日期 之后优化再做，谁有兴趣可以优化一下
    //   type:Boolean,
    //   value: false
    // },
    hasClass: Boolean,
    date:{
      type: String,
      // optionalTypes: [Number],
      value: '选择日期'
    },
    initDate:{ //初始化时间,格式是string，可以被new Date(param) 初始化的时间
      type:String,
      value: new Date().getTime()
    },
    key:{ // 默认需要标识这个组件的值，可以是字符串，数字，对象，数组
      type: String,
      optionalTypes: [Number,Object,Array],
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    showDatePick: false,
    currentDate: [0,0,0,0,0],
    yearList: [],
    monthList: [],
    dateList: [],
    hourList: [], //代码初始化
    minusList: [] // 代码初始化
  },
  externalClasses: ['parent-x-date'],
  //初始化写到挂载事件中，不能写到create钩子里
  attached() {
    let that = this;
    that._initCurrentDate();
    that._initHour();
    that._initMinus();
  },
  // 为了保证数据初始化完成
  ready() {
    let that = this;
    that.setData({
      currentDate: that.data.currentDate
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 函数调用，可选
     * @date 初始化时间，可选
     */
    showDate(date){
      let that = this;
      if(date) {
        this.initDate = date;
      }
      that._initCurrentDate();
      that.setData({
        showDatePick: true
      })
    },
    /**
     * 初始化开始时间
     */
    _initCurrentDate() {
      let that = this;
      let now = new Date(that.data.initDate);
      that.data.currentDate[1] = now.getMonth(); // 初始化月份
      that.data.currentDate[2] = now.getDate()-1; // 初始化天
      that.data.currentDate[3] = now.getHours(); // 初始化小时
      that.data.currentDate[4] = now.getMinutes(); // 初始化分钟
      that._initYear(now.getFullYear()); // 初始化年
      that._initMonth(); // 初始化月份
      that._initDate(now.getFullYear(), now.getMonth()+1); // 初始化天
    },
    /**
     * 初始化年滚动
     * 参数为当前年
     */
    _initYear(year) {
      let that = this;
      that.data.yearList = [];
      for (let orgion = 0; orgion < MAX_REGION_YEAR; orgion++){
        if(year-orgion>=1970){
          that.data.yearList.unshift(year-orgion);
        }
        that.data.yearList.push(orgion+year+1);// 当前年份已经push了
      }
      that.data.currentDate[0] = that.data.yearList.indexOf(year);
      that.setData({
        currentDate: that.data.currentDate,
        yearList: that.data.yearList
      })
    },
    _initMonth(){
      let that = this;
      that.setData({
        monthList:Array.from(Array(12), (v,k)=>(k+1))
      })
    },
    _initDate(year,month) {
      let that = this;
      that.setData({
        dateList: Array.from(Array(that._getMonthDays(year,month)), (v, k) => (k + 1))
      })
    },
    _initHour() {
      let that = this;
      that.setData({
        hourList: Array.from(Array(24), (v, k) => k)
      })
    },
    _initMinus() {
      let that = this;
      that.setData({
        minusList: Array.from(Array(60), (v, k) => k)
      })
    },
    _getMonthDays(year,month) {
      let that = this;
      // 优化算法，只有当月份是2月份的时候，才会动态加载
      if ([1, 3, 5, 7, 8, 10, 12].includes(month)) {
        return 31;
      } else if ([4, 6, 9, 11].includes(month)) {
        return 30;
      } else {
        return new Date(year, month,0).getDate();
      }
    },
    _bindChange(e){
      let that = this;
      if (e.detail.value[0] !== that.data.currentDate[0] || e.detail.value[1] !== that.data.currentDate[1]) {
        that._initDate(that.data.yearList[e.detail.value[0]], that.data.monthList[e.detail.value[1]]);
      }
      that.data.currentDate = e.detail.value;
    },
    _cancle(){
      let that = this;
      that.setData({
        showDatePick: false
      })
    },
    _confirm(){
      let that = this;
      let date = [that.data.yearList[that.data.currentDate[0]], that.data.monthList[that.data.currentDate[1]], that.data.dateList[that.data.currentDate[2]], that.data.hourList[that.data.currentDate[3]], that.data.minusList[that.data.currentDate[4]]];
      
      let temArr = []
      date.map(item=> {
        let a = -1
        if(`${item}`.length == 1) {
          a = `0${item}`
        }
        a == -1? temArr.push(item) : temArr.push(a)
      })
      that.setData({
        showDatePick: false,
        date: temArr[0] + '-' + temArr[1] + '-' + temArr[2] + ' ' + temArr[3] + ':' + temArr[4] + ':00'
      })
      that.triggerEvent('bindValue', {value: temArr[0] + '-' + temArr[1] + '-' + temArr[2] + ' ' + temArr[3] + ':' + temArr[4] + ':00'});
    },
    /**
     * 展示时间
     */
    showDate(){
      let that = this;
      that.setData({
        showDatePick: true
      })
      that._initCurrentDate();
    }
  }
})
