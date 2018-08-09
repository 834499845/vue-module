<template>
  <div class="timeModelMian" v-if="isDateShow">
    <div class="pickClor" @click="calicClick">
    </div>
    <div class="pickMain">
      <div class="butPick">
        <div class="butPickLeft" @click="calicClick">
          取消
        </div>
        <div class="butPickRight" @click="confimClick">
          确认
        </div>
      </div>
      <div class="pickList">
        <pickModel v-show="type > 0" @change="changeYarClick" :listData="yarDatas" v-model="yarVal" :postfix="yarnfix"></pickModel>
        <pickModel v-show="type > 1" @change="changeMouClick" :listData="mouDatas" v-model="mouVal" :postfix="mouthfix"></pickModel>
        <pickModel v-show="type > 2" @change="changeDayClick" :listData="dayDatas" v-model="dayVal" :postfix="dayfix"></pickModel>
      </div>
    </div>
  </div>
</template>

<script>
import pickModel from "./pickModel"; // 资讯
export default {
  components: {
    pickModel
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    endDate: {}, // 设置开始和结束时间
    startDate: {},
    yarnfix: {}, // 年月日后缀
    mouthfix: {},
    dayfix: {},
    type: {
      default: "3" // 1 年 2 年月 3 年月日
    },
    value: {} // 最终值
  },
  data() {
    return {
      isDateShow: false,
      yarDatas: [],
      mouDatas: [],
      dayDatas: [],
      yarVal: 0,
      mouVal: 0,
      dayVal: 0,
      cutY: { start: -10, end: 10 }, // 年份截止
      cutM: { start: 1, end: 12 }, // 月份截止
      cutD: { start: 1, end: 30 }, // 截止
      newDate: {
        y: 0,
        m: 0,
        d: 0,
        h: 0,
        min: 0,
        s: 0
      }
    };
  },
  methods: {
    // 取消
    calicClick() {
      this.$emit("click", "cancel");
    },
    // 确认
    confimClick() {
      let timeStr = `${this.yarVal}/${this.mouVal}/${this.dayVal}`;
      this.$emit("click", timeStr);
      this.$emit("input", timeStr);
    },
    // 月跟随年变更
    changeYarClick(val) {
      let self = this;
      self.yarVal = val.value;
      if (self.startDate) {
        let yarnStartVal,
          mouStartVal,
          dayStartVal = "";
        let startDate = new Date(`${self.startDate} 00:00:00`);
        yarnStartVal = startDate.getFullYear();
        mouStartVal = startDate.getMonth() + 1;
        dayStartVal = startDate.getDate();
        if (val.value == yarnStartVal) {
          self.cutM.start = mouStartVal;
        } else {
          self.cutM.start = 1;
        }
      } else {
        self.cutM.start = 1;
      }
      if (self.endDate) {
        let yarnEndVal,
          mouEndVal,
          dayEndVal = "";
        let endDate = new Date(`${self.endDate} 00:00:00`);
        yarnEndVal = endDate.getFullYear();
        mouEndVal = endDate.getMonth() + 1;
        dayEndVal = endDate.getDate();
        self.cutY.end = 0;
        if (val.value == yarnEndVal) {
          self.cutM.end = mouEndVal;
        } else {
          self.cutM.end = 12;
        }
      } else {
        self.cutM.end = 12;
      }
      self.mouListFun();
    },
    // 天数随月变更
    changeMouClick(val) {
      let self = this;
      self.mouVal = self.getSpinData(self.mouDatas, val);
      if (self.startDate) {
        let yarnStartVal,
          mouStartVal,
          dayStartVal = "";
        let startDate = new Date(`${self.startDate} 00:00:00`);
        yarnStartVal = startDate.getFullYear();
        mouStartVal = startDate.getMonth() + 1;
        mouStartVal = self.decimalismFun(mouStartVal);
        dayStartVal = startDate.getDate();
        if (self.yarVal == yarnStartVal && self.mouVal == mouStartVal) {
          self.cutD.start = dayStartVal;
        } else {
          self.cutD.start = 1;
        }
      } else {
        self.cutD.start = 1;
      }
      if (self.endDate) {
        let yarnEndVal,
          mouEndVal,
          dayEndVal = "";
        let endDate = new Date(`${self.endDate} 00:00:00`);
        yarnEndVal = endDate.getFullYear();
        mouEndVal = endDate.getMonth() + 1;
        mouEndVal = self.decimalismFun(mouEndVal);
        dayEndVal = endDate.getDate();
        if (self.yarVal == yarnEndVal && self.mouVal == mouEndVal) {
          self.cutD.end = dayEndVal;
        } else {
          self.cutD.end = self.mGetDate(self.yarVal, self.mouVal);
        }
      } else {
        self.cutD.end = self.mGetDate(self.yarVal, self.mouVal);
      }
      self.dayListFun();
    },
    // 天选中
    changeDayClick(val) {
      let self = this;
      self.dayVal = self.getSpinData(self.dayDatas, val);
      console.log(self.yarVal, self.mouVal, self.dayVal);
    },
    // 年月日
    dateFun(pDate) {
      let self = this;
      let yarnSelectVal,
        mouSelectVal,
        daySelectVal = "";
      // 设置选中时间
      if (pDate) {
        let date = new Date(`${pDate} 00:00:00`);
        yarnSelectVal = date.getFullYear();
        mouSelectVal = self.decimalismFun(date.getMonth() + 1);
        daySelectVal = self.decimalismFun(date.getDate());
      } else {
        yarnSelectVal = self.newDate.y;
        mouSelectVal = self.newDate.m;
        daySelectVal = self.newDate.d;
      }
      // 截止时间
      let yarnEndVal,
        mouEndVal,
        dayEndVal = "";
      if (self.endDate) {
        let endDate = new Date(`${self.endDate} 00:00:00`);
        yarnEndVal = endDate.getFullYear();
        mouEndVal = endDate.getMonth() + 1;
        dayEndVal = endDate.getDate();
        self.cutY.end = 0;
        if (yarnSelectVal == yarnEndVal) {
          self.cutM.end = mouEndVal;
        } else {
          self.cutM.end = 12;
        }
        if (yarnSelectVal == yarnEndVal && mouSelectVal == mouEndVal) {
          self.cutD.end = dayEndVal;
        } else {
          self.cutD.end = self.mGetDate(yarnSelectVal, mouSelectVal);
        }
      } else {
        self.cutY.end = 10;
        self.cutM.end = 12;
        self.cutD.end = self.mGetDate(yarnSelectVal, mouSelectVal);
        yarnEndVal = self.newDate.y;
      }
      // 开始时间
      if (self.startDate) {
        let yarnStartVal,
          mouStartVal,
          dayStartVal = "";
        let startDate = new Date(`${self.startDate} 00:00:00`);
        yarnStartVal = startDate.getFullYear();
        mouStartVal = startDate.getMonth() + 1;
        dayStartVal = startDate.getDate();
        self.cutY.start = yarnStartVal - yarnEndVal;
        if (yarnSelectVal == yarnStartVal) {
          self.cutM.start = mouStartVal;
        } else {
          self.cutM.start = 1;
        }
        if (yarnSelectVal == yarnStartVal && mouSelectVal == mouStartVal) {
          self.cutD.start = dayStartVal;
        } else {
          self.cutD.start = 1;
        }
      } else {
        self.cutY.start = -10;
        self.cutM.start = 1;
        self.cutD.start = 1;
      }
      console.log(daySelectVal);
      // 年
      self.yarnListFun(yarnEndVal);
      self.yarVal = `${yarnSelectVal}`;
      // 月
      self.mouListFun();
      self.mouVal = `${mouSelectVal}`;
      // 日
      self.dayListFun();
      self.dayVal = `${daySelectVal}`;
    },
    // 年数组变更
    yarnListFun(yarnEndVal) {
      let self = this;
      let arr = [];
      for (let k = self.cutY.start; k <= self.cutY.end; k++) {
        let data = `${yarnEndVal * 1 + k}`;
        arr.push(data);
      }
      self.yarDatas = arr;
    },
    // 月数组变更
    mouListFun() {
      let self = this;
      let arr = [];
      for (let k = self.cutM.start; k <= self.cutM.end; k++) {
        let data = self.decimalismFun(k);
        arr.push(data);
      }
      self.mouDatas = arr;
    },
    // 天数组变更
    dayListFun() {
      let self = this;
      let arr = [];
      for (let k = self.cutD.start; k <= self.cutD.end; k++) {
        let data = self.decimalismFun(k);
        arr.push(data);
      }
      self.dayDatas = arr;
    },
    startDateFun(val) {},
    // 每月天数
    mGetDate(year, month) {
      let d = new Date(year, month, 0);
      return d.getDate();
    },
    // 获取选中值
    getSpinData(arr, val) {
      let self = this;
      let tempArr = [];
      for (let k = val.start; k <= val.end; k++) {
        let index = k % arr.length;
        let valStr = arr[index >= 0 ? index : index + arr.length];
        let data = {
          value: valStr,
          index: k
        };
        tempArr.push(data);
      }
      let selectVal = tempArr[7].value;
      return selectVal;
    },
    // 十进一
    decimalismFun(val) {
      return `${val > 9 ? `${val}` : `0${val}`}`;
    },
    // 获取当前年月日时分秒
    newDateFun() {
      let date = new Date();
      this.newDate.y = date.getFullYear();
      this.newDate.m = this.decimalismFun(date.getMonth() + 1);
      this.newDate.d = this.decimalismFun(date.getDate());
      this.newDate.h = this.decimalismFun(date.getHours());
      this.newDate.min = this.decimalismFun(date.getMinutes());
      this.newDate.s = this.decimalismFun(date.getSeconds());
      this.dateFun(this.value);
    }
  },
  created: function() {
    this.newDateFun();
  },
  computed: {},
  mounted() {},
  watch: {
    // 显示隐藏状态
    show(val) {
      this.isDateShow = val;
    }
  },
  filters: {}
};
</script>
<style scoped>
.pickClor {
  height: calc(100vh - 256px);
  background: rgba(0, 0, 0, 0.4);
  width: 100%;
}

.pickMain {
  height: 256px;
  display: flex;
  flex-wrap: wrap;
}

.butPickLeft {
  width: 90px;
  height: 50px;
  line-height: 50px;
  font-size: 16px;
  color: rgba(67, 144, 225, 1);
  margin-left: 17px;
}

.butPickRight {
  width: 90px;
  height: 50px;
  font-size: 16px;
  color: rgba(67, 144, 225, 1);
  line-height: 50px;
  margin-right: 17px;
  text-align: right;
}

.butPick {
  height: 50px;
  width: 100vw;
  border-bottom: 1px solid rgba(215, 215, 215, 1);
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.pickList {
  width: 100vw;
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
  background-color: #fff;
  height: 206px;
}

.timeModelMian {
  height: 100vh;
  width: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  flex-wrap: wrap;
  z-index: 2000;
  position: fixed;
  top: 0;
  left: 0;
}
</style>