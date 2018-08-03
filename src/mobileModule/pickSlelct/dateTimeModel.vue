// 年月日时分秒
<template>
  <div class="timeModelMian" v-if="isDateShow">
    <div class="pickBg" @click="cancelClick">
    </div>
    <div class="pickMain">
      <div class="butPick">
        <div class="butPickLeft" @click="cancelClick">
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
        <pickModel v-show="type > 3" @change="changeHouClick" :listData="hDatas" v-model="hVal" :postfix="hfix"></pickModel>
        <pickModel v-show="type > 4" @change="changeMinClick" :listData="mDatas" v-model="mVal" :postfix="mfix"></pickModel>
        <pickModel v-show="type > 5" @change="changeSouClick" :listData="dDatas" v-model="sVal" :postfix="sfix"></pickModel>
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
    hfix: {}, // 时分秒后缀
    mfix: {},
    sfix: {},
    type: {
      default: "6" // 1 年 2 年月 3 年月日 4 年月日时 5 年月日时分 6 年月日时分秒
    },
    value: {} // 最终值
  },
  data() {
    return {
      isDateShow: false,
      yarDatas: [],
      mouDatas: [],
      dayDatas: [],
      hDatas: [],
      mDatas: [],
      dDatas: [],
      yarVal: 0,
      mouVal: 0,
      dayVal: 0,
      hVal: 0,
      mVal: 0,
      sVal: 0,
      cutY: { start: -10, end: 10 }, // 年 截止
      yarnEndVal: "",
      cutMou: { start: 1, end: 12 }, // 月 截止
      cutD: { start: 1, end: 30 }, // 日 截止
      cutH: { start: 0, end: 23 }, // 时 截止
      cutM: { start: 0, end: 59 }, // 分 截止
      cutS: { start: 0, end: 59 }, // 秒 截止
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
    cancelClick() {
      this.$emit("click", "cancel");
    },
    // 确认
    confimClick() {
      let timeStr = `${this.yarVal}/${this.mouVal}/${this.dayVal} ${
        this.hVal
      }:${this.mVal}:${this.sVal}`;
      this.$emit("click", timeStr);
      this.$emit("input", timeStr);
    },
    // 月跟随年变更
    changeYarClick(val) {
      let self = this;
      self.yarVal = val.value;
      self.startFun();
      self.mouListFun();
    },
    // 天数随月变更
    changeMouClick(val) {
      let self = this;
      self.mouVal = self.getSpinData(self.mouDatas, val);
      self.startFun();
      self.dayListFun();
    },
    // 时数随天变更
    changeDayClick(val) {
      let self = this;
      self.dayVal = self.getSpinData(self.dayDatas, val);
      self.startFun();
      self.hListFun();
    },
    // 分数随时变更
    changeHouClick(val) {
      let self = this;
      self.hVal = self.getSpinData(self.hDatas, val);
      self.startFun();
      self.mListFun();
    },
    // 秒数随分变更
    changeMinClick(val) {
      let self = this;
      self.mVal = self.getSpinData(self.mDatas, val);
      self.startFun();
      self.sListFun();
    },
    // 秒选中
    changeSouClick(val) {
      let self = this;
      self.sVal = self.getSpinData(self.dDatas, val);
    },
    // 年月日
    dateFun(pDate) {
      let self = this;
      let yarnSelectVal,
        mouSelectVal,
        daySelectVal,
        hSelectVal,
        mSelectVal,
        sSelectVal = "";
      // 设置选中时间
      if (pDate) {
        let date = new Date(pDate);
        yarnSelectVal = date.getFullYear();
        mouSelectVal = self.decimalismFun(date.getMonth() + 1);
        daySelectVal = self.decimalismFun(date.getDate());
        hSelectVal = self.decimalismFun(date.getHours());
        mSelectVal = self.decimalismFun(date.getMinutes());
        sSelectVal = self.decimalismFun(date.getSeconds());
      } else {
        yarnSelectVal = self.newDate.y;
        mouSelectVal = self.newDate.m;
        daySelectVal = self.newDate.d;
        hSelectVal = self.newTime.h;
        mSelectVal = self.newTime.min;
        sSelectVal = self.newTime.s;
      }
      self.yarVal = `${yarnSelectVal}`;
      self.mouVal = `${mouSelectVal}`;
      self.dayVal = `${daySelectVal}`;
      self.hVal = `${hSelectVal}`;
      self.mVal = `${mSelectVal}`;
      self.sVal = `${sSelectVal}`;
      // 截止时间

      // 开始时间
      self.startFun();
      // 年
      self.yarnListFun(self.yarnEndVal);
      // 月
      self.mouListFun();
      // 日
      self.dayListFun();
      // 时
      self.hListFun();
      // 分
      self.mListFun();
      // 秒
      self.sListFun();
    },
    // 时间限制判断
    startFun() {
      let self = this;
      let yarnEndVal,
        mouEndVal,
        dayEndVal,
        hEndVal,
        mEndVal,
        dEndVal = "";
      if (self.endDate) {
        let endDate = new Date(self.endDate);
        yarnEndVal = endDate.getFullYear();
        mouEndVal = endDate.getMonth() + 1;
        dayEndVal = endDate.getDate();

        hEndVal = endDate.getHours();
        mEndVal = endDate.getMinutes();
        dEndVal = endDate.getSeconds();
        self.cutY.end = 0;
        if (self.yarVal == yarnEndVal) {
          self.cutMou.end = mouEndVal;
        } else {
          self.cutMou.end = 12;
        }
        if (self.yarVal == yarnEndVal && self.mouVal == mouEndVal) {
          self.cutD.end = dayEndVal;
        } else {
          self.cutD.end = self.mGetDate(self.yarVal, self.mouVal);
        }
        if (
          self.yarVal == yarnEndVal &&
          self.mouVal == mouEndVal &&
          self.dayVal == dayEndVal
        ) {
          self.cutH.end = hEndVal;
        } else {
          self.cutH.end = 23;
        }
        if (
          self.yarVal == yarnEndVal &&
          self.mouVal == mouEndVal &&
          self.dayVal == dayEndVal &&
          self.hVal == hEndVal
        ) {
          self.cutM.end = mEndVal;
        } else {
          self.cutM.end = 59;
        }
        if (
          self.yarVal == yarnEndVal &&
          self.mouVal == mouEndVal &&
          self.dayVal == dayEndVal &&
          self.hVal == hEndVal &&
          self.mVal == mEndVal
        ) {
          self.cutS.end = dEndVal;
        } else {
          self.cutS.end = 59;
        }
      } else {
        self.cutY.end = 10;
        self.cutMou.end = 12;
        self.cutD.end = self.mGetDate(yarnSelectVal, self.mouVal);
        yarnEndVal = self.newDate.y;
        self.cutH.end = 23;
        self.cutM.end = 59;
        self.cutS.end = 59;
      }
      if (self.startDate) {
        let yarnStartVal,
          mouStartVal,
          dayStartVal,
          hStartVal,
          mStartVal,
          sStartVal = "";
        let startDate = new Date(self.startDate);
        yarnStartVal = startDate.getFullYear();
        mouStartVal = startDate.getMonth() + 1;
        dayStartVal = startDate.getDate();

        hStartVal = startDate.getHours();
        mStartVal = startDate.getMinutes();
        sStartVal = startDate.getSeconds();

        self.cutY.start = yarnStartVal - yarnEndVal;
        if (self.yarVal == yarnStartVal) {
          self.cutMou.start = mouStartVal;
        } else {
          self.cutMou.start = 1;
        }
        if (self.yarVal == yarnStartVal && self.mouVal == mouStartVal) {
          self.cutD.start = dayStartVal;
        } else {
          self.cutD.start = 1;
        }
        if (
          self.yarVal == yarnStartVal &&
          self.mouVal == mouStartVal &&
          self.dayVal == dayStartVal
        ) {
          self.cutH.start = hStartVal;
        } else {
          self.cutH.start = 0;
        }
        if (
          self.yarVal == yarnStartVal &&
          self.mouVal == mouStartVal &&
          self.dayVal == dayStartVal &&
          self.hVal == hStartVal
        ) {
          self.cutM.start = mStartVal;
        } else {
          self.cutM.start = 0;
        }
        if (
          self.yarVal == yarnStartVal &&
          self.mouVal == mouStartVal &&
          self.dayVal == dayStartVal &&
          self.hVal == hStartVal &&
          self.mVal == mStartVal
        ) {
          self.cutS.start = sStartVal;
        } else {
          self.cutS.start = 0;
        }
      } else {
        self.cutY.start = -10;
        self.cutMou.start = 1;
        self.cutD.start = 1;
        self.cutH.start = 0;
        self.cutM.start = 0;
        self.cutS.start = 0;
      }
      self.yarnEndVal = yarnEndVal;
    },
    // 年 数据变更
    yarnListFun(yarnEndVal) {
      let self = this;
      let arr = [];
      for (let k = self.cutY.start; k <= self.cutY.end; k++) {
        let data = `${yarnEndVal * 1 + k}`;
        arr.push(data);
      }
      self.yarDatas = arr;
    },
    // 月 数据变更
    mouListFun() {
      let self = this;
      let arr = [];
      for (let k = self.cutMou.start; k <= self.cutMou.end; k++) {
        let data = self.decimalismFun(k);
        arr.push(data);
      }
      self.mouDatas = arr;
    },
    // 天 数据变更
    dayListFun() {
      let self = this;
      let arr = [];
      for (let k = self.cutD.start; k <= self.cutD.end; k++) {
        let data = self.decimalismFun(k);
        arr.push(data);
      }
      self.dayDatas = arr;
    },
    // 时 数据变更
    hListFun() {
      let self = this;
      let arr = [];
      for (let k = self.cutH.start; k <= self.cutH.end; k++) {
        let data = self.decimalismFun(k);
        arr.push(data);
      }
      self.hDatas = arr;
    },
    // 分 数据变更
    mListFun() {
      let self = this;
      let arr = [];
      for (let k = self.cutM.start; k <= self.cutM.end; k++) {
        let data = self.decimalismFun(k);
        arr.push(data);
      }
      self.mDatas = arr;
    },
    // 秒 数据变更
    sListFun() {
      let self = this;
      let arr = [];
      for (let k = self.cutS.start; k <= self.cutS.end; k++) {
        let data = self.decimalismFun(k);
        arr.push(data);
      }
      self.dDatas = arr;
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
<style>
.pickBg {
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