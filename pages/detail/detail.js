const {
  default: api
} = require("../../http/api")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: {},
    flag: 0,
    books: [],
    books1: [],
    bookshelf: [],
    addbook: -1,
    id: '',
    docs: [],
    num:0,
    flags: false
  },
  // 评价
  Ranking() {
    wx.showLoading({
      title: '加载中...'
    })
    this.setData({
      flag: 1,
    })
    api.shortReviews(this.data.id).then(res=>{
      wx.hideLoading()
      res.docs.map(item => {
        item.author.avatar = 'https://statics.zhuishushenqi.com' + item.author.avatar
      })
      this.setData({
        docs: res.docs
      })
    }).catch(err=>{
      wx.hideLoading()
    })
  },
  // 详情
  classification() {
    this.setData({
      flag: 0,
    })
  },
  // 换一换
  refresh() {
    let books = this.data.books1
    let index = Math.floor(Math.random() * (books.length - 2));
    this.setData({
      books: books.slice(index, index + 3),
    })
  },
  // 推荐条详情
  detail(e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      // url: `../detail/detail?id=${id}`,
      url: '../detail/detail?id=' + id,
    })
  },
  // 加入书架
  bookshelf() {
    let bookshelf = this.data.bookshelf
    let obj = {}
    obj._id = this.data.detail._id
    obj.cover = this.data.detail.cover
    obj.title = this.data.detail.title
    bookshelf.push(obj)
    let hash = {};
    bookshelf = bookshelf.reduce((item, next) => {
      hash[next.title] ? '' : hash[next.title] = true && item.push(next);
      return item
    }, [])
    wx.setStorageSync('bookshelf', bookshelf)
    this.setData({
      addbook: 1
    })
  },
  // 开始阅读
  read(e) {
    let id = e.currentTarget.dataset.id
    let title = e.currentTarget.dataset.title
    wx.navigateTo({
      url: `../read/read?id=${id}&title=${title}`
    })
  },
  // 查看图片
  seeImg() {
    this.setData({
      num: 1
    })
  },
  // 显示操作
  downFile() {
    this.setData({
      flags: true
    })
  },
  // 保存图片
  downloadFile(e) {
    wx.downloadFile({
      url: e.currentTarget.dataset.url,
      success: res=> {
        console.log(res);
        let rr = res.tempFilePath;
        wx.saveImageToPhotosAlbum({
          filePath: rr,
          success(res) {
            wx.showToast({
              title: '保存成功',
              icon: 'success',
              duration: 2000
            })
          }
        })
      }
    })
  },
  // 取消
  close() {
    this.setData({
      num: 0,
      flags: false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id
    })
    wx.showLoading({
      title: '加载中...'
    })
    // 获取书籍详情
    api.bookInfo(options.id).then(res => {
      wx.hideLoading()
      res.cover = 'https://statics.zhuishushenqi.com' + res.cover
      this.setData({
        detail: res
      })
      let arr = wx.getStorageSync('bookshelf')
      if (arr) {
        let index = arr.findIndex(item => {
          return item.title === this.data.detail.title
        })
        this.setData({
          bookshelf: arr,
          addbook: index
        })
      }
    }).catch(err => {})
    // 获取推荐的书
    api.recommend(options.id).then(res => {
      res.books.map(item => {
        item.cover = 'https://statics.zhuishushenqi.com' + item.cover
      })
      let index = Math.floor(Math.random() * (res.books.length - 2));
      this.setData({
        books: res.books.slice(index, index + 3),
        books1: res.books
      })
    }).catch(err => {})
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