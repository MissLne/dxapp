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
 reply: "/party/merchant/consult/replyComment",
 updateActivity: "/party/merchant/activity/update_activity",
 uploadImg: "/party/web_public/upload_picture",
 showMemberDetail: "/party/merchant/activity/info/members/detail"
}
module.exports = {
  showMemberDetail(params) {
    return http({      
      url: url.showMemberDetail,
      data: params
    })
  },
  uploadImg(params) {
    return http({      
      url: url.uploadImg,
      header: {
        "Content-Type": "multipart/form-data"
      },
      data: params
    })
  },
  updateActivity(params) {
    return http({      
      url: url.updateActivity,
      header: {
        "Content-Type": "application/json"
      },
      data: params
    })
  },
  showUpdateActivity(params) {
    return http({      
      url: `/party/merchant/activity/actInfo/${params.activityId}`,
      data: params,
      method: 'GET'
    })
  },
  searchActivity(params) {
    return http({      
      url: `/party/merchant/activity/info/members/${params.activityId}/${params.content}`,
      data: params,
      method: 'GET'
    })
  },
  showMemberMessage(params) {
    return http({      
      url: `/party/merchant/activity/info/members/${params.activityId}`,
      data: params,
      method: 'GET'
    })
  },
  showActivityManage(params) {
    return http({      
      url: `/party/merchant/activity/info/${params.activityId}`,
      data: params,
      method: 'GET'
    })
  },
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