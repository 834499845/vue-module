export default [
  {
    path: "/",
    redirect: "verification"
  },
  {
    // 选择器
    path: "/module",
    component: function(resolve) {
      require(["./mobileModule/pickSlelct/index.vue"], resolve);
    }
  },
  {
    // 表单验证
    path: "/verification",
    component: function(resolve) {
      require(["./pcModule/verification/verification.vue"], resolve);
    }
  }
];
