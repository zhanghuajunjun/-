Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookshelf: [],
    change: true,
  },
  // 帮助
  help() {
    wx.navigateTo({
      url: '../help/help',
    })
  },
  // 编辑
  edit() {
    if(this.data.change===true){
      this.setData({
        change: false
      })
    } else {
      this.setData({
        change: true
      })
    }
  },
  // 删除收藏书籍
  delect(e) {
    let index = e.currentTarget.dataset.index;
    let bookshelf = this.data.bookshelf
    bookshelf.splice(index, 1)
    this.setData({
      bookshelf: bookshelf
    })
    wx.setStorageSync('bookshelf', bookshelf)
  },
  // 开始阅读
  read(e) {
    let id = e.currentTarget.dataset.id
    let title = e.currentTarget.dataset.title
    wx.navigateTo({
      url: `../read/read?id=${id}&title=${title}`
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    let arr = wx.getStorageSync('bookshelf')
    if (arr) {
      this.setData({
        bookshelf: arr
      })
    }
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