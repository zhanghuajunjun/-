const { default: api } = require("../../../http/api")
// conponents/index/female/female.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    female: {
      type: Array
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    gender: "female"
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getMinor(e){
      let title = e.currentTarget.dataset.name
      api.getMinor().then(res => {
        let arr = res.female.filter(item => {
          return item.major === title
        })
        let obj = Object.assign(...arr)
        wx.navigateTo({
          url: `/pages/classification/classification?obj=${JSON.stringify(obj)}&title=${title}&gender=${this.data.gender}`,
        })
      }).catch(err => {})
    }
  }
})
