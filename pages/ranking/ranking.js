const {
  default: api
} = require("../../http/api")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    num: 0,
    titles: '',
    totalRank: '',
    monthRank: '',
    _id: '',
    book: [],
  },
  city() {
    this.setData({
      num: 1
    })
    this.getData(this.data.monthRank)
  },
  citys() {
    this.setData({
      num: 0
    })
    this.getData(this.data._id)
  },
  cityss() {
    this.setData({
      num: 2
    })
    this.getData(this.data.totalRank)
  },
  getData(id) {
    wx.showLoading({
      title: '加载中...'
    })
    api.rankInfo(id).then(res => {
      wx.hideLoading()
      res.ranking.books.map(item => {
        item.cover = 'https://statics.zhuishushenqi.com' + item.cover
      })
      this.setData({
        book: res.ranking.books
      })
    }).catch(err => {
      wx.hideLoading()
    })
  },
  // 查看详情
  detail(e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      // url: `../detail/detail?id=${id}`,
      url: '../detail/detail?id=' + id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData(options._id)
    let title = options.title
    let totalRank = options.totalRank
    let monthRank = options.monthRank
    let _id = options._id
    // 页面标题
    wx.setNavigationBarTitle({
      title: title,
    })
    this.setData({
      titles: title,
      totalRank: totalRank,
      monthRank: monthRank,
      _id: _id,
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})