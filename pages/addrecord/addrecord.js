// pages/addrecord/addrecord.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        type: '收入',
        date: new Date().toISOString().split('T')[0],
        category: '',
        amount: '',
        incomeCategories: ['工资', '存款'],  // 收入类别
        expenseCategories: ['餐饮', '购物'],  // 支出类别
        currentCategories: [],  // 当前显示的类别选项
        typeOptions: ['收入', '支出']
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        // 获取存储的类别
        const storedIncomeCategories = wx.getStorageSync('incomeCategories') || ['工资', '存款'];
        const storedExpenseCategories = wx.getStorageSync('expenseCategories') || ['餐饮', '购物'];
        
        this.setData({ 
            incomeCategories: storedIncomeCategories,
            expenseCategories: storedExpenseCategories,
            currentCategories: storedIncomeCategories,  // 默认显示收入类别
            category: storedIncomeCategories[0]  // 设置默认类别
        });
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    },

    onTypeChange: function(e) {
        const index = e.detail.value;
        const newType = this.data.typeOptions[index];
        const categories = newType === '收入' ? this.data.incomeCategories : this.data.expenseCategories;
        
        this.setData({
            type: newType,
            currentCategories: categories,
            category: categories[0]  // 切换类型时重置类别为第一个选项
        });
    },

    onDateChange: function(e) {
        this.setData({
            date: e.detail.value
        });
    },

    onCategoryChange: function(e) {
        const index = e.detail.value;
        this.setData({
            category: this.data.currentCategories[index]
        });
    },

    onAmountChange: function(e) {
        this.setData({
            amount: e.detail.value
        });
    },

    addCategory: function(e) {
        const newCategory = e.detail.value.trim();
        if (newCategory) {
            // 根据当前类型决定更新哪个类别数组
            const isIncome = this.data.type === '收入';
            const categoryKey = isIncome ? 'incomeCategories' : 'expenseCategories';
            const storageKey = isIncome ? 'incomeCategories' : 'expenseCategories';
            const currentCategories = this.data[categoryKey];

            if (!currentCategories.includes(newCategory)) {
                const updatedCategories = [...currentCategories, newCategory];
                
                // 更新数据
                this.setData({
                    [categoryKey]: updatedCategories,
                    currentCategories: updatedCategories,
                    category: newCategory
                });
                
                // 保存到存储
                wx.setStorageSync(storageKey, updatedCategories);
                
                wx.showToast({
                    title: '添加成功',
                    icon: 'success'
                });
            }
        }
    },

    saveRecord: function() {
        const { type, date, category, amount } = this.data;
        if (type && date && category && amount) {
            const newRecord = { 
                type, 
                date, 
                category, 
                amount 
            };
            const records = wx.getStorageSync('records') || [];
            records.push(newRecord);
            wx.setStorageSync('records', records);

            wx.showToast({
                title: '记录已保存',
                icon: 'success'
            });
            wx.navigateBack();
        } else {
            wx.showToast({
                title: '请填写完整信息',
                icon: 'none'
            });
        }
    }
})