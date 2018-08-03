export default [
  {
    path: "/",
    redirect: "module"
  },
  {
    path: "/module",
    component: function(resolve) {
      require(["./mobileModule/module.vue"], resolve);
    }
  }
];
