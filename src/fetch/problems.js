import { get, post } from 'axios'
/**
 * 常见问题
 */
export default {
  // 查询问题
  getAllProblem(params) {
    return post('problem/getAllProblem', params)
  },
}
