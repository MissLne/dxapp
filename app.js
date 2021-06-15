// app.js
App({
  globalData: {
    showQuesCom: {
      id: -1,
      number: -1
    },
    userInfo: null,
    publishActivityData: {
      accountId: wx.getStorageSync('id').toString(),
      activityName: '随便',
      startTime: '2021-07-09 08:00:00',
      endTime: '2021-12-05 08:00:00',
      registrationDeadline: '2021-05-09 08:00:00',
      label: ['q'],
      lightSpot: 'q',
      address: 'q',
      posterImage: 'http://www.xinhuanet.com/photo/titlepic/112740/1127402419_1619875420580_title0h.jpg',
      activityDetails: '请输入内容...',
      announcement: 'q',
      linkmanCode: 'http://www.xinhuanet.com/photo/titlepic/112740/1127402419_1619875420580_title0h.jpg',
      groupCode: 'http://www.xinhuanet.com/photo/titlepic/112740/1127402419_1619875420580_title0h.jpg',
      ticketList: [
        {
          ticketType: 0,
          ticketName: 'q',
          ticketPrice: 0,
          ticketNumber: 100,
          ticketInstructions: 'q',
          ticketRefundType: 0
        }
      ],
      webFormList: [],
      linkGzh: 'default',
      videoUrl: 'default'
    },
    setUpCustomizeData: []
  },
  onLoad: function () {
    this.loadFont()
  },
  getRealHeight(rect) {
    let clientHeight = rect.height
    let clientWidth = rect.width
    let ratio = 750 / clientWidth
    let height = clientHeight * ratio
    return height
  },
  initWatch(_page) {
    if (!_page) {
      console.error('未检测到Page对象,请将当前page传入该函数');
      return false;
    }
    if (!_page.watch) { //判断是否有需要监听的字段
      console.error('未检测到Page.watch字段(如果不需要监听，请移除initWatch的调用片段)');
      return false;
    }
    let _dataKey = Object.keys(_page.data);
    Object.keys(_page.watch).map((_key) => { //遍历需要监听的字段
      _page.data['__' + _key] = _page.data[_key]; //存储监听的数据
      if (_dataKey.includes(_key)) { //如果该字段存在于Page.data中，说明合法
        Object.defineProperties(_page.data, {
          [_key]: { //被监听的字段
            enumerable: true,
            configurable: true,
            set: function(value) {
              let oldVal = this['__' + _key];
              if (value !== oldVal) { //如果新设置的值与原值不等，则触发监听函数
                setTimeout(function() { //为了同步,否则如果回调函数中有获取该字段值数据时将不同步,获取到的是旧值
                  _page.watch[_key].call(_page, oldVal, value); //设置监听函数的上下文对象为当前的Page对象并执行
                }.bind(this), 0)
              }
              this['__' + _key] = value;
            },
            get: function() {
              return this['__' + _key]
            }
          }
        })
      } else {
        console.error('监听的属性[' + _key + ']在Page.data中未找到，请检查~')
      }
    })
  },
  /**
    * 设置监听器
    */
  // setWatcher(page) {
  //   let data = page.data;
  //   let watch = page.watch;
  //   Object.keys(watch).forEach(v => {
  //     let key = v.split('.'); // 将watch中的属性以'.'切分成数组
  //     let nowData = data; // 将data赋值给nowData
  //     for (let i = 0; i < key.length - 1; i++) { // 遍历key数组的元素，除了最后一个！
  //       nowData = nowData[key[i]]; // 将nowData指向它的key属性对象
  //     }
  //     let lastKey = key[key.length - 1];
  //     // 假设key==='my.name',此时nowData===data['my']===data.my,lastKey==='name'
  //     let watchFun = watch[v].handler || watch[v]; // 兼容带handler和不带handler的两种写法
  //     let deep = watch[v].deep; // 若未设置deep,则为undefine
  //     this.observe(nowData, lastKey, watchFun, deep, page); // 监听nowData对象的lastKey
  //   })
  // },
  // /**
  // * 监听属性 并执行监听函数
  // */
  // observe(obj, key, watchFun, deep, page) {
  //   var val = obj[key];
  //   console.log(val)
  //   // 判断deep是true 且 val不能为空 且 typeof val==='object'（数组内数值变化也需要深度监听）
  //   if (deep && val != null && typeof val === 'object') {
  //     Object.keys(val).forEach(childKey => { // 遍历val对象下的每一个key
  //       this.observe(val, childKey, watchFun, deep, page); // 递归调用监听函数
  //     })
  //   }
  //   var that = this;
  //   Object.defineProperty(obj, key, {
  //     configurable: true,
  //     enumerable: true,
  //     set: function (value) {
  //       // 用page对象调用,改变函数内this指向,以便this.data访问data内的属性值
  //       watchFun.call(page, value, val); // value是新值，val是旧值
  //       val = value;
  //       if (deep) { // 若是深度监听,重新监听该对象，以便监听其属性。
  //         that.observe(obj, key, watchFun, deep, page);
  //       }
  //     },
  //     get: function () {
  //       return val;
  //     }
  //   })
  // },
  getSomgthingHeight() {
    let systemInfo = wx.getSystemInfoSync()
    let pxToRpxScale = 750 / systemInfo.windowWidth
    let ktxStatusHeight = systemInfo.statusBarHeight * pxToRpxScale
    let navigationHeight = 44 * pxToRpxScale
    let ktxWindowHeight = systemInfo.windowHeight * pxToRpxScale
    let ktxScreentHeight = systemInfo.screenHeight * pxToRpxScale
    let tabBarHeight = ktxScreentHeight - ktxStatusHeight - navigationHeight - ktxWindowHeight
    let viewHeight = ktxWindowHeight
    return { tabBarHeight, viewHeight }
  },
  loadFont() {
    console.log(1)
    if (wx.canIUse('loadFontFace')) {

      console.log("支持自定义字体");

      wx.loadFontFace({

        family: 'Ping Fang',
        //source: 'url("https://sungd.github.io/Pacifico.ttf")',
        source: 'url("https://image.tiaozaoj.com/PingFang-SC-Regular.ttf")',
        //source: 'url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/fonts/fontawesome-webfont.ttf")',
        global: true,
        success: function (res) {
          console.log("字体加载成功") //  loaded
          console.log(res)
        },
        fail: function (res) {
          console.log("字体加载失败") //  error
          console.log(res)
        },
        complete: function (res) {
          console.log("加载完成")
        }
      });
    } else {
      console.log('不支持自定义字体')
    }
  },

})
