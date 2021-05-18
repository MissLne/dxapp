// pages/userPage/cashOut/cashOut.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pickerVal: '零钱'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  cashOut() {
    let data = this.data.cashOutCount + ""
    let obj = {
      "mId": wx.getStorageSync('id'),
      "amount": data
    }
    request.cashOut(obj)
    .then(res => {
      console.log(res)
    })
    .catch(err => {
    })
  },
  wayChoices(e) {
    console.log(e.detail.value)
    e.detail.value == '1'? this.data.pickerVal = '银行卡' : this.data.pickerVal = '零钱'
    this.setData({
      pickerVal: this.data.pickerVal
    })
  }
})