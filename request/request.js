const apiUrl = "http://47.119.112.252:8089"
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
           } else if(params.url == "/order/result" && res.data.retCode == "800020") {
             resolve(res.data)
           } else {
             wx.showToast({
              icon: "none",
               title: res.data.retMsg
             })
            console.log(res.data)
           }
         } else {
           var errMsg = res.data.message
           console.log(res.data)
         }
      },
      fail: function(e) {
        reject(e)
       }
    })
   })
 }
module.exports = {
  http: http
}