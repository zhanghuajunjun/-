const {
  default: api
} = require("../../http/api")

// pages/classification/classification.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    typeList: [{
        id: 'hot',
        name: '热门'
      },
      {
        id: 'new',
        name: '新书'
      },
      {
        id: 'reputation',
        name: '好评'
      },
      {
        id: 'over',
        name: '完结'
      },
      {
        id: 'monthly',
        name: 'VIP'
      }
    ],
    obj: {},
    activeIndex: 0,
    activeIndexs: 0,
    gender: '',
    start: 0,
    type: "hot",
    index: 0,
    books: []
  },
  // 进去后页面显示
  getData() {
    wx.showLoading({
      title: '加载中...'
    })
    
    let indexs = this.data.index
    console.log(this.data.obj.mins[indexs])
    console.log(indexs)
    api.getCatsBooks(this.data.gender,
      this.data.type,
      this.data.obj.major,
      this.data.obj.mins[indexs],
      this.data.start
    ).then(res => {
      wx.hideLoading()
      res.books.map(item => {
        item.cover = 'https://statics.zhuishushenqi.com' + item.cover
        if (item.tags.length < 4) {
          item.tags = item.tags
        } else {
          let num = Math.floor(Math.random() * (item.tags.length - 2));
          item.tags = item.tags.slice(num, (num + 3))
        }
      })

      this.setData({
        books: res.books
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
  // 换类型
  clickType(e) {
    let id = e.currentTarget.dataset.id
    let index = e.currentTarget.dataset.index
    this.setData({
      type: id,
      activeIndex: index
    })
    this.getData()
  },
  // 换小类
  clickMins(e) {
    let index = e.currentTarget.dataset.index
    console.log(index)
    this.setData({
      index: index,
      activeIndexs: index
    })
    this.getData()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 页面标题
    wx.setNavigationBarTitle({
      title: options.title,
    })
    // 赋值
    this.setData({
      obj: JSON.parse(options.obj),
      gender: options.gender
    })
    console.log(options.obj)
    // 调用
    this.getData()
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
    this.setData({
     start: this.data.start + 20
    })
    api.getCatsBooks(this.data.gender,
      this.data.type,
      this.data.obj.major,
      this.data.obj.mins[this.data.index],
      this.data.start
    ).then(res => {
      wx.hideLoading()
      res.books.map(item => {
        item.cover = 'https://statics.zhuishushenqi.com' + item.cover
        if (item.tags.length < 4) {
          item.tags = item.tags
        } else {
          let num = Math.floor(Math.random() * (item.tags.length - 2));
          item.tags = item.tags.slice(num, (num + 3))
        }
      })

      this.setData({
        books: this.data.books.concat(res.books)
      })
    }).catch(err => {
      wx.hideLoading()
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})