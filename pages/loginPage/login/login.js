const request = require('../../../request/api')
let app =  getApp();

Page({
    data: {
        topBarMargin: (wx.getMenuButtonBoundingClientRect().top) * 2,
        topBarHeight: (wx.getMenuButtonBoundingClientRect().height) * 2 + 15,
        account: '',
        password: ''
    },
    handleLogin() {
        console.log('点击登录')
        wx.login({
            success: res => {
                let obj = {
                    account: this.data.account,
                    password: this.data.password,
                    jsCode: res.code
                }
                request.userLogin(obj)
                    .then(res => {
                        console.log('登录成功')
                        let data = res.data
                        wx.setStorageSync('token', data.token)
                        wx.setStorageSync('id', data.mid)
                        wx.switchTab({
                            url: '/pages/index/index'
                        })
                        wx.showToast({
                            title: '登录成功',
                            icon: 'success',
                            duration: 1000,
                            mask: true
                        })
                        app.globalData.isLogin = 1
                    })
            }
        })
    },
    accountEdit: function (e) {
        let value = e.detail.value
        this.setData({
            account: value
        })
    },
    passwordEdit: function (e) {
        let value = e.detail.value
        this.setData({
            password: value
        })
    }
})