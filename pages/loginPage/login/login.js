const request = require('../../../request/api')

Page({
    data: {
        topBarMargin: (wx.getMenuButtonBoundingClientRect().top) * 2,
        topBarHeight: (wx.getMenuButtonBoundingClientRect().height) * 2 + 15,
        account: 'LCE',
        password: '123456'
    },
    handleLogin() {
        wx.login({
            success: res => {
                let obj = {
                    account: this.data.account,
                    password: this.data.password,
                    jsCode: res.code
                }
                request.userLogin(obj)
                    .then(res => {
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