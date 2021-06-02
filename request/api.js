import {
  http
} from './request'

var url = {
  userLogin: "merchant/enter/one/login",
  showActMessage: "merchant/activity/showActivity",
  showQuesMessge: "merchant/consult/getAllConsult",
  showCommMessge: "merchant/consult/getAllComment",
  showUserMessge: "merchant/info/me",
  updateUserMessage: "merchant/info/updateInfo",
  showWallet: "merchant/money/show",
  showBillDetail: "merchant/money/show/detail",
  cashOut: "merchant/money/drawCash",
  invest: "merchant/money/pay",
  register: "merchant/enter/one/doEnter",
  restore: "merchant/consult/reply",
  reply: "merchant/consult/replyComment",
  updateActivity: "merchant/activity/actInfo/updateActInfo",
  uploadImg: "web_public/upload_picture",
  showMemberDetail: "merchant/activity/info/members/detail",
  publishActivities: "merchant/activity/add_activity",
  saveDraft: "merchant/activity/add_activity_draft",
  getAllMembers: "merchant/info/showAllManagers",
  addTeamMembers: "merchant/enter/one/addManager",
  showActivityByStatus: "merchant/activity/showActivityByStatus",
  showUpdateActivit: "merchant/activity/actInfo/showUpdateInfo",
  getLoginAccount: "merchant/enter/one/canIn",
  identify: "merchant/enter/one/identify",
  logout: "merchant/enter/one/logout",
  actIdGetConsult: "merchant/consult/getConsult",
  actIdGetComment: "merchant/consult/getComment",
  restartActivity: "merchant/activity/actInfo/restartActivity",
  stopActivity: "merchant/activity/actInfo/stopActivity",
  cancelActivity: "merchant/activity/actInfo/cancelActivity",
  getQRTicket: "merchant/gzh/getQRTicket"
}
module.exports = {
  getQRTicket(params) {
    return http({
      url: url.getQRTicket,
      data: params
    })
  },
  restartActivity(params) {
    return http({
      url: url.restartActivity,
      data: params,
      method: "PUT"
    })
  },
  stopActivity(params) {
    return http({
      url: url.stopActivity,
      data: params,
      method: "PUT"
    })
  },
  cancelActivity(params) {
    return http({
      url: url.cancelActivity,
      data: params,
      method: "PUT"
    })
  },
  ouo(params) {
    return http({
      url: `merchant/enter/one/test/${params.jsCode}`,
      data: params,
      method: 'GET'
    })
  },
  logout(params) {
    return http({
      url: url.logout,
      data: params,
      method: 'GET'
    })
  },
  identify(params) {
    return http({
      url: url.identify,
      data: params,
      header: {
        "Content-Type": "application/json"
      }
    })
  },
  getLoginAccount(params) {
    return http({
      url: `merchant/enter/one/canIn/${params.jsCode}`,
      data: params,
      method: 'GET'
    })
  },
  deleteMember(params) {
    return http({
      url: `merchant/info/deleteManager/${params.id}`,
      data: params,
      method: 'DELETE'
    })
  },
  actIdGetConsult(params) {
    return http({
      url: url.actIdGetConsult,
      data: params,
      header: {
        "Content-Type": "application/json"
      }
    })
  },
  actIdGetComment(params) {
    return http({
      url: url.actIdGetComment,
      data: params,
      header: {
        "Content-Type": "application/json"
      }
    })
  },
  showActivityByStatus(params) {
    return http({
      url: url.showActivityByStatus,
      data: params
    })
  },
  addTeamMembers(params) {
    return http({
      url: url.addTeamMembers,
      data: params,
      header: {
        "Content-Type": "application/json"
      }
    })
  },
  getAllMembers(params) {
    return http({
      url: url.getAllMembers,
      data: params
    })
  },
  saveDraft(params) {
    return http({
      url: url.saveDraft,
      data: params,
      header: {
        // "Content-Type": "application/json",
        "token": wx.getStorageSync('token')
      }
    })
  },
  publishActivities(params) {
    return http({
      url: url.publishActivities,
      data: params,
      header: {
        "Content-Type": "application/json"
      }
    })
  },
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
      url: url.showUpdateActivit,
      data: params
    })
  },
  searchActivity(params) {
    return http({
      url: `merchant/activity/info/members/${params.activityId}/${params.content}`,
      data: params,
      method: 'GET'
    })
  },
  showMemberMessage(params) {
    return http({
      url: `merchant/activity/info/members/${params.activityId}`,
      data: params,
      method: 'GET'
    })
  },
  showActivityManage(params) {
    return http({
      url: `merchant/activity/info/${params.activityId}`,
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
      data: params
    })
  }
}