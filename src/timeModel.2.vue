<template>
  <div class="timeModelMian" v-show="isDataShow">
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
    // 年-月变更
    changeYarClick(val) {
      this.yGetDate(val);
    },
    // 根据年变化月天数
    yGetDate(val) {
      let date = new Date();
      let newYarStr,
        newMouStr = 0;
      if (this.endDate) {
        let setDate = new Date(this.endDate);
        this.cutY.end = 0;
        newYarStr = setDate.getFullYear();
        if (newYarStr == val) {
          newMouStr = setDate.getMonth() + 1;
        } else {
          newMouStr = 12;
        }
      } else {
        newMouStr = 12;
      }
      this.mouDatas = Array.from(
        { length: newMouStr },
        (value, index) => `${1 + index > 9 ? `${1 + index}` : `0${1 + index}`}`
      );
    },
    // 每月天数变更
    changeMouClick() {
      let dayNum = this.mGetDate(this.yarVal, this.mouVal);
      this.dayDatas = [];
      this.dayDatas = Array.from(
        { length: dayNum },
        (value, index) => `${1 + index > 9 ? 1 + index : `0${1 + index}`}`
      );
    },
    // 每月天数
    mGetDate(year, month) {
      let d = new Date(year, month, 0);
      return d.getDate();
    },
    // 初始化数据
    dtFun() {
      let newYarStr,
        newMouStr = 0;
      let date = new Date();
      if (this.endDate) {
        let setDate = new Date(this.endDate);
        this.cutY.end = 0;
        newYarStr = setDate.getFullYear();
        newMouStr = setDate.getMonth() + 1;
      } else {
        this.cutY.end = 10;
        newYarStr = date.getFullYear();
        newMouStr = 12;
      }
      let temp = [];
      for (let k = this.cutY.start; k <= this.cutY.end; k++) {
        let data = `${newYarStr * 1 + k}`;
        temp.push(data);
      }
      this.yarDatas = temp;
      this.yarVal = `${newYarStr}`;

      this.mouDatas = Array.from(
        { length: newMouStr },
        (value, index) => `${1 + index > 9 ? `${1 + index}` : `0${1 + index}`}`
      );
      this.mouVal =
        date.getMonth() + 1 > 9
          ? `${date.getMonth() + 1}`
          : `0${date.getMonth() + 1}`;

      let dayNum = this.mGetDate(this.yarVal, this.mouVal);
      this.dayDatas = Array.from(
        { length: dayNum },
        (value, index) => `${1 + index > 9 ? 1 + index : `0${1 + index}`}`
      );
      this.dayVal =
        date.getDate() > 9 ? `${date.getDate()}` : `0${date.getDate()}`;
      this.houDatas = Array.from(
        { length: 24 },
        (value, index) => `${index > 9 ? index : `0${index}`}`
      );
      this.houVal =
        date.getHours() > 9 ? `${date.getHours()}` : `0${date.getHours()}`;
      this.minDatas = Array.from(
        { length: 60 },
        (value, index) => `${index > 9 ? index : `0${index}`}`
      );
      this.minVal =
        date.getMinutes() > 9
          ? `${date.getMinutes()}`
          : `0${date.getMinutes()}`;
      this.secDatas = Array.from(
        { length: 60 },
        (value, index) => `${index > 9 ? index : `0${index}`}`
      );
      this.secVal =
        date.getSeconds() > 9
          ? `${date.getSeconds()}`
          : `0${date.getSeconds()}`;
    },
    // 初始化数据
    dtFFun(y, m = 12, d, h = 24, min = 60, s = 60) {
      let newMouStr = 0;
      let date = new Date();
      if (!y) {
        y = date.getFullYear();
      }
      if (!d) {
        let dayNum = this.mGetDate(y, date.getMonth() + 1);
        d = dayNum;
      }
      // 年
      let temp = [];
      for (let k = this.cutY.start; k <= this.cutY.end; k++) {
        let data = `${y * 1 + k}`;
        temp.push(data);
      }
      this.yarDatas = temp;
      this.yarVal = `${date.getFullYear()}`;
      // 月
      this.mouDatas = Array.from(
        { length: m },
        (value, index) => `${1 + index > 9 ? `${1 + index}` : `0${1 + index}`}`
      );
      // 日
      this.dayDatas = Array.from(
        { length: d },
        (value, index) => `${1 + index > 9 ? 1 + index : `0${1 + index}`}`
      );
      // 时
      this.houDatas = Array.from(
        { length: h },
        (value, index) => `${index > 9 ? index : `0${index}`}`
      );
      // 分
      this.minDatas = Array.from(
        { length: min },
        (value, index) => `${index > 9 ? index : `0${index}`}`
      );
      // 秒
      this.secDatas = Array.from(
        { length: s },
        (value, index) => `${index > 9 ? index : `0${index}`}`
      );
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
    newDateFun() {
      let date = new Date();
      this.newDate.y = date.getFullYear();
      this.newDate.m = date.getMonth() + 1;
      this.newDate.d = date.getDate();
      this.newDate.h = date.getHours();
      this.newDate.min = date.getMinutes();
      this.newDate.s = date.getSeconds();
    },
    // 年月日
    dateFun(pDate) {
      let date = "";
      // 设置时间
      if (pDate) {
        date = new Date(`${pDate} 00:00:00`);
      } else {
        date = new Date();
      }
      // 截止时间
      if (this.endDate) {
        this.cutY.end = 0;
      }
      // 开始时间
      if (this.endDate) {
        this.cutY.start = 0;
      }
      // 年
      let temp = [];
      for (let k = this.cutY.start; k <= this.cutY.end; k++) {
        let data = `${this.newDate.y * 1 + k}`;
        temp.push(data);
      }
      this.yarDatas = temp;
      this.yarVal = `${date.getFullYear()}`;
      // 月
      this.mouDatas = Array.from(
        { length: m },
        (value, index) => `${1 + index > 9 ? `${1 + index}` : `0${1 + index}`}`
      );
      // 日
      this.dayDatas = Array.from(
        { length: d },
        (value, index) => `${1 + index > 9 ? 1 + index : `0${1 + index}`}`
      );
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
  mounted() {},
  watch: {
    // 显示隐藏状态
    DataShow(val) {
      this.isDataShow = val;
      this.$nextTick(function() {
        console.log(this.value);
        if (this.type == "time") {
          this.timeFun(this.value);
        } else if (this.type == "date") {
          this.dateFun(this.value);
        } else {
          this.timeDateFun(this.value || new Date());
        }
      });
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