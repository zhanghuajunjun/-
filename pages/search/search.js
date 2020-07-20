const {
  default: api
} = require("../../http/api")

// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hotWords: [],
    newHotWords: [],
    length: 0,
    flag: true,
    value: '',
    change: true,
    book: [],
    searchHistory: [],
    num: 1
  },
  // 获取大家搜的数据
  getData() {
    wx.showLoading({
      title: '加载中...',
    })
    api.hotWord().then(res => {
      wx.hideLoading()
      let arr = []
      res.newHotWords.map(item => {
        let r = Math.floor(Math.random() * 256);
        let g = Math.floor(Math.random() * 256);
        let b = Math.floor(Math.random() * 256);
        let color = `rgb(${r}, ${g}, ${b})`
        item.color = color
        arr.push(item)
        console.log(arr)
      })
      this.setData({
        hotWords: arr,
        newHotWords: arr,
        length: arr.length,
      })
    }).catch(err => {
      wx.hideLoading()
    })
  },
  // 换一换
  refresh() {
    let index = Math.floor(Math.random() * this.data.length);
    this.setData({
      hotWords: this.data.newHotWords.slice(index),
    })
    this.data.hotWords.map(item => {
      let r = Math.floor(Math.random() * 256);
      let g = Math.floor(Math.random() * 256);
      let b = Math.floor(Math.random() * 256);
      let color = `rgb(${r}, ${g}, ${b})`
      item.color = color
    })
  },
  // 搜索书籍的数据
  search(e) {
    this.setData({
      value: e.detail.value
    })
    let searchHistory = this.data.searchHistory
    let obj = {}
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    let color = `rgb(${r}, ${g}, ${b})`
    obj.color = color
    obj.title = this.data.value
    searchHistory.push(obj)
    
    wx.setStorageSync('searchHistory', searchHistory)
    this.getList()
  },
  // 搜索书籍的请求
  getList() {
    wx.showLoading({
      title: '加载中...'
    })
    api.bookSearch(
      this.data.value
    ).then(res => {
      wx.hideLoading()
      res.books.map(item => {
        item.cover = 'https://statics.zhuishushenqi.com' + item.cover
      })
      this.setData({
        book: res.books,
      })
    }).catch(err => {
      wx.hideLoading()
    })
  },
  // 获取input框焦点
  foucs() {
    this.setData({
      change: false
    })
  },
  // 清空历史搜素
  delect() {
    wx.showModal({
      title: '提示',
      content: '您确定删除吗?',
      success: (result) => {
        if (result.confirm) {
          this.setData({
            num: 2
          })
          wx.removeStorageSync('searchHistory')
          this.setData({
            searchHistory: []
          })
        } else {}
      }
    })
  },
  // 关闭搜索
  clear() {
    let array = wx.getStorageSync('searchHistory')
    if (array) {
      let hash = {};
      array = array.reduce((item, next) => {
        hash[next.title] ? '' : hash[next.title] = true && item.push(next);
        return item
      }, [])
      this.setData({
        value: "",
        change: true,
        searchHistory: array,
        num: 1
      })
    }

  },
  // 点击历史搜索记录重新搜索
  value(e) {
    let title = e.currentTarget.dataset.title
    this.setData({
      value: title,
      change: false
    })
    this.getList()
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
    this.getData()
    // 获取本地存储
    let array = wx.getStorageSync('searchHistory')
    if (array) {
      array.map(item => {
        let r = Math.floor(Math.random() * 256);
        let g = Math.floor(Math.random() * 256);
        let b = Math.floor(Math.random() * 256);
        let color = `rgb(${r}, ${g}, ${b})`
        item.color = color
      })
      // 去重
      let hash = {};
      array = array.reduce((item, next) => {
        hash[next._id] ? '' : hash[next._id] = true && item.push(next);
        return item
      }, [])
      this.setData({
        searchHistory: array
      })
    }
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