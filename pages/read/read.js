const {
  default: api
} = require("../../http/api")

// pages/read/read.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    link: '',
    chapter: {},
    arr: [],
    id: '',
    flag: false,
    num: 0,
    LOL: false,
    size: 36,
    color: [
      "rgb(19,27,40)",
      "rgb(233,220,214)",
      "rgb(195,209,184)",
      "rgb(66,48,48)",
      "rgb(205,179,152)",
    ],
    background: "rgb(233,220,214)",
    family: [{
        name: "黑体",
        style: "SimHei"
      },
      {
        name: "宋体",
        style: "SimSun"
      },
      {
        name: "仿宋",
        style: "FangSong"
      },
      {
        name: "楷体",
        style: "KaiTi"
      }
    ],
    fontFamily: "",
    catalog: ''
  },
  // 点击页面编辑
  edit() {
    if (this.data.flag === false) {
      this.setData({
        flag: true
      })
    } else {
      this.setData({
        flag: false,
        num: 0
      })
    }
  },
  // 字体缩放
  reduce() {
    let size = this.data.size
    size--
    this.setData({
      size: size
    })
  },
  // 字体放大
  add() {
    let size = this.data.size
    size++
    this.setData({
      size: size
    })
  },
  // 背景颜色
  color() {
    this.setData({
      num: 1
    })
  },
  // 更换背景颜色
  changeColor(e) {
    this.setData({
      background: e.currentTarget.dataset.color,
      flag: false,
      num: 0
    })
  },
  // 字体样式
  family() {
    this.setData({
      num: 2
    })
  },
  // 更换字体样式
  changeFamily(e) {
    this.setData({
      fontFamily: e.currentTarget.dataset.style,
      flag: false,
      num: 0
    })
  },
  // 查看目录
  catalog() {
    api.bookChaptersBookId(this.data.id).then(res => {
      this.setData({
        catalog: res.mixToc.chapters[0].title,
        num: 3
      })
    }).catch(err => {})
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id,
    })
    // 页面标题
    wx.setNavigationBarTitle({
      title: options.title,
    })
    // 书籍章节 根据书源id
    api.bookChapters(options.id).then(res => {
      wx.showLoading({
        title: '加载中...'
      })
      this.setData({
        link: res.chapters[0].link
      })
      // 章节内容
      api.chapterContent(this.data.link).then(res => {
        wx.hideLoading()
        this.setData({
          chapter: res.chapter
        })
        this.formatstr();
      }).catch(err => {
        wx.hideLoading()
      })
    }).catch(err => {
      wx.hideLoading()
    })
  },
  formatstr() {
    let str = this.data.chapter.body.replace(/安卓手机，推荐您：/, "#安卓手机，推荐您：#");
    str = str.replace(/苹果手机，推荐您：/, "#苹果手机，推荐您：#")
    let arr = str.split('#');
    this.setData({
      arr: arr
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