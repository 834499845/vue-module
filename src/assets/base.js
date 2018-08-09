//
import Vue from "vue";
const base = {
  //首页轮播图片接口
  remoteIndex: function remoteIndex(ip, postdata) {
    return Vue.http.get(ip, {}).then(response => {
      if (response.status === 200) {
        return Promise.resolve(response.body);
      } else {
        return Promise.reject(response.data);
      }
    });
  },
  //官网首页菜单接口
  apimenu: function apimenu(ip, postdata) {
    return Vue.http.get(ip, {}).then(response => {
      if (response.status === 200) {
        return Promise.resolve(response.body);
      } else {
        return Promise.reject(response.data.message);
      }
    });
  },
  //产品信息查询接口
  remoteProduct: function remoteProduct(ip, postdata) {
    var ipstr = "";
    if (postdata.id) {
      ipstr = ip + "/" + postdata.id;
    } else {
      ipstr = ip;
    }
    return Vue.http.get(ipstr, {}).then(response => {
      if (response.status === 200) {
        return Promise.resolve(response.body);
      } else {
        return Promise.reject(response.data.message);
      }
    });
  },
  //解决方案信息查询接口
  remoteSolution: function remoteSolution(ip, postdata) {
    var ipstr = "";
    if (postdata.id) {
      ipstr = ip + "/" + postdata.id;
    } else {
      ipstr = ip + "?type=" + postdata.type + "&size=" + postdata.size;
    }
    return Vue.http.get(ipstr, {}).then(response => {
      if (response.status === 200) {
        return Promise.resolve(response.body);
      } else {
        return Promise.reject(response.data.message);
      }
    });
  },
  //实验室信息接口
  remoteLab: function remoteLab(ip, postdata) {
    var ipstr = "";
    if (postdata.id) {
      ipstr = ip + "/" + postdata.id;
    } else {
      ipstr = ip + "?size=" + postdata.size;
    }
    return Vue.http.get(ipstr, {}).then(response => {
      if (response.status === 200) {
        return Promise.resolve(response.body);
      } else {
        return Promise.reject(response.data.message);
      }
    });
  },
  //资讯接口
  remoteNews: function remoteNews(ip, postdata) {
    var ipstr = "";
    if (postdata.id) {
      ipstr = ip + "/" + postdata.id;
    } else {
      ipstr =
        ip +
        "?type=" +
        postdata.type +
        "&size=" +
        postdata.size +
        "&no=" +
        postdata.no;
    }
    return Vue.http.get(ipstr, {}).then(response => {
      if (response.status === 200) {
        return Promise.resolve(response.body);
      } else {
        return Promise.reject(response.data.message);
      }
    });
  },
  //合作伙伴信息接口
  remotepartner: function remotepartner(ip, postdata) {
    var ipstr = ip + "?size=" + postdata.size;
    return Vue.http.get(ipstr, {}).then(response => {
      if (response.status === 200) {
        return Promise.resolve(response.body);
      } else {
        return Promise.reject(response.data.message);
      }
    });
  },
  //加入我们
  remoteJoinus: function remoteJoinus(ip, postdata) {
    var ipstr = "";
    if (postdata.id) {
      ipstr = ip + "/" + postdata.id;
    } else {
      ipstr = ip + "?size=" + postdata.size + "&no=" + postdata.no;
    }
    return Vue.http.get(ipstr, {}).then(response => {
      if (response.status === 200) {
        return Promise.resolve(response.body);
      } else {
        return Promise.reject(response.data.message);
      }
    });
  },
  //联系我们
  remoteContactus: function remoteContactus(ip, postdata) {
    return Vue.http.get(ip, {}).then(response => {
      if (response.status === 200) {
        return Promise.resolve(response.body);
      } else {
        return Promise.reject(response.data.message);
      }
    });
  }
};
export default base;
