// 表单验证
<template>
  <div>
      <ul>
          <li><input type="text" v-model="emptyVal" placeholder="禁止输入空格"></li>
          <li><input type="text" v-model="lengthVal" placeholder="最小长度7"></li>
          <li><input type="text" v-model="phoneVal" placeholder="禁止为空且为手机号码"></li>
      </ul>
  </div>
</template>
<script>
import Validator from "./verification";
export default {
  components: {},
  data() {
    return {
      emptyVal: "A",
      lengthVal: "12345678901",
      HanziVal: "",
      phoneVal: "13636898669"
    };
  },
  methods: {},
  created: function() {
    let self = this;
  },
  mounted() {
    let self = this;
    var validateFunc = function() {
      var validator = new Validator(); // 创建一个Validator对象
      /* 添加一些效验规则 */
      // 单一限制
      validator.add(self.emptyVal, [
        {
          fun: "isNotEmpty",
          msg: "不能为空"
        }
      ]);
      // 带长度限制
      validator.add(self.lengthVal, [
        {
          fun: "minLength:7",
          msg: "最小长度7"
        }
      ]);
      validator.add(self.lengthVal, [
        {
          fun: "maxLength:10",
          msg: "最大长度12"
        }
      ]);
      // 多重性限制
      validator.add(self.phoneVal, [
        {
          fun: "isNotEmpty",
          msg: "不能为空"
        },
        {
          fun: "mobileFormat",
          msg: "必须为手机号码"
        }
      ]);
      var errorMsg = validator.start(); // 获得效验结果
      return errorMsg; // 返回效验结果
    };
    console.log(validateFunc(), "validateFunc");
  },
  watch: {}
};
</script>
<style scoped>
li {
  width: 500px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 25px;
}
input {
  width: 320px;
  height: 32px;
  border: 1px solid #ccc;
  border-radius: 5px;
  line-height: 32px;
  padding-left: 7px;
}
</style>