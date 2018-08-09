<template>
  <div class="timeModelMian" v-if="isDataShow">
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
      <div class="pickList" v-if="type == 'time'">
        <v-pickModel :listData="houDatas" v-model="houVal"></v-pickModel>
        <v-pickModel :listData="minDatas" v-model="minVal"></v-pickModel>
        <!-- <v-pickModel :listData="secDatas" v-model="secVal"></v-pickModel> -->
      </div>
      <div class="pickList" v-else-if="type == 'date'">
        <v-pickModel @change="changeYarClick" :listData="yarDatas" v-model="yarVal" :postfix="yarnfix"></v-pickModel>
        <v-pickModel @change="changeMouClick" :listData="mouDatas" v-model="mouVal" :postfix="mouthfix"></v-pickModel>
        <v-pickModel :listData="dayDatas" v-model="dayVal" :postfix="dayfix"></v-pickModel>
      </div>
      <div class="pickList" v-else-if="type == 'datetime'">
        <v-pickModel :listData="yarDatas" v-model="yarVal" :postfix="yarnfix"></v-pickModel>
        <v-pickModel @change="changeMouClick" :listData="mouDatas" v-model="mouVal" :postfix="mouthfix"></v-pickModel>
        <v-pickModel :listData="dayDatas" v-model="dayVal" :postfix="dayfix"></v-pickModel>
        <v-pickModel :listData="houDatas" v-model="houVal"></v-pickModel>
        <v-pickModel :listData="minDatas" v-model="minVal"></v-pickModel>
      </div>
    </div>
  </div>
</template>

<script>
import pickModel from "./pickModel"; // 资讯
export default {
  components: {
    "v-pickModel": pickModel
  },
  props: {
    DataShow: {
      type: Boolean,
      default: false
    },
    endDate: {}, // 设置开始和结束时间
    startDate: {},
    yarnfix: {}, // 年月日后缀
    mouthfix: {},
    dayfix: {},
    type: {
      type: String,
      default: "date" // time 时分秒 date 年月日 datetime 年月日时分秒
    },
    value: {} // 最终值
  },
  data() {
    return {
      isDataShow: false,
      yarDatas: [],
      mouDatas: [],
      dayDatas: [],
      houDatas: [],
      minDatas: [],
      secDatas: [],
      yarVal: 0,
      mouVal: 0,
      dayVal: 0,
      houVal: 0,
      minVal: 0,
      secVal: 0,
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
      let timeStr = "";
      if (this.type == "time") {
        timeStr = `${this.houVal}:${this.minVal}`;
      } else if (this.type == "date") {
        timeStr = `${this.yarVal}/${this.mouVal}/${this.dayVal}`;
      } else if (this.type == "datetime") {
        timeStr = `${this.yarVal}/${this.mouVal}/${this.dayVal} ${
          this.houVal
        }:${this.minVal}:${this.secVal}`;
      }
      this.$emit("click", timeStr);
      this.$emit("input", timeStr);
    },
    // 月跟随年变更
    changeYarClick(val) {
      this.yGetDate(val);
    },
    yGetDate(val) {
      let self = this;
      if (self.startDate) {
        let yarnStartVal,
          mouStartVal,
          dayStartVal = "";
        let startDate = new Date(`${self.startDate} 00:00:00`);
        yarnStartVal = startDate.getFullYear();
        mouStartVal = startDate.getMonth() + 1;
        dayStartVal = startDate.getDate();
        if (val == yarnStartVal) {
          self.cutM.start = mouStartVal;
        } else {
          self.cutM.start = 1;
        }
      } else {
        self.cutM.start = 1;
      }

      // if (yarnSelectVal == yarnStartVal && mouSelectVal == mouStartVal) {
      //   self.cutD.start = dayStartVal;
      // } else {
      //   self.cutD.start = 1;
      // }
      if (self.endDate) {
        let yarnEndVal,
          mouEndVal,
          dayEndVal = "";
        let endDate = new Date(`${self.endDate} 00:00:00`);
        yarnEndVal = endDate.getFullYear();
        mouEndVal = endDate.getMonth() + 1;
        dayEndVal = endDate.getDate();
        self.cutY.end = 0;
        if (val == yarnEndVal) {
          self.cutM.end = mouEndVal;
        } else {
          self.cutM.end = 12;
        }
      } else {
        self.cutM.end = 12;
      }

      // if (yarnSelectVal == yarnEndVal && mouSelectVal == mouEndVal) {
      //   self.cutD.end = dayEndVal;
      // } else {
      //   self.cutD.end = self.mGetDate(yarnSelectVal, mouSelectVal);
      // }
      let mtemp = [];
      for (let k = self.cutM.start; k <= self.cutM.end; k++) {
        let data = `${k > 9 ? `${k}` : `0${k}`}`;
        mtemp.push(data);
      }
      this.mouDatas = mtemp;
      this.mouVal = "01";
    },
    // 天数随月变更
    changeMouClick(val) {
      console.log(val, "天数随月变更");
      let self = this;
      let dayEndVal = this.mGetDate(this.yarVal, this.mouVal);
      let yarnEndVal,
        mouEndVal = "";
      if (self.endDate) {
        let endDate = new Date(`${self.endDate} 00:00:00`);
        yarnEndVal = endDate.getFullYear();
        mouEndVal = endDate.getMonth() + 1;
        if (self.yarVal == yarnEndVal && self.mouVal == mouEndVal) {
          dayEndVal = endDate.getDate();
        }
      }
      this.dayDatas = [];
      this.dayDatas = Array.from(
        { length: dayEndVal },
        (value, index) => `${1 + index > 9 ? 1 + index : `0${1 + index}`}`
      );
    },
    // 每月天数
    mGetDate(year, month) {
      let d = new Date(year, month, 0);
      return d.getDate();
    },
    // 年月日时分
    timeDateFun(t) {
      t = t || new Date();
      let date = new Date(t);
      this.yarVal = `${date.getFullYear()}`;
      this.mouVal =
        date.getMonth() + 1 > 9
          ? `${date.getMonth() + 1}`
          : `0${date.getMonth() + 1}`;
      this.dayVal =
        date.getDate() > 9 ? `${date.getDate()}` : `0${date.getDate()}`;
      this.houVal =
        date.getHours() > 9 ? `${date.getHours()}` : `0${date.getHours()}`;
      this.minVal =
        date.getMinutes() > 9
          ? `${date.getMinutes()}`
          : `0${date.getMinutes()}`;
    },
    // 获取当前年月日时分秒
    newDateFun() {
      let date = new Date();
      this.newDate.y = date.getFullYear();
      this.newDate.m = `${
        date.getMonth() + 1 > 9
          ? `${date.getMonth() + 1}`
          : `0${date.getMonth() + 1}`
      }`;
      this.newDate.d = `${
        date.getDate() > 9 ? `${date.getDate()}` : `0${date.getDate()}`
      }`;
      this.newDate.h = `${
        date.getHours() > 9 ? `${date.getHours()}` : `0${date.getHours()}`
      }`;
      this.newDate.min = `${
        date.getMinutes() > 9 ? `${date.getMinutes()}` : `0${date.getMinutes()}`
      }`;
      this.newDate.s = `${
        date.getSeconds() > 9 ? `${date.getSeconds()}` : `0${date.getSeconds()}`
      }`;
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
        mouSelectVal = `${
          date.getMonth() + 1 > 9
            ? `${date.getMonth() + 1}`
            : `0${date.getMonth() + 1}`
        }`;
        daySelectVal = `${
          date.getDate() > 9 ? `${date.getDate()}` : `0${date.getDate()}`
        }`;
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
      // 年
      let ytemp = [];
      for (let k = self.cutY.start; k <= self.cutY.end; k++) {
        let data = `${yarnEndVal * 1 + k}`;
        ytemp.push(data);
      }
      self.yarDatas = ytemp;
      self.yarVal = `${yarnSelectVal}`;
      // 月
      let mtemp = [];
      for (let k = self.cutM.start; k <= self.cutM.end; k++) {
        let data = `${k > 9 ? `${k}` : `0${k}`}`;
        mtemp.push(data);
      }
      self.mouDatas = mtemp;
      self.mouVal = `${mouSelectVal}`;
      // 日

      let dtemp = [];
      for (let k = self.cutD.start; k <= self.cutD.end; k++) {
        let data = `${k > 9 ? `${k}` : `0${k}`}`;
        dtemp.push(data);
      }
      self.dayDatas = dtemp;
      self.dayVal = `${daySelectVal}`;
    },
    // 时分
    timeFun(t) {
      t = t || new Date();
      let date = new Date(`2018/02/02 ${t}`);
      this.houVal =
        date.getHours() > 9 ? `${date.getHours()}` : `0${date.getHours()}`;
      this.minVal =
        date.getMinutes() > 9
          ? `${date.getMinutes()}`
          : `0${date.getMinutes()}`;
    }
  },
  created: function() {
    this.newDateFun();
  },
  computed: {},
  mounted() {},
  watch: {
    // 显示隐藏状态
    DataShow(val) {
      this.isDataShow = val;
      if (this.type == "time") {
        this.timeFun(this.value);
      } else if (this.type == "date") {
        this.dateFun(this.value);
      } else {
        this.timeDateFun(this.value || new Date());
      }
    }
  },
  filters: {}
};
</script>
<style>
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