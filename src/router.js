export default [
  {
    path: "/",
    redirect: "homeLog"
  },
  {
    // 日志主页
    path: "/homeLog",
    component: function(resolve) {
      require(["./homeLog.vue"], resolve);
    }
  }
];
