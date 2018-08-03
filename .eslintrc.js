module.exports = {
  // root: true,
  // parser: 'babel-eslint', // 解析器
  // parserOptions: {
  //   sourceType: 'module' // 类型
  // },
  // // 拓展规则 当采用时 默认给所有node_modules 添加规则
  // extends: 'standard',
  // // 插件
  // plugins: [
  //   'html' // 用来识别 .vue 中的js代码
  // ],
  // // 规则 0 关闭规则 1 开启规则 使用警告级别提示错误 2 开启规则 使用错误级别 提示错误
  // 'rules': {
  //   // allow paren-less arrow functions
  //   'arrow-parens': 0,
  //   // allow async-await
  //   'generator-star-spacing': 0,
  //   // allow debugger during development
  //   'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  // }
  "files.autoSave": "off",
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "html",
    { "language": "vue", "autoFix": true }
  ],
  "eslint.options": {
    "plugins": ["html"]
  }
}
