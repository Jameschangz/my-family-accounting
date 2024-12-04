import * as echarts from '../../components/ec-canvas/echarts';

let pieChart = null;
let lineChart = null;

function initPieChart(canvas, width, height) {
  pieChart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(pieChart);

  const option = {
    backgroundColor: '#ffffff',
    series: [{
      label: {
        normal: {
          fontSize: 14,
          formatter: '{b}: {d}%'
        }
      },
      type: 'pie',
      center: ['50%', '50%'],
      radius: ['40%', '60%'],
      data: []  // 数据将在 setOption 时更新
    }]
  };
  pieChart.setOption(option);
  return pieChart;
}

function initLineChart(canvas, width, height) {
  lineChart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(lineChart);

  const option = {
    backgroundColor: '#ffffff',
    grid: {
      containLabel: true,
      left: 10,
      right: 10
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: []  // 数据将在 setOption 时更新
    },
    yAxis: {
      type: 'value',
      splitLine: {
        lineStyle: {
          type: 'dashed'
        }
      }
    },
    series: [{
      type: 'line',
      smooth: true,
      data: []  // 数据将在 setOption 时更新
    }]
  };
  lineChart.setOption(option);
  return lineChart;
}

Page({
  data: {
    activeTab: 'expense',
    currentMonth: '',
    monthlyData: {
      income: 0,
      expense: 0,
      categories: [],
      dailyStats: []
    }
  },

  onLoad: function() {
    const currentDate = new Date();
    const currentMonth = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}`;
    this.setData({ currentMonth });
    this.calculateMonthlyData();
  },

  calculateMonthlyData: function() {
    const records = wx.getStorageSync('records') || [];
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;

    let categoryStats = {};
    let dailyStats = {};
    let totalIncome = 0;
    let totalExpense = 0;

    records.forEach(record => {
      const recordDate = new Date(record.date);
      if (recordDate.getFullYear() === currentYear && 
          recordDate.getMonth() + 1 === currentMonth) {
        const amount = parseFloat(record.amount);

        // 按类别统计
        if (!categoryStats[record.category]) {
          categoryStats[record.category] = { income: 0, expense: 0 };
        }
        if (record.type === '收入') {
          totalIncome += amount;
          categoryStats[record.category].income += amount;
        } else {
          totalExpense += amount;
          categoryStats[record.category].expense += amount;
        }

        // 按日期统计
        if (!dailyStats[record.date]) {
          dailyStats[record.date] = { date: record.date, income: 0, expense: 0 };
        }
        if (record.type === '收入') {
          dailyStats[record.date].income += amount;
        } else {
          dailyStats[record.date].expense += amount;
        }
      }
    });

    // 转换为数组并排序
    const dailyStatsArray = Object.values(dailyStats).sort((a, b) => a.date.localeCompare(b.date));

    // 计算百分比
    const categories = Object.entries(categoryStats).map(([name, data]) => ({
      name,
      income: data.income,
      expense: data.expense,
      incomePercentage: totalIncome > 0 ? ((data.income * 100) / totalIncome).toFixed(1) : '0.0',
      expensePercentage: totalExpense > 0 ? ((data.expense * 100) / totalExpense).toFixed(1) : '0.0'
    }));

    this.setData({
      monthlyData: {
        income: totalIncome,
        expense: totalExpense,
        categories: categories,
        dailyStats: dailyStatsArray
      }
    });
  },

  switchTab: function(e) {
    const type = e.currentTarget.dataset.type;
    this.setData({
      activeTab: type
    });
  },

  // 添加计算百分比的方法
  getPercentage: function(item) {
    const total = this.data.activeTab === 'income' ? this.data.monthlyData.income : this.data.monthlyData.expense;
    const value = this.data.activeTab === 'income' ? item.income : item.expense;
    return ((value * 100) / total).toFixed(1);
  }
}); 