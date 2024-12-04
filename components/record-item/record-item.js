Component({
  properties: {
    record: {
      type: Object,
      value: {}
    }
  },
  data: {},
  methods: {
    onTap: function() {
      wx.showToast({
        title: `记录: ${this.data.record.category} - ${this.data.record.amount}元`,
        icon: 'none'
      });
    }
  }
});
