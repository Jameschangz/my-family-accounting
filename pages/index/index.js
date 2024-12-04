Page({
  data: {},
  navigateToRecords: function() {
    wx.navigateTo({
      url: '/pages/records/records'
    });
  },
  navigateToAddRecord: function() {
    wx.navigateTo({
      url: '/pages/addrecord/addrecord'
    });
  },
  navigateToStatistics: function() {
    wx.navigateTo({
      url: '/pages/statistics/statistics'
    });
  },
  navigateToSettings: function() {
    wx.navigateTo({
      url: '/pages/settings/settings'
    });
  }
});
