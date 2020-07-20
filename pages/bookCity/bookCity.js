import api from '../../http/api'
// pages/bookCity/bookCity.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag: 0,
    male: [],
    female: [],
    press: [],
    maleRanking: [],
    femaleRanking: []
  },
  classification() {
    this.setData({
      flag: 0,
    })

  },
  Ranking() {
    this.setData({
        flag: 1,
      }),
    wx.showLoading({
        title: '加载中...'
      }),
    api.rankCategory().then(res => {
      console.log(res)
      wx.hideLoading()
      res.male.map(item => {
        item.cover = 'https://statics.zhuishushenqi.com' + item.cover
      })
      res.female.map(item => {
        item.cover = 'https://statics.zhuishushenqi.com' + item.cover
      })
      this.setData({
        maleRanking: res.male,
        femaleRanking: res.female
      })
    }).catch(err => {})
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中...'
    })
    api.getCats().then(res => {
      wx.hideLoading()
      this.setData({
        male: res.male,
        female: res.female,
        press: res.press
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