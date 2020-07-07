import { get, post } from 'axios'
/**
 * 福利专区
 */
export default {
  // 个人优惠券
  getMyCouponByProjectId(userId, projectBaseId) {
    return get(`welfareMall/getMyCouponByProjectId/${userId}/${projectBaseId}`)
  },
  //获取推荐礼品列表
  getWelfareGiftList(params) {
    return post('welfareMall/getWelfareGiftList', params)
  },
  //推荐优惠券
  getWelfareCouponList(params) {
    return post('welfareMall/getWelfareCouponList', params);
  },
  //抽奖
  drawLottery(params) {
    return get(`welfareMall/drawLottery/${params}`)
  },
  // 抽奖表盘获取
  getLotteryHome() {
    return get('welfareMall/getLotteryHome')
  },
  // 获奖名单
  getLotteryList(params) {
    return post('welfareMall/getLotteryList', params)
  },
  //推荐优惠券
  getWelfareCouponList(params) {
    return post('welfareMall/getWelfareCouponList', params)
  },
  //推荐课程
  getWelfareCourseList(params) {
    return post('welfareMall/getWelfareCourseList', params)
  },
  // 我的青豆
  getMyBean(params) {
    return get(`welfareMall/getMyBean/${params}`)
  },
  //兑换详情页面
  getWelfareDetail(params) {
    return post('welfareMall/getWelfareDetail', params)
  },
  //兑换成功通知
  sendWelfareInform(params) {
    return post('welfareMall/sendWelfareInform', params)
  },
  //设置默认地址
  setDefaultAddress(params) {
    return get(`welfareMall/setDefaultAddress/${params}`)
  },
  //添加收货地址
  addReceiveAddress(params) {
    return post('welfareMall/addReceiveAddress', params)
  },
  //地址列表
  getAddressList(params) {
    return get(`welfareMall/getAddressList/${params}`)
  },
  // 确认支付
  confirmPayment(params) {
    return post('welfareMall/confirmPayment', params)
  },
  //中奖后提交地址信息
  confirmAddressInfo(params) {
    return post('welfareMall/confirmAddressInfo', params)
  },
  //  设置默认地址
  setDefaultAddress(params) {
    return get(`welfareMall/setDefaultAddress/${params}`)
  },
  //青豆记录
  getBeanDetailRecord(params) {
    return get(`welfareMall/getBeanDetailRecord/${params}`)
  },
  //兑换记录
  getBeanExchangeRecord(params) {
    return get(`welfareMall/getBeanExchangeRecord/${params}`)
  },
  // 个人抽奖记录
  getdrawLotteryRecord(params) {
    return post('welfareMall/getdrawLotteryRecord', params)
  },
  //我的优惠券
  getMyCoupon(params) {
    return post(`welfareMall/getMyCoupon`, params)
  }
}
