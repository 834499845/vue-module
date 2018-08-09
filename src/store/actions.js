import Vue from "vue";
require("../../API/config");
import base from "../assets/base";
export default {
  // 首页轮播图片接口
  getremoteIndex({}, postdata) {
    return base.remoteIndex(global.remoteIndex, postdata);
  },
  // 官网首页菜单接口
  getapimenu({}, postdata) {
    return base.apimenu(global.apimenu, postdata);
  },
  // 产品信息查询接口
  getremoteProduct({}, postdata) {
    return base.remoteProduct(global.remoteProduct, postdata);
  },
  // 解决方案信息查询接口
  getremoteSolution({}, postdata) {
    return base.remoteSolution(global.remoteSolution, postdata);
  },
  // 实验室信息接口
  getremoteLab({}, postdata) {
    return base.remoteLab(global.remoteLab, postdata);
  },
  // 资讯
  getremoteNews({}, postdata) {
    return base.remoteNews(global.remoteNews, postdata);
  },
  // 合作伙伴
  getremotepartner({}, postdata) {
    return base.remotepartner(global.remotepartner, postdata);
  },
  // 加入我们
  getremoteJoinus({}, postdata) {
    return base.remoteJoinus(global.remoteJoinus, postdata);
  },
  // 联系我们
  getremoteContactus({}, postdata) {
    return base.remoteContactus(global.remoteContactus, postdata);
  }
};
