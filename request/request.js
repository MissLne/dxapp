const apiUrl = "http://47.119.112.252:8089/party/"
// const apiUrl = "https://www.quyo.fun/party/"
// const apiUrl = "http://192.168.3.9:8089/party/"
const http = (params) => {
    return new Promise((resolve, reject) => {
        wx.request({
            url: apiUrl + params.url,
            data: params.data,
            header: params.header || {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: params.method || 'POST',
            dataType: params.dataType,
            responseType: params.responseType,
            success: function(res) {

                if (res.statusCode == 200) {

                    if (res.data.code == 0) {
                        resolve(res.data)
                    } else if (params.url == "/order/result" && res.data.retCode == "800020") {
                        resolve(res.data)
                    } else {
                        reject(res)
                    }
                } else {
                    reject(res)
                }
            },
            fail: function(e) {
                // reject(e)
                // console.log(000)
            }
        })
    })
}
module.exports = {
    http: http
}