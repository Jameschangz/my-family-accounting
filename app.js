App({
  onLaunch: function () {
    // 检查用户登录状态
    wx.checkSession({
      success: () => {
        // 用户已登录
        console.log('User is logged in');
      },
      fail: () => {
        // 用户未登录，跳转到登录页面
        wx.redirectTo({
          url: '/pages/login/login'
        });
      }
    });
  },
  globalData: {
    userInfo: null
  }
});
