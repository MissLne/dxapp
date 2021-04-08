import {
  http
} from './request'

var url = {
 userLogin: "/party/web/login/in",
 showActMessage: "/party/merchant/activity/showActivity",
 showQuesMessge: "/party/merchant/consult/getAllConsult",
 showCommMessge: "/party/merchant/consult/getAllComment",
 showUserMessge: "/party/merchant/info/me",
 updateUserMessage: "/party/merchant/info/updateInfo",
 showWallet: "/party/merchant/money/show"
}
module.exports = {
  showWallet(params) {
    return http({      
      url: url.showWallet,
      data: params
    })
  },
  updateUserMessage(params) {
    return http({      
      url: url.updateUserMessage,
      data: params,
      header: {
        "Content-Type": "application/json"
      }
    })
  },
 showUserMessge(params) {
   console.log(params.id)
   return http({      
     url: url.showUserMessge,
     data: params
   })
 },
 showCommMessge(params) {
   return http({      
     url: url.showCommMessge,
     data: params,
     header: {
       "Content-Type": "application/x-www-form-urlencoded"
     }
   })
 },
 showQuesMessge(params) {
   return http({      
     url: url.showQuesMessge,
     data: params,
     header: {
       "Content-Type": "application/x-www-form-urlencoded"
     }
   })
 },
 userLogin(params) {
   return http({      
     url: url.userLogin,
     data: params,
     header: {
       "Content-Type": "application/json"
     }
   })
 },
 showActMessage(params) {
   return http({      
     url: url.showActMessage,
     data: params,
     header: {
       "Content-Type": "application/json"
     }
   })
 }
}