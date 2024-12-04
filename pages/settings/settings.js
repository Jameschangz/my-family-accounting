Page({
  data: {
    userInfo: {}
  },
  onLoad: function() {
    const app = getApp();
    this.setData({
      userInfo: app.globalData.userInfo
    });
  },
  logout: function() {
    wx.showModal({
      title: '提示',
      content: '确定要退出登录吗？',
      success: res => {
        if (res.confirm) {
          getApp().globalData.userInfo = null;
          wx.redirectTo({
            url: '/pages/login/login'
          });
        }
      }
    });
  }
});
