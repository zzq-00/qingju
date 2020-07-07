import { get, post } from 'axios'
/**
 * 新闻中心
 */
export default {
  // 条件获取所有新闻
  getAllNews(params) {
    return post('news/getAllNews', params)
  },
  // 添加或修改新闻
  addOrModifyNews(params) {
    return post('news/addOrModifyNews', params)
  },
  // 删除新闻
  delNews(newsId) {
    return get(`news/delNews/${newsId}`)
  },
  // 获取新闻详情
  getNewsDetail(newsId) {
    return get(`news/getNewsDetail/${newsId}`)
  },
  // 发布/取消发布
  setPublishNews(newsId, status) {
    return get(`news/setPublish/${newsId}/${status}`)
  },
  // 获取热门新闻
  getHotNews() {
    return post('news/getHotNews')
  }
}
