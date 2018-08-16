let strategys = {
  // 非空
  isNotEmpty: function(value, errorMsg) {
    if (value === "") {
      return errorMsg;
    }
  },
  // 限制最小长度
  minLength: function(value, length, errorMsg) {
    if (value.length < length) {
      return errorMsg;
    }
  },
  // 限制最大长度
  maxLength: function(value, length, errorMsg) {
    if (value.length > length) {
      return errorMsg;
    }
  },
  // 手机号码格式
  mobileFormat: function(value, errorMsg) {
    if (!/(^1[3|5|8][0-9]{9}$)/.test(value)) {
      return errorMsg;
    }
  }
};
let Validator = function() {
  this.cache = []; // 保存效验规则
};
Validator.prototype.add = function(val, rules) {
  let self = this;
  if (rules instanceof Array == true) {
    for (let i = 0, rule; (rule = rules[i++]); ) {
      (function(rule) {
        let strategyAry = rule.fun.split(":");
        let errorMsg = rule.msg;
        self.cache.push(function() {
          let strategy = strategyAry.shift();
          strategyAry.unshift(val);
          strategyAry.push(errorMsg);
          return strategys[strategy].apply(this, strategyAry);
        });
      })(rule);
    }
  }
};

Validator.prototype.start = function() {
  if (this.cache instanceof Array == true && this.cache.length > 0) {
    for (let i = 0, validatorFunc; (validatorFunc = this.cache[i++]); ) {
      let msg = validatorFunc(); // 开始效验 并取得效验后的返回信息
      if (msg) {
        return msg;
      }
    }
  } else {
    return "格式不正确";
  }
};
export default Validator;
