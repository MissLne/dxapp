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
 showWallet: "/party/merchant/money/show",
 showBillDetail: "/party/merchant/money/show/detail",
 cashOut: "/party/merchant/money/drawCash",
 invest: "/party/merchant/money/pay",
 register: "/party/merchant/enter/one/doEnter",
 restore: "/party/merchant/consult/reply",
 reply: "/party/merchant/consult/replyComment"
}
module.exports = {
  reply(params) {
    return http({      
      url: url.reply,
      data: params
    })
  },
  restore(params) {
    return http({      
      url: url.restore,
      data: params
    })
  },
  register(params) {
    return http({      
      url: url.register,
      data: params,
      header: {
        "Content-Type": "application/json"
      }
    })
  },
  invest(params) {
    return http({      
      url: url.invest,
      data: params,
      header: {
        "Content-Type": "application/json"
      }
    })
  },
  cashOut(params) {
    return http({      
      url: url.cashOut,
      data: params,
      header: {
        "Content-Type": "application/json"
      }
    })
  },
  showBillDetail(params) {
    return http({      
      url: url.showBillDetail,
      data: params,
      header: {
        "Content-Type": "application/json"
      }
    })
  },
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