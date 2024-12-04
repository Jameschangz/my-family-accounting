Page({
  data: {
    records: [],
    balance: 0,
    monthIncome: 0,
    monthExpense: 0
  },
  onLoad: function() {
    const app = getApp();
    if (!app.globalData.userInfo) {
      wx.redirectTo({
        url: '/pages/login/login'
      });
    } else {
      this.loadAndCalculateRecords();
    }
  },
  loadAndCalculateRecords: function() {
    const records = wx.getStorageSync('records') || [];
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;

    let totalIncome = 0;
    let totalExpense = 0;
    let monthIncome = 0;
    let monthExpense = 0;

    records.forEach(record => {
      const recordDate = new Date(record.date);
      const amount = parseFloat(record.amount);

      // 计算总收支
      if (record.type === '收入') {
        totalIncome += amount;
        // 计算本月收入
        if (recordDate.getFullYear() === currentYear && 
            recordDate.getMonth() + 1 === currentMonth) {
          monthIncome += amount;
        }
      } else if (record.type === '支出') {
        totalExpense += amount;
        // 计算本月支出
        if (recordDate.getFullYear() === currentYear && 
            recordDate.getMonth() + 1 === currentMonth) {
          monthExpense += amount;
        }
      }
    });

    this.setData({
      records,
      balance: totalIncome - totalExpense,
      monthIncome,
      monthExpense
    });
  },
  addRecord: function() {
    wx.navigateTo({
      url: '/pages/addrecord/addrecord'
    });
  },
  onShow: function() {
    // 每次显示页面时重新计算
    this.loadAndCalculateRecords();
  }
});
