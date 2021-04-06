import {
  http
} from './request'

var url = {
 userLogin: "/party/web/login/in",
 showActMessage: "/party/merchant/activity/showActivity",
 showQuesMessge: "/party/merchant/consult/getAllConsult",
 showCommMessge: "/party/merchant/consult/getAllComment",
 showUserMessge: "/party/merchant/info/me"
}
module.exports = {
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