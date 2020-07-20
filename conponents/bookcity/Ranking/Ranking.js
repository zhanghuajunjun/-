const {
  default: api
} = require("../../../http/api")

// conponents/bookcity/Ranking/Ranking.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    maleRanking: {
      type: Array
    },
    femaleRanking: {
      type: Array
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    ranking(e) {
      console.log(e)
      let monthRank = e.currentTarget.dataset.item.monthRank
      let totalRank = e.currentTarget.dataset.item.totalRank
      let title = e.currentTarget.dataset.item.title
      let _id = e.currentTarget.dataset.item._id

      wx.navigateTo({
        url: `../../pages/ranking/ranking?monthRank=${monthRank}&totalRank=${totalRank}&title=${title}&_id=${_id}`,
      })
    }
  }
})