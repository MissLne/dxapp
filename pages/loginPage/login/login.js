const request = require('../../../request/api')

Page({
    data: {
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