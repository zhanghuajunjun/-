const fly = require('./index')

export default {
  //获取大分类
  getCats() {
    return fly.get(`/cats/lv2/statistics`)
  },
  //获取小类
  getMinor() {
    return fly.get(`/cats/lv2`)
  },
  //获取分类书籍
  getCatsBooks(gender, type, major, minor, start) {
    if (minor) {
      return fly.get(`/book/by-categories?gender=${gender}&type=${type}&major=${major}&minor=${minor}&start=${start}& =20`)
    } else {
      return fly.get(`/book/by-categories?gender=${gender}&type=${type}&major=${major}&start=${start}&limit=20`)
    }
  },
  // 排名分类
  rankCategory() {
    return fly.get(`/ranking/gender`)
  },
  //搜索热词
  hotWord() {
    return fly.get(`/book/hot-word`)
  },
  // 书籍搜索 (分类，书名，作者名)
  bookSearch(content) {
    return fly.get(`/book/fuzzy-search?start=0&limit=50&v=1&query=${content}`)
  },
  // 书籍详情
  bookInfo(book_id) {
    return fly.get(`/book/${book_id}`)
  },
  // 相关推荐
  recommend(book_id) {
    return fly.get(`/book/${book_id}/recommend`)
  },
  // 短评
  shortReviews(book_id) {
    return fly.get(`/post/short-review?book=${book_id}&total=true&sortType=newest`)
  },
  // 书籍章节 根据书源id
  bookChapters(id) {
    return fly.get(`/atoc/${id}?view=chapters`)
  },
  // 章节内容
  chapterContent(link) { // @param link 章节link
    return fly.get(`https://chapter2.zhuishushenqi.com/chapter/${encodeURIComponent(link)}`)
  },
  // 排名详情
  rankInfo(rank_id) { //@param rank_id 分类ID
    return fly.get(`/ranking/${rank_id}`)
  },
  // 书籍章节 根据书id
  bookChaptersBookId(book_id) {
    return fly.get(`/mix-atoc/${book_id}?view=chapters`)
  },
}