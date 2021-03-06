// pages/loginPage/register/register.js
const request = require('../../../request/api')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topBar: {
      title: '申请入驻',
      isOne: 0
    },
    registerArray: [
      {
        name: '企业/组织全称',
        value: '',
        paleceholder: '请输入组织名称'
      },
      {
        name: '负责人名字',
        value: '',
        paleceholder: '请输入名字'
      },
      {
        name: '负责人手机号',
        value: '',
        paleceholder: '请输入手机号'
      },
      {
        name: '活动类型',
        value: '',
        paleceholder: '请输入主要组织活动的类型'
      },
      {
        name: '运营平台',
        value: '',
        paleceholder: '请输入活动的主要运营平台'
      }
    ],
    name: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  register() {
    wx.login({
      timeout: 10000,
      success: (result) => {
        let data = this.data.registerArray
        let obj = {
          merchantCompany: data[0].value,
          merchantName: data[1].value,
          phone: data[2].value,
          activityType: data[3].value,
          platform: data[4].value,
          jsCode: result.code
        }
        request.register(obj)
        .then(res => {
          wx.navigateTo({
            url: '../login/login'
          })
          wx.showToast({
            title: '注册成功',
            icon: 'success',
            duration: 1500
          })
        })
      }
    })
    


  },
  inputFunc(e) {
    let data = this.data.registerArray
    data[e.target.dataset.num].value = e.detail.value
    this.setData({
      registerArray: data
    })
  }
})