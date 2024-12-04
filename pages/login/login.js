Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function() {
    // 检查用户是否已经授权
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: res => {
              this.loginSuccess(res.userInfo);
            }
          });
        }
      }
    });
  },
  bindGetUserInfo: function(e) {
    if (e.detail.userInfo) {
      this.loginSuccess(e.detail.userInfo);
    } else {
      wx.showModal({
        title: '提示',
        content: '您拒绝了授权，无法登录',
        showCancel: false
      });
    }
  },
  loginSuccess: function(userInfo) {
    getApp().globalData.userInfo = userInfo;
    wx.redirectTo({
      url: '/pages/index/index'
    });
  }
});
